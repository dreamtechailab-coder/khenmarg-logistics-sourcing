import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { PageHero, SectionTitle, CtaBand, Check } from "@/components/ui";
import { services, valueAdded } from "@/content/services";

export const metadata: Metadata = {
  title: "Logistics Services — Sea Freight, Air Freight, Customs Clearance",
  description:
    "Sea freight (FCL/LCL), air freight, customs clearance, project cargo, multimodal transport, consolidation, coastal cargo and warehousing from Chennai, India.",
};

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our logistics services"
        title="End-to-end freight and supply chain solutions"
        intro="Sea, air, rail and road — with customs, warehousing and distribution handled by one team."
        image="/images/sea.jpg"
        crumbs={[{ label: "Logistics Services" }]}
      />

      {/* Quick nav */}
      <section className="sticky top-16 z-30 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="container-x flex gap-2 overflow-x-auto py-3">
          {services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="shrink-0 rounded-full border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-700 hover:border-km-500 hover:text-km-600">
              {s.title}
            </a>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <div className="space-y-24">
          {services.map((s, i) => (
            <article key={s.slug} id={s.slug} className="scroll-mt-36 grid items-center gap-10 lg:grid-cols-2">
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                {s.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                    <Image src={s.image} alt={s.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-km-50 to-km-100">
                    <div className="absolute -right-10 -bottom-10 h-60 w-60 rounded-full bg-white/50" />
                    <Icon name={s.icon} size={120} strokeWidth={1.2} className="relative text-km-600" />
                  </div>
                )}
              </Reveal>
              <Reveal delay={120}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-km-600 text-white">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <span className="font-display text-sm font-semibold text-km-600">0{i + 1}</span>
                </div>
                <h2 className="text-3xl font-bold">{s.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">{s.body}</p>
                {s.points && (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-gray-700">
                        <Check /> {p}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href={`/contact/?service=${s.slug}#enquiry`} className="btn-outline-km mt-8">
                  Request a quote <ArrowRight size={16} />
                </Link>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-km-900 py-24 text-white">
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
