import type { CSSProperties } from "react";

/**
 * The opening drawing.
 *
 * The site loads on a drafting sheet and a residence plan draws itself
 * across it — envelope, partitions, door swings, windows, the dimension
 * string — then the sheet tears along the middle and carries the drawing
 * away to reveal the built house. Plan, then built, in under three seconds.
 *
 * Rendered identically inside both halves of the sheet (each half clips its
 * own portion of a full-viewport copy), so the line work runs unbroken
 * across the seam until the moment it parts.
 *
 * Every stroke is drawn by CSS, not JavaScript: this plays during hydration,
 * and measuring path lengths on sixty nodes at that moment is exactly how a
 * loading animation ends up stuttering on a phone. Paths carry pathLength="1"
 * so a normalised dash offset does the work, and the component is a server
 * component — it ships no runtime at all.
 *
 * Same stroke language as the floorplans used site-wide: double walls
 * broken at openings, quarter-circle swings, triple-line windows.
 */
const WALL = "rgba(11,14,9,0.44)";
const FINE = "rgba(11,14,9,0.34)";
const MOSS = "rgba(71,118,31,0.7)";

const OUTER = [
  "M 120 150 H 430 M 530 150 H 1080",
  "M 1080 150 V 300 M 1080 380 V 610",
  "M 1080 610 H 800 M 700 610 H 120",
  "M 120 610 V 470 M 120 380 V 150",
];
const INNER = [
  "M 600 150 V 250 M 600 330 V 380",
  "M 120 380 H 340 M 440 380 H 1080",
  "M 420 380 V 610",
];
const SWINGS = [
  "M 530 150 A 100 100 0 0 1 430 250",
  "M 440 380 A 100 100 0 0 1 340 280",
  "M 600 330 A 80 80 0 0 0 680 410",
];
const WINDOWS = [
  "M 660 146 H 840 M 660 150 H 840 M 660 154 H 840",
  "M 116 200 V 330 M 120 200 V 330 M 124 200 V 330",
  "M 1076 430 V 550 M 1080 430 V 550 M 1084 430 V 550",
  "M 820 606 H 990 M 820 610 H 990 M 820 614 H 990",
];
const ROOMS = [
  { t: "GREAT ROOM", x: 270, y: 285 },
  { t: "PRIMARY", x: 790, y: 285 },
  { t: "KITCHEN", x: 210, y: 515 },
  { t: "VERANDA", x: 730, y: 515 },
];

/** timing lives in one place so the sheet can be torn on the right beat */
const cue = (delay: number, dur: number) =>
  ({ "--delay": `${delay}s`, "--dur": `${dur}s` }) as CSSProperties;

/**
 * Two framings of the same drawing. Wide screens get the whole residence
 * with sheet margin around it — it reads as a plan, not as abstract lines.
 * Phones get a zoomed detail: the great room, its door swing and the wall
 * junction, at a size where the line weights still read.
 */
export default function SheetPlan({ variant = "wide" }: { variant?: "wide" | "detail" }) {
  return (
    <svg
      viewBox={variant === "wide" ? "-100 -70 1400 900" : "110 130 470 500"}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden
    >
      {/* the measured span, struck first */}
      <path
        d="M 120 100 H 1080 M 120 90 V 110 M 1080 90 V 110"
        pathLength={1}
        stroke={MOSS}
        strokeWidth="1.2"
        className="plan-line"
        style={cue(0.05, 0.5)}
      />
      <text
        x="600"
        y="86"
        textAnchor="middle"
        fill={MOSS}
        fontSize="16"
        letterSpacing="0.2em"
        fontFamily="var(--font-instrument-sans)"
        className="plan-text"
        style={cue(0.5, 0.3)}
      >
        62&apos;-0&quot;
      </text>

      {/* the envelope */}
      <g stroke={WALL} strokeWidth="3.2" strokeLinecap="square">
        {OUTER.map((d, i) => (
          <path key={d} d={d} pathLength={1} className="plan-line" style={cue(0.12 + i * 0.07, 0.5)} />
        ))}
      </g>

      {/* partitions */}
      <g stroke={WALL} strokeWidth="2.4" strokeLinecap="square">
        {INNER.map((d, i) => (
          <path key={d} d={d} pathLength={1} className="plan-line" style={cue(0.5 + i * 0.06, 0.4)} />
        ))}
      </g>

      {/* door swings */}
      <g stroke={FINE} strokeWidth="1.6">
        {SWINGS.map((d, i) => (
          <path key={d} d={d} pathLength={1} className="plan-line" style={cue(0.78 + i * 0.05, 0.32)} />
        ))}
      </g>

      {/* windows */}
      <g stroke={FINE} strokeWidth="1.2">
        {WINDOWS.map((d, i) => (
          <path key={d} d={d} pathLength={1} className="plan-line" style={cue(0.88 + i * 0.04, 0.28)} />
        ))}
      </g>

      {/* the rooms, named last */}
      <g fill="rgba(11,14,9,0.52)" fontSize="15" letterSpacing="0.24em" fontFamily="var(--font-instrument-sans)">
        {ROOMS.map((r, i) => (
          <text key={r.t} x={r.x} y={r.y} className="plan-text" style={cue(0.95 + i * 0.04, 0.28)}>
            {r.t}
          </text>
        ))}
      </g>
    </svg>
  );
}
