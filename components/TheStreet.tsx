"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import PalmShadow from "@/components/PalmShadow";
import { StatusChip } from "@/components/PropertyCard";
import { bySlug } from "@/lib/properties";
import { noWidow } from "@/lib/text";

/**
 * The Street — Greymon Drive as a plotted elevation you travel.
 * Four GDR projects on one street, in address order, strung along a
 * survey line with lot ticks. Drag or scroll sideways; the line is the UI.
 */
const stops = ["greymon-227", "greymon-309", "greymon-317", "greymon-335"] as const;

export default function TheStreet() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink md:py-32">
      <PalmShadow className="left-[-10%] top-[-6%] h-[420px] w-[420px] opacity-20 md:h-[600px] md:w-[600px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            tone="paper"
            index="04"
            tag="Greymon Drive"
            lines={[
              "ONE STREET.",
              <span key="l2">
                FOUR GDR <em className="text-moss">homes.</em>
              </span>,
            ]}
            lede="When we believe in a street, we don't buy once. Travel Greymon Drive — every stop is ours."
          />
          <Reveal>
            <p className="label hidden text-ink/40 lg:block">Drag sideways ⟷</p>
          </Reveal>
        </div>
      </div>

      <Reveal className="relative mt-14">
        {/* the street itself */}
        <div
          ref={scrollerRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-0 overflow-x-auto pb-6"
          style={{ scrollbarWidth: "none" }}
        >
          {/* lead-in: the street sign */}
          <div className="flex w-[14vw] min-w-[80px] shrink-0 items-end lg:w-[22vw]">
            <div className="relative h-px w-full bg-ink/25">
              <span className="absolute -top-14 left-5 label whitespace-nowrap text-ink/50 sm:left-8">
                Greymon Dr — SoSo, West Palm Beach
              </span>
            </div>
          </div>
          {stops.map((slug, i) => {
            const p = bySlug(slug);
            if (!p) return null;
            return (
              <div key={slug} className="flex shrink-0 snap-center items-end">
                {/* the lot */}
                <div className="w-[78vw] max-w-[560px] sm:w-[54vw] lg:w-[38vw]">
                  <Link href={`/residences/${slug}`} className="group block px-4 sm:px-6">
                    <div className="plate plate-ink">
                      <div className="relative aspect-[16/11] overflow-hidden">
                        <Image
                          src={`/properties/${slug}/01.webp`}
                          alt={`${p.address}, West Palm Beach`}
                          fill
                          sizes="(min-width: 1024px) 38vw, 78vw"
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
                  {/* the survey line under the lot */}
                  <div className="relative mt-6 h-px w-full bg-ink/25">
                    <span className="absolute -top-2 left-1/2 h-4 w-px -translate-x-1/2 bg-moss" />
                    <span className="absolute left-1/2 top-3 -translate-x-1/2 label whitespace-nowrap text-moss">
                      Lot {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {/* tail-out */}
          <div className="flex w-[24vw] min-w-[120px] shrink-0 items-end">
            <div className="relative h-px w-full bg-ink/25">
              <span className="absolute -top-14 right-5 label whitespace-nowrap text-ink/50">
                The next lot is already circled
              </span>
            </div>
          </div>
        </div>

        {/* progress line */}
        <div className="mx-auto mt-4 max-w-7xl px-5 md:px-8">
          <div className="h-px w-full bg-ink/10">
            <div className="h-px origin-left bg-moss transition-transform duration-150" style={{ transform: `scaleX(${Math.max(0.04, progress)})` }} />
          </div>
        </div>
      </Reveal>

      <div className="relative mx-auto mt-12 max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="text-ink/60">Also in the collection —</p>
          {["kanuga-707", "washington-3609", "linda-flora-2179", "marlay-1501"].map((slug) => {
            const p = bySlug(slug);
            if (!p) return null;
            return (
              <Link
                key={slug}
                href={`/residences/${slug}`}
                className="border-b border-ink/20 pb-0.5 text-sm font-semibold text-ink transition-colors hover:border-moss hover:text-moss"
              >
                {p.address}
              </Link>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
