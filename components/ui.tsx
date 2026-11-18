import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import { site } from "@/content/site";

type Theme = "km" | "sh";

export function PageHero({
  title,
  eyebrow,
  intro,
  image,
  theme = "km",
  crumbs = [],
  showCrumbs = true,
  tone = "default",
  compact = false,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  image?: string;
  theme?: Theme;
  crumbs?: { label: string; href?: string }[];
  showCrumbs?: boolean;
  tone?: "default" | "navy";
  compact?: boolean;
}) {
  const navy = tone === "navy";
  const overlay = navy
    ? "bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-950/40"
    : theme === "sh"
      ? "bg-gradient-to-r from-sh-900/95 via-sh-900/80 to-sh-700/40"
      : "bg-gradient-to-r from-km-900/95 via-km-900/80 to-km-700/30";
  return (
    <section className={`relative overflow-hidden ${theme === "sh" ? "bg-sh-900" : "bg-km-900"}`}>
      {image && <Image src={image} alt="" fill className="object-cover" priority />}
      <div className={`absolute inset-0 ${overlay}`} />
      <div
        className={`container-x relative text-white ${
          compact ? "flex min-h-[340px] flex-col justify-center py-12 md:py-16 lg:min-h-[380px]" : "py-20 md:py-28"
        }`}
      >
        {showCrumbs && <nav aria-label="Breadcrumb" className={`${compact ? "mb-3" : "mb-5"} text-xs text-white/70`}>
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              {" "}/{" "}
              {c.href ? (
                <Link href={c.href} className="hover:text-white">{c.label}</Link>
              ) : (
                <span className="text-white">{c.label}</span>
              )}
            </span>
          ))}
        </nav>}
        {eyebrow && (
          <div className={`eyebrow ${compact ? "mb-2" : "mb-3"} ${navy ? "font-semibold tracking-wider text-orange-500" : theme === "sh" ? "text-sh-100" : "text-km-500"}`}>{eyebrow}</div>
        )}
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        {intro && <p className={`${compact ? "mt-4" : "mt-5"} max-w-2xl text-lg text-white/80`}>{intro}</p>}
      </div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  text,
  theme = "km",
  center = false,
  light = false,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  theme?: Theme;
  center?: boolean;
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <Reveal className={`${compact ? "mb-6 md:mb-8" : "mb-12"} ${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && (
        <div className={`eyebrow mb-3 ${theme === "sh" ? "text-sh-600" : "text-km-600"} ${light ? "!text-white/70" : ""}`}>
          {eyebrow}
        </div>
      )}
      <h2 className={`text-3xl font-bold leading-tight md:text-4xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {text && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/75" : "text-gray-600"}`}>{text}</p>}
    </Reveal>
  );
}

export function CtaBand({
  compact = false,
  theme = "km",
  title = "Have cargo to move or products to source?",
  text = "Talk to our team for a quick, no-obligation quote.",
  href = "/contact/#enquiry",
}: {
  compact?: boolean;
  theme?: Theme;
  title?: string;
  text?: string;
  href?: string;
}) {
  const bg = theme === "sh" ? "from-sh-700 to-sh-500" : "from-km-700 to-km-500";
  return (
    <section className={`container-x ${compact ? "py-10 md:py-12" : "py-16"}`}>
      <Reveal
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${bg} text-white ${
          compact ? "px-6 py-8 md:px-10 md:py-10" : "px-8 py-12 md:px-14 md:py-14"
        }`}
      >
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/5" />
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
            <p className="mt-2 text-white/85">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={href} className="btn bg-white text-ink hover:bg-gray-100">
              Get a Quote <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="btn-ghost"
            >
              <MessageCircle size={16} /> WhatsApp us
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Check({ theme = "km" }: { theme?: Theme }) {
  return (
    <span
      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        theme === "sh" ? "bg-sh-100 text-sh-700" : "bg-km-100 text-km-700"
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M3 8.5l3 3 7-7" />
      </svg>
    </span>
  );
}
