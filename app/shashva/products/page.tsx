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
        image="/images/shashva-products-hero.jpg"
        compact
        showCrumbs={false}
        overlayGradient="linear-gradient(90deg, rgba(16, 38, 20, 0.90) 0%, rgba(24, 54, 28, 0.72) 52%, rgba(46, 107, 52, 0.25) 100%)"
      />
      <ProductGrid />
      <CtaBand theme="sh" title="Need a product quote?" text="Select the products you need and share your quantities." href="/contact/?type=shashva#enquiry" />
    </>
  );
}
