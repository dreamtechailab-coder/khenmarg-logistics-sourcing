import type { Metadata } from "next";
import { MapPin, Phone, Mail, User, MessageCircle, ExternalLink } from "lucide-react";
import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import RibbonHero from "@/components/RibbonHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Khenmarg Logistics Sourcing Pvt. Ltd., Kathirvedu, Chennai — for freight quotes, customs clearance and Shashva food export enquiries. Call +91 98847 14774.",
};

export default function Contact() {
  const addr = `${site.address.line1}, ${site.address.line2}, ${site.address.city} – ${site.address.pin}, ${site.address.state}, ${site.address.country}`;
  return (
    <>
      <RibbonHero
        eyebrow="Contact us"
        title="Let's move your business forward"
        intro="Freight quotes, customs clearance or Shashva product enquiries — our team is ready to help."
        fullWidth
        slices={[
          { src: "/images/contact-hero/port.jpg", alt: "Container port with gantry cranes on a blue sea", pos: "50% 55%" },
          { src: "/images/contact-hero/ship.jpg", alt: "Container vessel at sea", pos: "50% 70%" },
          { src: "/images/contact-hero/hub.jpg", alt: "Cargo logistics hub with palletised goods", pos: "50% 60%" },
          { src: "/images/contact-hero/air.jpg", alt: "Airport apron with cargo aircraft", pos: "40% 50%" },
          { src: "/images/contact-hero/terminal.jpg", alt: "Container terminal with colourful stacked containers" },
          { src: "/images/contact-hero/highway.jpg", alt: "Freight trucks on a multi-lane highway", pos: "50% 55%" },
          { src: "/images/contact-hero/warehouse.jpg", alt: "High-bay warehouse racking", pos: "60% 50%" },
        ]}
      />
      <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 grid items-stretch gap-5 py-8 md:py-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-[#1c1917] via-[#2a1c16] to-[#3a1810] text-white shadow-lg">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#E8541A]/25 blur-3xl" />
            <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-7">
            <div>
              <h2 className="text-lg font-bold leading-snug">Khenmarg Logistics Sourcing Pvt. Ltd.</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Badge><MapPin size={16} /></Badge>
                  <span className="pt-1 text-white/85">{addr}</span>
                </li>
                <li className="flex gap-3">
                  <Badge><Phone size={16} /></Badge>
                  <span className="flex flex-col pt-1">
                    {site.phones.map((p) => (
                      <a key={p.href} href={p.href} className="text-white/85 hover:text-white">{p.label}</a>
                    ))}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Badge><Mail size={16} /></Badge>
                  <span className="flex flex-col gap-1 pt-1">
                    {site.emails.map((e) => (
                      <a key={e.href} href={e.href} className="text-white/85 hover:text-white">
                        {e.label} <span className="text-white/50">— {e.note}</span>
                      </a>
                    ))}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Badge><User size={16} /></Badge>
                  <span className="pt-1 text-white/85">{site.contactPerson.name}, {site.contactPerson.role}</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="relative aspect-[2.3/1] overflow-hidden rounded-xl">
                <Image
                  src="/images/contact-partnership.jpg"
                  alt="Business partners shaking hands over trade documents"
                  fill
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 35%" }}
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-[#E8541A] px-3 py-1 text-[11px] font-semibold text-white shadow-md">
                  15+ Years Global Trade Excellence
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold text-white">Your Trusted Partner in Global Trade</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                From seamless international freight forwarding to farm-direct Indian food exports, we build long-term
                partnerships powered by transparency, precision, and on-time delivery.
              </p>
              <ul className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
                {[
                  { k: "24/7", v: "Dedicated Support" },
                  { k: "100%", v: "Customs & Export Compliance" },
                  { k: "Global", v: "Sea, Air & Multimodal Reach" },
                ].map((t) => (
                  <li key={t.k}>
                    <div className="text-lg font-bold text-[#E8541A]">{t.k}</div>
                    <div className="mt-0.5 text-[10px] leading-tight text-white/70">{t.v}</div>
                  </li>
                ))}
              </ul>
            </div>
            </div>
            <div className="relative border-t border-white/10 bg-black/20 p-4 sm:px-7">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/70">
                <span className="h-2 w-2 rounded-full bg-[#25D366]" /> Global Export &amp; Freight Desk • Quick Response
              </div>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener"
                className="btn w-full justify-center bg-[#25D366] text-white transition hover:-translate-y-0.5 hover:brightness-95"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-8">
          <div id="enquiry" className="h-full scroll-mt-28 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg sm:p-7">
            <div className="eyebrow mb-1 text-[#d94e1f]">Enquiry form</div>
            <h2 className="mb-5 text-2xl font-bold text-[#0f172a]">Get a quote</h2>
            <EnquiryForm />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 pb-10 pt-2 md:pb-12">
        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8541A] text-white">
                <MapPin size={16} />
              </span>
              <div>
                <div className="text-sm font-bold text-[#0f172a]">Chennai Headquarters</div>
                <div className="text-xs text-slate-600">Kathirvedu, Chennai – 600 066, Tamil Nadu, India</div>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E8541A] px-4 py-1.5 text-xs font-semibold text-[#d94e1f] transition hover:bg-[#E8541A] hover:text-white"
            >
              Open in Google Maps <ExternalLink size={13} />
            </a>
          </div>
          <div className="h-[280px] sm:h-[320px] lg:h-[360px]">
            <iframe
              title="Khenmarg office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
              className="block h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8541A] text-white">{children}</span>;
}
