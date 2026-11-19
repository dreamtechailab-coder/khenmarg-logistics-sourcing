import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eye, Target, Gem } from "lucide-react";
import Reveal from "@/components/Reveal";
import KhenmargLogo from "@/components/KhenmargLogo";
import Icon from "@/components/Icon";
import { PageHero, SectionTitle } from "@/components/ui";
import { values } from "@/content/services";

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
        overlayGradient="linear-gradient(90deg, rgba(15, 20, 28, 0.86) 0%, rgba(24, 19, 17, 0.65) 52%, rgba(232, 84, 26, 0.18) 100%)"
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
              We provide a comprehensive range of 4PL services to support and streamline all supply chain processes
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
        <div className="container-x grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <Reveal className="h-full">
            <div className="group relative h-full overflow-hidden rounded-2xl text-white">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(38, 14, 4, 0.86) 0%, rgba(28, 10, 3, 0.72) 100%), url('/images/vision-bg.jpg')",
                }}
              />
              <div className="relative p-5 lg:p-6">
                <Eye className="mb-4 text-km-500" size={32} />
                <h2 className="text-2xl font-bold">Our Vision</h2>
                <p className="mt-3 text-lg leading-relaxed text-white/90">
                  To be the leading international freight forwarding company, renowned for exceptional service,
                  quality, reliability, and innovation.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-2xl text-white">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(200, 40, 30, 0.85) 0%, rgba(232, 84, 26, 0.76) 60%, rgba(245, 140, 34, 0.72) 100%), url('/images/mission-bg-new.jpg')",
                }}
              />
              <div className="relative p-5 lg:p-6">
                <Target className="mb-4 text-white" size={32} />
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="mt-3 text-lg leading-relaxed text-white">
                  To simplify and streamline the complexities of international shipping. We leverage a deep
                  understanding of global trade to offer tailored logistics solutions that ensure timely and
                  cost-effective delivery of goods across the globe.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={240} className="h-full md:col-span-2 lg:col-span-1">
            <div className="group relative h-full overflow-hidden rounded-2xl text-white">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 41, 59, 0.78) 100%), url('/images/values-bg.jpg')",
                }}
              />
              <div className="relative p-5 lg:p-6">
                <Gem className="mb-4 text-km-500" size={32} />
                <h2 className="text-2xl font-bold">Our Values</h2>
                <ul className="mt-3 space-y-2 text-lg text-white/90">
                  {["Customer-Centricity", "Operational Excellence", "Innovation", "Integrity", "Collaboration"].map(
                    (v) => (
                      <li key={v} className="flex items-center gap-3">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400" aria-hidden />
                        {v}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
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
            <Reveal className="h-full">
              <div
                className="relative flex h-full flex-col items-start gap-4 overflow-hidden rounded-2xl border border-[#F3D2C1] p-5 shadow-md lg:p-6"
                style={{ background: "linear-gradient(135deg, #FFFDFB 0%, #FFF5F0 65%, #FDECE3 100%)" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: "linear-gradient(90deg, #C8281E 0%, #E8541A 50%, #F58C22 100%)" }}
                />
                <div className="flex items-center justify-start gap-2.5">
                  <KhenmargLogo />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold">Khenmarg Logistics Sourcing Pvt. Ltd.</div>
                  <p className="mt-1 text-sm text-gray-600">Parent company — Logistics, Freight Forwarding & Global Supply Chain</p>
                </div>
                <Link href="/services/" className="mt-auto text-sm font-semibold text-km-600 hover:underline">Our services →</Link>
              </div>
            </Reveal>
            <Reveal delay={120} className="h-full">
              <div
                className="relative flex h-full flex-col items-start gap-4 overflow-hidden rounded-2xl border border-[#D5E5CE] p-5 shadow-md lg:p-6"
                style={{ background: "linear-gradient(135deg, #FCFDFB 0%, #F3F8F1 65%, #E7F1E3 100%)" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: "linear-gradient(90deg, #344C21 0%, #6B8E38 100%)" }}
                />
                <div className="flex items-center justify-start">
                  <Image
                    src="/images/shashva-logo-horizontal.png"
                    alt="Shashva – Step to Healthy Lives"
                    width={360}
                    height={120}
                    quality={100}
                    className="h-11 w-auto object-contain mix-blend-multiply md:h-12"
                  />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold text-sh-700">Shashva — A Food Export Brand by Khenmarg</div>
                  <p className="mt-1 text-sm text-gray-600">Sub-brand — Premium Indian Food Products & International Exports</p>
                </div>
                <Link href="/shashva/" className="mt-auto text-sm font-semibold text-sh-600 hover:underline">Discover Shashva →</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
