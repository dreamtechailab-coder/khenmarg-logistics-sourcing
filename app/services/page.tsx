import type { Metadata } from "next";
import Image from "next/image";

import ServicesTabs from "@/components/ServicesTabs";
import BrightHero from "@/components/BrightHero";
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
      <BrightHero
        eyebrow="Our logistics services"
        title="End-to-end freight and supply chain solutions"
        intro="Sea, air, rail and road — with customs, warehousing and distribution handled by one team."
        image="/images/logistics-card.jpg"
        position="50% 60%"
        mirror
        className="py-10 sm:py-14 lg:py-16"
      />

      <ServicesTabs items={services.map(({ slug, title, icon, image, imagePosition, gallery, body, points }) => ({ slug, title, icon, image, imagePosition, gallery, body, points }))} />

      <section className="relative isolate overflow-hidden bg-[#FFF6EE] py-10 md:py-12">
        {/* golden-hour port photo backdrop */}
        <Image
          src="/images/customs3.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover object-[50%_60%]"
          aria-hidden
        />
        {/* warm ivory wash: strong on the left for text, lets the sunset glow through on the right */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(100deg, rgba(255,251,247,0.96) 0%, rgba(255,246,238,0.90) 40%, rgba(255,226,196,0.62) 75%, rgba(245,140,34,0.40) 100%)",
          }}
        />
        {/* soft amber glow + bottom accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 -z-10 h-80 w-80 rounded-full bg-[#F58C22]/30 blur-3xl"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F58C22]/60 to-transparent" />

        <div className="container-x relative">
          <SectionTitle compact eyebrow="Value added services" title="More than moving boxes" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {valueAdded.map((v, i) => (
              <Reveal
                key={v}
                delay={i * 50}
                className="flex items-start gap-3 rounded-xl border border-orange-100 bg-white/90 p-5 text-slate-800 shadow-md shadow-orange-900/10 backdrop-blur-sm"
              >
                <Check />
                <span>{v}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a shipment in mind?"
        text="Connect with our team to discuss your cargo requirements and end-to-end shipping solutions."
        href="/contact/"
        ctaLabel="Contact Us"
        ctaGhost
      />
    </>
  );
}
