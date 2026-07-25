"use client";

import { motion, useReducedMotion } from "motion/react";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import { FloorPlan } from "@/components/PlanArt";

/**
 * The Standard — what "developer-led" actually costs us, as six stamped
 * commitments. The checks draw themselves; the flip gets one line.
 */
const rows = [
  {
    title: "One design vision",
    body: "The same eye that bought the lot approves the last cabinet pull.",
  },
  {
    title: "The developer on site",
    body: "Not a project manager's project. His.",
  },
  {
    title: "Layouts for real living",
    body: "Circulation, light, storage — solved before finishes exist.",
  },
  {
    title: "Materials for decades",
    body: "If it won't look right in year twenty, it doesn't go in.",
  },
  {
    title: "A few releases a year",
    body: "Scarcity is the byproduct of standards.",
  },
  {
    title: "Structure first",
    body: "The invisible work is the expensive work. We do it anyway.",
  },
] as const;

export default function Standard() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink md:py-32">
      <div className="survey-ink pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      {/* the plan behind the standard — drawn as you arrive */}
      <div className="pointer-events-none absolute -right-24 top-10 hidden w-[560px] opacity-[0.16] lg:block xl:w-[640px]">
        <FloorPlan tone="ink" delay={0.2} />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          tone="paper"
          index="05"
          tag="The Standard"
          lines={[
            "ASK WHO'S",
            <span key="l2">
              <em className="text-moss">actually</em> BUILDING.
            </span>,
          ]}
          lede="Most renovated houses are a flip wearing new paint. A GDR home is a development project — run by the developer, in person, to a standard he signs."
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row, i) => (
            <Reveal key={row.title} delay={0.05 * i} className="bg-paper">
              <div className="group h-full p-7 transition-colors hover:bg-[#ecefe2] md:p-9">
                <div className="flex items-start justify-between gap-4">
                  <p className="label text-ink/40">{String(i + 1).padStart(2, "0")}</p>
                  <motion.svg width="26" height="26" viewBox="0 0 22 22" fill="none" aria-hidden className="text-moss">
                    <motion.path
                      d="M4 11.5 9 16.5 18 6"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="square"
                      initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ delay: 0.25 + 0.07 * i, duration: 0.45, ease: "easeOut" }}
                    />
                  </motion.svg>
                </div>
                <h3 className="display mt-5 text-2xl md:text-[1.7rem]">{row.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/60">{row.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <p className="lede text-ink/50">
            The typical flip does none of this. <em className="text-moss">That's the point.</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
