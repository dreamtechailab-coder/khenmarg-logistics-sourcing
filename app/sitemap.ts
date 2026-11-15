import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { products } from "@/content/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/about/",
    "/services/",
    "/industries-network/",
    "/shashva/",
    "/shashva/products/",
    "/shashva/quality-export-process/",
    "/contact/",
    ...products.map((p) => `/shashva/products/${p.slug}/`),
  ];
  return pages.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
