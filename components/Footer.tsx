import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { nav, shashvaNav, site } from "@/content/site";
import { services } from "@/content/services";
import { products } from "@/content/products";

export default function Footer() {
  return (
    <footer className="bg-[#16110f] text-gray-300">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="inline-flex items-center gap-4 rounded-xl bg-white p-3">
            <Link href="/" aria-label="Khenmarg Logistics home">
              <Image src="/images/khenmarg-logo.png" alt="Khenmarg Logistics - We pave the way for your cargo..." width={719} height={263} className="logo-img h-16 w-auto object-contain" />
            </Link>
            <span className="h-10 w-px bg-gray-200" />
            <Image src="/logos/shashva-logo.png" alt="Shashva" width={48} height={48} className="h-14 w-14" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400">
            International freight forwarding, transportation and customs broking from Chennai — and premium Indian
            food exports through our brand Shashva.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            {[...nav, { label: "Contact Us", href: "/contact/" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-km-500">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mb-3 mt-7 text-sm font-semibold text-sh-500">Shashva</h3>
          <ul className="space-y-2 text-sm">
            {shashvaNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-sh-500">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Logistics Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/#${s.slug}`} className="hover:text-km-500">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-semibold text-white">Get in touch</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-km-500" />
              <span>
                {site.address.line1}, {site.address.line2}, {site.address.city} – {site.address.pin},{" "}
                {site.address.state}, {site.address.country}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-km-500" />
              <span className="flex flex-col">
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className="hover:text-white">
                    {p.label}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-km-500" />
              <span className="flex flex-col">
                {site.emails.map((e) => (
                  <a key={e.href} href={e.href} className="hover:text-white">
                    {e.label}
                  </a>
                ))}
              </span>
            </li>
          </ul>
          <h3 className="mb-2 mt-7 text-sm font-semibold text-sh-500">Shashva Products</h3>
          <p className="text-xs leading-relaxed text-gray-400">{products.map((p) => p.name).join(" · ")}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-gray-500 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Khenmarg Logistics Sourcing Pvt. Ltd. All rights reserved.</span>
          <span>Shashva is a brand of Khenmarg Logistics Sourcing Pvt. Ltd.</span>
        </div>
      </div>
    </footer>
  );
}
