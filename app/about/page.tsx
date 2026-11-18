import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eye, Target, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { PageHero, SectionTitle, CtaBand } from "@/components/ui";
import { values } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Khenmarg Logistics Sourcing Pvt. Ltd., incorporated November 2024, is a Chennai-based international freight forwarder founded by professionals with 15+ years in shipping and export.",
};

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Khenmarg"
        title="Empowering global trade with precision and reliability"
        intro="Founded by professionals with 15+ years in shipping and export, Khenmarg delivers end-to-end freight forwarding by sea, air, rail and road, backed by customs expertise and a partner network built to move your cargo on time."
        image="/images/about-hero.jpg"
        tone="navy"
        compact
        showCrumbs={false}
      />

      <section className="container-x grid gap-8 py-12 md:py-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <div className="eyebrow mb-3 text-km-600">Our story</div>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">Built on experience, focused on the customer</h2>
          <div className="mt-4 space-y-3 text-lg leading-relaxed text-gray-600">
            <p>
              Khenmarg Logistics Sourcing Pvt. Ltd. was incorporated in November 2024, built by a team with over 15
              years of experience in the logistics and export industry.
            </p>
            <p>
              Khenmarg Group is an emerging international freight forwarding company founded by experienced
              professionals in the shipping industry. We focus on providing solutions that are innovative,
              sustainable, and fulfil our customers&apos; needs.
            </p>
            <p>
              We provide a comprehensive range of 4PL services to support and streamline all supply chain processes —
              from tendering, global sourcing and transport management to customs, freight cost management,
              warehousing and distribution. We focus on enhancing customer service through efficient supply chain
              management, by optimising and standardising logistics and reducing procurement lead time.
            </p>
          </div>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-5">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border lg:aspect-auto lg:h-[400px] border-slate-200/20 shadow-xl">
            <Image
              src="/images/about-story.jpg"
              alt="Container ship carrying international cargo"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="relative -mt-12 ml-6 mr-6 rounded-2xl bg-white p-5 shadow-xl">
            <div className="font-display text-4xl font-bold text-km-600">15+</div>
            <div className="text-sm text-gray-600">years of experience in logistics and export</div>
          </div>
        </Reveal>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container-x grid gap-5 md:grid-cols-2 lg:gap-6">
          <Reveal className="rounded-3xl bg-km-900 p-5 text-white lg:p-6">
            <Eye className="mb-4 text-km-500" size={32} />
            <h2 className="text-2xl font-bold">Our Vision</h2>
            <p className="mt-3 text-lg leading-relaxed text-white/85">
              To be the leading international freight forwarding company, renowned for exceptional service, quality,
              reliability, and innovation.
            </p>
          </Reveal>
          <Reveal delay={120} className="rounded-3xl bg-gradient-to-br from-km-600 to-km-500 p-5 text-white lg:p-6">
            <Target className="mb-4 text-white" size={32} />
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="mt-3 text-lg leading-relaxed text-white/90">
              To simplify and streamline the complexities of international shipping. We leverage a deep understanding
              of global trade to offer tailored logistics solutions that ensure timely and cost-effective delivery of
              goods across the globe.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-12 md:py-16">
        <SectionTitle compact center eyebrow="What drives us" title="Our core values" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {values.map((v, i) => (
            <Reveal key={v.label} delay={i * 70} className="card !p-5 text-center">
              <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-km-50 text-km-600">
                <Icon name={v.icon} size={26} />
              </div>
              <h3 className="font-semibold">{v.label}</h3>
              <p className="mt-2 text-sm text-gray-600">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container-x">
          <SectionTitle compact center eyebrow="Our brands" title="Khenmarg and Shashva" />
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            <Reveal className="card flex flex-col items-start gap-4 !p-5 lg:!p-6">
              <Image src="/logos/khenmarg-logo.png" alt="Khenmarg" width={200} height={73} className="h-16 w-auto" />
              <div>
                <div className="font-display text-lg font-semibold">Khenmarg Logistics Sourcing Pvt. Ltd.</div>
                <p className="mt-1 text-sm text-gray-600">Parent company — Logistics, Freight Forwarding & Global Supply Chain</p>
              </div>
              <Link href="/services/" className="mt-auto text-sm font-semibold text-km-600 hover:underline">Our services →</Link>
            </Reveal>
            <Reveal delay={120} className="card flex flex-col items-start gap-4 !p-5 lg:!p-6">
              <Image src="/logos/shashva-logo.png" alt="Shashva" width={80} height={80} className="h-16 w-16" />
              <div>
                <div className="font-display text-lg font-semibold text-sh-700">Shashva — A Food Export Brand by Khenmarg</div>
                <p className="mt-1 text-sm text-gray-600">Sub-brand — Premium Indian Food Products & International Exports</p>
              </div>
              <Link href="/shashva/" className="mt-auto text-sm font-semibold text-sh-600 hover:underline">Discover Shashva →</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="container-x py-12 md:py-16">
        <SectionTitle compact eyebrow="Our team" title="Talk to the people who move your cargo" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <Reveal className="card flex items-center gap-4 !p-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-km-600 font-display text-xl font-bold text-white">
              LN
            </div>
            <div>
              <div className="font-semibold">{site.contactPerson.name}</div>
              <div className="text-sm text-gray-600">{site.contactPerson.role}</div>
              <a href={site.phones[1].href} className="text-sm font-medium text-km-600">{site.phones[1].label}</a>
            </div>
          </Reveal>
        </div>
        <Link href="/contact/" className="btn-km mt-6">Contact our team <ArrowRight size={16} /></Link>
      </section>

      <CtaBand compact />
    </>
  );
}
