import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import BrightHero from "@/components/BrightHero";
import NetworkMap from "@/components/NetworkMap";
import { SectionTitle, CtaBand } from "@/components/ui";
import { industries, highlights } from "@/content/services";

export const metadata: Metadata = {
  title: "Industries & Global Network",
  description:
    "Khenmarg serves renewable, automotive, space, steel, construction, mining, oil & gas, textile, healthcare and FMCG industries through a global network of overseas partners.",
};

// Fill these in once the client confirms their partner carriers and airlines.
const carriers: string[] = [];
const airlines: string[] = [];

export default function Industries() {
  return (
    <>
      <BrightHero
        eyebrow="Industries & global network"
        title="Global Reach. Industry-Focused Precision."
        intro="Backed by an agile network of leading international partners across key trade lanes, Khenmarg delivers tailored, end-to-end supply chain solutions built around the unique demands of every industry we serve."
        image="/images/services-hero-bg.jpg"
        position="right"
        className="py-10 sm:py-14 lg:py-20"
      />

      <section className="container-x py-12 md:py-16">
        <SectionTitle eyebrow="Industries served" title="Sector experience you can rely on" />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((ind, i) => (
            <Reveal key={ind.label} delay={i * 40} className="card flex flex-col items-start gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-km-50 text-km-600">
                <Icon name={ind.icon} size={24} />
              </span>
              <span className="font-semibold leading-snug">{ind.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="relative isolate overflow-hidden py-10 text-white md:py-12"
        style={{ background: "linear-gradient(135deg, #120a07 0%, #2a120a 50%, #3a1810 100%)" }}
      >
        {/* aurora glows */}
        <div aria-hidden className="pointer-events-none absolute -left-40 top-1/2 -z-10 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-[#C8281E]/25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#F58C22]/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-[-10rem] left-1/3 -z-10 h-80 w-80 rounded-full bg-[#E8541A]/15 blur-3xl" />
        {/* fine architectural grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            opacity: 0.07,
            backgroundImage:
              "linear-gradient(#F58C22 1px, transparent 1px), linear-gradient(90deg, #F58C22 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at 60% 50%, #000 15%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 60% 50%, #000 15%, transparent 75%)",
          }}
        />
        {/* glowing edge accents */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F58C22]/60 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E8541A]/50 to-transparent" />
        <div className="container-x relative">
          <Reveal>
            <NetworkMap />
          </Reveal>
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <SectionTitle eyebrow="Capabilities" title="What our network makes possible" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 40} className="flex items-center gap-4 rounded-xl border border-gray-100 p-5 transition hover:border-km-100 hover:bg-km-50">
              <Icon name={h.icon} className="shrink-0 text-km-600" size={24} />
              <span className="font-medium">{h.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container-x grid gap-10 md:grid-cols-2">
          {[
            { title: "Our Preferred Carriers", list: carriers, icon: "Ship" },
            { title: "Our Preferred Airlines", list: airlines, icon: "Plane" },
          ].map((g) => (
            <Reveal key={g.title}>
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <Icon name={g.icon} className="text-km-600" /> {g.title}
              </h2>
              {g.list.length ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {g.list.map((n) => (
                    <div key={n} className="flex h-20 items-center justify-center rounded-xl bg-white p-4 text-sm font-semibold shadow-sm">
                      {n}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
                  We work with contracted major shipping lines and airlines worldwide. Contact us for routing options on
                  your trade lane.
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
