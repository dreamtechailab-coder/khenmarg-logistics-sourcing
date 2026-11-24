import type { Metadata } from "next";
import { CtaBand } from "@/components/ui";
import RibbonHero from "@/components/RibbonHero";
import ProductGrid from "./ProductGrid";

export const metadata: Metadata = {
  title: "Our Products — Shashva Food Exports",
  description:
    "Export-ready desiccated coconut, coconut milk, semi-husked coconuts, virgin coconut oil, coconut sugar, millets, gooseberry, fresh vegetables, traditional pickles and fresh chutneys — farm-direct from Tamil Nadu & India.",
};

export default function Products() {
  return (
    <>
      <RibbonHero
        theme="sh"
        fullWidth
        fade="linear-gradient(90deg, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.76) 34%, rgba(255,255,255,0.32) 52%, rgba(255,255,255,0) 66%)"
        eyebrow="Shashva · Our products"
        title="Premium Indian food products for global buyers"
        intro="Farm-direct sourcing from Tamil Nadu & India, hygienic processing and export-ready bulk & retail packing. Select any product for full export specifications."
        slices={[
          { src: "/images/shashva-story/village-field.jpg", alt: "Indian farmer in a green village field", pos: "50% 55%" },
          { src: "/images/shashva-story/harvest.jpg", alt: "Basket of freshly harvested vegetables", pos: "50% 45%" },
          { src: "/images/shashva-story/village-kitchen.jpg", alt: "Traditional village food preparation", pos: "50% 40%" },
          { src: "/images/shashva-story/sun-dried-chillies.jpg", alt: "Sun-dried red chillies", pos: "50% 60%" },
          { src: "/images/shashva-story/coconut-halves.jpg", alt: "Freshly cracked coconut halves", pos: "50% 55%" },
          { src: "/images/shashva-story/coconut-products.jpg", alt: "Coconut oil, coconut and desiccated coconut", pos: "55% 50%" },
        ]}
      />
      <ProductGrid />
      <CtaBand theme="sh" title="Need a product quote?" text="Tell us the products, packing and quantities you need — we'll send a quote." href="/contact/?type=shashva#enquiry" />
    </>
  );
}
