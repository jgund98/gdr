"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { bySlug } from "@/lib/properties";

/**
 * The work, bled into the frame.
 *
 * Not a card floated over the video — a panel of the finished house that
 * runs off the right edge (the bottom edge on phones) and feathers into
 * the aerial through a soft mask, so the city and the house are one
 * photograph. Four residences cross-dissolve on a slow focus settle.
 *
 * A second, unmasked copy sits ready underneath: the descent fades it up
 * and the house becomes the entire frame. Opacity and transform only.
 */
/**
 * The four sharpest exteriors, used at their native resolution — never
 * re-cropped or upscaled, so the descent zoom stays crisp.
 *
 * `focus` is where the house actually sits across each frame. A phone crops
 * a landscape photograph very hard, and centre-cropping cuts the entry off
 * 309 and 3609 entirely, so each one carries its own focal point rather
 * than trusting the middle.
 */
const HOUSES = [
  { slug: "greymon-309", focus: "28%" },
  { slug: "kanuga-707", focus: "45%" },
  { slug: "washington-3609", focus: "32%" },
  { slug: "greymon-227", focus: "30%" },
] as const;
const ORDER = HOUSES.map((h) => h.slug);
const HOLD = 5200;

export default function HeroHouse({
  start = true,
  paused = false,
}: {
  start?: boolean;
  paused?: boolean;
}) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced || paused || !start) return;
    const t = setInterval(() => setI((v) => (v + 1) % ORDER.length), HOLD);
    return () => clearInterval(t);
  }, [reduced, paused, start]);

  const { slug, focus } = HOUSES[i];
  const next = HOUSES[(i + 1) % HOUSES.length];
  const p = bySlug(slug);
  if (!p) return null;

  return (
    <>
      {/* the panel — bled to the edges, feathered into the city */}
      <div className="house-bleed pointer-events-none absolute inset-x-0 bottom-0 h-[52%] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[58%]">
        <AnimatePresence>
          {/* opacity is React's (AnimatePresence needs it for the exit);
              the long settle is a CSS keyframe so it never touches the
              main thread while the visitor is scrolling */}
          <motion.div
            key={slug}
            className={reduced ? "absolute inset-0" : "house-settle absolute inset-0"}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.1, ease: "easeInOut" } }}
            transition={{ duration: 1.1 }}
          >
            <Image
              src={`/properties/${slug}/01.webp`}
              alt={`${p.address} — ${p.neighborhood}, ${p.city}`}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
              style={{ objectPosition: `${focus} 42%` }}
              priority={i === 0}
            />
          </motion.div>
        </AnimatePresence>
        {/* the next residence, fetched a beat early so a swap never pops in
            on a slow connection */}
        <div className="pointer-events-none absolute inset-0 opacity-0" aria-hidden>
          <Image
            src={`/properties/${next.slug}/01.webp`}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* the same house, unmasked — the descent brings it up to fill */}
      <div
        data-house-full
        className="pointer-events-none absolute inset-0 opacity-0 will-change-transform"
        aria-hidden
      >
        <Image
          src={`/properties/${slug}/01.webp`}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: `${focus} 45%` }}
        />
      </div>

      {/* the caption — a photographer's line, not a label slapped on a photo */}
      <motion.figcaption
        data-house-caption
        className="pointer-events-none absolute bottom-14 left-5 z-10 lg:bottom-16 lg:left-auto lg:right-8"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 2.2, duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slug}
            className="lg:text-right"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="display text-base text-paper [text-shadow:0_2px_16px_rgba(11,14,9,0.95)] md:text-lg">
              {p.address}
            </p>
            <p className="label mt-0.5 text-paper/90 [text-shadow:0_1px_3px_rgba(11,14,9,1),0_2px_16px_rgba(11,14,9,0.95)]">
              {p.neighborhood}&ensp;·&ensp;{p.status}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.figcaption>
    </>
  );
}
