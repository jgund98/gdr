"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Mark from "@/components/Mark";
import Btn from "@/components/Btn";
import { cn } from "@/lib/cn";

/**
 * The Board — the whole practice in one drawing. A floorplan drafts itself
 * flat on the ground, risers extrude from its corners, the elevation draws
 * itself line by line, the developer stamps it — and the delivered house
 * appears beside the drawing that started it. Pure vector choreography;
 * every stroke is a GPU-cheap pathLength draw.
 */
const STAGES = [
  { key: "draw", label: "Draw", at: 0 },
  { key: "raise", label: "Raise", at: 2.1 },
  { key: "detail", label: "Detail", at: 3.6 },
  { key: "deliver", label: "Deliver", at: 5.1 },
] as const;

const TOTAL = 6.2;

function Strokes({ delay = 0 }: { delay?: number }) {
  // Every path draws in sequence; delays are authored like a plotter run.
  const P = ({
    d,
    at,
    dur = 0.6,
    w = 2.2,
    dash,
    className,
  }: {
    d: string;
    at: number;
    dur?: number;
    w?: number;
    dash?: string;
    className?: string;
  }) => (
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth={w}
      strokeDasharray={dash}
      fill="none"
      className={className}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: delay + at, duration: dur, ease: "easeInOut" }}
    />
  );

  return (
    <svg viewBox="0 0 800 620" fill="none" className="block h-auto w-full text-green" aria-hidden>
      {/* the ground */}
      <P d="M 40 560 H 760" at={0} dur={0.7} w={2.6} />
      <P d="M 60 578 l 26 -12 M 110 578 l 26 -12 M 160 578 l 26 -12 M 210 578 l 26 -12 M 260 578 l 26 -12 M 310 578 l 26 -12 M 360 578 l 26 -12 M 410 578 l 26 -12 M 460 578 l 26 -12 M 510 578 l 26 -12 M 560 578 l 26 -12 M 610 578 l 26 -12 M 660 578 l 26 -12 M 710 578 l 26 -12" at={0.25} dur={0.7} w={1.1} className="opacity-50" />

      {/* the plan, laid on the ground (drawn in perspective) */}
      <g className="opacity-80">
        {/* outer plan parallelogram */}
        <P d="M 230 556 L 330 470 L 640 470 L 560 556 Z" at={0.7} dur={0.9} w={1.8} />
        {/* interior walls */}
        <P d="M 420 470 L 352 542" at={1.35} dur={0.4} w={1.3} />
        <P d="M 300 500 L 560 500" at={1.5} dur={0.45} w={1.3} />
        {/* door swing on the plan */}
        <P d="M 470 528 a 30 18 0 0 1 -34 14" at={1.75} dur={0.35} w={1.1} />
      </g>

      {/* risers — the corners come up */}
      <P d="M 230 556 V 300" at={2.1} dur={0.45} w={1.4} dash="5 6" />
      <P d="M 560 556 V 300" at={2.2} dur={0.45} w={1.4} dash="5 6" />
      <P d="M 330 470 V 236" at={2.3} dur={0.45} w={1.4} dash="5 6" />
      <P d="M 640 470 V 236" at={2.4} dur={0.45} w={1.4} dash="5 6" />

      {/* the elevation draws itself */}
      <P d="M 230 556 V 330 L 560 330 L 560 556" at={2.7} dur={0.8} w={2.6} />
      {/* gable */}
      <P d="M 214 330 L 395 210 L 576 330" at={3.1} dur={0.7} w={2.6} />
      {/* door */}
      <P d="M 368 556 V 440 H 424 V 556" at={3.6} dur={0.5} w={2} />
      {/* windows */}
      <P d="M 264 452 H 330 V 530 H 264 Z" at={3.8} dur={0.5} w={2} />
      <P d="M 460 452 H 526 V 530 H 460 Z" at={3.9} dur={0.5} w={2} />
      <P d="M 297 452 V 530 M 264 491 H 330" at={4.15} dur={0.35} w={1.1} />
      <P d="M 493 452 V 530 M 460 491 H 526" at={4.25} dur={0.35} w={1.1} />
      {/* attic vent + chimney */}
      <P d="M 395 250 m -18 44 h 36 l -18 -30 Z" at={4.35} dur={0.4} w={1.4} />
      <P d="M 476 262 V 224 H 504 V 282" at={4.45} dur={0.4} w={2} />
      {/* dimension string over the gable */}
      <P d="M 214 186 H 576 M 214 178 V 194 M 576 178 V 194" at={4.6} dur={0.5} w={1} className="opacity-70" />
      {/* palm frond strokes, off the right edge — South Florida sign-off */}
      <P d="M 690 556 C 700 470, 688 420, 660 380" at={4.7} dur={0.5} w={2} />
      <P d="M 664 388 C 640 370, 616 366, 596 372 M 664 384 C 656 356, 640 336, 618 326 M 668 386 C 680 356, 700 342, 726 338 M 670 392 C 696 380, 722 382, 742 396" at={4.9} dur={0.6} w={1.6} />
    </svg>
  );
}

export default function TheBoard() {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(hostRef, { once: true, margin: "-160px" });
  const [run, setRun] = useState(0); // bumps to replay
  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    setStarted(true);
  }, [inView]);

  // stage counter follows the plotter
  useEffect(() => {
    if (!started || reduced) {
      if (reduced) setStage(STAGES.length - 1);
      return;
    }
    setStage(-1);
    const timers = STAGES.map((s, i) => setTimeout(() => setStage(i), s.at * 1000));
    return () => timers.forEach(clearTimeout);
  }, [started, run, reduced]);

  const drawing = started && !reduced;

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="survey pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="glow-tl relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          index="01"
          tag="The Board"
          lines={[
            "EVERY HOME HERE",
            <span key="l2">
              STARTS AS A <em className="text-green">drawing.</em>
            </span>,
          ]}
          lede="Watch one get born — plan, risers, elevation, stamp. Then we go pour the real thing."
        />

        <div ref={hostRef} className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* the drawing */}
          <div className="relative lg:col-span-7">
            <div className="relative border border-line bg-ink-2/60 p-4 md:p-6">
              {/* sheet corners */}
              <span className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-green/40" aria-hidden />
              <span className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-green/40" aria-hidden />
              <span className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-green/40" aria-hidden />
              <span className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-green/40" aria-hidden />

              {reduced ? (
                <Strokes delay={0} />
              ) : (
                started && <Strokes key={run} delay={0.15} />
              )}
              {!started && <div className="aspect-[800/620]" aria-hidden />}

              {/* the stamp */}
              <motion.div
                key={`stamp-${run}`}
                className="absolute bottom-8 right-8 rotate-[-7deg] border-2 border-green px-4 py-2.5 md:bottom-12 md:right-12"
                initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.7 }}
                animate={drawing || reduced ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: reduced ? 0 : 5.3, duration: 0.28, ease: [0.2, 1.4, 0.4, 1] }}
              >
                <p className="flex items-center gap-2 whitespace-nowrap">
                  <Mark className="h-4 w-auto text-green" />
                  <span className="label text-green">Approved — G.R.</span>
                </p>
              </motion.div>

              {/* sheet footer */}
              <div className="mt-2 flex items-center justify-between gap-4 border-t border-line pt-3">
                <p className="label whitespace-nowrap text-faint">
                  Sheet A-100<span className="hidden sm:inline"> — Residence, WPB</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setRun((v) => v + 1);
                    setStarted(true);
                  }}
                  className="label whitespace-nowrap text-green transition-colors hover:text-green-bright"
                >
                  Run it again ↻
                </button>
              </div>
            </div>
          </div>

          {/* the stages + the payoff */}
          <div className="lg:col-span-5">
            <ol className="flex flex-col gap-1">
              {STAGES.map((s, i) => (
                <li
                  key={s.key}
                  className={cn(
                    "flex items-baseline gap-4 border-b border-line py-4 transition-colors duration-500",
                    stage >= i ? "text-paper" : "text-paper/30"
                  )}
                >
                  <span className={cn("label transition-colors duration-500", stage >= i ? "text-green" : "text-paper/25")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-2xl md:text-3xl">{s.label}</span>
                  {i === STAGES.length - 1 && (
                    <motion.span
                      key={`chip-${run}`}
                      className="ml-auto"
                      initial={{ opacity: 0 }}
                      animate={stage >= STAGES.length - 1 ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      <Mark className="h-4 w-auto text-green" />
                    </motion.span>
                  )}
                </li>
              ))}
            </ol>

            {/* the delivered thing */}
            <motion.div
              key={`payoff-${run}`}
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={stage >= STAGES.length - 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <div className="plate">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src="/properties/greymon-227/02.webp"
                    alt="227 Greymon Dr at dusk — a delivered GDR residence"
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-12">
                    <p className="label text-paper/90">From this board — 227 Greymon Dr, delivered</p>
                  </div>
                </div>
              </div>
              <Reveal className="mt-7">
                <Btn href="/residences" variant="outline">
                  See What Left the Board
                </Btn>
              </Reveal>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
