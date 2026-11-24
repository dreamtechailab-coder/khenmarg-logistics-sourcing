import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import RibbonHero from "@/components/RibbonHero";
import { SectionTitle, CtaBand, Check } from "@/components/ui";

export const metadata: Metadata = {
  title: "Quality & Export Process — Shashva",
  description:
    "How Shashva sources, inspects, packs, documents and ships Indian food products for export — with complete documentation and government certifications.",
};

const steps = [
  { t: "Enquiry & Requirement", d: "We understand your products, specifications, quantities and destination market.", icon: "MessageSquareText" },
  { t: "Sourcing", d: "Products are sourced from trusted farms and processors across India.", icon: "Sprout" },
  { t: "Quality Inspection", d: "Each lot is checked against the agreed specifications before packing.", icon: "SearchCheck" },
  { t: "Processing & Export Packing", d: "Packed to export standards to protect quality in transit.", icon: "PackageCheck" },
  { t: "Documentation & Certification", d: "All export documents and government certifications are prepared.", icon: "FileCheck2" },
  { t: "Customs Clearance", d: "Handled in-house by Khenmarg's customs team.", icon: "Stamp" },
  { t: "Shipment", d: "Sea or air freight, booked and tracked by our logistics arm.", icon: "Ship" },
  { t: "Delivery & Support", d: "On-time arrival at destination and after-sales support.", icon: "Handshake" },
];

const docs = [
  "Commercial Invoice",
  "Packing List",
  "Certificate of Origin",
  "Phytosanitary / Health Certificates (as applicable)",
  "Bill of Lading / Air Waybill",
  "Other buyer-country requirements",
];

// Add the client's actual certificates here once confirmed (e.g. IEC, APEDA, FSSAI). Leave empty to hide the grid.
const certifications: { name: string; note?: string }[] = [];

export default function Quality() {
  return (
    <>
      <RibbonHero
        theme="sh"
        fullWidth
        fade="linear-gradient(90deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.74) 34%, rgba(255,255,255,0.32) 52%, rgba(255,255,255,0) 66%)"
        eyebrow="Shashva · Quality & export process"
        title="Quality you can trust, from source to shipment"
        intro="Complete documentation, government certifications and on-time shipment — every order."
        slices={[
          { src: "/images/shashva-farm/palms.jpg", alt: "Sunlit coconut palms in a South Indian village", pos: "50% 45%" },
          { src: "/images/shashva-farm/paddy.jpg", alt: "Green paddy fields with a thatched hut and palms", pos: "50% 60%" },
          { src: "/images/shashva-farm/planting.jpg", alt: "Farmers planting rice in a flooded paddy field", pos: "40% 40%" },
          { src: "/images/shashva-farm-grove.jpg", alt: "Sunlit Indian coconut grove", pos: "50% 55%" },
          { src: "/images/products/semi-husked-coconuts.jpg", alt: "Fresh semi-husked coconuts" },
          { src: "/images/products/millets.jpg", alt: "Organic unpolished millets" },
          { src: "/images/products/gooseberry.jpg", alt: "Fresh gooseberries (amla)" },
          { src: "/images/products/pickles-jar.jpg", alt: "Traditional South Indian pickle" },
        ]}
      />
      <section className="container-x py-14 sm:py-20 lg:py-24">
        <SectionTitle theme="sh" center eyebrow="Our export process" title="Eight steps from farm to your port" />
        <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.t} delay={(i % 4) * 90} className="relative rounded-2xl border border-sh-100 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sh-600 text-white">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="font-display text-3xl font-bold text-sh-100">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-semibold text-sh-900">{s.t}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-sh-50 py-14 sm:py-20 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="eyebrow mb-3 text-sh-600">Documentation</div>
            <h2 className="text-3xl font-bold text-sh-900">Paperwork handled end to end</h2>
            <p className="mt-4 text-lg text-gray-600">
              With Khenmarg&apos;s logistics and customs expertise behind every Shashva order, documentation is complete
              and correct — so your shipment clears without delays.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {docs.map((d) => (
                <li key={d} className="flex gap-3 text-gray-700"><Check theme="sh" /> {d}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-3xl bg-sh-900 p-10 text-white">
            <div className="eyebrow mb-3 text-sh-100">Quality commitment</div>
            <h2 className="text-3xl font-bold">Consistent quality. Every shipment.</h2>
            <ul className="mt-6 space-y-4 text-white/85">
              {["Products sourced from trusted suppliers", "Inspection before packing", "Hygienic, export-grade packing", "Government certifications for every consignment", "On-time shipment, every time"].map((t) => (
                <li key={t} className="flex gap-3"><Check theme="sh" /> {t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {certifications.length > 0 && (
        <section className="container-x py-14 sm:py-20 lg:py-24">
          <SectionTitle theme="sh" center eyebrow="Certifications" title="Registered and certified for export" />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {certifications.map((c) => (
              <div key={c.name} className="card text-center">
                <div className="font-display text-xl font-bold text-sh-700">{c.name}</div>
                {c.note && <div className="mt-1 text-xs text-gray-500">{c.note}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      <CtaBand theme="sh" title="Start your import order" text="Tell us what you need and where it's going." href="/contact/?type=shashva#enquiry" />
    </>
  );
}
