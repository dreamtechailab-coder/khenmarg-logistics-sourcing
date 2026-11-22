"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Icon from "@/components/Icon";

type Item = { slug: string; title: string; icon: string; image?: string; imagePosition?: string; gallery?: { src: string; label: string; position?: string }[]; body: string; points?: string[] };

const GRAD = "linear-gradient(135deg, #C8281E 0%, #E8541A 55%, #F58C22 100%)";
const ROTATE_MS = 10000;

export default function ServicesTabs({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0].slug);

  useEffect(() => {
    const fromHash = () => {
      const h = decodeURIComponent(window.location.hash.replace("#", ""));
      if (items.some((s) => s.slug === h)) setActive(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [items]);

  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // bumps to restart the countdown + progress bar
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const select = useCallback((slug: string) => {
    setActive(slug);
    setCycle((c) => c + 1);
    try {
      window.history.replaceState(null, "", `#${slug}`);
    } catch {}
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setTimeout(() => {
      const i = items.findIndex((s) => s.slug === active);
      select(items[(i + 1) % items.length].slug);
    }, ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [active, cycle, paused, reduced, items, select]);

  const idx = Math.max(0, items.findIndex((s) => s.slug === active));
  const s = items[idx];

  return (
    <section className="container-x py-8 md:py-10">
      <div role="tablist" aria-label="Logistics services" className="mx-auto grid max-w-5xl grid-cols-2 gap-2.5 sm:grid-cols-4">
        {items.map((it) => {
          const on = it.slug === active;
          return (
            <button
              key={it.slug}
              type="button"
              role="tab"
              id={`tab-${it.slug}`}
              aria-selected={on}
              aria-controls="service-panel"
              onClick={() => select(it.slug)}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-center text-xs font-medium transition-all sm:text-sm ${
                on
                  ? "border-transparent text-white shadow-md shadow-orange-500/20"
                  : "border-slate-200 bg-white text-slate-700 hover:border-orange-400 hover:bg-orange-50/50"
              }`}
              style={on ? { background: GRAD } : undefined}
            >
              <Icon name={it.icon} size={16} className="shrink-0" />
              <span>{it.title}</span>
            </button>
          );
        })}
      </div>

      <article
        id="service-panel"
        role="tabpanel"
        aria-labelledby={`tab-${s.slug}`}
        className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setCycle((c) => c + 1);
        }}
      >
        <div className="absolute inset-x-0 top-0 z-10 h-1 bg-slate-100">
          {!reduced && !paused && (
            <div
              key={`${s.slug}-${cycle}`}
              className="intro-progress h-1 origin-left bg-gradient-to-r from-[#C8281E] via-[#E8541A] to-[#F58C22]"
              style={{ animationDuration: `${ROTATE_MS}ms` }}
            />
          )}
        </div>
        <div key={s.slug} className="svc-in grid grid-cols-1 lg:grid-cols-12">
        <div className="relative h-64 md:h-72 lg:col-span-5 lg:h-auto lg:min-h-[22rem]">
          {s.gallery ? (
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 bg-white/90">
              {s.gallery.map((g) => (
                <div key={g.label} className="group relative overflow-hidden">
                  <Image src={g.src} alt={`${g.label} freight`} fill sizes="(min-width: 1024px) 20vw, 50vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" style={g.position ? { objectPosition: g.position } : undefined} />
                  <span className="absolute right-1.5 top-1.5 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    {g.label}
                  </span>
                </div>
              ))}
            </div>
          ) : s.image ? (
            <Image src={s.image} alt={s.title} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" style={s.imagePosition ? { objectPosition: s.imagePosition } : undefined} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-km-50 to-km-100">
              <Icon name={s.icon} size={96} strokeWidth={1.2} className="text-km-600" />
            </div>
          )}
          {!s.gallery && <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />}
          <span className="absolute bottom-3 left-3 z-10 rounded-full bg-slate-900/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {String(idx + 1).padStart(2, "0")} • {s.title}
          </span>
        </div>
        <div className="p-6 md:p-8 lg:col-span-7 lg:flex lg:flex-col lg:justify-center">
          <div className="mb-3 flex items-center gap-3">
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md shadow-orange-500/20"
              style={{ background: "linear-gradient(135deg, #C8281E 0%, #E8541A 60%, #F58C22 100%)" }}
            >
              <Icon name={s.icon} size={22} />
            </span>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">{s.title}</h2>
          </div>
          <p className="text-base leading-relaxed text-gray-600">{s.body}</p>
          {s.points && (
            <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#E8541A]" /> {p}
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
      </article>
    </section>
  );
}
