import type { Metadata } from "next";
import Image from "next/image";

import ServicesTabs from "@/components/ServicesTabs";
import Reveal from "@/components/Reveal";
import { SectionTitle, CtaBand, Check } from "@/components/ui";
import { services, valueAdded } from "@/content/services";

export const metadata: Metadata = {
  title: "Logistics Services — Sea Freight, Air Freight, Customs Clearance",
  description:
    "Sea freight (FCL/LCL), air freight, customs clearance, project cargo, multimodal transport, consolidation, coastal cargo and warehousing from Chennai, India.",
};

export default function Services() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-900">
        <Image src="/images/services-hero-bg.jpg" alt="" fill className="object-cover" priority />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.55) 55%, rgba(15, 23, 42, 0.25) 100%)",
          }}
        />
        <div className="container-x relative py-14 text-white md:py-16">
          <div className="eyebrow mb-2 font-semibold tracking-wider text-orange-500">Our logistics services</div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            End-to-end freight and supply chain solutions
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Sea, air, rail and road — with customs, warehousing and distribution handled by one team.
          </p>
        </div>
      </section>

      <ServicesTabs items={services.map(({ slug, title, icon, image, body, points }) => ({ slug, title, icon, image, body, points }))} />

      <section className="bg-km-900 py-10 text-white md:py-12">
        <div className="container-x">
          <SectionTitle light eyebrow="Value added services" title="More than moving boxes" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {valueAdded.map((v, i) => (
              <Reveal key={v} delay={i * 50} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5">
                <Check />
                <span>{v}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Need a freight quote?" text="Share your cargo details and we'll get back with the best route and rate." />
    </>
  );
}
