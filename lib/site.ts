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

/**
 * The districts — verified history only (National Register + city records).
 * Zone keys match ThePlot's drawn zones.
 */
export const districts = [
  {
    key: "flamingo",
    name: "Flamingo Park",
    designation: "City historic district 1993 · National Register 2000",
    era: "Platted 1921 — Florida land boom",
    story:
      "Laid out on the highest coastal ridge between downtown and Miami, Flamingo Park filled through the 1920s with Mission and Mediterranean Revival homes — 501 contributing structures still stand. The neighborhood knows exactly what it is, and protects it.",
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
    designation: "Prospect–Southland National Register district, 2011",
    era: "1922–1945 — gridded after Brooklyn's Prospect Park",
    story:
      "A 1920s neighborhood literally modeled on Brooklyn's Prospect Park — a central green with benches and a fountain, streets that still keep the plan. Its period of significance runs 1922 to 1945, and it shows.",
    gdrNote: "Coastal cottages opened up — brighter interiors, renewed systems, nothing false.",
    slugs: [],
  },
  {
    key: "southland",
    name: "Southland Park",
    designation: "Prospect–Southland National Register district, 2011",
    era: "1920s — waterfront park along Washington Road",
    story:
      "The southern half of the Register district, with its own waterfront park running along Washington Road. Quiet streets, original massing, Intracoastal light — the kind of block that rewards patience.",
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
