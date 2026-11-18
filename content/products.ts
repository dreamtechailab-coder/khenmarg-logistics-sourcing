export type Product = {
  slug: string;
  name: string;
  category: "Coconut Products" | "Traditional Foods" | "Fresh Produce" | "Health Powders";
  short: string;
  description: string;
  art: string; // illustration key, see components/ProductArt.tsx
  image?: string; // optional real product photo; falls back to the illustration
  specs: { label: string; value: string }[];
};

// Spec values marked "On request" are placeholders — replace with client data.
const baseSpecs = (extra: { label: string; value: string }[] = []) => [
  { label: "Origin", value: "India" },
  ...extra,
  { label: "Packaging", value: "On request" },
  { label: "Minimum order", value: "On request" },
  { label: "Shelf life", value: "On request" },
  { label: "Supply", value: "Regular bulk exports" },
];

export const products: Product[] = [
  {
    slug: "semi-husked-coconuts",
    image: "/images/products/semi-husked-coconuts.jpg",
    name: "Semi-Husked Coconuts",
    category: "Coconut Products",
    art: "coconut",
    short: "Mature coconuts with the outer husk partly removed for export.",
    description:
      "Mature coconuts with the outer husk partially removed, keeping the nut protected during transit while reducing weight and volume. Sourced from Indian coconut-growing regions and packed for bulk container shipments.",
    specs: baseSpecs([{ label: "Form", value: "Semi-husked whole coconut" }]),
  },
  {
    slug: "coconut-milk",
    image: "/images/products/coconut-milk.jpg",
    name: "Coconut Milk",
    category: "Coconut Products",
    art: "milk",
    short: "Creamy coconut milk for cooking, beverages and food processing.",
    description:
      "Coconut milk extracted from fresh coconut kernel, suitable for home cooking, restaurants and food manufacturers. Available for regular bulk supply.",
    specs: baseSpecs([{ label: "Form", value: "Liquid" }]),
  },
  {
    slug: "desiccated-coconut",
    image: "/images/products/desiccated-coconut.jpg",
    name: "Desiccated Coconut",
    category: "Coconut Products",
    art: "flakes",
    short: "Dried, grated coconut for bakery, confectionery and cooking.",
    description:
      "Grated and dried coconut kernel, widely used in bakery, confectionery, sweets and cooking. Supplied in bulk for distributors and food manufacturers.",
    specs: baseSpecs([{ label: "Grades", value: "On request (fine / medium)" }]),
  },
  {
    slug: "coconut-sugar",
    image: "/images/products/coconut-sugar.jpg",
    name: "Coconut Sugar",
    category: "Coconut Products",
    art: "sugar",
    short: "Natural sweetener made from coconut palm sap.",
    description:
      "A granulated sweetener produced from the sap of coconut palm flowers, used as an alternative to regular sugar in beverages, baking and cooking.",
    specs: baseSpecs([{ label: "Form", value: "Granules" }]),
  },
  {
    slug: "virgin-coconut-oil",
    image: "/images/products/virgin-coconut-oil.jpg",
    name: "Virgin Coconut Oil",
    category: "Coconut Products",
    art: "oil",
    short: "Oil extracted from fresh coconut kernel.",
    description:
      "Virgin coconut oil extracted from fresh coconut kernel, for culinary and personal-care use. Available in retail and bulk packing.",
    specs: baseSpecs([{ label: "Form", value: "Oil" }]),
  },
  {
    slug: "pickles-chutneys",
    image: "/images/products/pickles-chutneys.jpg",
    name: "Pickles and Chutneys",
    category: "Traditional Foods",
    art: "jar",
    short: "Traditional Indian pickles and chutneys in authentic recipes.",
    description:
      "A range of traditional Indian pickles and chutneys prepared to authentic recipes — ideal for retailers and distributors serving Indian and international customers.",
    specs: baseSpecs([{ label: "Varieties", value: "On request" }]),
  },
  {
    slug: "papads",
    image: "/images/products/papads.jpg",
    name: "Papads",
    category: "Traditional Foods",
    art: "papad",
    short: "Classic Indian papads, ready to roast or fry.",
    description:
      "Thin, crisp Indian papads made from lentil and other flours, packed for retail and food-service markets.",
    specs: baseSpecs([{ label: "Varieties", value: "On request" }]),
  },
  {
    slug: "indian-vegetables",
    image: "/images/products/indian-vegetables.jpg",
    name: "Indian Vegetables",
    category: "Fresh Produce",
    art: "veg",
    short: "Fresh Indian vegetables for wholesale and retail markets abroad.",
    description:
      "Fresh vegetables sourced from Indian farms and shipped to overseas markets, with a special focus on the Gulf region where demand for Indian produce is strong.",
    specs: baseSpecs([{ label: "Varieties", value: "Seasonal — on request" }]),
  },
  {
    slug: "gooseberry-moringa-powders",
    image: "/images/products/gooseberry-moringa-powders.jpg",
    name: "Gooseberry and Moringa Leaf Powders",
    category: "Health Powders",
    art: "powder",
    short: "Amla (Indian gooseberry) and moringa leaf powders.",
    description:
      "Fine powders made from dried Indian gooseberry (amla) and moringa leaves, used in foods, beverages and health products.",
    specs: baseSpecs([{ label: "Form", value: "Powder" }]),
  },
];

export const productCategories = ["All", "Coconut Products", "Traditional Foods", "Fresh Produce", "Health Powders"] as const;
