/**
 * The collection. Gallery files live in public/properties/<slug>/NN.webp —
 * `images` is the count, 01 is always the lead image.
 * Statuses and specs come from the client's published material only.
 */
export type Region = "West Palm Beach" | "Los Angeles";

export type Property = {
  slug: string;
  address: string;
  city: string;
  neighborhood: string;
  region: Region;
  status: "Completed" | "Coming Soon" | "Sold";
  images: number;
  /** 1-based indices of photos showing the property as acquired, pre-rebuild */
  asFound?: number[];
  /** 1-based indices to keep off the site (e.g. third-party brokerage signage) */
  exclude?: number[];
  blurb: string;
  body: string[];
  video?: { src: string; poster: string; label: string };
  specs?: string[];
};

export const properties: Property[] = [
  {
    slug: "kanuga-707",
    address: "707 Kanuga Dr",
    city: "West Palm Beach, FL",
    neighborhood: "Flamingo Park",
    region: "West Palm Beach",
    status: "Coming Soon",
    images: 2,
    blurb: "A Flamingo Park cottage, kept — and completely rebuilt behind its character.",
    body: [
      "Some houses earn their street. This is one of them — a historic Flamingo Park cottage whose face the neighborhood knows, reimagined into a refined coastal residence behind it.",
      "The character stays. Everything that makes a house work — structure, systems, light, flow — is built new.",
    ],
  },
  {
    slug: "greymon-309",
    address: "309 Greymon Dr",
    city: "West Palm Beach, FL",
    neighborhood: "SoSo · South of Southern",
    region: "West Palm Beach",
    status: "Sold",
    images: 11,
    blurb: "Crisp white facades, green shutters — Palm Beach charm rebuilt for modern living. Sold.",
    body: [
      "Classic Palm Beach on the outside: crisp white massing, green shutters, tropical landscape. Underneath it, an entirely updated structure with modern systems throughout.",
      "This residence has found its owner — walk the reel below to see the standard, then ask about what's coming next.",
    ],
    video: {
      src: "/videos/tour-309.mp4",
      poster: "/videos/tour-309-poster.webp",
      label: "Preview reel — 309 Greymon Dr",
    },
  },
  {
    slug: "greymon-317",
    address: "317 Greymon Dr",
    city: "West Palm Beach, FL",
    neighborhood: "SoSo · South of Southern",
    region: "West Palm Beach",
    status: "Completed",
    images: 9,
    blurb: "A completed rebuild — walked inside and above.",
    body: [
      "A finished statement of the practice: interiors reorganized for circulation and light, structure renewed end to end, and a facade the street is better for.",
      "The walkthrough below moves through the completed residence — no renderings, no staging tricks. This is the delivered home.",
    ],
    video: {
      src: "/videos/film-317.mp4",
      poster: "/videos/film-317-poster.webp",
      label: "Walkthrough — 317 Greymon Dr",
    },
  },
  {
    slug: "greymon-335",
    address: "335 Greymon Dr",
    city: "West Palm Beach, FL",
    neighborhood: "SoSo · South of Southern",
    region: "West Palm Beach",
    status: "Coming Soon",
    images: 8,
    asFound: [2, 3, 4, 5, 6, 7, 8],
    blurb: "A legacy lot beginning its next life — shown as found, and as planned.",
    body: [
      "This is what we start with: a legacy property worn down by decades, on a street worth every bit of the work. We publish the before because we're proud of the distance.",
      "The rebuild brings a stronger structure, a rebuilt interior, and a calm palette — a house built to be kept.",
    ],
  },
  {
    slug: "greymon-227",
    address: "227 Greymon Dr",
    city: "West Palm Beach, FL",
    neighborhood: "SoSo · South of Southern",
    region: "West Palm Beach",
    status: "Completed",
    images: 10,
    exclude: [3],
    blurb: "New roof, new systems, new layout — finished in a timeless palette.",
    body: [
      "A complete rebuild delivered: new roof, new mechanical systems, and an interior layout redrawn for the way people actually live.",
      "Finished quiet on purpose — herringbone floors, warm wood, light everywhere. The kind of rooms that don't date.",
    ],
  },
  {
    slug: "washington-3609",
    address: "3609 Washington Rd",
    city: "West Palm Beach, FL",
    neighborhood: "Southland Park",
    region: "West Palm Beach",
    status: "Coming Soon",
    images: 10,
    blurb: "Nearly 3,000 square feet of light, a first-floor primary, and Intracoastal glimpses from the veranda.",
    body: [
      "A Southland Park residence planned around height, natural light, and balanced room flow — nearly 3,000 square feet of it.",
      "First-floor primary suite. A flexible den or third bedroom. Saltillo tile and vaulted ceilings. And upstairs, an airy veranda with glimpses of the Intracoastal.",
    ],
    specs: [
      "≈ 3,000 sq ft",
      "First-floor primary suite",
      "Den / third bedroom",
      "Saltillo tile · vaulted ceilings",
      "Upstairs veranda · Intracoastal glimpses",
    ],
  },
  {
    slug: "linda-flora-2179",
    address: "2179 Linda Flora Dr",
    city: "Los Angeles, CA",
    neighborhood: "Bel Air",
    region: "Los Angeles",
    status: "Coming Soon",
    images: 16,
    asFound: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    blurb: "A Bel Air hillside rebuild focused on privacy, grade, and the view.",
    body: [
      "High above the city on Linda Flora Drive, this is the raw material: a hillside property with the three things money can't add later — privacy, grade, and orientation to the view.",
      "The rebuild is in design. What you see here is the property as acquired — the honest starting line.",
    ],
  },
  {
    slug: "marlay-1501",
    address: "1501 Marlay Dr",
    city: "Los Angeles, CA",
    neighborhood: "Hollywood Hills",
    region: "Los Angeles",
    status: "Coming Soon",
    images: 3,
    blurb: "A modern hillside residence above the canyon — large openings, simple lines, materials that last.",
    body: [
      "A modern rebuild engineered into the hillside: large openings, simplified lines, and long-lasting materials chosen for the canyon light.",
      "Designed to disappear into its grade from the street — and to hold the entire city from the terrace.",
    ],
  },
];

export const bySlug = (slug: string) => properties.find((p) => p.slug === slug);

export const gallery = (p: Property) =>
  Array.from({ length: p.images }, (_, i) => i + 1)
    .filter((n) => !p.exclude?.includes(n))
    .map((n) => `/properties/${p.slug}/${String(n).padStart(2, "0")}.webp`);

/** Featured on home, in order. */
export const featured = ["kanuga-707", "greymon-309", "washington-3609"] as const;
