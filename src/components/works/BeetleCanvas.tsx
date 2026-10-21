"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/** Procedural studio lighting (no network fetch), so the metallic shell reads well. */
function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Model({ url, yaw, onLoaded }: { url: string; yaw: number; onLoaded: () => void }) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    onLoaded();
  }, [onLoaded, scene]);
  return (
    <Center>
      <group rotation={[0, yaw, 0]}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function BeetleCanvas({
  url,
  yaw,
  autoRotate,
  onLoaded,
}: {
  url: string;
  yaw: number;
  autoRotate: boolean;
  onLoaded: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 3.4, 1.4], fov: 32, near: 0.1, far: 50 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 5, 3]} intensity={1.6} />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} />
      <StudioEnvironment />
      <Suspense fallback={null}>
        <Model url={url} yaw={yaw} onLoaded={onLoaded} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        autoRotate={autoRotate}
        autoRotateSpeed={1.1}
        rotateSpeed={0.8}
        minPolarAngle={0.05}
        maxPolarAngle={Math.PI - 0.05}
      />
    </Canvas>
  );
}
