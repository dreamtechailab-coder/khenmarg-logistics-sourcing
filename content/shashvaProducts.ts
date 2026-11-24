// Official Shashva product data (client product document). Edit here — the
// /shashva pages, product modal, product detail pages, footer, sitemap and
// enquiry form all read from this file.

export type ProductCategory = "Coconut Products" | "Millets & Superfoods" | "Fresh Produce" | "Pickles & Chutneys";

export const productCategories = ["All", "Coconut Products", "Millets & Superfoods", "Fresh Produce", "Pickles & Chutneys"] as const;
export type ProductFilter = (typeof productCategories)[number];

export type SpecLabel =
  | "Type"
  | "Fat Content"
  | "Moisture"
  | "Grades"
  | "Quality"
  | "Weight"
  | "Husk"
  | "Colour"
  | "Sourcing"
  | "Packing"
  | "Container Load"
  | "Shelf Life"
  | "Oil"
  | "Storage"
  | "Origin";

export type ProductSpec = { label: SpecLabel; value: string };

export type ProductVariant = {
  name: string;
  /** Local / regional name(s), e.g. "Thinai / Kangni". */
  local?: string;
  /** Short descriptor, e.g. "For Curry, Biryani, Gravy". */
  note?: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  /** CSS object-position used when the photo is cropped, e.g. "50% 60%". */
  position?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  /** Two-line card summary. */
  summary: string;
  /** Full description shown as the modal "Overview". */
  description: string;
  /** Key highlight tags for the card and the modal badges. */
  highlights: string[];
  /** First image is the cover; the rest appear as modal thumbnails. */
  images: ProductImage[];
  whyChoose?: string[];
  variants?: ProductVariant[];
  specs: ProductSpec[];
  uses?: string[];
  healthBenefits?: string[];
  /** Illustration key used as a fallback by components/ProductMedia (see ProductArt). */
  art: string;
  /** Cover photo — mirrors images[0].src so ProductMedia can render it. */
  image: string;
};

const IMG = "/images/products";

type ProductInput = Omit<Product, "image">;
const define = (p: ProductInput): Product => ({ ...p, image: p.images[0].src });

export const shashvaProducts: Product[] = [
  // ───────────────────────── Coconut Products ─────────────────────────
  define({
    slug: "desiccated-coconut",
    name: "Desiccated Coconut",
    category: "Coconut Products",
    art: "flakes",
    summary: "Premium white desiccated coconut from fresh mature coconuts — sweet, aromatic, hygienically processed and graded.",
    description:
      "Premium quality Desiccated Coconut made from fresh mature coconuts. White in colour, sweet in taste, and rich in natural coconut aroma. Hygienically processed, dried, and graded. No added preservatives or artificial colour.",
    highlights: ["No Preservatives", "12 Months Shelf Life", "Origin: India"],
    images: [{ src: `${IMG}/desiccated-coconut.jpg`, alt: "Desiccated coconut in a glass bowl with a wooden spoon" }],
    specs: [
      { label: "Type", value: "High Fat / Low Fat" },
      { label: "Fat Content", value: "60–65% (High Fat), <45% (Low Fat)" },
      { label: "Moisture", value: "Max 3%" },
      { label: "Grades", value: "Fine / Medium / Flakes / Chips" },
      { label: "Colour", value: "Natural White" },
      { label: "Shelf Life", value: "12 Months" },
      { label: "Packing", value: "25 Kg PP Bag with inner liner" },
      { label: "Origin", value: "India" },
    ],
    uses: ["Bakery", "Confectionery", "Sweets", "Chocolates", "Biscuits", "Curry preparations"],
  }),
  define({
    slug: "coconut-milk",
    name: "Coconut Milk",
    category: "Coconut Products",
    art: "milk",
    summary: "Thick, creamy and naturally sweet coconut milk from hand-picked Tamil Nadu coconuts — retort pouch or bulk.",
    description:
      "Fresh Coconut Milk extracted from mature, hand-picked coconuts from Tamil Nadu, India. Thick, creamy, and naturally sweet — perfect taste for every dish.",
    highlights: ["No Artificial Colour", "Up to 12 Months Shelf Life", "Origin: Tamil Nadu"],
    images: [{ src: `${IMG}/coconut-milk.jpg`, alt: "Fresh coconut milk being poured into a glass bowl", position: "50% 62%" }],
    whyChoose: ["Natural & Fresh, No Artificial Colour", "Thick Creamy Texture", "Rich Coconut Aroma", "Hygienically Packed"],
    variants: [
      { name: "Coconut Cream", local: "Extra Thick", note: "For Sweets & Desserts" },
      { name: "Thick Coconut Milk", note: "For Curry, Biryani, Gravy" },
      { name: "Light Coconut Milk", note: "For Soups, Coffee, Smoothies" },
    ],
    specs: [
      { label: "Colour", value: "Natural White" },
      { label: "Packing", value: "Retort Pouch packed / Bulk" },
      { label: "Shelf Life", value: "Up to 12 Months" },
      { label: "Origin", value: "Tamil Nadu, India" },
    ],
    uses: ["Curry", "Biryani", "Payasam", "Sweets", "Bakery", "Coffee", "Smoothies"],
  }),
  define({
    slug: "semi-husked-coconuts",
    name: "Semi-Husked Coconuts",
    category: "Coconut Products",
    art: "coconut",
    summary: "Export-quality mature coconuts from Pollachi, Tamil Nadu — husk partly removed, fibre left on to protect the shell.",
    description:
      "Mature coconut where the outer green husk is partially removed, leaving protective fibre on top and bottom to safeguard the hard inner shell. Export-quality coconuts sourced directly from the Pollachi area, Tamil Nadu, India.",
    highlights: ["Export Quality", "13 MT / 20ft Container", "Origin: Pollachi"],
    images: [{ src: `${IMG}/semi-husked-coconuts.jpg`, alt: "Heap of mature semi-husked coconuts with brown fibre" }],
    specs: [
      { label: "Type", value: "Mature Semi-Husked Coconut" },
      { label: "Weight", value: "450 gm to 550 gm" },
      { label: "Husk", value: "Partially removed, fibre left for protection" },
      { label: "Colour", value: "Brown with light brown fibre" },
      { label: "Shelf Life", value: "30–45 Days from harvest" },
      {
        label: "Packing",
        value: "1,050 PP Bags (Avg. 12.50–13 kg/bag) for 20ft | 2,250 PP Bags (Avg. 12.50–13 kg/bag) for 40ft",
      },
      { label: "Container Load", value: "13 MT per 20ft container | 26 MT per 40ft container" },
      { label: "Origin", value: "Pollachi, Tamil Nadu, India" },
    ],
  }),
  define({
    slug: "virgin-coconut-oil",
    name: "Virgin Coconut Oil (Cold-Pressed)",
    category: "Coconut Products",
    art: "oil",
    summary: "Pure, cold-pressed virgin coconut oil from fresh coconuts — no chemicals, no refining. Clear, aromatic and farm direct.",
    description: "Pure, natural & cold-pressed from fresh coconuts. No chemicals, no refining. Clear, aromatic & healthy.",
    highlights: ["Cold-Pressed", "No Refining", "Origin: India"],
    images: [
      {
        src: `${IMG}/virgin-coconut-oil.jpg`,
        alt: "Cold-pressed virgin coconut oil bottle beside a halved coconut",
        position: "50% 64%",
      },
    ],
    whyChoose: [
      "100% Pure & Natural — Cold Pressed",
      "Made From Fresh Coconuts",
      "No Chemicals, No Preservatives, No Refining",
      "Rich Aroma, Clear Colour",
      "Farm Direct & Hygienically Packed",
    ],
    specs: [
      { label: "Type", value: "Virgin / Cold-Pressed / Unrefined" },
      { label: "Colour", value: "Water Clear / Light Golden" },
      { label: "Origin", value: "India" },
    ],
    uses: [
      "Cooking (Healthy & Tasty)",
      "Hair Care (Strong, Shiny & Soft Hair)",
      "Skin Care (Natural Moisturizer)",
      "Baby Care (Safe & Gentle)",
      "Ayurveda / Massage",
    ],
    healthBenefits: ["Good for Digestion", "Boosts Immunity", "Good for Skin & Hair", "Controls Cholesterol"],
  }),
  define({
    slug: "coconut-sugar",
    name: "Coconut Sugar",
    category: "Coconut Products",
    art: "sugar",
    summary: "Natural, unrefined coconut flower-sap sugar with a Low Glycemic Index (GI 35) and a rich caramel taste.",
    description:
      "Natural Coconut Sugar made from fresh coconut flower sap. A healthy alternative to white sugar with a Low Glycemic Index (GI 35), rich in minerals, and a delicious caramel taste.",
    highlights: ["Low GI (35)", "12–18 Months Shelf Life", "Origin: India"],
    images: [{ src: `${IMG}/coconut-sugar.jpg`, alt: "Coconut sugar in a coconut-shell bowl and wooden spoons" }],
    whyChoose: [
      "100% Natural & Unrefined",
      "No Chemicals, No Preservatives",
      "Low Glycemic Index (GI 35)",
      "Rich in Iron, Zinc, Potassium",
      "Caramel Flavour — Best for Sweets & Coffee",
    ],
    variants: [
      { name: "Coconut Sugar Powder", note: "Fine Powder" },
      { name: "Coconut Sugar Granules", note: "Natural Caramel Granules" },
      { name: "Coconut Sugar Block / Jaggery", note: "Traditional Form for Sweets, Payasam & Tea" },
      { name: "Coconut Nectar / Syrup", note: "Liquid Form" },
    ],
    specs: [
      { label: "Colour", value: "Light Brown to Dark Brown" },
      { label: "Moisture", value: "Max 3%" },
      { label: "Packing", value: "25 Kg Bag / 500g / 1 Kg Retail Pack" },
      { label: "Shelf Life", value: "12–18 Months" },
      { label: "Origin", value: "India" },
    ],
    uses: ["Tea", "Coffee", "Sweets", "Payasam", "Bakery", "Chocolates", "Health Foods"],
  }),

  // ───────────────────────── Millets & Superfoods ─────────────────────────
  define({
    slug: "millets",
    name: "Millets (Ancient Superfood)",
    category: "Millets & Superfoods",
    art: "powder",
    summary: "Pure, unpolished millets direct from Indian farmers — high in fibre and protein, gluten-free and diabetic-friendly.",
    description:
      "Pure, unpolished Millets sourced directly from Indian farmers. High in fibre, protein & minerals — gluten-free, diabetic-friendly, and ideal for a healthy lifestyle.",
    highlights: ["A-Grade", "Gluten-Free", "12 Months Shelf Life"],
    images: [{ src: `${IMG}/millets.jpg`, alt: "Assorted millet varieties in a wooden bowl" }],
    whyChoose: ["100% Natural & Unpolished", "No Chemicals, No Pesticides", "High Fibre & Protein", "Gluten-Free & Diabetic Friendly"],
    variants: [
      { name: "Foxtail Millet", local: "Thinai / Kangni" },
      { name: "Little Millet", local: "Samai / Kutki" },
      { name: "Kodo Millet", local: "Varagu / Kodra" },
      { name: "Barnyard Millet", local: "Kuthiraivali / Jhangora" },
      { name: "Pearl Millet", local: "Kambu / Bajra" },
      { name: "Finger Millet", local: "Ragi / Kelvaragu" },
      { name: "Sorghum", local: "Cholam / Jowar" },
      { name: "Proso Millet", local: "Panivaragu" },
    ],
    specs: [
      { label: "Quality", value: "A-Grade, Cleaned & Sorted" },
      { label: "Moisture", value: "Max 11%" },
      { label: "Packing", value: "25 Kg / 50 Kg PP Bag | Retail Pack 500g / 1 Kg" },
      { label: "Shelf Life", value: "12 Months" },
      { label: "Origin", value: "India" },
    ],
  }),

  // ───────────────────────── Fresh Produce ─────────────────────────
  define({
    slug: "gooseberry",
    name: "Gooseberry (Amla / Nellikai)",
    category: "Fresh Produce",
    art: "veg",
    summary: "Farm-fresh and dried Indian gooseberry — the King of Vitamin C — in fresh, dried, powder, candy, pickle and frozen forms.",
    description:
      "Fresh & Dried Gooseberry from India — the King of Vitamin C. 100% natural and farm-fresh, ideal for immunity, hair, skin, and digestion.",
    highlights: ["A-Grade", "Fresh & Dried", "Origin: India"],
    images: [{ src: `${IMG}/gooseberry.jpg`, alt: "Fresh green gooseberries (amla) in a wooden bowl" }],
    whyChoose: [
      "100% Natural & Farm Fresh",
      "Highest Vitamin C — 20x More Than Orange",
      "No Chemicals, No Preservatives",
      "Boosts Immunity & Digestion",
      "Good for Hair, Skin & Eyes",
    ],
    variants: [
      { name: "Fresh Gooseberry", note: "Green Amla" },
      { name: "Dried Gooseberry", note: "Sliced / Whole" },
      { name: "Gooseberry Powder", note: "Amla Powder" },
      { name: "Gooseberry Candy", note: "Sweet / Salted" },
      { name: "Gooseberry Pickle", note: "Traditional Taste" },
      { name: "Frozen Gooseberry", note: "For Juice Industry" },
    ],
    specs: [
      { label: "Quality", value: "A-Grade, Cleaned & Sorted" },
      { label: "Packing", value: "25 Kg Bag / 500g / 1 Kg Retail Pack / Bulk" },
      { label: "Shelf Life", value: "Fresh — 15 Days | Dried — 12 Months" },
      { label: "Origin", value: "India" },
    ],
  }),
  define({
    slug: "fresh-vegetables",
    name: "Fresh Vegetables (Farm Fresh)",
    category: "Fresh Produce",
    art: "veg",
    summary: "Daily-harvest vegetables direct from Tamil Nadu farms — cleaned, graded and hygienically packed for export.",
    description:
      "Daily fresh vegetables sourced directly from Tamil Nadu farms. Cleaned, sorted, graded & hygienically packed for local markets and international export.",
    highlights: ["Export Graded", "Daily Harvest", "Origin: Tamil Nadu"],
    images: [
      { src: `${IMG}/vegetables-green-chilli.jpg`, alt: "Fresh green chillies in a basket" },
      { src: `${IMG}/vegetables-bottle-gourd.jpg`, alt: "Fresh bottle gourd" },
      { src: `${IMG}/vegetables-cluster-beans.jpg`, alt: "Fresh cluster beans" },
    ],
    whyChoose: [
      "100% Fresh & Farm Direct",
      "Daily Harvest — No Cold Storage Old Stock",
      "Cleaned, Graded & Sorted",
      "Hygienically Packed",
      "Best Price for Bulk Buyers",
    ],
    variants: [
      { name: "Lady's Finger", local: "Okra / Vendakkai" },
      { name: "Drumstick", local: "Murungakkai" },
      { name: "Bitter Gourd", local: "Pavakkai" },
      { name: "Bottle Gourd", local: "Sorakkai" },
      { name: "Ridge Gourd", local: "Peerkangai" },
      { name: "Snake Gourd", local: "Pudalangai" },
      { name: "Green Chilli", local: "Pachai Milagai" },
      { name: "Cluster Beans" },
    ],
    specs: [
      { label: "Sourcing", value: "Direct from Tamil Nadu Farms" },
      { label: "Quality", value: "Export-Graded, Cleaned & Sorted" },
      { label: "Origin", value: "Tamil Nadu, India" },
    ],
  }),

  // ───────────────────────── Pickles & Chutneys ─────────────────────────
  define({
    slug: "traditional-pickles",
    name: "Traditional Pickles",
    category: "Pickles & Chutneys",
    art: "jar",
    summary: "Authentic Tamil Nadu & Andhra style pickles with cold-pressed oils and no artificial colour — packed for global export.",
    description:
      "Authentic Tamil Nadu & Andhra style homemade pickles crafted with farm-fresh ingredients and cold-pressed oils. No artificial colour, hygienically packed for global export.",
    highlights: ["No Artificial Colour", "12 Months Shelf Life", "Tamil Nadu / Andhra Style"],
    images: [
      { src: `${IMG}/pickles-jar.jpg`, alt: "Jar of traditional Indian pickle with a spoonful beside it" },
      { src: `${IMG}/pickles-lemon.jpg`, alt: "Lemon pickle in clay and glass jars", position: "50% 40%" },
    ],
    whyChoose: [
      "100% Homemade / Traditional Recipe",
      "No Artificial Colour",
      "Cold-Pressed Groundnut / Sesame Oil",
      "Farm Fresh Mango, Lemon & Ginger",
      "Hygienically Packed",
    ],
    variants: [
      { name: "Mango Pickle", note: "Raw mango, red chilli, mustard, garlic & cold-pressed oil (Spicy, tangy & crunchy)" },
      {
        name: "Lemon Pickle",
        note: "Fresh lemon, chilli, turmeric & salt (Sour, spicy & tasty; best with curd rice, idli, dosa)",
      },
      {
        name: "Avakai Pickle",
        local: "Avakaya / Aavakai",
        note: "Andhra special raw mango, aavalu (mustard powder), red chilli & garlic (Extra spicy, traditional recipe)",
      },
      {
        name: "Ginger Pickle",
        local: "Inji Oorugai / Allam Pachadi",
        note: "Fresh ginger, tamarind, jaggery & chilli (Sweet, sour & spicy; good for digestion)",
      },
    ],
    specs: [
      { label: "Packing", value: "250g / 500g / 1 Kg Jar | 5 Kg Bulk Bucket" },
      { label: "Shelf Life", value: "12 Months" },
      { label: "Oil", value: "Cold-Pressed Groundnut Oil / Sesame Oil" },
      { label: "Origin", value: "Tamil Nadu / Andhra Style, India" },
    ],
  }),
  define({
    slug: "fresh-chutneys",
    name: "Fresh Chutneys",
    category: "Pickles & Chutneys",
    art: "jar",
    summary: "Daily-made South Indian chutneys from 100% fresh leaves — no artificial colour or preservatives, ready to eat.",
    description:
      "Daily-made traditional South Indian chutneys prepared from 100% fresh leaves with no artificial colour or preservatives. Ready to eat — just open and serve.",
    highlights: ["No Preservatives", "Ready To Eat", "Keep Refrigerated"],
    images: [
      { src: `${IMG}/chutney-gongura.jpg`, alt: "Gongura chutney in a white bowl with fresh gongura leaves" },
      { src: `${IMG}/chutney-mint.jpg`, alt: "Green mint and coriander chutney in a steel bowl", position: "50% 45%" },
    ],
    whyChoose: [
      "100% Fresh Leaves — Daily Made",
      "No Artificial Colour, No Preservatives",
      "Traditional Homemade Recipe",
      "Hygienically Packed",
      "Ready To Eat — Just Open & Serve",
    ],
    variants: [
      {
        name: "Gongura Chutney",
        local: "Pulicha Keerai / Gongura Pachadi",
        note: "Spicy / With Garlic — Andhra special; sour, spicy & tasty with hot rice, idli, dosa",
      },
      {
        name: "Kothamalli Chutney",
        local: "Coriander Chutney",
        note: "Green / With Coconut — fresh coriander, green chilli, ginger, lemon & coconut; great for idli, dosa, sandwich, rice",
      },
      {
        name: "Pudina Chutney",
        local: "Mint Chutney",
        note: "Green / Spicy — fresh mint, coriander, green chilli, ginger & lemon; cooling, aids digestion; great for idli, dosa, biryani, chaat",
      },
    ],
    specs: [
      { label: "Packing", value: "200g / 250g / 500g / 1 Kg Jar / Bulk" },
      { label: "Shelf Life", value: "Fresh — 7 Days | Frozen — 1 Month" },
      { label: "Storage", value: "Keep Refrigerated" },
      { label: "Origin", value: "Tamil Nadu / Andhra Style, India" },
    ],
  }),
];

export const getSpec = (p: Product, label: SpecLabel) => p.specs.find((s) => s.label === label)?.value;

export const categoryCounts = productCategories.reduce<Record<string, number>>((acc, c) => {
  acc[c] = c === "All" ? shashvaProducts.length : shashvaProducts.filter((p) => p.category === c).length;
  return acc;
}, {});
