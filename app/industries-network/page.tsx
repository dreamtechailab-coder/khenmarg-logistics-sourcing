import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import WorldMap from "@/components/WorldMap";
import { PageHero, SectionTitle, CtaBand } from "@/components/ui";
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
      <PageHero
        eyebrow="Industries & global network"
        title="Connected globally, trusted across industries"
        intro="A proactive network of overseas partners — leading names in their own countries — gives our customers a truly integrated global supply chain."
        image="/images/air.jpg"
        crumbs={[{ label: "Industries & Global Network" }]}
      />

      <section className="container-x py-24">
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

      <section className="overflow-hidden bg-gradient-to-br from-[#1a0c07] via-km-900 to-[#2a120a] py-24 text-white">
        <div className="container-x">
          <SectionTitle
            light
            eyebrow="Global network"
            title="From Chennai to the world"
            text="Through worldwide agents and overseas partners, we move cargo across continents — with a strong focus on the Gulf region."
          />
          <Reveal>
            <WorldMap />
          </Reveal>
        </div>
      </section>

      <section className="container-x py-24">
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

      <section className="bg-gray-50 py-24">
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
