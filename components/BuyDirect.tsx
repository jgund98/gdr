"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Btn from "@/components/Btn";
import Reveal from "@/components/Reveal";
import Mark from "@/components/Mark";
import { site } from "@/lib/site";

const cutOut = ["the listing theater", "the staging games", "the spec-flip markup"] as const;

/**
 * Buy Direct — one measured line from the developer to the buyer, drawn
 * across the whole section, with everything in between struck through at
 * display scale. No cards, no columns; a statement.
 */
export default function BuyDirect() {
  const reduced = useReducedMotion();
  const strikeRef = useRef<HTMLDivElement | null>(null);
  const strikesIn = useInView(strikeRef, { once: true, margin: "-40px" });

  return (
    <section className="relative overflow-hidden bg-ink-2 py-16 md:py-36">
      <div className="glow-br relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="flex items-center gap-2.5">
            <Mark className="h-3.5 w-auto text-green" />
            <span className="tag-index">06 — Buy Direct</span>
          </p>
        </Reveal>

        {/* the line itself: developer ——◆—— you (stacks on phones) */}
        <div className="mt-10 flex flex-col gap-5 md:mt-14 md:flex-row md:items-center md:gap-8">
          <Reveal>
            <h2 className="display text-4xl sm:text-5xl md:whitespace-nowrap lg:text-7xl">THE DEVELOPER</h2>
          </Reveal>
          <div className="relative h-[2px] w-full overflow-visible md:w-auto md:flex-1">
            <motion.div
              className="h-full origin-left bg-green shadow-[0_0_14px_rgba(137,191,88,0.7)]"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.25, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-green"
              initial={reduced ? false : { opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.8, duration: 0.3 }}
              aria-hidden
            />
          </div>
          <Reveal delay={0.1}>
            <h2 className="display text-4xl text-green sm:text-5xl md:whitespace-nowrap lg:text-7xl">YOU.</h2>
          </Reveal>
        </div>

        {/* what the line cuts out — struck at size. One observer on the
            untranslated wrapper drives all three strikes (nested whileInView
            inside translated parents never fires on iOS). */}
        <div ref={strikeRef} className="mt-12 flex flex-col gap-2 md:mt-16">
          {cutOut.map((item, i) => (
            <Reveal key={item} delay={0.08 * i}>
              <p className="relative w-fit font-serif text-3xl italic text-paper/35 sm:text-4xl lg:text-5xl">
                {item}
                <span
                  className="absolute left-[-2%] top-1/2 h-[3px] w-[104%] origin-left bg-green/90"
                  style={{
                    transform: strikesIn || reduced ? "scaleX(1)" : "scaleX(0)",
                    transition: `transform 0.35s ease-out ${0.35 + i * 0.18}s`,
                  }}
                  aria-hidden
                />
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 md:mt-16">
          <Btn href="/contact">Start the Conversation</Btn>
          <p className="max-w-md text-sm leading-relaxed text-mist">
            Through a strategic partnership with{" "}
            <a
              href={site.rennyRealtyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-green/50 text-paper/85 transition-colors hover:border-green hover:text-paper"
            >
              Renny&nbsp;Realty
            </a>
            , GDR homes sell direct — clearer pricing, cleaner terms, answers
            from the person who built the house.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
