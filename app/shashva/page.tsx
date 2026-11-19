import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, IndianRupee, Clock, Ship } from "lucide-react";
import Reveal from "@/components/Reveal";
import ProductMedia from "@/components/ProductMedia";
import WorldMap from "@/components/WorldMap";
import { SectionTitle, CtaBand } from "@/components/ui";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Shashva – Food Exports",
  description:
    "Shashva, a food export brand by Khenmarg, sources premium Indian food products — coconut products, pickles, papads, vegetables and herbal powders — for markets worldwide, with a focus on the Gulf.",
};

const gulf = ["UAE", "Saudi Arabia", "Qatar", "Oman", "Kuwait", "Bahrain"];

// Real leaves cut out of the HD logo (positions are % of the logo square) — animated on top of the static base.
const LOGO_LEAVES = [
  { src: "/images/shashva-leaf-stem.png", l: 56.665, t: 16.968, w: 13.818, h: 14.697, o: "4% 98%", sway: "5deg", d: 0 },
  { src: "/images/shashva-leaf-aleaf.png", l: 85.669, t: 58.911, w: 6.201, h: 10.449, o: "30% 95%", sway: "-7deg", d: 0.15 },
  { src: "/images/shashva-leaf-base.png", l: 55.908, t: 43.994, w: 16.553, h: 13.965, o: "8% 92%", sway: "2deg", d: 0.3 },
];

function Leaf({ color, size, flip = false }: { color: string; size: number; flip?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      className="drop-shadow-md"
    >
      <path d="M4 20C4 10 10 3 21 3c0 11-6 17-17 17z" fill={color} />
      <path d="M4 20L15 9" stroke="#F8F6EE" strokeOpacity="0.55" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function Shashva() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-sh-50">
        <Image src="/images/shashva-hero-bg.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-[50%_70%]" priority />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(249, 247, 240, 0.96) 0%, rgba(249, 247, 240, 0.86) 46%, rgba(249, 247, 240, 0.28) 100%)",
          }}
        />
        <div className="container-x relative grid items-center gap-8 py-10 md:py-14 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <div className="eyebrow mb-4 text-sh-600">A Food Export Brand by Khenmarg</div>
            <h1 className="text-4xl font-bold leading-[1.1] text-sh-900 md:text-6xl">
              Premium Indian food, <span className="text-sh-600">delivered worldwide</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-gray-700">
              Shashva was created to source premium quality food products from India and supply them to markets
              worldwide, with a special focus on the Gulf region.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/shashva/products/"
                className="btn-sh group !bg-[#2E5A36] transition duration-300 hover:-translate-y-0.5 hover:!bg-[#244a2c]"
              >
                Explore Products <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact/"
                className="btn group relative overflow-hidden border-2 border-[#2E5A36] bg-[#2E5A36]/5 text-[#2E5A36] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-lg hover:shadow-sh-900/25"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"
                  style={{ background: "linear-gradient(135deg, #1E4620, #2E6B34, #4A8F3C)" }}
                />
                <span className="relative flex items-center gap-2">
                  Contact Us <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm">
            <div className="sh-float relative aspect-square">
              {/* breathing glow */}
              <div aria-hidden className="sh-glow absolute -inset-4 rounded-full bg-[#7BA043]/40 blur-2xl" />
              {/* orbiting ambient leaf particles */}
              <div aria-hidden className="sh-orbit pointer-events-none absolute -inset-5">
                {[
                  { a: 0, c: "#2E5A36", s: 34 },
                  { a: 120, c: "#4A7C3A", s: 28 },
                  { a: 240, c: "#7BA043", s: 32 },
                ].map((l) => (
                  <div key={l.a} className="absolute inset-0" style={{ transform: `rotate(${l.a}deg)` }}>
                    <div className="sh-sway absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: `${l.a / 60}s` }}>
                      <Leaf color={l.c} size={l.s} />
                    </div>
                  </div>
                ))}
              </div>
              {/* HD badge in cream ring */}
              <div className="relative h-full w-full rounded-full bg-[#FBF8EF] p-2.5 shadow-2xl shadow-sh-900/25 ring-1 ring-[#2E5A36]/10">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
                  {/* static logo with the leaves lifted out ... */}
                  <Image
                    src="/images/shashva-logo-badge-base.png"
                    alt="Shashva — Step to Healthy Lives"
                    fill
                    sizes="(min-width: 640px) 384px, 304px"
                    quality={95}
                    className="object-cover"
                    priority
                  />
                  {/* ... and the real logo leaves layered back on top, animated */}
                  {LOGO_LEAVES.map((l) => (
                    <div
                      key={l.src}
                      aria-hidden
                      className="sh-leafwrap"
                      style={{
                        left: `${l.l}%`,
                        top: `${l.t}%`,
                        width: `${l.w}%`,
                        height: `${l.h}%`,
                        transformOrigin: l.o,
                        animationDelay: `${l.d}s, ${0.8 + l.d}s`,
                        ["--sway" as string]: l.sway,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={l.src} alt="" style={{ animationDelay: `${l.d}s` }} />
                    </div>
                  ))}
                </div>
              </div>
              {/* accent leaves hugging the badge */}
              <div aria-hidden className="sh-sway pointer-events-none absolute -right-3 top-6" style={{ animationDelay: "-1.5s" }}>
                <Leaf color="#4A7C3A" size={40} />
              </div>
              <div aria-hidden className="sh-sway pointer-events-none absolute -left-4 bottom-16" style={{ animationDelay: "-3s" }}>
                <Leaf color="#7BA043" size={34} flip />
              </div>
            </div>
            <div className="sh-float-slow absolute -bottom-4 -left-4 rounded-2xl bg-[#2E5A36] px-5 py-3 text-white shadow-xl shadow-sh-900/30 sm:py-4">
              <div className="font-display text-lg font-semibold">Step to Healthy Lives</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section className="container-x grid gap-12 py-12 md:py-16 lg:grid-cols-2">
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
      <section className="bg-sh-900 py-12 text-white md:py-16">
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
      <section className="container-x py-12 md:py-16">
        <SectionTitle theme="sh" eyebrow="Our product range" title="Nine product lines, sourced from India" />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}>
              <Link href={`/shashva/products/${p.slug}/`} className="group block overflow-hidden rounded-2xl border border-sh-100 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <ProductMedia product={p} />
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold text-sh-900 group-hover:text-sh-600">{p.name}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Markets */}
      <section className="bg-gradient-to-br from-sh-900 to-sh-700 py-12 md:py-16 text-white">
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

      <CtaBand compact theme="sh" title="Looking for a reliable Indian food supplier?" text="Tell us the products and quantities you need — we'll send a quote." href="/contact/?type=shashva#enquiry" />
    </>
  );
}
