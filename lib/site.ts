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
  gusUrl: "https://www.gusrenny.com",
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

/**
 * The districts — verified history only (National Register + city records).
 * Zone keys match ThePlot's drawn zones.
 */
export const districts = [
  {
    key: "flamingo",
    name: "Flamingo Park",
    designation: "National Register 2000 · 458 historic buildings",
    era: "1920s — Mission and Spanish Revival",
    story:
      "Ninety-five acres bounded by Belvedere Road, Parker Avenue, Park Place and Florida Avenue, filled through the 1920s with Mission and Spanish Revival houses. The neighborhood knows exactly what it is, and protects it.",
    gdrNote: "GDR here: a historic cottage kept, and completely rebuilt behind its character.",
    slugs: ["kanuga-707"],
  },
  {
    key: "elcid",
    name: "El Cid",
    designation: "National Register 1995 · 281 historic buildings",
    era: "1923–1926 — built over the old pineapple fields",
    story:
      "Jay Phipps assembled the failed pineapple plantations along the Intracoastal and the 1920s boom did the rest: block after block of Mediterranean Revival and Mission homes facing the water. The scale is protected; the character is the point.",
    gdrNote: "The standard we restore to — Mediterranean massing, original street character.",
    slugs: [],
  },
  {
    key: "prospect",
    name: "Prospect Park",
    designation: "Prospect Park–Southland Park National Register district, 2011",
    era: "1922–1945 — the district's period of significance",
    story:
      "Half of a National Register district listed in 2011, running between South Dixie Highway and the water. Its houses date from 1922 to 1945, and the streets still hold the plan they were laid out on.",
    gdrNote: "Coastal cottages opened up — brighter interiors, renewed systems, nothing false.",
    slugs: [],
  },
  {
    key: "southland",
    name: "Southland Park",
    designation: "Prospect Park–Southland Park National Register district, 2011",
    era: "1922–1945 — the district's period of significance",
    story:
      "The southern half of the same Register district, running down to the Lake Worth waterfront. Quiet streets, original massing, Intracoastal light — the kind of block that rewards patience.",
    gdrNote: "GDR here: 3609 Washington Rd — nearly 3,000 square feet planned around light.",
    slugs: ["washington-3609"],
  },
  {
    key: "soso",
    name: "SoSo — South of Southern",
    designation: "The estate section south of Southern Blvd",
    era: "Where the collection concentrates",
    story:
      "Not a museum district — the estate streets between Olive and the Intracoastal where old Palm Beach charm meets full rebuilds. This is where GDR keeps buying, street by street.",
    gdrNote: "Four GDR residences on Greymon Drive alone.",
    slugs: ["greymon-227", "greymon-309", "greymon-317", "greymon-335"],
  },
] as const;
