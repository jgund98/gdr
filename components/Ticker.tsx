import { tickerItems } from "@/lib/site";

/**
 * The neighborhoods, on an endless walk. Two identical halves translate
 * -50% and hand off seamlessly; each half repeats the list three times so
 * no viewport ever sees a gap. GPU transform only.
 */
export default function Ticker() {
  const half = (key: string) => (
    <span key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {[0, 1, 2].map((r) =>
        tickerItems.map((item, i) => (
          <span key={`${r}-${item}`} className="flex items-center">
            <span
              className={`whitespace-nowrap px-7 py-[1.1rem] text-[0.8rem] font-semibold uppercase tracking-[0.24em] md:text-[0.85rem] ${
                (r * tickerItems.length + i) % 2 === 0 ? "text-paper" : "text-green-bright"
              }`}
            >
              {item}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-green shadow-[0_0_8px_rgba(137,191,88,0.9)]" />
          </span>
        ))
      )}
    </span>
  );
  return (
    <div className="flex overflow-hidden">
      <div className="flex w-max animate-marquee will-change-transform">
        {half("a")}
        {half("b")}
      </div>
    </div>
  );
}
