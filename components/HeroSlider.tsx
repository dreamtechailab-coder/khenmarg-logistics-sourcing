"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const slides = [
  { src: "/images/sea.jpg", label: "Sea Freight" },
  { src: "/images/air.jpg", label: "Air Freight" },
  { src: "/images/rail.jpg", label: "Multimodal" },
  { src: "/images/truck.jpg", label: "Transportation" },
  { src: "/images/warehouse.jpg", label: "Warehousing" },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate min-h-[620px] overflow-hidden bg-km-900 md:min-h-[680px]">
      {slides.map((s, idx) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={idx !== i}
        >
          <Image src={s.src} alt="" fill priority={idx === 0} className={`object-cover ${idx === i ? "kenburns" : ""}`} />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0c07]/95 via-[#1a0c07]/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="container-x relative flex min-h-[620px] flex-col justify-center py-20 text-white md:min-h-[680px]">
        <div className="eyebrow mb-4 flex items-center gap-3 text-km-500">
          <span className="h-px w-10 bg-km-500" /> Freight Forwarding · Transportation · Customs Broker
        </div>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
          We pave the way <br className="hidden sm:block" />
          for your <span className="text-km-500">cargo</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">
          International freight forwarding, customs clearance and end-to-end supply chain solutions — from Chennai to
          the world.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link href="/contact/#enquiry" className="btn-km">
            Get a Quote <ArrowRight size={16} />
          </Link>
          <Link href="/services/" className="btn-ghost">
            Explore Services
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.label}
              onClick={() => setI(idx)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium backdrop-blur transition ${
                idx === i ? "bg-km-600 text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
              aria-label={`Show ${s.label}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
