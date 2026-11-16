"use client";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { IntroSlide } from "@/content/introSlides";

export const SLIDE_MS = 5000;
const FADE_MS = 1200;
const NAV_LOCK_MS = 650;

type Props = {
  slides: IntroSlide[];
  /** true once the carousel is visible: starts autoplay + the slow zoom */
  active: boolean;
  /** overlay copy, rendered above the photos/scrims and below the controls */
  children?: ReactNode;
};

/**
 * Full-bleed cross-fading carousel. Autoplay is driven by the active indicator's CSS animation
 * (onAnimationEnd -> next), so there is no interval to leak and "pause" is just animation-play-state.
 * Under prefers-reduced-motion the animation is disabled (see globals.css) -> manual navigation only.
 */
export default function IntroCarousel({ slides, active, children }: Props) {
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loadRest, setLoadRest] = useState(false);
  const lastNav = useRef(0);
  const touch = useRef<{ x: number; y: number } | null>(null);

  // first slide is preloaded by the parent; fetch the others shortly after the reveal
  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => setLoadRest(true), 400);
    return () => clearTimeout(t);
  }, [active]);

  // Ignore navigation while a cross-fade is still running (prevents rapid-click glitches)
  const unlocked = () => {
    const now = performance.now();
    if (now - lastNav.current < NAV_LOCK_MS) return false;
    lastNav.current = now;
    return true;
  };
  const step = useCallback((d: number) => { if (unlocked()) setIndex((i) => (i + d + n) % n); }, [n]);
  const goTo = useCallback((i: number) => { if (unlocked()) setIndex(i); }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    else if (e.key === "Home") { e.preventDefault(); goTo(0); }
    else if (e.key === "End") { e.preventDefault(); goTo(n - 1); }
  };
  const mousePause = (v: boolean) => (e: PointerEvent) => { if (e.pointerType === "mouse") setPaused(v); };
  const onTouchStart = (e: React.TouchEvent) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touch.current; touch.current = null;
    if (!s) return;
    const t = e.changedTouches[0], dx = t.clientX - s.x, dy = t.clientY - s.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="KHENMARG logistics introduction"
      tabIndex={active ? 0 : -1}
      data-paused={paused}
      className="absolute inset-0 touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F58C22]"
      onKeyDown={onKeyDown}
      onPointerEnter={mousePause(true)}
      onPointerLeave={mousePause(false)}
      onFocus={(e) => { if (e.target.matches(":focus-visible")) setPaused(true); }}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* slides */}
      <div aria-live={paused ? "polite" : "off"}>
        {slides.map((s, i) => {
          if (i > 0 && !loadRest) return null;
          const on = i === index;
          return (
            <div
              key={s.src}
              aria-hidden={!on}
              className={`absolute inset-0 overflow-hidden transition-opacity ease-in-out motion-reduce:transition-none ${on ? "z-[1] opacity-100" : "opacity-0"}`}
              style={{ transitionDuration: `${FADE_MS}ms` }}
            >
              {/* slow cinematic push-in while the slide is current */}
              <div
                className={`absolute inset-0 transition-transform ease-out motion-reduce:transition-none ${on && active ? "scale-[1.06]" : "scale-100"}`}
                style={{ transitionDuration: on && active ? `${SLIDE_MS + FADE_MS}ms` : `${FADE_MS}ms` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  srcSet={`${s.srcSm} 1200w, ${s.src} 2400w`}
                  sizes="100vw"
                  alt={s.alt}
                  decoding="async"
                  draggable={false}
                  className="h-full w-full select-none object-cover"
                  style={{
                    objectPosition: s.position,
                    transformOrigin: s.origin ?? "50% 50%",
                    transform: `${s.scale ? `scale(${s.scale})` : ""} ${s.flip ? "scaleX(-1)" : ""}`.trim() || undefined,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* navy grade + readability scrims */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] md:hidden"
        style={{ background: "linear-gradient(180deg, rgba(5,17,40,.72) 0%, rgba(5,17,40,.6) 45%, rgba(5,17,40,.8) 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,17,40,.95) 0%, rgba(7,25,56,.88) 34%, rgba(8,30,66,.55) 60%, rgba(8,30,66,.22) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-2/5 bg-gradient-to-t from-[#04102a]/85 to-transparent" />

      <div className="relative z-10 h-full">{children}</div>

      {/* controls (sit above the stats card that overlaps the hero's bottom edge) */}
      <div className="container-x absolute inset-x-0 bottom-[4.5rem] z-20 sm:bottom-[4.75rem]">
        <div className="flex items-center justify-between gap-4 text-white">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <span className="font-display text-xs font-semibold tabular-nums tracking-widest sm:text-sm" aria-live="off">
              {String(index + 1).padStart(2, "0")} <span className="text-white/50">/ {String(n).padStart(2, "0")}</span>
            </span>
            <div className="flex items-center" role="group" aria-label="Choose slide">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${s.label}`}
                  aria-current={i === index}
                  className="group flex h-9 items-center px-[3px] outline-none focus-visible:[&>span]:ring-2 focus-visible:[&>span]:ring-[#F58C22]"
                >
                  <span className={`relative block h-[3px] overflow-hidden rounded-full bg-white/30 transition-[width] duration-500 ${i === index ? "w-10 sm:w-14" : "w-4 group-hover:bg-white/60 sm:w-6"}`}>
                    {i === index && (
                      <span
                        key={index}
                        className={`intro-progress absolute inset-y-0 left-0 block w-full origin-left rounded-full bg-[#F58C22] ${active ? "" : "intro-progress-idle"}`}
                        style={{ animationDuration: `${SLIDE_MS}ms` }}
                        onAnimationEnd={() => step(1)}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <span className="hidden truncate text-xs font-medium uppercase tracking-[0.18em] text-white/80 md:inline">{slides[index].label}</span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {([[-1, ChevronLeft, "Previous slide"], [1, ChevronRight, "Next slide"]] as const).map(([d, Icon, label]) => (
              <button
                key={label}
                type="button"
                onClick={() => step(d)}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition hover:border-[#F58C22] hover:bg-[#F58C22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F58C22] sm:h-11 sm:w-11"
              >
                <Icon size={20} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
