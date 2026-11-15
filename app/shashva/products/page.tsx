import type { Metadata } from "next";
import { PageHero, CtaBand } from "@/components/ui";
import ProductGrid from "./ProductGrid";

export const metadata: Metadata = {
  title: "Our Products — Shashva Food Exports",
  description:
    "Semi-husked coconuts, coconut milk, desiccated coconut, coconut sugar, virgin coconut oil, pickles & chutneys, papads, Indian vegetables, and gooseberry & moringa powders — exported from India.",
};

export default function Products() {
  return (
    <>
      <PageHero
        theme="sh"
        eyebrow="Shashva · Our products"
        title="Premium Indian food products for export"
        intro="Consistent quality, competitive pricing and reliable delivery across our full range."
        image="/images/sea2.jpg"
        crumbs={[{ label: "Shashva", href: "/shashva/" }, { label: "Our Products" }]}
      />
      <ProductGrid />
      <CtaBand theme="sh" title="Need a product quote?" text="Select the products you need and share your quantities." href="/contact/?type=shashva#enquiry" />
    </>
  );
}
