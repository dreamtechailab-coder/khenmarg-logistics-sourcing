import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import ProductMedia from "@/components/ProductMedia";
import ProductDetailBody, { whatsappLink } from "@/components/ProductDetail";
import Reveal from "@/components/Reveal";
import { CtaBand } from "@/components/ui";
import { products } from "@/content/products";
import { site } from "@/content/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} Exporter from India — Shashva`,
    description: `${p.description} Bulk export enquiries welcome.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    category: p.category,
    brand: { "@type": "Brand", name: "Shashva" },
    countryOfOrigin: "IN",
    manufacturer: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="bg-sh-50">
        <div className="container-x py-6 text-xs text-gray-500">
          <Link href="/" className="hover:text-sh-700">Home</Link> / <Link href="/shashva/" className="hover:text-sh-700">Shashva</Link> /{" "}
          <Link href="/shashva/products/" className="hover:text-sh-700">Products</Link> / <span className="text-sh-700">{p.name}</span>
        </div>
        <div className="container-x grid items-start gap-10 pb-16 pt-2 lg:grid-cols-[5fr_6fr]">
          <Reveal className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <ProductMedia product={p} zoom={false} sizes="(min-width: 1024px) 42vw, 100vw" priority frame="aspect-[4/3]" />
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.highlights.map((h) => (
                <li key={h} className="rounded-full bg-sh-600 px-3 py-1 text-xs font-semibold text-white">{h}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="eyebrow text-sh-600">{p.category}</div>
            <h1 className="mt-2 text-3xl font-bold text-sh-900 md:text-4xl">{p.name}</h1>
            <div className="mt-8">
              <ProductDetailBody p={p} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappLink(p)} target="_blank" rel="noopener noreferrer" className="btn-sh !bg-[#1f5c3a]">
                <MessageCircle size={16} /> Inquire About {p.name} on WhatsApp
              </a>
              <Link href={`/contact/?product=${p.slug}#enquiry`} className="btn-outline-sh">
                Request Quote <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand theme="sh" title={`Interested in ${p.name}?`} text="Share your quantity and destination for a quote." href={`/contact/?product=${p.slug}#enquiry`} />
    </>
  );
}
