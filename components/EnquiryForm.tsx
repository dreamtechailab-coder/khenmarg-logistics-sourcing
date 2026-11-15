"use client";
import { useEffect, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { services } from "@/content/services";
import { products } from "@/content/products";
import { site } from "@/content/site";

// Set NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree / Web3Forms URL or your own API) in .env.
// If it is not set, the form falls back to opening the visitor's email app with the enquiry filled in.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

type Status = "idle" | "sending" | "ok" | "error";

export default function EnquiryForm() {
  const [type, setType] = useState("Logistics");
  const [service, setService] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  // Pre-fill from ?type=shashva&product=slug or ?service=slug
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = q.get("type");
    if (t === "shashva") setType("Shashva Products");
    const p = q.get("product");
    if (p) {
      const prod = products.find((x) => x.slug === p);
      if (prod) {
        setType("Shashva Products");
        setPicked([prod.name]);
      }
    }
    const s = q.get("service");
    if (s) {
      const sv = services.find((x) => x.slug === s);
      if (sv) {
        setType("Logistics");
        setService(sv.title);
      }
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("company_website")) return; // honeypot
    const data: Record<string, string> = {};
    fd.forEach((v, k) => {
      if (k !== "company_website" && k !== "products") data[k] = String(v);
    });
    if (picked.length) data.products = picked.join(", ");

    if (!ENDPOINT) {
      const body = Object.entries(data)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${site.emails[0].label}?subject=${encodeURIComponent(
        `Website enquiry – ${data.enquiry_type}`
      )}&body=${encodeURIComponent(body)}`;
      setStatus("ok");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="mx-auto mb-4 text-green-600" size={48} />
        <h3 className="text-2xl font-bold">Thank you!</h3>
        <p className="mt-2 text-gray-600">
          We&apos;ve received your enquiry and our team will get back to you shortly. For anything urgent, call{" "}
          <a className="font-semibold text-km-600" href={site.phones[0].href}>
            {site.phones[0].label}
          </a>
          .
        </p>
        <button className="btn-outline-km mt-6" onClick={() => setStatus("idle")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-km-500 focus:ring-4 focus:ring-km-100";
  const label = "mb-1.5 block text-sm font-medium text-gray-700";
  const isSh = type === "Shashva Products";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <div>
        <label className={label} htmlFor="name">Full name *</label>
        <input id="name" name="name" required className={input} placeholder="Your name" />
      </div>
      <div>
        <label className={label} htmlFor="company">Company</label>
        <input id="company" name="company" className={input} placeholder="Company name" />
      </div>
      <div>
        <label className={label} htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" required className={input} placeholder="you@company.com" />
      </div>
      <div>
        <label className={label} htmlFor="phone">Phone / WhatsApp *</label>
        <input id="phone" name="phone" type="tel" required pattern="[+0-9 ()-]{7,}" className={input} placeholder="+91 …" />
      </div>
      <div>
        <label className={label} htmlFor="country">Country</label>
        <input id="country" name="country" className={input} placeholder="e.g. UAE" />
      </div>
      <div>
        <label className={label} htmlFor="enquiry_type">Enquiry type *</label>
        <select id="enquiry_type" name="enquiry_type" required className={input} value={type} onChange={(e) => setType(e.target.value)}>
          <option>Logistics</option>
          <option>Shashva Products</option>
          <option>Other</option>
        </select>
      </div>

      {type === "Logistics" && (
        <div className="sm:col-span-2">
          <label className={label} htmlFor="service">Service required</label>
          <select id="service" name="service" className={input} value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
          </select>
        </div>
      )}

      {isSh && (
        <fieldset className="sm:col-span-2">
          <legend className={label}>Products of interest</legend>
          <div className="flex flex-wrap gap-2">
            {products.map((p) => {
              const on = picked.includes(p.name);
              return (
                <button
                  type="button"
                  key={p.slug}
                  onClick={() => setPicked((x) => (on ? x.filter((n) => n !== p.name) : [...x, p.name]))}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                    on ? "border-sh-600 bg-sh-600 text-white" : "border-gray-200 bg-white text-gray-700 hover:border-sh-500"
                  }`}
                  aria-pressed={on}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="sm:col-span-2">
        <label className={label} htmlFor="quantity">{isSh ? "Quantity required" : "Cargo details"}</label>
        <input
          id="quantity"
          name="quantity"
          className={input}
          placeholder={isSh ? "e.g. 1 × 20ft container per month" : "e.g. 2 × 40ft FCL, Chennai → Jebel Ali"}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={label} htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} className={input} placeholder="Tell us about your requirement" />
      </div>
      <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-500">We usually reply within one business day.</p>
        <button type="submit" disabled={status === "sending"} className={`${isSh ? "btn-sh" : "btn-km"} disabled:opacity-60`}>
          {status === "sending" ? "Sending…" : "Send Enquiry"} <Send size={16} />
        </button>
      </div>
      {status === "error" && (
        <p className="sm:col-span-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          Sorry, something went wrong. Please email {site.emails[0].label} or call {site.phones[0].label}.
        </p>
      )}
    </form>
  );
}
