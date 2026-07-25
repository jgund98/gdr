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
 * The Plot — West Palm Beach as a working survey drawing. Ink linework,
 * hatched Intracoastal, and the collection pinned where it actually
 * concentrates. Point at a pin; the record swaps in. Diagrammatic on
 * purpose — this is a developer's drawing, not a realtor's map widget.
 */
const pins = [
  { slug: "kanuga-707", x: 250, y: 208 },
  { slug: "washington-3609", x: 468, y: 596 },
  { slug: "greymon-227", x: 398, y: 726 },
  { slug: "greymon-309", x: 442, y: 762 },
  { slug: "greymon-317", x: 486, y: 798 },
  { slug: "greymon-335", x: 530, y: 834 },
] as const;

const laPins = [
  { slug: "linda-flora-2179", x: 84, y: 64 },
  { slug: "marlay-1501", x: 176, y: 104 },
] as const;

export default function ThePlot({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<string>("greymon-317");
  const p = bySlug(active);

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

        <div className={cn("grid gap-10 lg:grid-cols-12", compact ? "" : "mt-14")}>
          {/* the drawing */}
          <Reveal className="lg:col-span-7">
            <div className="relative border border-ink/15 bg-paper shadow-[0_30px_80px_rgba(11,14,9,0.12)]">
              <svg viewBox="0 0 900 1060" className="block w-full" role="img" aria-label="Diagrammatic map of West Palm Beach with GDR residences pinned">
                <defs>
                  <pattern id="water" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 0 5 H 10" stroke="rgba(11,14,9,0.16)" strokeWidth="1" />
                  </pattern>
                </defs>

                {/* Intracoastal */}
                <path
                  d="M 588 0 C 570 120, 606 250, 588 380 C 572 500, 600 640, 586 780 C 576 900, 596 1000, 588 1060 L 730 1060 L 730 0 Z"
                  fill="url(#water)"
                  stroke="rgba(11,14,9,0.28)"
                  strokeWidth="1.5"
                />
                {/* Palm Beach island */}
                <path
                  d="M 730 0 L 820 0 C 836 180, 828 420, 842 640 C 852 800, 838 950, 846 1060 L 730 1060 Z"
                  fill="#f3f5ed"
                  stroke="rgba(11,14,9,0.35)"
                  strokeWidth="1.5"
                />
                {/* Atlantic */}
                <path
                  d="M 820 0 C 836 180, 828 420, 842 640 C 852 800, 838 950, 846 1060 L 900 1060 L 900 0 Z"
                  fill="url(#water)"
                  stroke="rgba(11,14,9,0.28)"
                  strokeWidth="1.5"
                />
                <text x="655" y="330" fill="rgba(11,14,9,0.5)" fontSize="15" letterSpacing="0.3em" transform="rotate(90 655 330)" fontFamily="var(--font-instrument-sans)">
                  INTRACOASTAL
                </text>
                <text x="788" y="500" fill="rgba(11,14,9,0.6)" fontSize="15" letterSpacing="0.3em" transform="rotate(90 788 500)" fontFamily="var(--font-instrument-sans)">
                  PALM BEACH
                </text>

                {/* arteries */}
                <g stroke="rgba(11,14,9,0.25)" strokeWidth="2" fill="none">
                  <path d="M 170 0 C 178 300, 168 700, 176 1060" />
                  <path d="M 300 0 C 306 300, 298 700, 304 1060" />
                  <path d="M 560 20 C 550 240, 576 520, 560 780 C 552 900, 566 990, 560 1060" strokeWidth="1.5" />
                  <path d="M 0 262 H 588" />
                  <path d="M 0 646 H 900" strokeWidth="2.5" />
                </g>
                {/* road labels */}
                <g fill="rgba(11,14,9,0.45)" fontSize="13" letterSpacing="0.22em" fontFamily="var(--font-instrument-sans)">
                  <text x="158" y="90" transform="rotate(90 158 90)">S DIXIE HWY</text>
                  <text x="292" y="420" transform="rotate(90 292 420)">S OLIVE AVE</text>
                  <text x="548" y="120" transform="rotate(90 548 120)">S FLAGLER DR</text>
                  <text x="14" y="252">BELVEDERE RD</text>
                  <text x="14" y="636">SOUTHERN BLVD</text>
                </g>

                {/* neighborhoods */}
                <g fill="rgba(71,118,31,0.85)" fontSize="16" letterSpacing="0.24em" fontFamily="var(--font-instrument-sans)" fontWeight="600">
                  <text x="120" y="180">FLAMINGO PARK</text>
                  <text x="360" y="330">EL CID</text>
                  <text x="330" y="480">PROSPECT PARK</text>
                  <text x="330" y="560">SOUTHLAND PARK</text>
                  <text x="250" y="740">SOSO — SOUTH OF SOUTHERN</text>
                </g>

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
                        <rect x="-16" y="-16" width="32" height="32" transform="rotate(45)" fill="none" stroke="#47761f" strokeWidth="1.5" opacity="0.6">
                          <animate attributeName="opacity" values="0.7;0.15;0.7" dur="2s" repeatCount="indefinite" />
                        </rect>
                      )}
                      <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)" fill={isActive ? "#47761f" : "#89bf58"} stroke="#f3f5ed" strokeWidth="2" />
                      {/* generous invisible hit area */}
                      <circle r="26" fill="transparent" />
                    </g>
                  );
                })}

                {/* plate furniture */}
                <g fontFamily="var(--font-instrument-sans)">
                  <text x="28" y="1020" fill="rgba(11,14,9,0.4)" fontSize="12" letterSpacing="0.22em">
                    DIAGRAMMATIC — NOT TO SCALE
                  </text>
                  <g transform="translate(850 60)">
                    <path d="M 0 18 L 0 -14 M 0 -14 L -7 0 M 0 -14 L 7 0" stroke="rgba(11,14,9,0.55)" strokeWidth="2" fill="none" />
                    <text x="0" y="38" textAnchor="middle" fill="rgba(11,14,9,0.55)" fontSize="13" letterSpacing="0.2em">N</text>
                  </g>
                </g>
              </svg>

              {/* Los Angeles inset */}
              <div className="absolute bottom-4 left-4 hidden w-56 border border-ink/20 bg-paper/95 p-4 backdrop-blur-sm sm:block">
                <p className="label text-ink/50">Select projects — California</p>
                <svg viewBox="0 0 240 140" className="mt-2 block w-full">
                  <path d="M 0 120 C 60 78, 110 96, 150 62 C 185 34, 215 44, 240 26" fill="none" stroke="rgba(11,14,9,0.3)" strokeWidth="2" />
                  <text x="10" y="30" fill="rgba(71,118,31,0.85)" fontSize="13" letterSpacing="0.2em" fontWeight="600" fontFamily="var(--font-instrument-sans)">BEL AIR</text>
                  <text x="232" y="128" textAnchor="end" fill="rgba(71,118,31,0.85)" fontSize="13" letterSpacing="0.2em" fontWeight="600" fontFamily="var(--font-instrument-sans)">HOLLYWOOD HILLS</text>
                  {laPins.map((pin) => (
                    <g
                      key={pin.slug}
                      transform={`translate(${pin.x} ${pin.y})`}
                      className="cursor-pointer"
                      onMouseEnter={() => setActive(pin.slug)}
                      onClick={() => setActive(pin.slug)}
                    >
                      <rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" fill={active === pin.slug ? "#47761f" : "#89bf58"} stroke="#f3f5ed" strokeWidth="2" />
                      <circle r="18" fill="transparent" />
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </Reveal>

          {/* the record panel */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
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
                    <p className="display mt-7 text-3xl md:text-4xl">{noWidow(p.address)}</p>
                    <p className="label mt-2 text-ink/50">
                      {p.neighborhood} · {p.city}
                    </p>
                    <p className="mt-4 max-w-md leading-relaxed text-ink/70">{p.blurb}</p>
                    <Link
                      href={`/residences/${p.slug}`}
                      className="mt-6 inline-block border-b border-moss pb-1 text-sm font-semibold text-moss transition-colors hover:border-ink hover:text-ink"
                    >
                      Open the record →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
