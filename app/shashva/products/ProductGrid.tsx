"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ProductArt from "@/components/ProductArt";
import { products, productCategories } from "@/content/products";

export default function ProductGrid() {
  const [cat, setCat] = useState<(typeof productCategories)[number]>("All");
  const list = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <section className="container-x py-16">
      <div className="mb-10 flex flex-wrap gap-2" role="tablist">
        {productCategories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              cat === c ? "bg-sh-600 text-white shadow" : "bg-sh-50 text-sh-700 hover:bg-sh-100"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <article key={p.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-sh-100 bg-white transition hover:-translate-y-1 hover:shadow-xl">
            <Link href={`/shashva/products/${p.slug}/`} className="overflow-hidden">
              <ProductArt kind={p.art} className="aspect-[5/4] w-full transition duration-500 group-hover:scale-105" />
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-sh-600">{p.category}</div>
              <h2 className="mt-1 text-xl font-semibold text-sh-900">
                <Link href={`/shashva/products/${p.slug}/`}>{p.name}</Link>
              </h2>
              <p className="mt-2 flex-1 text-sm text-gray-600">{p.short}</p>
              <div className="mt-5 flex items-center justify-between">
                <Link href={`/shashva/products/${p.slug}/`} className="text-sm font-semibold text-sh-600 hover:underline">
                  View details
                </Link>
                <Link href={`/contact/?product=${p.slug}#enquiry`} className="btn-sh !px-4 !py-2 text-xs">
                  Enquire <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
