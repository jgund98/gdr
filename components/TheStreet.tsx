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
import { bySlug, imgSrc } from "@/lib/properties";
import { noWidow } from "@/lib/text";

/**
 * The Collection — every residence on one slow, endless drive. A pure
 * transform marquee: nothing to grab, nothing to snap, nothing to drag out
 * of place. Touching or hovering pauses it; the arrows ease it along.
 * Content is doubled and the offset wraps at the halfway point.
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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const paused = useRef(false);
  const onScreen = useRef(true);
  const pos = useRef(0);
  const boost = useRef(0); // signed px still owed to an arrow press
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!onScreen.current) return;
      const half = track.scrollWidth / 2;
      if (half <= 0) return;
      if (!paused.current) pos.current += 0.55;
      if (boost.current !== 0) {
        const step = Math.sign(boost.current) * Math.min(Math.abs(boost.current), 16);
        pos.current += step;
        boost.current -= step;
      }
      // wrap into [0, half)
      pos.current = ((pos.current % half) + half) % half;
      track.style.transform = `translateX(${-pos.current}px)`;
    };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => (onScreen.current = e.isIntersecting));
    io.observe(track);

    const pause = () => (paused.current = true);
    const resume = () => (paused.current = false);
    const host = track.parentElement;
    if (host) {
      host.addEventListener("touchstart", pause, { passive: true });
      host.addEventListener("touchend", resume, { passive: true });
      host.addEventListener("touchcancel", resume, { passive: true });
      host.addEventListener("mouseenter", pause);
      host.addEventListener("mouseleave", resume);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      if (host) {
        host.removeEventListener("touchstart", pause);
        host.removeEventListener("touchend", resume);
        host.removeEventListener("touchcancel", resume);
        host.removeEventListener("mouseenter", pause);
        host.removeEventListener("mouseleave", resume);
      }
    };
  }, [reduced]);

  const nudge = (dir: 1 | -1) => {
    const host = trackRef.current?.parentElement;
    boost.current += dir * (host ? host.clientWidth * 0.55 : 420);
  };

  const lot = (slug: string, clone: boolean) => {
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
                  src={imgSrc(slug, 1)}
                  alt={clone ? "" : `${p.address}, ${p.city}`}
                  fill
                  sizes="(min-width: 1024px) 36vw, 80vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <StatusChip status={p.status} className="absolute left-4 top-4 z-10" />
              </div>
            </div>
            <div className="mt-6">
              <p className="display text-2xl transition-colors group-hover:text-moss md:text-3xl">
                {noWidow(p.address)}
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">{p.blurb}</p>
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
    <section className="relative overflow-hidden bg-paper py-16 text-ink md:py-32">
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
            lede="Every GDR residence, West Palm Beach to Los Angeles, gliding past in order. Tap any home to step inside."
          />
          <Reveal>
            <div className="hidden items-center gap-3 lg:flex">
              <p className="label text-ink/40">Hover to pause</p>
              <button
                type="button"
                aria-label="Back up the drive"
                onClick={() => nudge(-1)}
                className="flex h-11 w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:bg-moss hover:text-paper chamfer-sm"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Further along the drive"
                onClick={() => nudge(1)}
                className="flex h-11 w-11 items-center justify-center border border-ink/20 text-ink transition-colors hover:bg-moss hover:text-paper chamfer-sm"
              >
                →
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* the drive — overflow hidden, transform only */}
      <Reveal className="relative mt-10 overflow-hidden md:mt-14">
        <div ref={trackRef} className="flex w-max pb-6 will-change-transform">
          {stops.map((s) => lot(s, false))}
          {stops.map((s) => lot(s, true))}
        </div>
      </Reveal>

      <div className="relative mx-auto mt-10 max-w-7xl px-5 md:mt-12 md:px-8">
        <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Btn href="/residences">View All Residences</Btn>
          <p className="max-w-md text-sm leading-relaxed text-ink/50">
            The full collection, West Palm Beach and Los Angeles — every
            residence told in full.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
