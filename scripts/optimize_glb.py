"""Shrink a single-buffer GLB: resize embedded textures, re-encode JPEG, convert indices to uint16 when possible."""
import struct, json, io, sys
from PIL import Image
import numpy as np

def read_glb(path):
    b = open(path, 'rb').read()
    off, chunks = 12, []
    while off < len(b):
        cl, ct = struct.unpack('<I4s', b[off:off+8]); chunks.append((ct, b[off+8:off+8+cl])); off += 8 + cl
    return json.loads(chunks[0][1]), chunks[1][1]

def write_glb(path, j, bin_):
    js = json.dumps(j, separators=(',', ':')).encode()
    js += b' ' * ((4 - len(js) % 4) % 4)
    bin_ += b'\0' * ((4 - len(bin_) % 4) % 4)
    total = 12 + 8 + len(js) + 8 + len(bin_)
    with open(path, 'wb') as f:
        f.write(struct.pack('<4sII', b'glTF', 2, total))
        f.write(struct.pack('<I4s', len(js), b'JSON')); f.write(js)
        f.write(struct.pack('<I4s', len(bin_), b'BIN\0')); f.write(bin_)

def main(src, dst, max_px=2048, q=82):
    j, bin_ = read_glb(src)
    views = j['bufferViews']
    blobs = [bin_[v.get('byteOffset', 0): v.get('byteOffset', 0) + v['byteLength']] for v in views]
    image_views = {im['bufferView']: i for i, im in enumerate(j.get('images', []))}
    report = []
    for vi, ii in image_views.items():
        im = Image.open(io.BytesIO(blobs[vi])); im.load()
        before = (im.size, len(blobs[vi]))
        if max(im.size) > max_px:
            im = im.resize((max_px, round(im.size[1] * max_px / im.size[0])), Image.LANCZOS)
        out = io.BytesIO(); im.convert('RGB').save(out, 'JPEG', quality=q, optimize=True, progressive=False)
        blobs[vi] = out.getvalue(); j['images'][ii]['mimeType'] = 'image/jpeg'
        report.append(f"img{ii}: {before[0]} {before[1]//1024}KB -> {im.size} {len(blobs[vi])//1024}KB")
    # indices to uint16
    for m in j['meshes']:
        for p in m['primitives']:
            if 'indices' not in p: continue
            acc = j['accessors'][p['indices']]
            nverts = j['accessors'][p['attributes']['POSITION']]['count']
            if acc['componentType'] == 5125 and nverts < 65535:
                v = views[acc['bufferView']]
                start = acc.get('byteOffset', 0)
                arr = np.frombuffer(blobs[acc['bufferView']], dtype='<u4', count=acc['count'], offset=start)
                blobs[acc['bufferView']] = arr.astype('<u2').tobytes()
                acc['componentType'] = 5123; acc['byteOffset'] = 0
                v.pop('byteStride', None)
                report.append(f"indices: {acc['count']} uint32 -> uint16")
    # rebuild buffer
    out = bytearray()
    for v, blob in zip(views, blobs):
        out += b'\0' * ((4 - len(out) % 4) % 4)
        v['byteOffset'] = len(out); v['byteLength'] = len(blob); out += blob
    j['buffers'] = [{'byteLength': len(out)}]
    j['asset'] = {'version': '2.0', 'generator': 'portfolio optimize_glb.py'}
    write_glb(dst, j, bytes(out))
    print('\n'.join(report))

if __name__ == '__main__':
    main(*sys.argv[1:3])
