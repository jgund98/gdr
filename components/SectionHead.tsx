import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import RevealLines from "@/components/RevealLines";
import Mark from "@/components/Mark";
import { cn } from "@/lib/cn";

/**
 * The house style for section openers: index tag, big lines, optional lede.
 * `tone="paper"` flips the voice for light sections.
 */
export default function SectionHead({
  index,
  tag,
  lines,
  lede,
  className,
  as = "h2",
  tone = "ink",
  headSize,
}: {
  index: string;
  tag: string;
  lines: ReactNode[];
  lede?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
  tone?: "ink" | "paper";
  /** override the heading scale when a line needs room to breathe */
  headSize?: string;
}) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <Reveal>
        <p className="flex items-center gap-2.5">
          <Mark className={cn("h-3.5 w-auto", tone === "paper" ? "text-moss" : "text-green")} />
          <span className={tone === "paper" ? "tag-index-ink" : "tag-index"}>
            {index} — {tag}
          </span>
        </p>
      </Reveal>
      <RevealLines
        as={as}
        delay={0.08}
        className={cn(
          "mt-4",
          headSize ?? "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl",
          tone === "paper" && "text-ink"
        )}
        lines={lines}
      />
      {lede && (
        <Reveal delay={0.18}>
          <p className={cn("lede mt-6 max-w-2xl", tone === "paper" ? "text-ink/65" : "text-mist")}>
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
