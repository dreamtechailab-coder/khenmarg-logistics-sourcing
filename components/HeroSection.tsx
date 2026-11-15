import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LogisticsHeroAnimation from "@/components/LogisticsHeroAnimation";

const textShadow = { textShadow: "0 2px 12px rgba(0, 0, 0, 0.55)" };

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[#1E293B]"
      style={{ height: "calc(100vh - var(--header-height))", minHeight: 620 }}
    >
      {/* 3D background — no overlay of any kind on top of it */}
      <LogisticsHeroAnimation />

      <div className="pointer-events-none container-x relative flex h-full flex-col justify-center py-16">
        <div className="hero-rise max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl" style={textShadow}>
            Connecting Businesses.{" "}
            <span className="block text-[#F58C22]">Delivering Beyond Borders.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-white sm:text-lg lg:text-xl" style={textShadow}>
            Khenmarg Logistics Sourcing Pvt. Ltd. delivers integrated logistics solutions and premium Indian food sourcing
            for businesses across international markets.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/services/"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)] transition hover:-translate-y-0.5 hover:brightness-105"
              style={{ background: "linear-gradient(135deg, #C8281E 0%, #E8541A 50%, #F58C22 100%)" }}
            >
              Explore Our Services <ArrowRight size={18} />
            </Link>
            <Link
              href="/shashva/"
              className="pointer-events-auto inline-flex items-center rounded-full bg-white px-7 py-3.5 font-semibold text-[#1E293B] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)] transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Discover Shashva
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
