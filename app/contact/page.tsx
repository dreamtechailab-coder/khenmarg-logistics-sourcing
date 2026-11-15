import type { Metadata } from "next";
import { MapPin, Phone, Mail, User, MessageCircle } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import { PageHero } from "@/components/ui";
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
      <PageHero
        eyebrow="Contact us"
        title="Let's move your business forward"
        intro="Freight quotes, customs clearance or Shashva product enquiries — our team is ready to help."
        image="/images/truck.jpg"
        crumbs={[{ label: "Contact Us" }]}
      />

      <section className="container-x grid gap-10 py-20 lg:grid-cols-12">
        <Reveal className="space-y-5 lg:col-span-4">
          <div className="rounded-2xl bg-km-900 p-8 text-white">
            <h2 className="text-xl font-bold">Khenmarg Logistics Sourcing Pvt. Ltd.</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-4">
                <MapPin className="shrink-0 text-km-500" size={20} />
                <span className="text-white/85">{addr}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="shrink-0 text-km-500" size={20} />
                <span className="flex flex-col">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="text-white/85 hover:text-white">{p.label}</a>
                  ))}
                </span>
              </li>
              <li className="flex gap-4">
                <Mail className="shrink-0 text-km-500" size={20} />
                <span className="flex flex-col gap-1">
                  {site.emails.map((e) => (
                    <a key={e.href} href={e.href} className="text-white/85 hover:text-white">
                      {e.label} <span className="text-white/50">— {e.note}</span>
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-4">
                <User className="shrink-0 text-km-500" size={20} />
                <span className="text-white/85">{site.contactPerson.name}, {site.contactPerson.role}</span>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a href={site.phones[0].href} className="btn-km">
              <Phone size={16} /> Call
            </a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="btn bg-[#25D366] text-white hover:brightness-95">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-8">
          <div id="enquiry" className="scroll-mt-28 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-black/5 sm:p-10">
            <div className="eyebrow mb-2 text-km-600">Enquiry form</div>
            <h2 className="mb-8 text-3xl font-bold">Get a quote</h2>
            <EnquiryForm />
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-20">
        <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
          <iframe
            title="Khenmarg office location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
