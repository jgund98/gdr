"use client";

import { motion, useReducedMotion } from "motion/react";
import Btn from "@/components/Btn";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { FloorPlan } from "@/components/PlanArt";
import { site } from "@/lib/site";

const cutOut = ["The listing theater", "The staging games", "The spec-flip markup"] as const;

/**
 * Buy Direct — one green line from the developer to the buyer,
 * with everything in between struck through.
 */
export default function BuyDirect() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink-2 py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
          <SectionHead
            index="06"
            tag="Buy Direct"
            lines={[
              "NO ONE BETWEEN",
              <span key="l2">
                US AND <em className="text-green">you.</em>
              </span>,
            ]}
            lede={
              <>
                Through a strategic partnership with Renny&nbsp;Realty, GDR homes
                sell direct from the developer — clearer pricing, cleaner terms,
                and answers from the person who actually built the house.
              </>
            }
          />

          <div className="flex flex-col justify-center">
            <Reveal>
              <div className="relative overflow-hidden border border-line bg-ink p-7 md:p-10">
                <div className="pointer-events-none absolute -right-16 -top-10 w-[420px] opacity-[0.08]" aria-hidden>
                  <FloorPlan tone="green" />
                </div>
                <div className="relative flex items-center justify-between gap-4">
                  <span className="display text-2xl md:text-3xl">The Developer</span>
                  <motion.span
                    className="relative mx-1 h-px flex-1 origin-left bg-green"
                    initial={reduced ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                  />
                  <span className="display text-2xl text-green md:text-3xl">You</span>
                </div>
                <ul className="relative mt-8 flex flex-col gap-4 border-t border-line pt-7">
                  {cutOut.map((item, i) => (
                    <li key={item} className="relative w-fit text-lg text-faint">
                      {item}
                      <motion.span
                        className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-green/80"
                        initial={reduced ? false : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ delay: 0.9 + i * 0.18, duration: 0.4, ease: "easeOut" }}
                        aria-hidden
                      />
                    </li>
                  ))}
                </ul>
                <div className="relative mt-9 flex flex-wrap items-center gap-5">
                  <Btn href="/contact">Start the Conversation</Btn>
                  <a
                    href={site.rennyRealtyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navline label pb-1 text-paper/70 hover:text-paper"
                  >
                    Renny Realty&ensp;↗
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
