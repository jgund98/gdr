import type { Metadata } from "next";
import { Archivo, Instrument_Serif, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/lib/site";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "GDR Development — Historic Rebuilds & New Residences | West Palm Beach · Los Angeles",
    template: "%s — GDR Development",
  },
  description: site.description,
  openGraph: {
    title: "GDR Development — Historic Rebuilds & New Residences",
    description: site.description,
    url: site.domain,
    siteName: "GDR Development",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GDR Development",
  url: site.domain,
  logo: `${site.domain}/brand/gdr-stacked.png`,
  foundingDate: "1997",
  founder: { "@type": "Person", name: "Gus Renny", url: site.gusUrl },
  parentOrganization: { "@type": "Organization", name: "GR Investment Group" },
  areaServed: [
    { "@type": "City", name: "West Palm Beach" },
    { "@type": "City", name: "Los Angeles" },
  ],
  knowsAbout: [
    "Historic home restoration",
    "Luxury residential development",
    "Custom home construction",
  ],
  sameAs: [site.social.instagram, site.social.facebook, site.social.tiktok, site.gusUrl, site.rennyRealtyUrl],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${display.variable}`}>
      <body className="bg-ink text-paper">
        {/* Before hydration AND the browser's async scroll restore: home must
            open at the top or the hero reveal plays against a mid-page scroll. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(location.pathname==='/'){history.scrollRestoration='manual';scrollTo(0,0);addEventListener('pageshow',function(e){if(e.persisted)scrollTo(0,0)});}}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
