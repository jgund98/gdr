/**
 * The record as a kinetic strip — giant type in motion, not a stats block.
 * Solid and outlined figures alternate; one repeating block, translated -50%.
 */
const figures = [
  { n: "28", label: "YEARS IN SOUTH FLORIDA" },
  { n: "40+", label: "HOMES REBUILT" },
  { n: "150K+", label: "SQ FT DELIVERED" },
  { n: "$150M+", label: "DEVELOPMENT VOLUME" },
] as const;

export default function StatsBand() {
  const block = (key: string) => (
    <span key={key} className="flex shrink-0 items-baseline" aria-hidden={key === "b"}>
      {figures.map((f, i) => (
        <span key={f.n} className="flex items-baseline">
          <span
            className={`display px-6 text-6xl md:text-8xl ${
              i % 2 === 0 ? "text-green" : "text-outline-faint"
            }`}
          >
            {f.n}
          </span>
          <span className="label max-w-[9rem] text-faint">{f.label}</span>
          <span className="mx-8 h-2 w-2 shrink-0 -translate-y-4 rotate-45 bg-green/60 md:mx-12" />
        </span>
      ))}
    </span>
  );
  return (
    <section
      aria-label="The record: 28 years in South Florida, 40+ homes rebuilt, 150,000+ square feet delivered, $150M+ development volume"
      className="relative overflow-hidden border-b border-line bg-ink py-10 md:py-14"
    >
      <div className="flex overflow-hidden">
        <div className="flex w-max animate-marquee items-baseline">
          {block("a")}
          {block("b")}
        </div>
      </div>
    </section>
  );
}
