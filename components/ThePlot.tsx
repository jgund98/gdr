"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import PalmShadow from "@/components/PalmShadow";
import { StatusChip } from "@/components/PropertyCard";
import { bySlug, imgSrc } from "@/lib/properties";
import { districts } from "@/lib/site";
import { noWidow } from "@/lib/text";
import { cn } from "@/lib/cn";

/**
 * The Plot — West Palm Beach as a working survey drawing, full width.
 * The active record floats ON the sheet like a surveyor's note (over the
 * water band, where a drawing keeps its margins), and the whole collection
 * runs beneath as one strip of uniform chips. Touch a district for its
 * history; touch a pin or chip for a residence.
 */
/* Pins sit where the addresses actually fall: Greymon Dr runs east–west in
   SoSo with numbers climbing away from the water; the 3600 block of
   Washington Rd is just south of Southern, near the shore. */
const pins = [
  { slug: "kanuga-707", x: 210, y: 180 },
  { slug: "washington-3609", x: 612, y: 552 },
  { slug: "greymon-227", x: 560, y: 644 },
  { slug: "greymon-309", x: 508, y: 644 },
  { slug: "greymon-317", x: 456, y: 644 },
  { slug: "greymon-335", x: 404, y: 644 },
] as const;

const laPins = [
  { slug: "linda-flora-2179", x: 84, y: 56 },
  { slug: "marlay-1501", x: 176, y: 96 },
] as const;

const zones = [
  { key: "flamingo", label: "FLAMINGO PARK", lx: 95, ly: 128, x: 60, y: 84, w: 240, h: 118 },
  { key: "elcid", label: "EL CID", lx: 420, ly: 292, x: 315, y: 222, w: 320, h: 112 },
  { key: "prospect", label: "PROSPECT PARK", lx: 372, ly: 402, x: 315, y: 344, w: 320, h: 84 },
  { key: "southland", label: "SOUTHLAND PARK", lx: 362, ly: 486, x: 315, y: 438, w: 320, h: 76 },
  { key: "soso", label: "SOSO — SOUTH OF SOUTHERN", lx: 258, ly: 566, x: 200, y: 532, w: 435, h: 232 },
] as const;

export default function ThePlot({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<string>("greymon-317");
  const [zone, setZone] = useState<string | null>(null);
  const p = bySlug(active);
  const d = zone ? districts.find((x) => x.key === zone) : null;
  const allSlugs = [...pins, ...laPins].map((x) => x.slug);
  const pick = (slug: string) => {
    setZone(null);
    setActive(slug);
  };

  /* One panel, two homes: pinned on the sheet (desktop), under it (mobile). */
  const panel = (
    <AnimatePresence mode="wait" initial={false}>
      {d ? (
        <motion.div
          key={`zone-${d.key}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="tag-index-ink">The district</p>
          <p className="display mt-2 text-2xl xl:text-3xl">{d.name}</p>
          <p className="label mt-2.5 leading-relaxed text-moss">{d.designation}</p>
          <p className="label mt-1 text-ink/45">{d.era}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink/75">{d.story}</p>
          <p className="mt-3 border-l-2 border-moss/50 pl-3 text-sm leading-relaxed text-ink/60">
            {d.gdrNote}
          </p>
          {d.slugs.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
              {d.slugs.map((slug) => {
                const item = bySlug(slug);
                if (!item) return null;
                return (
                  <Link
                    key={slug}
                    href={`/residences/${slug}`}
                    className="whitespace-nowrap border-b border-moss/50 pb-0.5 text-sm font-semibold text-moss transition-colors hover:border-ink hover:text-ink"
                  >
                    {item.address} →
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>
      ) : (
        p && (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/residences/${p.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={imgSrc(p.slug, 1)}
                  alt={`${p.address}, ${p.city}`}
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <StatusChip status={p.status} className="absolute left-3 top-3 z-10" />
              </div>
              <p className="display mt-4 text-2xl transition-colors group-hover:text-moss xl:text-3xl">
                {noWidow(p.address)}
              </p>
              <p className="label mt-1.5 text-ink/50">
                {p.neighborhood} · {p.city}
              </p>
              <p className="label mt-4 text-moss">See the residence →</p>
            </Link>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );

  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink md:py-32">
      <PalmShadow className="right-[-24%] top-[-6%] h-[440px] w-[440px] opacity-25 sm:right-[-14%] md:h-[640px] md:w-[640px]" flip />
      <div className="survey-ink pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {!compact && (
          <SectionHead
            tone="paper"
            index="01"
            tag="The Plot"
            lines={[
              "WHERE CONVICTION",
              <span key="l2">
                <em className="text-moss">concentrates.</em>
              </span>,
            ]}
            lede="One city, a handful of protected districts, and a collection that keeps landing on them. Touch a district for its history; touch a pin for a residence."
          />
        )}

        {/* the sheet — full width, note pinned on the water band */}
        <Reveal className={compact ? "" : "mt-14"}>
          <div className="relative border border-ink/15 bg-paper shadow-[0_30px_80px_rgba(11,14,9,0.12)]">
            {/* ── phones: the same survey, drawn portrait so it all fits ── */}
            <svg
              viewBox="0 0 420 790"
              className="block h-auto w-full lg:hidden"
              role="img"
              aria-label="Survey map of West Palm Beach districts with GDR residences"
            >
              <defs>
                <pattern id="waterM" width="9" height="9" patternUnits="userSpaceOnUse">
                  <path d="M 0 4.5 H 9" stroke="rgba(11,14,9,0.16)" strokeWidth="1" />
                </pattern>
              </defs>

              {/* the water, down the east edge */}
              <rect x="330" y="0" width="46" height="790" fill="url(#waterM)" stroke="rgba(11,14,9,0.28)" strokeWidth="1.2" />
              <rect x="376" y="0" width="30" height="790" fill="#f3f5ed" stroke="rgba(11,14,9,0.32)" strokeWidth="1.2" />
              <rect x="406" y="0" width="14" height="790" fill="url(#waterM)" />
              <text x="345" y="250" fill="rgba(11,14,9,0.45)" fontSize="11" letterSpacing="0.26em" transform="rotate(90 345 250)" fontFamily="var(--font-instrument-sans)">
                INTRACOASTAL
              </text>
              <text x="393" y="520" fill="rgba(11,14,9,0.5)" fontSize="11" letterSpacing="0.26em" transform="rotate(90 393 520)" fontFamily="var(--font-instrument-sans)">
                PALM BEACH
              </text>

              {/* arteries */}
              <g stroke="rgba(11,14,9,0.22)" strokeWidth="1.6" fill="none">
                <path d="M 60 20 V 770" />
                <path d="M 150 20 V 770" />
                <path d="M 316 20 V 770" strokeWidth="1.2" />
                <path d="M 20 160 H 330" />
                <path d="M 20 486 H 420" strokeWidth="2.2" />
              </g>
              <g fill="rgba(11,14,9,0.42)" fontSize="10" letterSpacing="0.18em" fontFamily="var(--font-instrument-sans)">
                <text x="26" y="152">BELVEDERE RD</text>
                <text x="26" y="478">SOUTHERN BLVD</text>
                <text x="146" y="330" transform="rotate(90 146 330)">S OLIVE AVE</text>
                <text x="312" y="120" transform="rotate(90 312 120)">S FLAGLER DR</text>
              </g>

              {/* the districts, stacked the way the city actually runs */}
              {[
                { key: "flamingo", label: "FLAMINGO PARK", y: 44, h: 100 },
                { key: "elcid", label: "EL CID", y: 186, h: 92 },
                { key: "prospect", label: "PROSPECT PARK", y: 292, h: 78 },
                { key: "southland", label: "SOUTHLAND PARK", y: 384, h: 82 },
                { key: "soso", label: "SOSO", sub: "SOUTH OF SOUTHERN", y: 506, h: 200 },
              ].map((z) => {
                const on = zone === z.key;
                return (
                  <g key={z.key} className="cursor-pointer" onClick={() => setZone(z.key)}>
                    <rect
                      x="70"
                      y={z.y}
                      width="240"
                      height={z.h}
                      fill={on ? "rgba(137,191,88,0.26)" : "rgba(137,191,88,0.11)"}
                      stroke={on ? "rgba(71,118,31,0.65)" : "rgba(71,118,31,0.3)"}
                      strokeWidth={on ? "1.8" : "1"}
                      strokeDasharray="5 4"
                    />
                    <text
                      x="190"
                      y={z.y + (z.sub ? z.h / 2 - 8 : z.h / 2 + 5)}
                      textAnchor="middle"
                      fill="rgba(71,118,31,0.95)"
                      fontSize="15"
                      letterSpacing="0.2em"
                      fontWeight="600"
                      fontFamily="var(--font-instrument-sans)"
                    >
                      {z.label}
                    </text>
                    {z.sub && (
                      <text
                        x="190"
                        y={z.y + z.h / 2 + 12}
                        textAnchor="middle"
                        fill="rgba(71,118,31,0.6)"
                        fontSize="10"
                        letterSpacing="0.22em"
                        fontFamily="var(--font-instrument-sans)"
                      >
                        {z.sub}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Greymon Dr, running through SoSo */}
              <path d="M 80 640 H 300" stroke="rgba(11,14,9,0.2)" strokeWidth="1.2" />
              <text x="82" y="614" fill="rgba(11,14,9,0.4)" fontSize="9" letterSpacing="0.16em" fontFamily="var(--font-instrument-sans)">
                GREYMON DR
              </text>

              {/* the pins — thumb-sized */}
              {[
                { slug: "kanuga-707", x: 120, y: 108 },
                { slug: "washington-3609", x: 286, y: 452 },
                { slug: "greymon-227", x: 268, y: 640 },
                { slug: "greymon-309", x: 224, y: 640 },
                { slug: "greymon-317", x: 180, y: 640 },
                { slug: "greymon-335", x: 136, y: 640 },
              ].map((pin) => {
                const on = active === pin.slug && !zone;
                return (
                  <g
                    key={pin.slug}
                    transform={`translate(${pin.x} ${pin.y})`}
                    className="cursor-pointer"
                    onClick={() => pick(pin.slug)}
                  >
                    {on && (
                      <rect x="-16" y="-16" width="32" height="32" transform="rotate(45)" fill="none" stroke="#47761f" strokeWidth="1.6" opacity="0.6">
                        <animate attributeName="opacity" values="0.7;0.15;0.7" dur="2s" repeatCount="indefinite" />
                      </rect>
                    )}
                    <rect x="-9" y="-9" width="18" height="18" transform="rotate(45)" fill={on ? "#47761f" : "#89bf58"} stroke="#f3f5ed" strokeWidth="2" />
                    <circle r="30" fill="transparent" />
                  </g>
                );
              })}

              {/* California, as a footnote strip */}
              <g onClick={() => pick("linda-flora-2179")} className="cursor-pointer">
                <rect x="20" y="724" width="290" height="52" fill="none" stroke="rgba(11,14,9,0.18)" strokeWidth="1" />
                <text x="32" y="744" fill="rgba(11,14,9,0.45)" fontSize="9" letterSpacing="0.2em" fontFamily="var(--font-instrument-sans)">
                  SELECT PROJECTS — CALIFORNIA
                </text>
                <text x="32" y="765" fill="rgba(71,118,31,0.9)" fontSize="11" letterSpacing="0.16em" fontWeight="600" fontFamily="var(--font-instrument-sans)">
                  BEL AIR
                </text>
                <text x="150" y="765" fill="rgba(71,118,31,0.9)" fontSize="11" letterSpacing="0.16em" fontWeight="600" fontFamily="var(--font-instrument-sans)">
                  HOLLYWOOD HILLS
                </text>
                <rect x="112" y="754" width="11" height="11" transform="rotate(45 117.5 759.5)" fill="#89bf58" stroke="#f3f5ed" strokeWidth="1.6" />
                <rect x="286" y="754" width="11" height="11" transform="rotate(45 291.5 759.5)" fill="#89bf58" stroke="#f3f5ed" strokeWidth="1.6" />
              </g>

              {/* title block */}
              <g fontFamily="var(--font-instrument-sans)">
                <text x="330" y="748" fill="rgba(11,14,9,0.55)" fontSize="9" letterSpacing="0.16em" fontWeight="600">
                  GDR
                </text>
                <text x="330" y="764" fill="rgba(11,14,9,0.35)" fontSize="8" letterSpacing="0.14em">
                  SURVEY
                </text>
              </g>
            </svg>

            {/* ── desktop: the wide sheet, untouched ── */}
            <div className="hidden lg:block">
            <svg viewBox="0 0 900 840" className="block h-auto w-full lg:max-h-[78vh]" role="img" aria-label="Diagrammatic survey map of West Palm Beach with GDR residences pinned">
              <defs>
                <pattern id="water" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 0 5 H 10" stroke="rgba(11,14,9,0.16)" strokeWidth="1" />
                </pattern>
              </defs>

              {/* neighborhood zones — the tinted claims */}
              {zones.map((z) => (
                <g
                  key={z.key}
                  className="cursor-pointer"
                  onClick={() => setZone(z.key)}
                  onMouseEnter={() => setZone(z.key)}
                >
                  <rect
                    x={z.x}
                    y={z.y}
                    width={z.w}
                    height={z.h}
                    fill={zone === z.key ? "rgba(137,191,88,0.22)" : "rgba(137,191,88,0.10)"}
                    stroke={zone === z.key ? "rgba(71,118,31,0.6)" : "rgba(71,118,31,0.28)"}
                    strokeWidth={zone === z.key ? "1.6" : "1"}
                    strokeDasharray="5 4"
                  />
                  <text
                    x={z.lx}
                    y={z.ly}
                    fill="rgba(71,118,31,0.9)"
                    fontSize="16"
                    letterSpacing="0.22em"
                    fontWeight="600"
                    fontFamily="var(--font-instrument-sans)"
                  >
                    {z.label}
                  </text>
                </g>
              ))}

              {/* cross-street texture */}
              <g stroke="rgba(11,14,9,0.10)" strokeWidth="1.2" fill="none">
                <path d="M 150 130 H 640 M 150 172 H 640" />
                <path d="M 315 262 H 640 M 315 300 H 640 M 315 382 H 640 M 315 462 H 640" />
                <path d="M 200 572 H 640 M 200 608 H 640 M 200 644 H 640 M 200 680 H 640 M 200 716 H 640 M 200 752 H 640" />
              </g>

              {/* arteries */}
              <g stroke="rgba(11,14,9,0.28)" strokeWidth="2" fill="none">
                <path d="M 150 40 C 158 300, 148 600, 156 840" />
                <path d="M 300 40 C 306 300, 298 600, 304 840" />
                <path d="M 645 60 C 636 240, 656 520, 642 700 C 636 760, 646 800, 642 840" strokeWidth="1.5" />
                <path d="M 40 210 H 690" />
                <path d="M 40 522 H 900" strokeWidth="2.5" />
              </g>
              <g fill="rgba(11,14,9,0.45)" fontSize="13" letterSpacing="0.22em" fontFamily="var(--font-instrument-sans)">
                <text x="138" y="70" transform="rotate(90 138 70)">S DIXIE HWY</text>
                <text x="292" y="330" transform="rotate(90 292 330)">S OLIVE AVE</text>
                <text x="633" y="90" transform="rotate(90 633 90)">S FLAGLER DR</text>
                <text x="46" y="200">BELVEDERE RD</text>
                <text x="46" y="512">SOUTHERN BLVD</text>
                <text x="222" y="650" fontSize="11" fill="rgba(11,14,9,0.4)">GREYMON DR</text>
              </g>

              {/* the district's real side streets, named faint */}
              <g fill="rgba(11,14,9,0.32)" fontSize="9" letterSpacing="0.16em" fontFamily="var(--font-instrument-sans)">
                <text x="322" y="258">DYER RD</text>
                <text x="322" y="296">PERSHING WAY</text>
                <text x="500" y="258">GRANADA RD</text>
                <text x="500" y="296">VALENCIA RD</text>
                <text x="322" y="378">MONCEAUX RD</text>
                <text x="500" y="378">NOTTINGHAM BLVD</text>
                <text x="206" y="688">PILGRIM RD</text>
              </g>
              <path d="M 108 84 C 112 130, 106 170, 110 205" stroke="rgba(11,14,9,0.14)" strokeWidth="1.2" fill="none" />

              {/* sheet margin ticks — a working drawing, not a diagram */}
              <g stroke="rgba(11,14,9,0.25)" strokeWidth="1">
                <path d="M 12 12 H 888 M 12 828 H 888 M 12 12 V 828 M 888 12 V 828" fill="none" opacity="0.6" />
                <path d="M 100 12 v 7 M 200 12 v 7 M 300 12 v 7 M 400 12 v 7 M 500 12 v 7 M 600 12 v 7 M 700 12 v 7 M 800 12 v 7" />
                <path d="M 100 828 v -7 M 200 828 v -7 M 300 828 v -7 M 400 828 v -7 M 500 828 v -7 M 600 828 v -7 M 700 828 v -7 M 800 828 v -7" />
                <path d="M 12 100 h 7 M 12 200 h 7 M 12 300 h 7 M 12 400 h 7 M 12 500 h 7 M 12 600 h 7 M 12 700 h 7" />
                <path d="M 888 100 h -7 M 888 200 h -7 M 888 300 h -7 M 888 400 h -7 M 888 600 h -7 M 888 700 h -7" />
              </g>

              {/* seawall docks + hulls — the Intracoastal working */}
              <g stroke="rgba(11,14,9,0.35)" strokeWidth="1.5" fill="none">
                <path d="M 688 130 h 16 m -16 44 h 12 m -12 210 h 16 m -14 260 h 13" />
                <path d="M 692 176 h 10 m -6 -6 v 12" opacity="0.7" />
              </g>
              <g fill="rgba(11,14,9,0.3)">
                <ellipse cx="722" cy="150" rx="7" ry="2.4" />
                <ellipse cx="748" cy="300" rx="6" ry="2.2" transform="rotate(14 748 300)" />
                <ellipse cx="726" cy="590" rx="7" ry="2.4" transform="rotate(-10 726 590)" />
                <ellipse cx="752" cy="700" rx="5" ry="2" />
              </g>
              {/* the current — alive, drifting south */}
              <path
                d="M 736 6 C 726 140, 744 300, 732 460 C 726 560, 738 650, 734 726"
                stroke="rgba(71,118,31,0.3)"
                strokeWidth="1.5"
                strokeDasharray="3 10"
                fill="none"
                className="dash-flow"
              />

              {/* palms along the water — hand-set, rooted */}
              <g stroke="rgba(11,14,9,0.4)" strokeWidth="1.3" fill="none" strokeLinecap="round">
                {[
                  [668, 118], [676, 250], [664, 388], [672, 606], [668, 742],
                  [806, 120], [800, 360], [808, 560], [802, 758],
                ].map(([px, py], idx) => (
                  <g key={idx} transform={`translate(${px} ${py})`}>
                    <path d="M 0 0 v 9" />
                    <path d="M 0 0 c -5 -4 -9 -4 -12 -2 M 0 0 c -3 -6 -7 -8 -11 -8 M 0 0 c 0 -7 3 -10 7 -11 M 0 0 c 5 -5 9 -5 12 -3 M 0 0 c 3 -4 8 -5 11 -3" />
                  </g>
                ))}
              </g>

              {/* the bridge, pointed home */}
              <text x="700" y="514" fill="rgba(11,14,9,0.45)" fontSize="9" letterSpacing="0.16em" fontFamily="var(--font-instrument-sans)">
                TO PALM BEACH →
              </text>

              {/* the green at Prospect Park's heart */}
              <g transform="translate(475 415)">
                <circle r="7" fill="none" stroke="rgba(71,118,31,0.5)" strokeWidth="1.2" />
                <circle r="2.4" fill="rgba(71,118,31,0.45)" />
              </g>

              {/* the water — the sheet's margin, where the note gets pinned */}
              <path
                d="M 690 0 C 676 140, 700 320, 686 520 C 676 680, 694 760, 688 840 L 780 840 L 780 0 Z"
                fill="url(#water)"
                stroke="rgba(11,14,9,0.28)"
                strokeWidth="1.5"
              />
              <path
                d="M 780 0 L 848 0 C 860 200, 852 480, 862 700 C 866 760, 860 800, 864 840 L 780 840 Z"
                fill="#f3f5ed"
                stroke="rgba(11,14,9,0.35)"
                strokeWidth="1.5"
              />
              <path
                d="M 848 0 C 860 200, 852 480, 862 700 C 866 760, 860 800, 864 840 L 900 840 L 900 0 Z"
                fill="url(#water)"
                stroke="rgba(11,14,9,0.28)"
                strokeWidth="1.5"
              />
              <text x="712" y="640" fill="rgba(11,14,9,0.5)" fontSize="13" letterSpacing="0.28em" transform="rotate(90 712 640)" fontFamily="var(--font-instrument-sans)">
                INTRACOASTAL
              </text>
              <text x="822" y="660" fill="rgba(11,14,9,0.6)" fontSize="13" letterSpacing="0.28em" transform="rotate(90 822 660)" fontFamily="var(--font-instrument-sans)">
                PALM BEACH
              </text>
              <path d="M 690 522 H 780" stroke="rgba(11,14,9,0.35)" strokeWidth="3" />

              {/* the pins */}
              {pins.map((pin) => {
                const isActive = active === pin.slug && !zone;
                return (
                  <g
                    key={pin.slug}
                    transform={`translate(${pin.x} ${pin.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => pick(pin.slug)}
                    onClick={() => pick(pin.slug)}
                  >
                    <g className="plot-pin">
                    {isActive && (
                      <rect x="-15" y="-15" width="30" height="30" transform="rotate(45)" fill="none" stroke="#47761f" strokeWidth="1.5" opacity="0.6">
                        <animate attributeName="opacity" values="0.7;0.15;0.7" dur="2s" repeatCount="indefinite" />
                      </rect>
                    )}
                    <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)" fill={isActive ? "#47761f" : "#89bf58"} stroke="#f3f5ed" strokeWidth="2" />
                    <circle r="32" fill="transparent" />
                    </g>
                  </g>
                );
              })}

              {/* title block */}
              <g fontFamily="var(--font-instrument-sans)">
                <rect x="668" y="738" width="212" height="82" fill="#f3f5ed" stroke="rgba(11,14,9,0.3)" strokeWidth="1.2" />
                <path d="M 668 764 H 880 M 668 792 H 880" stroke="rgba(11,14,9,0.2)" strokeWidth="1" />
                <text x="680" y="756" fill="rgba(11,14,9,0.65)" fontSize="12" letterSpacing="0.18em" fontWeight="600">GDR DEVELOPMENT</text>
                <text x="680" y="784" fill="rgba(11,14,9,0.45)" fontSize="11" letterSpacing="0.16em">SURVEY OF WORK — WPB</text>
                <text x="680" y="812" fill="rgba(11,14,9,0.4)" fontSize="10" letterSpacing="0.14em">DIAGRAMMATIC · NOT TO SCALE</text>
                <g transform="translate(858 60)">
                  <path d="M 0 16 L 0 -12 M 0 -12 L -6 0 M 0 -12 L 6 0" stroke="rgba(11,14,9,0.55)" strokeWidth="2" fill="none" />
                  <text x="0" y="34" textAnchor="middle" fill="rgba(11,14,9,0.55)" fontSize="12" letterSpacing="0.2em">N</text>
                </g>
              </g>
            </svg>
            </div>

            {/* Los Angeles inset */}
            <div className="absolute bottom-4 left-4 hidden w-52 border border-ink/20 bg-paper/95 p-4 backdrop-blur-sm lg:block">
              <p className="label text-ink/50">Select projects — California</p>
              <svg viewBox="0 0 240 130" className="mt-2 block w-full">
                <path d="M 0 112 C 60 72, 110 88, 150 56 C 185 30, 215 40, 240 22" fill="none" stroke="rgba(11,14,9,0.3)" strokeWidth="2" />
                <text x="10" y="26" fill="rgba(71,118,31,0.85)" fontSize="13" letterSpacing="0.2em" fontWeight="600" fontFamily="var(--font-instrument-sans)">BEL AIR</text>
                <text x="232" y="122" textAnchor="end" fill="rgba(71,118,31,0.85)" fontSize="13" letterSpacing="0.2em" fontWeight="600" fontFamily="var(--font-instrument-sans)">HOLLYWOOD HILLS</text>
                {laPins.map((pin) => (
                  <g
                    key={pin.slug}
                    transform={`translate(${pin.x} ${pin.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => pick(pin.slug)}
                    onClick={() => pick(pin.slug)}
                  >
                    <rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" fill={active === pin.slug && !zone ? "#47761f" : "#89bf58"} stroke="#f3f5ed" strokeWidth="2" />
                    <circle r="17" fill="transparent" />
                  </g>
                ))}
              </svg>
            </div>

            {/* the surveyor's note — pinned to the sheet (desktop) */}
            <div className="absolute right-4 top-4 hidden w-[340px] border border-ink/20 bg-paper p-5 shadow-[0_18px_50px_rgba(11,14,9,0.18)] lg:block xl:right-6 xl:top-6 xl:w-[380px]">
              <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border border-ink/20 bg-green" aria-hidden />
              {panel}
            </div>
          </div>
        </Reveal>

        <p className="label mt-3 text-ink/40 lg:hidden">Tap a district or a pin</p>

        {/* the note, in flow, for phones */}
        <Reveal className="mt-8 border border-ink/15 bg-paper p-6 lg:hidden">{panel}</Reveal>

      </div>
    </section>
  );
}
