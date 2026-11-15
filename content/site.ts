// Central company details — edit here and the whole site updates.
export const site = {
  name: "Khenmarg Logistics Sourcing Pvt. Ltd.",
  shortName: "Khenmarg",
  tagline: "We pave the way for your cargo…",
  url: "https://www.khenmarg.com", // TODO: confirm final domain
  description:
    "Khenmarg Logistics Sourcing Pvt. Ltd. — international freight forwarding, customs clearance and end-to-end supply chain solutions from Chennai, and home of Shashva, our premium Indian food export brand.",
  address: {
    line1: "No. 107/5B2B2, Srinivasa Nagar Main Road",
    line2: "Kathirvedu",
    city: "Chennai",
    pin: "600 066",
    state: "Tamil Nadu",
    country: "India",
  },
  phones: [
    { label: "+91 98847 14774", href: "tel:+919884714774" },
    { label: "+91 89460 92937", href: "tel:+918946092937" },
  ],
  emails: [
    { label: "naresh@khenmarg.com", note: "Sales & enquiries", href: "mailto:naresh@khenmarg.com" },
    { label: "docs@khenmarg.com", note: "Documentation", href: "mailto:docs@khenmarg.com" },
  ],
  whatsapp: "919884714774",
  contactPerson: { name: "L. Naresh", role: "Head – Sales" },
  mapQuery: "Srinivasa Nagar Main Road, Kathirvedu, Chennai 600066",
};

export const shashva = {
  name: "Shashva",
  tagline: "Step to Healthy Lives",
  descriptor: "A Food Export Brand by Khenmarg",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
  { label: "Logistics Services", href: "/services/" },
  { label: "Industries & Network", href: "/industries-network/" },
];

export const shashvaNav = [
  { label: "Shashva – Food Exports", href: "/shashva/" },
  { label: "Our Products", href: "/shashva/products/" },
  { label: "Quality & Export Process", href: "/shashva/quality-export-process/" },
];
