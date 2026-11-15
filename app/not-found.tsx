import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="font-display text-8xl font-bold text-km-600">404</div>
      <h1 className="mt-4 text-3xl font-bold">This shipment went off route</h1>
      <p className="mt-3 text-gray-600">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-km">Back to Home</Link>
        <Link href="/contact/" className="btn-outline-km">Contact Us</Link>
      </div>
    </section>
  );
}
