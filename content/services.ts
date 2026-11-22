export type Service = {
  slug: string;
  title: string;
  icon: string; // lucide icon name, mapped in components/Icon.tsx
  short: string;
  body: string;
  points?: string[];
  image?: string;
  imagePosition?: string; // CSS object-position for the card image
  /** Optional 2x2 photo mosaic that replaces the single card image (e.g. one photo per freight mode). */
  gallery?: { src: string; label: string; position?: string }[];
};

export const services: Service[] = [
  {
    slug: "sea-freight",
    title: "Sea Freight",
    icon: "Ship",
    image: "/images/sea3.jpg",
    imagePosition: "60% 75%",
    short: "FCL & LCL exports and imports through a proactive global partner network.",
    body:
      "Khenmarg is connected globally through a very proactive network of overseas partners who are leading names in the industry in their respective countries. This allows us to provide a truly global and integrated logistics and supply chain that brings businesses closer together.",
    points: [
      "FCL & LCL – exports and imports",
      "Buyer consolidation",
      "Inland transportation",
      "Door-to-door pick-up and delivery",
      "Specialist in DDU & DDP services globally",
      "Cargo insurance at competitive costs",
    ],
  },
  {
    slug: "air-freight",
    title: "Air Freight",
    icon: "Plane",
    image: "/images/air3.jpg",
    imagePosition: "50% 55%",
    short: "The right mix of speed, transit time and service quality for urgent cargo.",
    body:
      "Our air freight products are dedicated to providing the right combination of speed, time and quality, responding efficiently to our clients' demands. We offer selective origins and destinations for air cargo that benefit from strong pricing and timely delivery.",
    points: [
      "International air freight",
      "Priority lift – international",
      "Airport-to-airport or door-to-door",
      "Clear transit times",
      "Delivery at destination",
      "Domestic air cargo operations to support your supply chain",
    ],
  },
  {
    slug: "customs-clearance",
    title: "Customs Clearance",
    icon: "FileCheck2",
    image: "/images/customs3.jpg",
    imagePosition: "50% 60%",
    short: "Import and export clearance with complete, accurate documentation.",
    body:
      "As a customs broker, we handle the paperwork and formalities for your imports and exports so your cargo moves through ports and airports without avoidable delays.",
    points: ["Import & export clearance", "Documentation support", "SEZ & FTWZ cargo", "Bonded warehouse cargo"],
  },
  {
    slug: "project-cargo",
    title: "Project Cargo",
    icon: "Container",
    image: "/images/project3.jpg",
    imagePosition: "40% 38%",
    short: "Planning and handling of heavy, oversized and break-bulk shipments.",
    body:
      "We have the expertise to plan and move project cargo and break-bulk shipments, including heavy and out-of-gauge equipment, from origin to site.",
    points: ["Heavy & out-of-gauge cargo", "Break-bulk shipments", "Dangerous goods (DG) shipments", "Route and handling planning"],
  },
  {
    slug: "multimodal-transportation",
    title: "Multimodal Transportation",
    icon: "Route",
    image: "/images/multimodal3.jpg",
    imagePosition: "60% 55%",
    gallery: [
      { src: "/images/sea2.jpg", label: "Sea", position: "40% 60%" },
      { src: "/images/air3.jpg", label: "Air", position: "55% 55%" },
      { src: "/images/multimodal-rail.jpg", label: "Rail", position: "60% 50%" },
      { src: "/images/multimodal-road.jpg", label: "Road", position: "65% 55%" },
    ],
    short: "Sea, air, rail and road combined under one bill of lading.",
    body:
      "We combine sea, air, rail and road to find the right balance of cost and transit time, and issue MTO bills of lading for a single point of responsibility.",
    points: ["MTO bill of lading", "Rail and road connections", "Cross-country shipments"],
  },
  {
    slug: "consolidation",
    title: "Consolidation",
    icon: "Boxes",
    image: "/images/consolidation3.jpg",
    imagePosition: "50% 45%",
    short: "LCL and buyer consolidation to cut freight costs on smaller shipments.",
    body:
      "Grouping shipments from multiple suppliers or for multiple buyers into one container reduces costs and simplifies handling at destination.",
    points: ["LCL consolidation", "Buyer consolidation", "Container stuffing & packing"],
  },
  {
    slug: "coastal-cargo",
    title: "Coastal Cargo",
    icon: "Anchor",
    image: "/images/coastal3.jpg",
    imagePosition: "50% 50%",
    short: "Domestic coastal shipping between Indian ports.",
    body:
      "Coastal shipping is a cost-effective alternative to long road hauls for moving cargo between Indian ports.",
    points: ["Port-to-port coastal movement", "Door-to-door options"],
  },
  {
    slug: "warehousing-distribution",
    title: "Warehousing & Distribution",
    icon: "Warehouse",
    image: "/images/warehouse3.jpg",
    imagePosition: "50% 40%",
    short: "Storage, bonded warehousing, CFS management and onward distribution.",
    body:
      "From storage to final delivery, we manage warehousing and distribution as part of your end-to-end supply chain.",
    points: ["Bonded warehouse", "CFS management", "SEZ & FTWZ", "E-commerce logistics", "Distribution"],
  },
];

export const valueAdded = [
  "Door-to-door pick-up and delivery",
  "Fast and safe handling",
  "Committed transit times",
  "Contracts with major airlines and liners",
  "Transparent, quality service",
  "Minimised supply chain costs",
  "Container transportation & packing",
  "CFS management",
  "Efficient, prompt and timely service",
];

export const highlights = [
  { label: "Global Network", icon: "Globe2" },
  { label: "Worldwide Agents", icon: "Users" },
  { label: "MTO Bill of Lading", icon: "ScrollText" },
  { label: "Door-to-Door Services", icon: "Truck" },
  { label: "Project Cargo Expertise", icon: "Container" },
  { label: "Break-Bulk Shipments", icon: "Package" },
  { label: "Bonded Warehouse", icon: "Warehouse" },
  { label: "DG Shipments", icon: "TriangleAlert" },
  { label: "Cross-Country Shipments", icon: "Route" },
  { label: "SEZ & FTWZ", icon: "Building2" },
  { label: "E-Commerce", icon: "ShoppingCart" },
];

export const industries = [
  { label: "Renewable Energy", icon: "Wind" },
  { label: "Automotive", icon: "Car" },
  { label: "Space", icon: "Rocket" },
  { label: "Iron & Steel", icon: "Factory" },
  { label: "Construction & Infrastructure", icon: "HardHat" },
  { label: "Metals & Mining", icon: "Pickaxe" },
  { label: "Oil & Gas", icon: "Fuel" },
  { label: "Textile / Leather", icon: "Shirt" },
  { label: "Health Care / Life Sciences", icon: "HeartPulse" },
  { label: "FMCG", icon: "ShoppingBasket" },
];

export const values = [
  { label: "Customer-Centricity", icon: "Handshake", text: "Every solution starts with what the customer needs." },
  { label: "Operational Excellence", icon: "Gauge", text: "Standardised, efficient processes and committed timelines." },
  { label: "Innovation", icon: "Lightbulb", text: "Smarter, sustainable ways to move cargo." },
  { label: "Integrity", icon: "ShieldCheck", text: "Transparent pricing and honest communication." },
  { label: "Collaboration", icon: "Users", text: "Working closely with partners worldwide." },
];
