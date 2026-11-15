import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import ProductArt from "@/components/ProductArt";
import Reveal from "@/components/Reveal";
import { CtaBand, Check } from "@/components/ui";
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
  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category).concat(products.filter((x) => x.category !== p.category)).slice(0, 3);

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
        <div className="container-x grid items-center gap-12 pb-20 pt-6 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <ProductArt kind={p.art} className="aspect-[5/4] w-full" />
          </Reveal>
          <Reveal delay={120}>
            <div className="eyebrow text-sh-600">{p.category}</div>
            <h1 className="mt-2 text-4xl font-bold text-sh-900 md:text-5xl">{p.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-700">{p.description}</p>
            <ul className="mt-6 space-y-3">
              {["Consistent quality", "Competitive pricing", "Complete export documentation", "On-time shipment"].map((t) => (
                <li key={t} className="flex gap-3 text-gray-700"><Check theme="sh" /> {t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/contact/?product=${p.slug}#enquiry`} className="btn-sh">
                Request Quote <ArrowRight size={16} />
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hello, I'd like a quote for ${p.name} (Shashva).`)}`}
                target="_blank"
                rel="noopener"
                className="btn-outline-sh"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-20">
        <h2 className="mb-6 text-2xl font-bold text-sh-900">Product specifications</h2>
        <div className="overflow-hidden rounded-2xl border border-sh-100">
          <table className="w-full text-left text-sm">
            <tbody>
              {p.specs.map((s, i) => (
                <tr key={s.label} className={i % 2 ? "bg-white" : "bg-sh-50/60"}>
                  <th className="w-1/3 px-6 py-4 font-semibold text-sh-900">{s.label}</th>
                  <td className="px-6 py-4 text-gray-700">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-500">Specifications, packing and pricing are shared on request based on your market and quantity.</p>
      </section>

      <section className="bg-sh-50 py-20">
        <div className="container-x">
          <h2 className="mb-8 text-2xl font-bold text-sh-900">Related products</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/shashva/products/${r.slug}/`} className="group overflow-hidden rounded-2xl bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <ProductArt kind={r.art} className="aspect-[5/4] w-full" />
                <div className="p-5 font-semibold text-sh-900 group-hover:text-sh-600">{r.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand theme="sh" title={`Interested in ${p.name}?`} text="Share your quantity and destination for a quote." href={`/contact/?product=${p.slug}#enquiry`} />
    </>
  );
}
