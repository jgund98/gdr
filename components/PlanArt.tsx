"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * The drawing layer — floorplans, dimension lines, and door swings that
 * draw themselves as they enter the viewport. One stroke language,
 * used site-wide, so the whole site feels like it came off the board.
 */

function useDraw(delay = 0) {
  const reduced = useReducedMotion();
  return (i: number) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: "-60px" },
          transition: { delay: delay + i * 0.12, duration: 0.8, ease: "easeInOut" as const },
        };
}

/**
 * A cottage floorplan, hand-set: double walls, door swings, window breaks,
 * room names, one dimension string. Reads at any size.
 */
export function FloorPlan({
  className,
  tone = "ink",
  delay = 0,
}: {
  className?: string;
  tone?: "ink" | "green";
  delay?: number;
}) {
  const draw = useDraw(delay);
  const stroke = tone === "ink" ? "rgba(11,14,9,0.8)" : "rgba(137,191,88,0.8)";
  const text = tone === "ink" ? "rgba(11,14,9,0.55)" : "rgba(137,191,88,0.6)";
  let i = 0;
  const d = () => draw(i++);

  return (
    <svg viewBox="0 0 620 470" fill="none" className={cn("block", className)} aria-hidden>
      <g stroke={stroke} strokeWidth="2.5">
        {/* outer walls, broken at openings */}
        <motion.path d="M 30 60 H 250 M 310 60 H 590" {...d()} />
        <motion.path d="M 590 60 V 250 M 590 310 V 430" {...d()} />
        <motion.path d="M 590 430 H 360 M 300 430 H 30" {...d()} />
        <motion.path d="M 30 430 V 300 M 30 240 V 60" {...d()} />
        {/* interior walls */}
        <motion.path d="M 250 60 V 180 M 250 240 V 260" {...d()} strokeWidth="2" />
        <motion.path d="M 30 260 H 180 M 240 260 H 400 M 400 260 V 430" {...d()} strokeWidth="2" />
        <motion.path d="M 400 330 H 460 M 520 330 H 590" {...d()} strokeWidth="2" />
      </g>
      {/* door swings */}
      <g stroke={stroke} strokeWidth="1.4">
        <motion.path d="M 310 60 A 60 60 0 0 1 250 120" {...d()} />
        <motion.path d="M 240 260 A 60 60 0 0 1 180 200" {...d()} />
        <motion.path d="M 520 330 A 60 60 0 0 1 460 270" {...d()} />
        <motion.path d="M 360 430 A 60 60 0 0 1 300 370" {...d()} />
      </g>
      {/* windows — triple lines */}
      <g stroke={stroke} strokeWidth="1.2">
        <motion.path d="M 90 56 H 170 M 90 60 H 170 M 90 64 H 170" {...d()} />
        <motion.path d="M 430 56 H 530 M 430 60 H 530 M 430 64 H 530" {...d()} />
        <motion.path d="M 586 120 V 200 M 590 120 V 200 M 594 120 V 200" {...d()} />
        <motion.path d="M 96 426 H 220 M 96 430 H 220 M 96 434 H 220" {...d()} />
      </g>
      {/* dimension string */}
      <g stroke={text} strokeWidth="1">
        <motion.path d="M 30 30 H 590 M 30 24 V 36 M 590 24 V 36" {...d()} />
      </g>
      <text x="310" y="22" textAnchor="middle" fill={text} fontSize="13" letterSpacing="0.18em" fontFamily="var(--font-instrument-sans)">
        62'-0"
      </text>
      {/* room names */}
      <g fill={text} fontSize="13" letterSpacing="0.22em" fontFamily="var(--font-instrument-sans)">
        <text x="140" y="160">GREAT ROOM</text>
        <text x="420" y="160">PRIMARY</text>
        <text x="130" y="350">KITCHEN</text>
        <text x="470" y="390">VERANDA</text>
      </g>
    </svg>
  );
}

/** A dimension line with arrowheads and a label — the measured sign-off. */
export function DimLine({
  label,
  className,
  tone = "green",
}: {
  label: string;
  className?: string;
  tone?: "ink" | "green";
}) {
  const draw = useDraw(0);
  const stroke = tone === "ink" ? "rgba(11,14,9,0.5)" : "rgba(137,191,88,0.65)";
  return (
    <div className={cn("flex items-center gap-4", className)} aria-hidden>
      <svg viewBox="0 0 120 12" preserveAspectRatio="none" className="h-3 flex-1">
        <motion.path
          d="M 2 6 H 118"
          stroke={stroke}
          strokeWidth="1"
          {...draw(0)}
        />
        <path d="M 2 6 l 7 -3.4 v 6.8 Z M 118 6 l -7 -3.4 v 6.8 Z" fill={stroke} />
      </svg>
      <span className={cn("label shrink-0", tone === "ink" ? "text-ink/45" : "text-faint")}>{label}</span>
      <svg viewBox="0 0 120 12" preserveAspectRatio="none" className="h-3 flex-1">
        <motion.path d="M 2 6 H 118" stroke={stroke} strokeWidth="1" {...draw(1)} />
        <path d="M 2 6 l 7 -3.4 v 6.8 Z M 118 6 l -7 -3.4 v 6.8 Z" fill={stroke} />
      </svg>
    </div>
  );
}

/** Mini construction diagrams for the principles — one stroke family. */
export function PlanIcon({
  kind,
  className,
  tone = "green",
}: {
  kind: "facade" | "section" | "flow" | "level";
  className?: string;
  tone?: "ink" | "green";
}) {
  const draw = useDraw(0.1);
  const stroke = tone === "ink" ? "rgba(11,14,9,0.7)" : "#89bf58";
  let i = 0;
  const d = () => draw(i++);
  return (
    <svg viewBox="0 0 64 64" fill="none" className={cn("block", className)} aria-hidden>
      <g stroke={stroke} strokeWidth="2" strokeLinecap="square">
        {kind === "facade" && (
          <>
            <motion.path d="M 8 56 V 26 L 32 8 L 56 26 V 56" {...d()} />
            <motion.path d="M 18 56 V 38 H 30 V 56" {...d()} />
            <motion.path d="M 38 36 H 48 V 46 H 38 Z" {...d()} />
            <motion.path d="M 2 56 H 62" {...d()} />
          </>
        )}
        {kind === "section" && (
          <>
            <motion.path d="M 6 44 H 58" {...d()} />
            <motion.path d="M 10 44 l 8 -8 M 22 44 l 8 -8 M 34 44 l 8 -8 M 46 44 l 8 -8" {...d()} strokeWidth="1.4" />
            <motion.path d="M 14 44 V 20 H 50 V 44" {...d()} />
            <motion.path d="M 14 28 H 50" {...d()} strokeWidth="1.4" />
          </>
        )}
        {kind === "flow" && (
          <>
            <motion.path d="M 10 10 H 54 V 54 H 10 Z" {...d()} />
            <motion.path d="M 32 10 V 30 M 10 30 H 32" {...d()} strokeWidth="1.4" />
            <motion.path d="M 20 44 H 44 M 44 44 l -6 -5 M 44 44 l -6 5" {...d()} />
            <motion.path d="M 42 20 A 10 10 0 0 1 32 30" {...d()} strokeWidth="1.4" />
          </>
        )}
        {kind === "level" && (
          <>
            <motion.path d="M 8 50 H 56" {...d()} />
            <motion.path d="M 32 50 V 16 M 32 16 l -10 8 M 32 16 l 10 8" {...d()} />
            <motion.path d="M 16 58 H 48" {...d()} strokeWidth="1.4" />
          </>
        )}
      </g>
    </svg>
  );
}
