/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/cn";

/**
 * A palm-frond shadow cast across the section — South Florida sunlight,
 * implied. Blur is baked into the PNG; the sway only rotates a texture.
 */
export default function PalmShadow({
  className,
  tone = "ink",
  delay = 0,
  flip = false,
}: {
  className?: string;
  tone?: "ink" | "green";
  delay?: number;
  flip?: boolean;
}) {
  return (
    <div className={cn("pointer-events-none absolute select-none", className)} aria-hidden>
      <img
        src={tone === "ink" ? "/brand/frond-ink.png" : "/brand/frond-green.png"}
        alt=""
        className="animate-sway h-full w-full object-contain will-change-transform"
        style={{
          transformOrigin: "0% 45%",
          animationDelay: `${delay}s`,
          ...(flip ? { scale: "-1 1" } : {}),
        }}
        loading="lazy"
      />
    </div>
  );
}
