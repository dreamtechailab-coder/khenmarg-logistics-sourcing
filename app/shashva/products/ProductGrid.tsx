"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, MessageCircle, X } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ProductMedia from "@/components/ProductMedia";
import ProductDetailBody, { originOf, whatsappLink } from "@/components/ProductDetail";
import { categoryCounts, productCategories, shashvaProducts, type Product, type ProductFilter } from "@/content/shashvaProducts";

const CLOSE_MS = 200;

export default function ProductGrid() {
  const [cat, setCat] = useState<ProductFilter>("All");
  const [active, setActive] = useState<Product | null>(null);
  const [shown, setShown] = useState(false); // drives the fade/scale transition
  const lastFocus = useRef<HTMLElement | null>(null);
  const list = cat === "All" ? shashvaProducts : shashvaProducts.filter((p) => p.category === cat);

  const open = (p: Product) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setActive(p);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  };
  const close = useCallback(() => {
    setShown(false);
    window.setTimeout(() => {
      setActive(null);
      lastFocus.current?.focus?.();
    }, CLOSE_MS);
  }, []);

  return (
    <section className="container-x py-10 md:py-14">
      <div className="mb-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Product categories">
        {productCategories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition ${
              cat === c ? "bg-sh-600 text-white shadow-md shadow-sh-600/25" : "bg-sh-50 text-sh-700 hover:bg-sh-100"
            }`}
          >
            {c} <span className={`ml-1 text-xs ${cat === c ? "text-white/75" : "text-sh-700/60"}`}>{categoryCounts[c]}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, idx) => (
          <ScrollReveal key={p.slug} delay={(idx % 3) * 75} className="h-full">
          <article
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-label={`${p.name} — view specifications`}
            onClick={() => open(p)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open(p);
              }
            }}
            className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-sh-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-sh-500/40 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sh-600"
          >
            <div className="relative">
              <ProductMedia product={p} frame="aspect-[16/10]" />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-sh-700 shadow-sm">
                {p.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h2 className="text-xl font-bold leading-snug text-sh-900">{p.name}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">{p.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.highlights.map((h) => (
                  <li key={h} className="rounded-md bg-sh-50 px-2.5 py-1 text-xs font-medium text-sh-700">
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sh-600 group-hover:text-sh-700">
                  View Specifications
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </article>
          </ScrollReveal>
        ))}
      </div>

      {active && <ProductModal key={active.slug} p={active} shown={shown} onClose={close} />}
    </section>
  );
}

function ProductModal({ p, shown, onClose }: { p: Product; shown: boolean; onClose: () => void }) {
  const [img, setImg] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const origin = originOf(p);
  const current = p.images[img];

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center p-0 transition-opacity duration-200 motion-reduce:transition-none sm:items-center sm:p-6 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-sh-900/60 backdrop-blur-sm" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sh-modal-title"
        className={`relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-y-auto rounded-t-3xl bg-white shadow-2xl transition duration-200 ease-out motion-reduce:transition-none sm:max-h-[90vh] sm:rounded-3xl lg:flex-row lg:overflow-hidden ${
          shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
        }`}
      >
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/95 text-sh-900 shadow-md transition hover:bg-sh-50 hover:text-sh-600"
        >
          <X size={20} />
        </button>

        {/* Left: image + export badges */}
        <div className="shrink-0 bg-sh-50 lg:flex lg:w-[42%] lg:flex-col lg:overflow-y-auto">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-sh-100 lg:aspect-auto lg:min-h-[320px] lg:flex-1">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              style={current.position ? { objectPosition: current.position } : undefined}
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4 p-5">
            {p.images.length > 1 && (
              <div className="flex gap-2" aria-label="Product photos">
                {p.images.map((im, i) => (
                  <button
                    key={im.src}
                    type="button"
                    onClick={() => setImg(i)}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === img}
                    className={`relative h-14 w-14 cursor-pointer overflow-hidden rounded-lg border-2 transition ${
                      i === img ? "border-sh-600" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={im.src} alt="" fill sizes="56px" className="object-cover" style={im.position ? { objectPosition: im.position } : undefined} />
                  </button>
                ))}
              </div>
            )}
            <ul className="flex flex-wrap gap-2">
              {p.highlights.map((h) => (
                <li key={h} className="rounded-full bg-sh-600 px-3 py-1 text-xs font-semibold text-white">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: scrollable details */}
        <div className="flex min-w-0 flex-1 flex-col lg:overflow-y-auto">
          <div className="p-5 pt-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 pr-10">
              <span className="rounded-full bg-sh-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sh-700">{p.category}</span>
              {origin && (
                <span className="inline-flex items-center gap-1 rounded-full border border-sh-100 px-3 py-1 text-[11px] font-semibold text-gray-600">
                  <MapPin size={12} /> Origin: {origin}
                </span>
              )}
            </div>
            <h2 id="sh-modal-title" className="mt-3 text-2xl font-bold leading-tight text-sh-900 sm:text-3xl">
              {p.name}
            </h2>
            <div className="mt-7">
              <ProductDetailBody p={p} />
            </div>
          </div>
          <div className="sticky bottom-0 mt-auto border-t border-sh-100 bg-white/95 p-4 backdrop-blur sm:px-8">
            <a
              href={whatsappLink(p)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sh w-full justify-center !bg-[#1f5c3a] hover:!bg-[#17472d]"
            >
              <MessageCircle size={18} /> Inquire About {p.name} on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
