"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { nav, shashvaNav, site } from "@/content/site";
import KhenmargLogo from "@/components/KhenmargLogo";

export default function Header() {
  const pathname = usePathname() || "/";
  const isShashva = pathname.startsWith("/shashva");
  const contactStyle = isShashva
    ? { background: "linear-gradient(135deg, #1E4620 0%, #2E6B34 55%, #4A8F3C 100%)" }
    : {
        background: "linear-gradient(135deg, #C8281E 0%, #E8541A 50%, #F58C22 100%)",
        boxShadow: "0 4px 14px rgba(232, 84, 26, 0.35)",
      };
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    setOpen(false);
    setDd(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all ${
        `border-b border-gray-100 ${scrolled ? "shadow-md" : "shadow-sm"}`
      }`}
    >
      {/* Top bar */}
      <div
        className={`hidden md:block text-xs text-white ${isShashva ? "bg-sh-700" : ""}`}
        style={isShashva ? undefined : { background: "linear-gradient(90deg, #C8281E 0%, #E8541A 50%, #F58C22 100%)" }}
      >
        <div className="mx-auto flex h-9 w-full max-w-[1440px] items-center justify-between px-4 lg:px-6">
          <span>Freight Forwarding &nbsp;|&nbsp; Transportation &nbsp;|&nbsp; Customs Broker</span>
          <div className="flex items-center gap-5">
            <a href={site.phones[0].href} className="flex items-center gap-1.5 text-white transition-opacity hover:opacity-90">
              <Phone size={12} /> {site.phones[0].label}
            </a>
            <a href={site.emails[0].href} className="text-white transition-opacity hover:opacity-90">
              {site.emails[0].label}
            </a>
            <Link
              href="/admin/"
              aria-label="Login"
              title="Login"
              className="-ml-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/80 text-[11px] font-bold leading-none text-white transition hover:bg-white hover:text-gray-900"
            >
              L
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`flex w-full items-center justify-between pl-2 pr-4 lg:grid lg:grid-cols-[auto_1fr_auto] lg:pl-3 lg:pr-6 transition-all ${
          "h-16"
        }`}
      >
        <Link href={isShashva ? "/shashva/" : "/"} className="flex min-h-[44px] items-center gap-2.5" aria-label="Home">
          {isShashva ? (
            <Image
              src="/images/shashva-logo-horizontal.png"
              alt="Shashva – Step to Healthy Lives"
              width={360}
              height={120}
              quality={100}
              priority
              className="h-11 w-auto object-contain md:h-12"
            />
          ) : (
            <KhenmargLogo />
          )}
        </Link>

        <nav className="hidden lg:flex items-center justify-end gap-1 pr-3" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                isShashva ? "hover:text-sh-600" : "hover:text-km-600"
              } ${
                isActive(n.href) && !isShashva ? "text-km-600" : "text-gray-700"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
            <div className="relative" onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
              <button
                className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold ${
                  isShashva ? "bg-sh-50 text-sh-700" : "text-sh-600"
                }`}
                aria-expanded={dd}
                onClick={() => setDd((v) => !v)}
              >
                Shashva <ChevronDown size={14} className={`transition-transform ${dd ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute right-0 top-full w-64 pt-2 transition-all ${
                  dd ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-2"
                }`}
              >
                <div className="rounded-xl border border-sh-100 bg-white p-2 shadow-xl">
                  <div className="eyebrow px-3 pb-1 pt-2 text-sh-600">Our Food Export Brand</div>
                  {shashvaNav.map((n) => (
                    <Link
                      key={n.href}
                      href={n.href}
                      className={`block rounded-lg px-3 py-2.5 text-sm hover:bg-sh-50 ${
                        pathname === n.href ? "bg-sh-50 font-semibold text-sh-700" : "text-gray-700"
                      }`}
                    >
                      {n.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          <Link
            href="/contact/"
            className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 ${isShashva ? "shadow-lg shadow-emerald-900/20" : ""}`}
            style={contactStyle}
          >
            Contact Us
          </Link>
        </div>

        <button className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
          <Menu />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition ${open ? "visible" : "invisible"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <KhenmargLogo />
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center">
              <X />
            </button>
          </div>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="flex min-h-[44px] items-center border-b border-gray-100 py-2 font-medium">
              {n.label}
            </Link>
          ))}
          <div className="eyebrow mt-6 mb-1 text-sh-600">Shashva – Our Food Export Brand</div>
          {shashvaNav.map((n) => (
            <Link key={n.href} href={n.href} className="flex min-h-[44px] items-center border-b border-gray-100 py-2 font-medium text-sh-700">
              {n.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            className={`mt-6 flex min-h-[44px] w-full items-center justify-center rounded-full px-6 py-3 font-semibold text-white ${isShashva ? "shadow-lg shadow-emerald-900/20" : ""}`}
            style={contactStyle}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
