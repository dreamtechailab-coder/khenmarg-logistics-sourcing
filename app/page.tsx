import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Truck } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import ProductMedia from "@/components/ProductMedia";
import { SectionTitle, CtaBand } from "@/components/ui";
import { services, highlights, industries } from "@/content/services";
import { products } from "@/content/products";

const serviceTags: Record<string, string> = {
  "sea-freight": "FCL & LCL • Global Ports",
  "air-freight": "Express • Time-Critical",
  "customs-clearance": "Import/Export • Compliance",
  "project-cargo": "Heavy Lift • Break-Bulk",
  "multimodal-transportation": "Sea • Air • Rail • Road",
  consolidation: "Buyer Consolidation • LCL",
  "coastal-cargo": "Coastal • Domestic Shipping",
  "warehousing-distribution": "Storage • Last-Mile",
};

export default function Home() {
  return (
    <>
      <HeroSection />

      <StatsBar />

      <section className="container-x grid items-center gap-8 py-12 md:py-16 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <div className="eyebrow mb-3 text-km-600">Who we are</div>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            An emerging international freight forwarder, built on 15+ years of experience
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            Khenmarg Group is an emerging international freight forwarding company founded by experienced
            professionals in the shipping industry. We provide a comprehensive range of 4PL services — from tendering,
            global sourcing and transport management to customs, freight cost management, warehousing and
            distribution.
          </p>
          <Link href="/about/" className="btn-outline-km mt-8">
            More about us <ArrowRight size={16} />
          </Link>
        </Reveal>
        <Reveal delay={150} className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:aspect-auto lg:h-[360px]">
              <Image src="/images/who-we-are-sea.jpg" alt="Container ship loaded with containers at a port terminal" fill sizes="(min-width: 1024px) 25vw, 45vw" className="object-cover" />
            </div>
            <div className="mt-8 grid gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/images/who-we-are-air.jpg" alt="Cargo aircraft taking off from an international airport" fill sizes="(min-width: 1024px) 25vw, 45vw" className="object-cover" />
              </div>
              <div className="rounded-2xl bg-km-600 p-5 text-white">
                <div className="font-display text-xl font-semibold">Door to door.</div>
                <div className="text-sm text-white/80">Sea · Air · Rail · Road</div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Two brands */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container-x">
          <SectionTitle compact center eyebrow="Our businesses" title="Two brands, one commitment to reliability" />
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="group relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white min-h-[280px] lg:min-h-[310px] lg:p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
              <Image
                src="/images/logistics-card.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-slate-900/15" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-km-600">
                  <Truck />
                </div>
                <div className="eyebrow text-orange-300">Parent company</div>
                <h3 className="mt-2 text-3xl font-bold">Khenmarg Logistics</h3>
                <p className="mt-3 max-w-md text-white/80">
                  Freight forwarding, transportation and customs broking — logistics and global supply chain
                  solutions for importers and exporters.
                </p>
                <Link href="/services/" className="btn-km mt-8">
                  View Services <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={120} className="group relative overflow-hidden rounded-3xl bg-sh-50 p-6 min-h-[280px] lg:min-h-[310px] lg:p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
              <Image
                src="/images/shashva-card-bg.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[50%_50%] transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, rgba(247, 244, 234, 0.96) 0%, rgba(245, 241, 228, 0.88) 52%, rgba(46, 90, 54, 0.22) 100%)",
                }}
              />
              <div className="absolute right-5 top-5 h-24 w-24 overflow-hidden rounded-full bg-white shadow-xl shadow-sh-900/25 ring-4 ring-white sm:right-8 sm:top-8">
                <Image
                  src="/images/shashva-logo-badge-hd.png"
                  alt="Shashva — Step to Healthy Lives"
                  fill
                  sizes="96px"
                  quality={95}
                  className="object-cover"
                />
              </div>
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sh-600 text-white">
                  <Leaf />
                </div>
                <div className="eyebrow text-sh-600">Food export brand</div>
                <h3 className="mt-2 text-3xl font-bold text-sh-900">Shashva Food Exports</h3>
                <p className="mt-3 max-w-md text-gray-700">
                  Premium quality food products sourced from India and supplied to markets worldwide, with a special
                  focus on the Gulf region.
                </p>
                <Link href="/shashva/products/" className="btn-sh mt-8 !bg-[#2E6B34] hover:!bg-[#1E4620]">
                  View Products <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gradient-to-b from-[#FAFBFD] to-[#F3F5F8]">
      <div className="container-x py-12 md:py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionTitle compact eyebrow="What we do" title="Logistics services" text="Complete freight and supply chain solutions under one roof." />
          <Link
            href="/services/"
            className="group mb-6 inline-flex items-center gap-2 self-start rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/20 md:mb-8 md:self-auto"
            style={{ background: "linear-gradient(135deg, #C8281E 0%, #E8541A 55%, #F58C22 100%)" }}
          >
            All services <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60} className="h-full">
              <Link
                href={`/services/#${s.slug}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/75 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-300/80 hover:shadow-xl hover:shadow-orange-950/10"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "linear-gradient(90deg, #C8281E 0%, #E8541A 50%, #F58C22 100%)" }}
                />
                <span aria-hidden className="absolute right-5 top-4 text-2xl font-bold text-slate-200/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md shadow-orange-500/20"
                    style={{ background: "linear-gradient(135deg, #C8281E 0%, #E8541A 60%, #F58C22 100%)" }}
                  >
                    <Icon name={s.icon} size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.short}</p>
                  {serviceTags[s.slug] && (
                    <span className="mt-4 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-km-600">
                      {serviceTags[s.slug]}
                    </span>
                  )}
                </div>
                <div className="mt-6 border-t border-slate-100 pt-4 text-sm font-semibold text-km-600">Learn more →</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
      </section>

      {/* Why Khenmarg */}
      <section className="relative overflow-hidden bg-slate-950 py-12 text-white lg:py-16">
        <Image
          src="/images/why-khenmarg-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/70 to-slate-950/60" />
        <div className="container-x relative">
          <SectionTitle compact light eyebrow="Why Khenmarg" title="Capabilities that keep your cargo moving" />
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.slice(0, 8).map((h, i) => (
              <Reveal key={h.label} delay={i * 50} className="flex items-center gap-3.5 rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/60 hover:bg-white/15">
                <Icon name={h.icon} className="shrink-0 text-orange-500" size={24} />
                <span className="text-sm font-semibold">{h.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Shashva products teaser */}
      <section className="bg-sh-50 py-12 md:py-16">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionTitle compact theme="sh" eyebrow="Shashva · Step to Healthy Lives" title="Premium Indian food products for the world" text="Regular bulk exports with complete documentation, government certifications and on-time shipment." />
            <Link href="/shashva/products/" className="btn-outline-sh mb-6 self-start md:mb-8 md:self-auto">
              All products <ArrowRight size={16} />
            </Link>
          </div>
          <div className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/shashva/products/${p.slug}/`}
                className="group w-60 shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <ProductMedia product={p} sizes="240px" frame="h-40" />
                <div className="p-4">
                  <div className="text-xs font-medium text-sh-600">{p.category}</div>
                  <h3 className="mt-1 font-semibold text-sh-900">{p.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="container-x py-12 md:py-16">
        <SectionTitle compact center eyebrow="Industries we serve" title="Trusted across sectors" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((ind, i) => (
            <Reveal key={ind.label} delay={i * 40} className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 p-6 text-center transition hover:border-km-100 hover:bg-km-50">
              <Icon name={ind.icon} className="text-km-600" size={30} />
              <span className="text-sm font-medium">{ind.label}</span>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/industries-network/" className="text-sm font-semibold text-km-600 hover:underline">
            See our global network →
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
