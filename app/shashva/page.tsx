import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, IndianRupee, Clock, Ship } from "lucide-react";
import Reveal from "@/components/Reveal";
import ProductArt from "@/components/ProductArt";
import WorldMap from "@/components/WorldMap";
import { SectionTitle, CtaBand } from "@/components/ui";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Shashva – Food Exports",
  description:
    "Shashva, a food export brand by Khenmarg, sources premium Indian food products — coconut products, pickles, papads, vegetables and herbal powders — for markets worldwide, with a focus on the Gulf.",
};

const gulf = ["UAE", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Bahrain"];

export default function Shashva() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sh-50">
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-sh-100" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-white/60" />
        <div className="container-x relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-5 text-xs text-gray-500">
              <Link href="/" className="hover:text-sh-700">Home</Link> / <span className="text-sh-700">Shashva</span>
            </nav>
            <div className="eyebrow mb-4 text-sh-600">A Food Export Brand by Khenmarg</div>
            <h1 className="text-4xl font-bold leading-[1.1] text-sh-900 md:text-6xl">
              Premium Indian food, <span className="text-sh-600">delivered worldwide</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gray-700">
              Shashva was created to source premium quality food products from India and supply them to markets
              worldwide, with a special focus on the Gulf region.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/shashva/products/" className="btn-sh">
                Explore Products <ArrowRight size={16} />
              </Link>
              <Link href="/contact/?type=shashva#enquiry" className="btn-outline-sh">
                Request a Product Quote
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-square rounded-full bg-white p-10 shadow-2xl shadow-sh-900/10">
              <Image src="/logos/shashva-logo.png" alt="Shashva — Step to Healthy Lives" fill className="object-contain p-6" priority />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-sh-600 px-5 py-4 text-white shadow-xl">
              <div className="font-display text-lg font-semibold">Step to Healthy Lives</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section className="container-x grid gap-12 py-24 lg:grid-cols-2">
        <Reveal>
          <div className="eyebrow mb-3 text-sh-600">What we do</div>
          <h2 className="text-3xl font-bold leading-tight text-sh-900 md:text-4xl">
            Regular bulk exports, done properly
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            We specialise in regular bulk exports with complete documentation, government certifications, and on-time
            shipment. Backed by Khenmarg&apos;s own logistics arm, every Shashva shipment benefits from in-house freight
            forwarding, customs and documentation expertise.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: <Ship />, t: "Bulk exports", d: "Regular, scheduled container shipments" },
            { icon: <BadgeCheck />, t: "Complete documentation", d: "Government certifications included" },
            { icon: <Clock />, t: "On-time shipment", d: "Logistics handled in-house by Khenmarg" },
            { icon: <IndianRupee />, t: "Competitive pricing", d: "Sourced directly from India" },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 80} className="rounded-2xl bg-sh-50 p-6">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sh-600 text-white">{f.icon}</div>
              <div className="font-semibold text-sh-900">{f.t}</div>
              <div className="mt-1 text-sm text-gray-600">{f.d}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Promise */}
      <section className="bg-sh-900 py-20 text-white">
        <div className="container-x">
          <SectionTitle light center eyebrow="Our promise" title="We assure you of…" />
          <div className="grid gap-6 md:grid-cols-3">
            {["Consistent Quality", "Competitive Pricing", "Reliable Delivery"].map((p, i) => (
              <Reveal key={p} delay={i * 100} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
                <div className="font-display text-5xl font-bold text-sh-500">0{i + 1}</div>
                <div className="mt-3 text-xl font-semibold">{p}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products teaser */}
      <section className="container-x py-24">
        <SectionTitle theme="sh" eyebrow="Our product range" title="Nine product lines, sourced from India" />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}>
              <Link href={`/shashva/products/${p.slug}/`} className="group block overflow-hidden rounded-2xl border border-sh-100 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <ProductArt kind={p.art} className="aspect-[5/4] w-full" />
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold text-sh-900 group-hover:text-sh-600">{p.name}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Markets */}
      <section className="bg-gradient-to-br from-sh-900 to-sh-700 py-24 text-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="eyebrow mb-3 text-sh-100">Markets</div>
            <h2 className="text-3xl font-bold md:text-4xl">Focused on the Gulf, shipping worldwide</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {gulf.map((c) => (
                <span key={c} className="rounded-full bg-white/10 px-4 py-1.5 text-sm">{c}</span>
              ))}
              <span className="rounded-full border border-white/30 px-4 py-1.5 text-sm">+ worldwide</span>
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-3">
            <WorldMap theme="sh" />
          </Reveal>
        </div>
      </section>

      <CtaBand theme="sh" title="Looking for a reliable Indian food supplier?" text="Tell us the products and quantities you need — we'll send a quote." href="/contact/?type=shashva#enquiry" />
    </>
  );
}
