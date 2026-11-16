"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, FileCheck2, Ship, Truck } from "lucide-react";

/**
 * Premium introduction layer that cross-fades in over the 3D hero once the animation has completed
 * its first full playback ("khenmarg:hero-cycle", dispatched by lib/logistics-scene/scene.js).
 *
 * Background photo: public/images/intro-port-night.jpg (+ -sm for mobile) — "Colombo Express in
 * Altenwerder at night" (Hamburg container terminal), Wikimedia Commons, CC0 / public domain, cropped.
 */
const IMG = "/images/intro-port-night.jpg";
const IMG_SM = "/images/intro-port-night-sm.jpg";
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

  // Preload + decode the photo during idle time so the reveal never shows a blank frame.
  useEffect(() => {
    let cancelled = false;
    const load = () => {
      const im = new window.Image();
      im.src = window.matchMedia("(max-width: 767px)").matches ? IMG_SM : IMG;
      const done = () => !cancelled && setImgReady(true);
      (im.decode ? im.decode() : Promise.reject()).then(done, () => {
        if (im.complete && im.naturalWidth) done();
        else im.onload = done; // on error stay hidden: the 3D hero simply keeps playing
      });
    };
    const id = window.setTimeout(load, 1200); // after first paint, so it never competes with the hero poster
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, []);

  // Reveal when the 3D scene reports its first completed playback. Reduced-motion users get a static
  // scene (nothing ever "plays"), so they see the intro straight away, without any transition.
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

  // Once fully opaque the scene underneath can stop rendering.
  useEffect(() => {
    if (!revealed) return;
    const t = window.setTimeout(() => window.dispatchEvent(new Event("khenmarg:hero-covered")), instant ? 0 : FADE_MS + 100);
    return () => clearTimeout(t);
  }, [revealed, instant]);

  const t = instant ? "" : "transition-[opacity,transform] ease-out";
  const show = (delay: number) => ({
    className: `${t} ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`,
    style: instant ? undefined : { transitionDuration: "900ms", transitionDelay: revealed ? `${delay}ms` : "0ms" },
  });

  return (
    <div
      aria-hidden={!revealed}
      inert={!revealed}
      className={`absolute inset-0 z-20 overflow-hidden bg-[#071a38] ${t} ${revealed ? "opacity-100" : "pointer-events-none opacity-0"}`}
      style={instant ? undefined : { transitionDuration: `${FADE_MS}ms` }}
    >
      {/* photo: slow settle (slight depth) while it fades in */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG}
        srcSet={`${IMG_SM} 1200w, ${IMG} 2206w`}
        sizes="100vw"
        alt=""
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover object-[72%_center] ${t} ${revealed ? "scale-100" : "scale-[1.07]"}`}
        style={instant ? undefined : { transitionDuration: "2600ms" }}
      />
      {/* navy grade + readability scrims (text side stays clean) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,20,46,.95) 0%, rgba(8,28,62,.86) 36%, rgba(9,34,74,.45) 68%, rgba(9,34,74,.18) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[#06142e]/45 md:hidden" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#061430]/80 to-transparent" />

      <div className="container-x relative flex h-full flex-col justify-center pb-20 pt-6 sm:pb-24">
        <div className="max-w-2xl">
          <div {...show(150)}>
            <span className="eyebrow inline-flex items-center gap-3 text-[#F58C22]">
              <span className="h-px w-8 bg-[#F58C22]" />
              Khenmarg Logistics Sourcing Pvt. Ltd.
            </span>
          </div>
          <h2
            {...show(300)}
            className={`mt-4 font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl ${show(300).className}`}
          >
            Moving Your Business Forward.{" "}
            <span className="block text-[#F58C22]">Across Every Border.</span>
          </h2>
          <p {...show(450)} className={`mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base lg:text-lg ${show(450).className}`}>
            KHENMARG LOGISTICS SOURCING PVT LTD delivers dependable logistics, freight forwarding, transportation, and
            customs brokerage solutions, connecting businesses to opportunities across international markets.
          </p>

          <ul {...show(600)} className={`mt-5 flex flex-wrap gap-2.5 ${show(600).className}`}>
            {services.map(({ label, Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm"
              >
                <Icon size={16} className="text-[#F58C22]" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <div {...show(750)} className={`mt-6 flex flex-wrap gap-3 sm:gap-4 ${show(750).className}`}>
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 hover:brightness-105 sm:px-7 sm:py-3.5 sm:text-base"
              style={{ background: "linear-gradient(135deg, #C8281E 0%, #E8541A 50%, #F58C22 100%)" }}
            >
              Explore Our Services <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
