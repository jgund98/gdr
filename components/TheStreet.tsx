"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import PalmShadow from "@/components/PalmShadow";
import Btn from "@/components/Btn";
import { StatusChip } from "@/components/PropertyCard";
import { bySlug } from "@/lib/properties";
import { noWidow } from "@/lib/text";

/**
 * The Street — Greymon Drive as an endless, unhurried glide past the four
 * GDR lots. It walks itself; hovering (or touching) pauses it, the arrows
 * skip ahead. Content is doubled and the scroll position wraps at the
 * halfway point, so the street never ends and nothing ever snaps.
 */
const stops = [
  "kanuga-707",
  "greymon-227",
  "greymon-309",
  "greymon-317",
  "greymon-335",
  "washington-3609",
  "linda-flora-2179",
  "marlay-1501",
] as const;

export default function TheStreet() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const paused = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const wrap = () => {
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft < 0) el.scrollLeft += half;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!paused.current && el.matches(":not(:hover)")) {
        el.scrollLeft += 0.6;
      }
      wrap();
    };
    raf = requestAnimationFrame(loop);
    const pause = () => (paused.current = true);
    const resume = () => (paused.current = false);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("pointerdown", pause);
    window.addEventListener("pointerup", resume);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("pointerdown", pause);
      window.removeEventListener("pointerup", resume);
    };
  }, [reduced]);

  const nudge = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.55, behavior: "smooth" });
  };

  const lot = (slug: string, i: number, clone: boolean) => {
    const p = bySlug(slug);
    if (!p) return null;
    return (
      <div
        key={`${slug}${clone ? "-b" : ""}`}
        className="flex shrink-0 items-end"
        aria-hidden={clone || undefined}
      >
        <div className="w-[80vw] max-w-[540px] sm:w-[52vw] lg:w-[36vw]">
          <Link href={`/residences/${slug}`} className="group block px-4 sm:px-6" tabIndex={clone ? -1 : undefined}>
            <div className="plate plate-ink">
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={`/properties/${slug}/01.webp`}
                  alt={clone ? "" : `${p.address}, West Palm Beach`}
                  fill
                  sizes="(min-width: 1024px) 36vw, 80vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <StatusChip status={p.status} className="absolute left-4 top-4 z-10" />
              </div>
            </div>
            <div className="mt-6 flex items-baseline gap-4">
              <span className="display text-4xl text-moss/40 md:text-5xl">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="display text-2xl transition-colors group-hover:text-moss md:text-3xl">
                  {noWidow(p.address)}
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">{p.blurb}</p>
              </div>
            </div>
          </Link>
          {/* the survey line under the lot — tagged with its neighborhood */}
          <div className="relative mt-6 h-px w-full bg-ink/25">
            <span className="absolute -top-2 left-1/2 h-4 w-px -translate-x-1/2 bg-moss" />
            <span className="absolute left-1/2 top-3 -translate-x-1/2 label whitespace-nowrap text-moss">
              {p.neighborhood.split("·")[0].trim()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink md:py-32">
      <PalmShadow className="left-[-26%] top-[-8%] h-[420px] w-[420px] opacity-20 sm:left-[-15%] md:h-[600px] md:w-[600px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            tone="paper"
            index="02"
            tag="The Collection"
            lines={[
              "THE COLLECTION,",
              <span key="l2">
                <em className="text-moss">one slow drive.</em>
              </span>,
            ]}
            lede="Every GDR residence, West Palm Beach to Los Angeles, gliding past in order. Tap any home to open its record."
          />
          <Reveal>
            <div className="hidden items-center gap-3 lg:flex">
              <p className="label text-ink/40">Hover to pause</p>
              <button
                type="button"
                aria-label="Back up Greymon Drive"
                onClick={() => nudge(-1)}
                className="flex h-11 w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:bg-moss hover:text-paper chamfer-sm"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Further down Greymon Drive"
                onClick={() => nudge(1)}
                className="flex h-11 w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:bg-moss hover:text-paper chamfer-sm"
              >
                →
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal className="relative mt-14">
        <div
          ref={scrollerRef}
          className="scrollbar-none flex overflow-x-auto pb-6"
          style={{ scrollbarWidth: "none" }}
        >
          {stops.map((s, i) => lot(s, i, false))}
          {stops.map((s, i) => lot(s, i, true))}
        </div>
      </Reveal>

      <div className="relative mx-auto mt-12 max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Btn href="/residences">View All Residences</Btn>
          <p className="max-w-md text-sm leading-relaxed text-ink/50">
            The full collection, West Palm Beach and Los Angeles — every
            residence with its record published.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
