"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import PalmShadow from "@/components/PalmShadow";
import { StatusChip } from "@/components/PropertyCard";
import { bySlug } from "@/lib/properties";
import { noWidow } from "@/lib/text";
import { cn } from "@/lib/cn";

/**
 * The Plot — West Palm Beach as a working survey drawing. Tinted
 * neighborhood zones, ink linework, a narrow band of water, and the
 * collection pinned where it actually concentrates. Point at a pin or a
 * row; the record swaps in. Diagrammatic on purpose — this is a
 * developer's drawing, not a realtor's map widget.
 */
const pins = [
  { slug: "kanuga-707", x: 200, y: 152 },
  { slug: "washington-3609", x: 508, y: 478 },
  { slug: "greymon-227", x: 360, y: 600 },
  { slug: "greymon-309", x: 412, y: 636 },
  { slug: "greymon-317", x: 464, y: 672 },
  { slug: "greymon-335", x: 516, y: 708 },
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
  const p = bySlug(active);
  const allSlugs = [...pins, ...laPins].map((x) => x.slug);

  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink md:py-32">
      <PalmShadow className="right-[-8%] top-[-4%] h-[440px] w-[440px] opacity-25 md:h-[640px] md:w-[640px]" flip />
      <div className="survey-ink pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {!compact && (
          <SectionHead
            tone="paper"
            index="02"
            tag="The Plot"
            lines={[
              "WHERE CONVICTION",
              <span key="l2">
                <em className="text-moss">concentrates.</em>
              </span>,
            ]}
            lede="One city, a handful of protected streets, and a collection that keeps landing on them. This is the drawing we actually work from."
          />
        )}

        <div className={cn("grid gap-10 lg:grid-cols-2", compact ? "" : "mt-14")}>
          {/* the drawing */}
          <Reveal>
            <div className="relative border border-ink/15 bg-paper shadow-[0_30px_80px_rgba(11,14,9,0.12)]">
              <svg viewBox="0 0 900 840" className="block w-full" role="img" aria-label="Diagrammatic survey map of West Palm Beach with GDR residences pinned">
                <defs>
                  <pattern id="water" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 0 5 H 10" stroke="rgba(11,14,9,0.16)" strokeWidth="1" />
                  </pattern>
                </defs>

                {/* neighborhood zones — the tinted claims */}
                {zones.map((z) => (
                  <g key={z.key}>
                    <rect
                      x={z.x}
                      y={z.y}
                      width={z.w}
                      height={z.h}
                      fill="rgba(137,191,88,0.10)"
                      stroke="rgba(71,118,31,0.28)"
                      strokeWidth="1"
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
                </g>

                {/* the water — a working edge, not a void */}
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
                <text x="712" y="250" fill="rgba(11,14,9,0.5)" fontSize="13" letterSpacing="0.28em" transform="rotate(90 712 250)" fontFamily="var(--font-instrument-sans)">
                  INTRACOASTAL
                </text>
                <text x="822" y="330" fill="rgba(11,14,9,0.6)" fontSize="13" letterSpacing="0.28em" transform="rotate(90 822 330)" fontFamily="var(--font-instrument-sans)">
                  PALM BEACH
                </text>
                {/* Southern Blvd bridge */}
                <path d="M 690 522 H 780" stroke="rgba(11,14,9,0.35)" strokeWidth="3" />

                {/* the pins */}
                {pins.map((pin) => {
                  const isActive = active === pin.slug;
                  return (
                    <g
                      key={pin.slug}
                      transform={`translate(${pin.x} ${pin.y})`}
                      className="cursor-pointer"
                      onMouseEnter={() => setActive(pin.slug)}
                      onClick={() => setActive(pin.slug)}
                    >
                      {isActive && (
                        <rect x="-15" y="-15" width="30" height="30" transform="rotate(45)" fill="none" stroke="#47761f" strokeWidth="1.5" opacity="0.6">
                          <animate attributeName="opacity" values="0.7;0.15;0.7" dur="2s" repeatCount="indefinite" />
                        </rect>
                      )}
                      <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)" fill={isActive ? "#47761f" : "#89bf58"} stroke="#f3f5ed" strokeWidth="2" />
                      <circle r="25" fill="transparent" />
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

              {/* Los Angeles inset */}
              <div className="absolute bottom-4 left-4 hidden w-52 border border-ink/20 bg-paper/95 p-4 backdrop-blur-sm sm:block">
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
                      onMouseEnter={() => setActive(pin.slug)}
                      onClick={() => setActive(pin.slug)}
                    >
                      <rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" fill={active === pin.slug ? "#47761f" : "#89bf58"} stroke="#f3f5ed" strokeWidth="2" />
                      <circle r="17" fill="transparent" />
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </Reveal>

          {/* the record panel + the index — the twin sheet */}
          <div>
            <div className="flex h-full flex-col border border-ink/15 bg-paper p-6 shadow-[0_30px_80px_rgba(11,14,9,0.12)] md:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {p && (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="plate plate-ink">
                      <Link href={`/residences/${p.slug}`} className="group block">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={`/properties/${p.slug}/01.webp`}
                            alt={`${p.address}, ${p.city}`}
                            fill
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                          <StatusChip status={p.status} className="absolute left-4 top-4 z-10" />
                        </div>
                      </Link>
                    </div>
                    <p className="display mt-6 text-3xl md:text-4xl">{noWidow(p.address)}</p>
                    <p className="label mt-2 text-ink/50">
                      {p.neighborhood} · {p.city}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* the index — every pin, one row each */}
              <ul className="mt-8 flex-1 border-t border-ink/15">
                {allSlugs.map((slug) => {
                  const item = bySlug(slug);
                  if (!item) return null;
                  const isActive = active === slug;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/residences/${slug}`}
                        onMouseEnter={() => setActive(slug)}
                        onFocus={() => setActive(slug)}
                        className={cn(
                          "flex items-baseline justify-between gap-4 border-b border-ink/10 py-3 transition-colors",
                          isActive ? "text-moss" : "text-ink/70 hover:text-ink"
                        )}
                      >
                        <span className="flex items-baseline gap-3">
                          <span
                            className={cn("h-2 w-2 shrink-0 -translate-y-px rotate-45", isActive ? "bg-moss" : "bg-ink/25")}
                            aria-hidden
                          />
                          <span className="font-semibold">{noWidow(item.address)}</span>
                        </span>
                        <span className="label shrink-0 text-ink/40">{item.status}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
