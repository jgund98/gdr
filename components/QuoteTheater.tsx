"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/Reveal";
import PalmShadow from "@/components/PalmShadow";
import { FloorPlan } from "@/components/PlanArt";

/** Verbatim buyer statements published by GDR — no invented names, no stock faces. */
const words = [
  {
    quote:
      "The house looks like it belongs on the street, but it lives like a new residence inside.",
    tag: "A GDR buyer — on a completed rebuild",
  },
  {
    quote:
      "Working directly with the developer meant we understood every decision behind the rebuild.",
    tag: "A GDR buyer — on buying direct",
  },
  {
    quote:
      "The most organized experience we've had purchasing a home. Nothing felt unclear.",
    tag: "A GDR buyer — on the process",
  },
] as const;

export default function QuoteTheater() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 7500);
    return () => clearInterval(t);
  }, [reduced]);

  const w = words[i];

  return (
    <section className="relative overflow-hidden bg-paper py-28 text-ink md:py-36">
      <PalmShadow className="bottom-[-8%] right-[-6%] h-[380px] w-[380px] opacity-20 md:h-[560px] md:w-[560px]" flip delay={2} />
      {/* the plan under the words */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[760px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]">
        <FloorPlan tone="ink" />
      </div>
      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        <Reveal>
          <p className="tag-index-ink">07 — Buyer Words</p>
        </Reveal>
        <div className="relative mt-10 flex min-h-[16rem] items-center justify-center md:min-h-[15rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-serif text-3xl italic leading-snug text-ink sm:text-4xl md:text-[2.9rem]">
                &ldquo;{w.quote}&rdquo;
              </blockquote>
              <figcaption className="label mt-8 text-ink/45">{w.tag}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex justify-center gap-3">
          {words.map((_, d) => (
            <button
              key={d}
              type="button"
              aria-label={`Quote ${d + 1}`}
              onClick={() => setI(d)}
              className={`h-2.5 w-2.5 rotate-45 transition-colors ${d === i ? "bg-moss" : "bg-ink/20 hover:bg-ink/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
