import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100dvh", display: "grid", placeContent: "center", gap: 16, paddingInline: "var(--gutter)", textAlign: "center" }}>
      <h1 style={{ fontSize: "var(--type-display-size)", fontWeight: 900, color: "var(--color-brand-olive)" }}>404</h1>
      <p>This street doesn&apos;t exist in the city.</p>
      <Link href="/">Back home</Link>
    </main>
  );
}
