import { Check } from "lucide-react";
import { getSpec, type Product } from "@/content/shashvaProducts";
import { site } from "@/content/site";

export const whatsappLink = (p: Pick<Product, "name">) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Hello Shashva, I would like to inquire about ${p.name}. Please share specifications, packing options and pricing.`
  )}`;

const heading = "mb-3 text-xs font-bold uppercase tracking-[0.14em] text-sh-600";

/** Structured detail sections shared by the product modal and the product page. Renders only the data a product has. */
export default function ProductDetailBody({ p }: { p: Product }) {
  const hasNotes = p.variants?.some((v) => v.note);
  return (
    <div className="space-y-8">
      <section>
        <h3 className={heading}>Overview</h3>
        <p className="leading-relaxed text-gray-700">{p.description}</p>
      </section>

      {p.whyChoose && (
        <section>
          <h3 className={heading}>Why Choose Our Product</h3>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {p.whyChoose.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sh-600 text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.variants && (
        <section>
          <h3 className={heading}>Types / Varieties Available</h3>
          {hasNotes ? (
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {p.variants.map((v) => (
                <li key={v.name} className="rounded-xl border border-sh-100 bg-sh-50/60 px-4 py-3">
                  <div className="text-sm font-semibold text-sh-900">
                    {v.name}
                    {v.local && <span className="font-normal text-gray-500"> · {v.local}</span>}
                  </div>
                  {v.note && <div className="mt-0.5 text-xs leading-relaxed text-gray-600">{v.note}</div>}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {p.variants.map((v) => (
                <li key={v.name} className="rounded-full border border-sh-100 bg-sh-50 px-3.5 py-1.5 text-sm text-sh-900">
                  <span className="font-medium">{v.name}</span>
                  {v.local && <span className="text-gray-500"> · {v.local}</span>}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section>
        <h3 className={heading}>Export Specifications</h3>
        <dl className="overflow-hidden rounded-xl border border-sh-100">
          {p.specs.map((s, i) => (
            <div
              key={s.label}
              className={`grid gap-1 px-4 py-3 text-sm sm:grid-cols-[9rem_1fr] sm:gap-4 ${i % 2 ? "bg-white" : "bg-sh-50/60"}`}
            >
              <dt className="font-semibold text-sh-900">{s.label}</dt>
              <dd className="text-gray-700">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {(p.uses || p.healthBenefits) && (
        <section className="space-y-5">
          {p.uses && (
            <div>
              <h3 className={heading}>Uses / Applications</h3>
              <ul className="flex flex-wrap gap-2">
                {p.uses.map((u) => (
                  <li key={u} className="rounded-full bg-sh-100 px-3.5 py-1.5 text-sm text-sh-900">
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {p.healthBenefits && (
            <div>
              <h3 className={heading}>Health Benefits</h3>
              <ul className="flex flex-wrap gap-2">
                {p.healthBenefits.map((u) => (
                  <li key={u} className="rounded-full bg-sh-600/10 px-3.5 py-1.5 text-sm text-sh-700">
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export const originOf = (p: Product) => getSpec(p, "Origin");
