"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, FileCheck2, Ship, Truck } from "lucide-react";
import IntroCarousel from "@/components/IntroCarousel";
import { introSlides } from "@/content/introSlides";

/**
 * Post-animation introduction. Cross-fades in over the 3D hero once the scene has completed its first
 * full playback ("khenmarg:hero-cycle", dispatched by lib/logistics-scene/scene.js), then hosts the
 * auto-rotating photo carousel with the company introduction on top.
 */
const FADE_MS = 1600;

const services = [
  { label: "Freight Forwarding", Icon: Ship },
  { label: "Transportation", Icon: Truck },
  { label: "Customs Broker", Icon: FileCheck2 },
];

export default function HeroIntro() {
  const [imgReady, setImgReady] = useState(false);
  const [cycleDone, setCycleDone] = useState(false);
  const [instant, setInstant] = useState(false);
  const revealed = imgReady && cycleDone;

  // Preload + decode the first slide (same srcset/sizes the carousel uses, so the same file is reused)
  useEffect(() => {
    let cancelled = false;
    const first = introSlides[0];
    const id = window.setTimeout(() => {
      const im = new window.Image();
      im.sizes = "100vw";
      im.srcset = `${first.srcSm} 1200w, ${first.src} 2400w`;
      im.src = first.src;
      const done = () => !cancelled && setImgReady(true);
      (im.decode ? im.decode() : Promise.reject()).then(done, () => {
        if (im.complete && im.naturalWidth) done();
        else im.onload = done; // on error stay hidden: the 3D hero simply keeps playing
      });
    }, 1200); // after first paint, so it never competes with the hero poster
    return () => { cancelled = true; clearTimeout(id); };
  }, []);

  // Reveal at the scene's first completed playback. Reduced-motion users get a static scene (nothing ever
  // "plays"), so they see the introduction straight away, without any transition.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
      setCycleDone(true);
      return;
    }
    const on = () => setCycleDone(true);
    window.addEventListener("khenmarg:hero-cycle", on, { once: true });
    return () => window.removeEventListener("khenmarg:hero-cycle", on);
  }, []);

  // Once fully opaque the 3D scene underneath can stop rendering.
  useEffect(() => {
    if (!revealed) return;
    const t = window.setTimeout(() => window.dispatchEvent(new Event("khenmarg:hero-covered")), instant ? 0 : FADE_MS + 100);
    return () => clearTimeout(t);
  }, [revealed, instant]);

  const motion = instant ? "" : "transition-[opacity,transform] ease-out";
  const rise = (delay: number, extra = "") => ({
    className: `${motion} ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${extra}`,
    style: instant ? undefined : { transitionDuration: "900ms", transitionDelay: revealed ? `${delay}ms` : "0ms" },
  });

  return (
    <div
      aria-hidden={!revealed}
      inert={!revealed}
      className={`absolute inset-0 z-20 overflow-hidden bg-[#071a38] ${motion} ${revealed ? "opacity-100" : "pointer-events-none opacity-0"}`}
      style={instant ? undefined : { transitionDuration: `${FADE_MS}ms` }}
    >
      <IntroCarousel slides={introSlides} active={revealed}>
        <div className="container-x flex h-full flex-col justify-center pb-28 pt-4 sm:pb-32">
          <div className="pointer-events-none max-w-2xl">
            <div {...rise(150)}>
              <span className="eyebrow inline-flex items-center gap-3 text-[10px] text-[#F58C22] sm:text-xs">
                <span className="h-px w-8 bg-[#F58C22]" />
                Khenmarg Logistics Sourcing Pvt Ltd
              </span>
            </div>

            <h2
              {...rise(300, "mt-3 font-display text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl")}
              style={{ ...(instant ? {} : { transitionDuration: "900ms", transitionDelay: revealed ? "300ms" : "0ms" }), textShadow: "0 2px 14px rgba(0,0,0,.45)" }}
            >
              Connecting Businesses.{" "}
              <span className="block text-[#F58C22]">Delivering Beyond Borders.</span>
            </h2>

            <p {...rise(450, "mt-3 max-w-xl text-[13px] leading-relaxed text-slate-100 sm:mt-4 sm:text-base lg:text-lg")}>
              Your trusted partner for integrated logistics, international freight forwarding, transportation, customs
              brokerage, and global sourcing solutions. We simplify complex supply chains and help businesses move
              confidently across international markets.
            </p>

            <ul
              {...rise(600, "mt-4 grid max-w-xl grid-cols-3 gap-2 sm:mt-5 sm:gap-3 [@media(max-height:700px)]:hidden")}
            >
              {services.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="flex flex-col items-start gap-1.5 rounded-xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-md sm:flex-row sm:items-center sm:gap-2.5 sm:px-3.5 sm:py-3"
                >
                  <Icon size={18} className="shrink-0 text-[#F58C22]" aria-hidden="true" />
                  <span className="text-[10px] font-semibold uppercase leading-tight tracking-wide text-white sm:text-[11px] sm:tracking-wider">{label}</span>
                </li>
              ))}
            </ul>

            <div {...rise(750, "mt-5 flex gap-2.5 sm:mt-6 sm:gap-4")}>
              <Link
                href="/services/"
                className="pointer-events-auto inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 hover:brightness-105 sm:flex-none sm:px-7 sm:py-3.5 sm:text-base"
                style={{ background: "linear-gradient(135deg, #C8281E 0%, #E8541A 50%, #F58C22 100%)" }}
              >
                Explore Our Services <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/contact/"
                className="pointer-events-auto inline-flex flex-1 items-center justify-center rounded-full border border-white/40 bg-white/5 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15 sm:flex-none sm:px-7 sm:py-3.5 sm:text-base"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </IntroCarousel>
    </div>
  );
}
