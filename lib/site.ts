/**
 * Global site facts — every component reads from here.
 * Change once, fixed site-wide.
 */
export const site = {
  name: "GDR Development",
  parent: "GR Investment Group",
  /** current live home — flip to https://gdrdevelopment.com at cutover */
  domain: "https://gdr.epicdevsolutions.com",
  tagline: "Historic rebuilds. Ground-up residences. Developer-led.",
  description:
    "GDR Development — a limited collection of rebuilt historic homes and ground-up residences in West Palm Beach and Los Angeles, developed start to finish by Gus Renny.",
  founded: 1997,
  /** current live home of the personal brand — flip at gusrenny.com cutover */
  gusUrl: "https://gus.epicdevsolutions.com",
  rennyRealtyUrl: "https://rennyrealty.com",
  social: {
    instagram: "https://www.instagram.com/grenny12/",
    facebook: "https://www.facebook.com/grenny1/",
    tiktok: "https://www.tiktok.com/@gusrenny",
  },
} as const;

export const nav = [
  { label: "Residences", href: "/residences" },
  { label: "The Practice", href: "/practice" },
  { label: "Contact", href: "/contact" },
] as const;

export const stats = [
  { value: 28, suffix: "", label: "Years developing South Florida" },
  { value: 40, suffix: "+", label: "Homes built, restored, or reimagined" },
  { value: 150, suffix: "K+", label: "Square feet of homes delivered" },
  { value: 150, suffix: "M+", prefix: "$", label: "Total development volume" },
] as const;

/** The bottom-of-hero strip: West Palm Beach's proudest neighborhoods, nothing else. */
export const tickerItems = [
  "El Cid",
  "Flamingo Park",
  "Prospect Park",
  "Southland Park",
  "SoSo · South of Southern",
] as const;

export const neighborhoods = [
  {
    key: "el-cid",
    name: "El Cid",
    place: "West Palm Beach, FL",
    coords: "26.6960° N · 80.0533° W",
    image: "/site/el-cid.webp",
    blurb:
      "Mediterranean revivals on the Intracoastal's oldest streets — restored to the scale the neighborhood protects.",
  },
  {
    key: "flamingo-park",
    name: "Flamingo Park",
    place: "West Palm Beach, FL",
    coords: "26.6980° N · 80.0600° W",
    image: "/site/flamingo-aerial.webp",
    blurb:
      "Historic character cottages rebuilt around light, circulation, and rooms that finally work.",
  },
  {
    key: "southland",
    name: "Prospect & Southland Park",
    place: "West Palm Beach, FL",
    coords: "26.6870° N · 80.0540° W",
    image: "/site/wpb-skyline.webp",
    blurb:
      "Coastal cottages opened up — brighter interiors, renewed systems, nothing false.",
  },
  {
    key: "california",
    name: "California Hillsides",
    place: "Bel Air · Hollywood Hills",
    coords: "34.0900° N · 118.4440° W",
    image: "/properties/marlay-1501/02.webp",
    blurb:
      "Ground-up builds and canyon rebuilds across Los Angeles, engineered into the grade.",
  },
] as const;
