import { tickerItems } from "@/lib/site";

/** Gapless place-name strip: one repeating block, translated -50%. */
export default function Ticker() {
  const block = (key: string) => (
    <span key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {tickerItems.map((item) => (
        <span key={item} className="flex items-center">
          <span className="label whitespace-nowrap px-6 py-4 text-paper/70">{item}</span>
          <span className="h-1 w-1 rotate-45 bg-green/70" />
        </span>
      ))}
    </span>
  );
  return (
    <div className="flex overflow-hidden">
      <div className="flex w-max animate-marquee">
        {block("a")}
        {block("b")}
      </div>
    </div>
  );
}
