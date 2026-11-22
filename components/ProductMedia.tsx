import Image from "next/image";
import ProductArt from "@/components/ProductArt";
import type { Product } from "@/content/products";

// Real product photo when `image` is set, otherwise the illustrated fallback.
// Must sit inside a `group` parent for the hover zoom to apply.
export default function ProductMedia({
  product,
  zoom = true,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  frame = "aspect-[4/3]",
}: {
  product: Pick<Product, "name" | "art" | "image"> & { images?: Product["images"] };
  zoom?: boolean;
  sizes?: string;
  priority?: boolean;
  frame?: string;
}) {
  const position = product.images?.[0]?.position;
  const hover = zoom ? "transition-transform duration-500 ease-out group-hover:scale-105" : "";
  if (!product.image) {
    return <ProductArt kind={product.art} className={`${frame} w-full ${hover}`} />;
  }
  return (
    <div className={`relative ${frame} w-full overflow-hidden`}>
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        style={position ? { objectPosition: position } : undefined}
        className={`h-full w-full object-cover object-center ${hover}`}
      />
    </div>
  );
}
