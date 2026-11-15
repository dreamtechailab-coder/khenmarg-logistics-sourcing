import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Truck } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import ProductArt from "@/components/ProductArt";
import { SectionTitle, CtaBand } from "@/components/ui";
import { services, highlights, industries } from "@/content/services";
import { products } from "@/content/products";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Intro + stats */}
      <section className="relative z-10 -mt-14">
        <div className="container-x">
          <Reveal className="grid overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/10 grid-cols-2 md:grid-cols-4">
            {[
              ["15+", "Years of industry experience"],
              ["8", "Logistics services"],
              ["Global", "Network of overseas partners"],
              ["9", "Shashva food product lines"],
            ].map(([n, l], i) => (
              <div key={l} className={`p-5 sm:p-7 border-gray-100 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}>
                <div className="font-display text-2xl sm:text-3xl font-bold text-km-600">{n}</div>
                <div className="mt-1 text-sm text-gray-600">{l}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
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
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src="/images/sea2.jpg" alt="Container ship at port" fill className="object-cover" />
            </div>
            <div className="mt-10 grid gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src="/images/air2.jpg" alt="Cargo aircraft on runway" fill className="object-cover" />
              </div>
              <div className="rounded-2xl bg-km-600 p-6 text-white">
                <div className="font-display text-xl font-semibold">Door to door.</div>
                <div className="text-sm text-white/80">Sea · Air · Rail · Road</div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Two brands */}
      <section className="bg-gray-50 py-24">
        <div className="container-x">
          <SectionTitle center eyebrow="Our businesses" title="Two brands, one commitment to reliability" />
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="group relative overflow-hidden rounded-3xl bg-km-900 p-10 text-white">
              <Image src="/images/truck.jpg" alt="" fill className="object-cover opacity-30 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-km-900 via-km-900/80 to-transparent" />
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-km-600">
                  <Truck />
                </div>
                <div className="eyebrow text-km-500">Parent company</div>
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
            <Reveal delay={120} className="group relative overflow-hidden rounded-3xl bg-sh-50 p-10">
              <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-sh-100" />
              <Image src="/logos/shashva-logo.png" alt="Shashva — Step to Healthy Lives" width={110} height={110} className="absolute right-8 top-8 h-24 w-24 drop-shadow-md" />
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sh-600 text-white">
                  <Leaf />
                </div>
                <div className="eyebrow text-sh-600">Food export brand</div>
                <h3 className="mt-2 text-3xl font-bold text-sh-900">Shashva Food Exports</h3>
                <p className="mt-3 max-w-md text-gray-700">
                  Premium quality food products sourced from India and supplied to markets worldwide, with a special
                  focus on the Gulf region.
                </p>
                <Link href="/shashva/products/" className="btn-sh mt-8">
                  View Products <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-x py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow="What we do" title="Logistics services" text="Complete freight and supply chain solutions under one roof." />
          <Link href="/services/" className="btn-outline-km mb-12 self-start md:self-auto">
            All services <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link href={`/services/#${s.slug}`} className="card group block h-full">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-km-50 text-km-600 transition group-hover:bg-km-600 group-hover:text-white">
                  <Icon name={s.icon} size={22} />
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.short}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Khenmarg */}
      <section className="relative overflow-hidden bg-km-900 py-24 text-white">
        <Image src="/images/sea.jpg" alt="" fill className="object-cover opacity-15" />
        <div className="container-x relative">
          <SectionTitle light eyebrow="Why Khenmarg" title="Capabilities that keep your cargo moving" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {highlights.slice(0, 8).map((h, i) => (
              <Reveal key={h.label} delay={i * 50} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <Icon name={h.icon} className="shrink-0 text-km-500" size={24} />
                <span className="text-sm font-medium">{h.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Shashva products teaser */}
      <section className="bg-sh-50 py-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle theme="sh" eyebrow="Shashva · Step to Healthy Lives" title="Premium Indian food products for the world" text="Regular bulk exports with complete documentation, government certifications and on-time shipment." />
            <Link href="/shashva/products/" className="btn-outline-sh mb-12 self-start md:self-auto">
              All products <ArrowRight size={16} />
            </Link>
          </div>
          <div className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/shashva/products/${p.slug}/`}
                className="group w-60 shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <ProductArt kind={p.art} className="aspect-[5/4] w-full transition duration-500 group-hover:scale-105" />
                <div className="p-5">
                  <div className="text-xs font-medium text-sh-600">{p.category}</div>
                  <h3 className="mt-1 font-semibold text-sh-900">{p.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="container-x py-24">
        <SectionTitle center eyebrow="Industries we serve" title="Trusted across sectors" />
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
