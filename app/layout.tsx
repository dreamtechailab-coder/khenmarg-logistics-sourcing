import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Khenmarg Logistics | Freight Forwarding & Customs Broker in Chennai",
    template: "%s | Khenmarg Logistics",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "Khenmarg Logistics Sourcing Pvt. Ltd.",
    images: [{ url: "/images/khenmarg-og.png", width: 1200, height: 630, alt: "Khenmarg Logistics - We pave the way for your cargo..." }],
  },
  twitter: { card: "summary_large_image", images: ["/images/khenmarg-og.png"] },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${site.url}/#org`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/images/khenmarg-logo.png`,
      slogan: "We pave the way for your cargo",
      telephone: "+91-9884714774",
      email: "naresh@khenmarg.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: `${site.address.line1}, ${site.address.line2}`,
        addressLocality: "Chennai",
        postalCode: "600066",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      brand: { "@type": "Brand", name: "Shashva", slogan: "Step to Healthy Lives" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:p-3">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
