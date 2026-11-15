"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { nav, shashvaNav, site } from "@/content/site";

export default function Header() {
  const pathname = usePathname() || "/";
  const isShashva = pathname.startsWith("/shashva");
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
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-all ${
        scrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
    >
      {/* Top bar */}
      <div className={`hidden md:block text-xs text-white ${isShashva ? "bg-sh-700" : "bg-km-900"}`}>
        <div className="container-x flex h-9 items-center justify-between">
          <span>Freight Forwarding &nbsp;|&nbsp; Transportation &nbsp;|&nbsp; Customs Broker</span>
          <div className="flex items-center gap-5">
            <a href={site.phones[0].href} className="flex items-center gap-1.5 hover:underline">
              <Phone size={12} /> {site.phones[0].label}
            </a>
            <a href={site.emails[0].href} className="hover:underline">
              {site.emails[0].label}
            </a>
          </div>
        </div>
      </div>

      <div className={`container-x flex items-center justify-between transition-all ${scrolled ? "h-16" : "h-20"}`}>
        <Link href={isShashva ? "/shashva/" : "/"} className="flex items-center gap-3" aria-label="Home">
          {isShashva ? (
            <>
              <Image src="/logos/shashva-logo.png" alt="Shashva" width={56} height={56} className="h-12 w-12" />
              <div className="leading-tight">
                <div className="font-display text-lg font-bold tracking-wide text-sh-700">SHASHVA</div>
                <div className="text-[11px] text-gray-500">A Food Export Brand by Khenmarg</div>
              </div>
            </>
          ) : (
            <Image
              src="/logos/khenmarg-logo.png"
              alt="Khenmarg Logistics — We pave the way for your cargo"
              width={180}
              height={66}
              className={`w-auto transition-all ${scrolled ? "h-11" : "h-14"}`}
              priority
            />
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
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
            className={`rounded-full px-3.5 py-2 text-sm font-medium ${
              isActive("/contact") ? "text-km-600" : "text-gray-700"
            }`}
          >
            Contact Us
          </Link>
          <Link href="/contact/#enquiry" className={`ml-3 ${isShashva ? "btn-sh" : "btn-km"} !py-2.5`}>
            Get a Quote
          </Link>
        </nav>

        <button className="lg:hidden p-2" onClick={() => setOpen(true)} aria-label="Open menu">
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
            <Image src="/logos/khenmarg-logo.png" alt="Khenmarg" width={140} height={51} className="h-10 w-auto" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
              <X />
            </button>
          </div>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="block border-b border-gray-100 py-3 font-medium">
              {n.label}
            </Link>
          ))}
          <div className="eyebrow mt-6 mb-1 text-sh-600">Shashva – Our Food Export Brand</div>
          {shashvaNav.map((n) => (
            <Link key={n.href} href={n.href} className="block border-b border-gray-100 py-3 font-medium text-sh-700">
              {n.label}
            </Link>
          ))}
          <Link href="/contact/" className="mt-4 block border-b border-gray-100 py-3 font-medium">
            Contact Us
          </Link>
          <Link href="/contact/#enquiry" className="btn-km mt-6 w-full">
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
