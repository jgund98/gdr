"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Btn from "@/components/Btn";
import FilmTheater from "@/components/FilmTheater";

/**
 * The Turn — 335 Greymon Dr, shown honestly: the worn cottage we bought,
 * and the residence replacing it. A survey line wipes between the two.
 * Deliberate sideways drag interacts; vertical swipes still scroll the page.
 */
export default function TheTurn() {
  const [x, setX] = useState(58); // % of width where the line sits
  const [touched, setTouched] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const inView = useInView(boxRef, { once: true, margin: "-120px" });
  const reduced = useReducedMotion();

  const move = (clientX: number) => {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setX(Math.min(94, Math.max(6, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="relative overflow-hidden bg-ink-2 py-16 md:py-32">
      <div className="glow-tl relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          index="03"
          tag="The Turn"
          headSize="text-[1.7rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          lines={[
            <span key="l1" className="whitespace-nowrap">
              THE WORST HOUSE
            </span>,
            <span key="l2" className="whitespace-nowrap">
              ON THE BEST <em className="text-green">street.</em>
            </span>,
          ]}
          lede={
            <>
              335 Greymon Dr as we found it, and the residence taking its
              place. Drag the&nbsp;line.
            </>
          }
        />

        <Reveal delay={0.15} className="plate mt-12 md:mt-16">
          <div
            ref={boxRef}
            className="group relative aspect-[4/5] w-full cursor-ew-resize select-none overflow-hidden sm:aspect-[16/10]"
            style={{ touchAction: "pan-y" }}
            onPointerDown={(e) => {
              dragging.current = true;
              setTouched(true);
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              move(e.clientX);
            }}
            onPointerMove={(e) => {
              if (dragging.current) move(e.clientX);
            }}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            {/* as found — the honest layer underneath, reframed so the
                cottage sits at roughly the render's scale */}
            <Image
              src="/properties/greymon-335/03.webp"
              alt="335 Greymon Dr as acquired — the original worn cottage"
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="scale-[1.55] object-cover"
              style={{ transformOrigin: "53% 44%", objectPosition: "53% 44%" }}
              draggable={false}
            />
            {/* the plan — clipped to the left of the line */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}
            >
              <Image
                src="/properties/greymon-335/01.webp"
                alt="335 Greymon Dr — the planned residence"
                fill
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
                draggable={false}
              />
            </div>

            {/* the survey line */}
            <motion.div
              className="absolute inset-y-0 z-10 w-[2px] bg-green shadow-[0_0_18px_rgba(137,191,88,0.65)]"
              style={{ left: `${x}%` }}
              animate={
                !touched && inView && !reduced
                  ? { left: [`58%`, `70%`, `52%`, `58%`] }
                  : { left: `${x}%` }
              }
              transition={
                !touched && inView && !reduced
                  ? { duration: 3.2, delay: 0.6, ease: "easeInOut" }
                  : { duration: 0 }
              }
              onUpdate={(latest) => {
                if (!touched && typeof latest.left === "string") {
                  const v = parseFloat(latest.left);
                  if (!Number.isNaN(v)) setX(v);
                }
              }}
            >
              <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-green text-ink chamfer-sm">
                <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden>
                  <path d="M6 1 1 6l5 5M16 1l5 5-5 5" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </motion.div>

            {/* corner labels */}
            <span className="label absolute left-4 top-4 z-10 bg-green px-3 py-1.5 text-ink chamfer-sm">
              The Plan
            </span>
            <span className="label absolute right-4 top-4 z-10 border border-paper/40 bg-ink/60 px-3 py-1.5 text-paper backdrop-blur-sm chamfer-sm">
              As Found
            </span>

            {/* base scrim for the caption strip */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/85 to-transparent" aria-hidden />
            <p className="label absolute bottom-4 left-4 z-10 text-paper/85">
              335 Greymon Dr — West Palm Beach
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Btn href="/residences/greymon-335" variant="outline">
            See 335 Greymon
          </Btn>
          <p className="max-w-md text-sm leading-relaxed text-faint">
            Every GDR residence page tells the whole story — including the
            state we started from.
          </p>
        </Reveal>

        {/* the same idea, in motion — construction dissolving into delivered */}
        <Reveal delay={0.12} className="mx-auto mt-16 max-w-4xl md:mt-20">
          <p className="label mb-5 text-faint">And in motion — 309 Greymon Dr, framing to finished</p>
          <FilmTheater
            src="/videos/tour-309-v2.mp4"
            poster="/videos/tour-309-poster-v2.webp"
            label="309 Greymon Dr — framing to finished"
          />
        </Reveal>
      </div>
    </section>
  );
}
