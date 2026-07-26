"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Btn from "@/components/Btn";
import RevealLines from "@/components/RevealLines";
import SheetPlan from "@/components/SheetPlan";
import HeroHouse from "@/components/HeroHouse";
import Ticker from "@/components/Ticker";

/**
 * The opening move, in two acts.
 *
 * Act I — load: a drafting sheet parts along a plotted green line and the
 * frame fills with West Palm Beach from the air and, bled into the same
 * photograph, one of the finished houses. City and house, one picture —
 * so the work is visible before a word is read.
 *
 * Act II — first scroll: the hero pins, the camera descends toward the
 * street, and the house rises to take the whole frame. The city, then the
 * house standing on it.
 *
 * All scroll work runs in a layout-based rAF (Lenis-safe); every animated
 * property is a transform or an opacity.
 */
export default function HeroReveal() {
  const reduced = useReducedMotion();
  const [gone, setGone] = useState(false);
  const [descending, setDescending] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLElement | null>(null);
  const zoomRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);

  // The aerial only decodes while it is actually on screen — a 12-second
  // loop running behind six sections of page is pure battery.
  useEffect(() => {
    const el = wrapRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;
    vid.play().catch(() => {});
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) vid.play().catch(() => {});
        else vid.pause();
        // the neighbourhood walk idles with it
        tickerRef.current?.classList.toggle("ticker-idle", !e.isIntersecting);
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Act III — the descent
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const strokes: { el: SVGElement | null; start: number; dur: number }[] = [];
    if (svgRef.current) {
      svgRef.current.querySelectorAll<SVGElement>("[data-plot]").forEach((el, i) => {
        strokes.push({ el, start: 0.1 + i * 0.055, dur: 0.14 });
      });
    }
    const labels = svgRef.current
      ? [...svgRef.current.querySelectorAll<SVGElement>("[data-label]")]
      : [];
    const houseFull = document.querySelector<HTMLElement>("[data-house-full]");
    const caption = document.querySelector<HTMLElement>("[data-house-caption]");
    let lastP = -1;
    let wasDescending = false;
    let running = false;
    const lastOpacity = new WeakMap<HTMLElement, string>();
    const setOpacity = (el: HTMLElement | null, v: number) => {
      if (!el) return;
      const next = v.toFixed(3);
      if (lastOpacity.get(el) === next) return;
      lastOpacity.set(el, next);
      el.style.opacity = next;
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      if (r.bottom < -8) return;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const p = clamp(-r.top / (r.height - vh));
      if (p === lastP && p >= 1) return;
      lastP = p;

      // the city pushes in
      const zoom = zoomRef.current;
      if (zoom) {
        const s = 1 + p * (vw < 768 ? 0.16 : 0.28);
        zoom.style.transform = `scale(${s}) translateY(${p * 4}%)`;
      }
      // the words step aside early — the picture is the point
      for (const el of [wordsRef.current, copyRef.current]) {
        if (!el) continue;
        el.style.opacity = String(clamp(1 - p * 3.4));
        el.style.transform = `translateY(${-p * 16}vh)`;
      }
      // only write when the value actually moves: a redundant style write is
      // a style recalculation, and doing three of them every frame is what
      // makes a composited marquee look like it stutters
      setOpacity(tickerRef.current, clamp(1 - p * 2.2));
      setOpacity(cueRef.current, clamp(1 - p * 5));
      setOpacity(fadeRef.current, clamp((p - 0.82) / 0.18) * 0.94);
      if (svgRef.current) {
        svgRef.current.style.opacity = String(clamp(p * 5) * clamp((0.42 - p) * 8));
      }
      for (const s of strokes) {
        if (!s.el) continue;
        const d = clamp((p - s.start) / s.dur);
        (s.el as SVGGeometryElement).style.strokeDashoffset = String(1 - d);
      }
      for (const l of labels) {
        l.style.opacity = String(clamp((p - 0.24) / 0.1) * clamp((0.42 - p) * 8));
      }

      // the house comes up to fill the frame — the city, then the house on it
      if (houseFull) {
        const t = clamp((p - 0.26) / 0.46);
        const e = t * t * (3 - 2 * t);
        houseFull.style.opacity = String(e);
        houseFull.style.transform = `scale(${1.07 - 0.07 * e})`;
        if (caption) caption.style.opacity = String(clamp(1 - e * 2.4));
      }
      const d = p > 0.12;
      if (d !== wasDescending) {
        wasDescending = d;
        setDescending(d);
      }
    };
    // the loop exists only while the hero is on screen; past it, the page
    // costs nothing
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
      threshold: 0,
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const panel = "absolute inset-x-0 z-30 h-1/2 bg-paper survey-ink";
  const ease = [0.76, 0, 0.24, 1] as const;
  /** the plan finishes drawing, then the sheet tears */
  const PART_AT = 1.62;
  const started = reduced || gone;

  return (
    <section
      ref={wrapRef}
      aria-label="GDR Development"
      /* the header watches for this: while the hero is pinned the page isn't
         really travelling, so the bar stays transparent until it releases */
      data-pinned-hero={reduced ? undefined : ""}
      className={reduced ? "relative h-[100dvh] min-h-[520px]" : "relative h-[240svh]"}
    >
      {/* dvh, not svh: when the phone's address bar collapses the visible
          viewport grows, and an svh-sized frame stops short — leaving a dark
          band under the house. dvh tracks the live viewport exactly. */}
      <div className="sticky top-0 h-[100dvh] min-h-[560px] overflow-hidden">
        {/* the city — West Palm Beach from above, running to the Intracoastal */}
        <div ref={zoomRef} className="absolute inset-0 will-change-transform" style={{ transformOrigin: "50% 64%" }}>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/wpb-neighborhood-v5.mp4"
            poster="/videos/wpb-neighborhood-poster-v5.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        {/* The vellum — a drafting sheet laid over the city. */}
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/48 via-ink/10 to-ink/62" />
          <div className="absolute inset-0 bg-[linear-gradient(101deg,rgba(11,14,9,0.95)_0%,rgba(11,14,9,0.90)_26%,rgba(11,14,9,0.75)_46%,rgba(11,14,9,0.52)_62%,rgba(11,14,9,0.30)_75%,rgba(11,14,9,0.13)_88%,transparent_100%)]" />
          <div className="survey absolute inset-0 opacity-40 [mask-image:linear-gradient(101deg,#000_0%,#000_44%,transparent_72%)] lg:opacity-80" />
          <div className="absolute inset-0 bg-[linear-gradient(101deg,transparent_0%,transparent_77.5%,rgba(137,191,88,0.2)_79.5%,transparent_81.5%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/75 to-transparent" />
        </div>

        {/* the survey overlay — drawn by the scroll, gone before the house lands */}
        {!reduced && (
          <svg
            ref={svgRef}
            className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <g
              fill="none"
              stroke="#89bf58"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              pathLength={1}
              strokeDasharray="1"
            >
              <path data-plot d="M 285 585 L 715 585" strokeDashoffset={1} />
              <path data-plot d="M 715 585 L 715 855" strokeDashoffset={1} />
              <path data-plot d="M 715 855 L 285 855" strokeDashoffset={1} />
              <path data-plot d="M 285 855 L 285 585" strokeDashoffset={1} />
              <path data-plot d="M 430 585 L 430 855" strokeWidth="1.4" strokeDashoffset={1} />
              <path data-plot d="M 570 585 L 570 855" strokeWidth="1.4" strokeDashoffset={1} />
            </g>
            <g stroke="#89bf58" strokeWidth="3" data-label style={{ opacity: 0 }}>
              <path d="M 285 585 h 16 M 285 585 v 16" fill="none" />
              <path d="M 715 585 h -16 M 715 585 v 16" fill="none" />
              <path d="M 715 855 h -16 M 715 855 v -16" fill="none" />
              <path d="M 285 855 h 16 M 285 855 v -16" fill="none" />
            </g>
          </svg>
        )}

        {/* the drafting sheet — unmounts once it has parted */}
        {!reduced && !gone && (
          <>
            <motion.div
              className={`${panel} top-0 overflow-hidden`}
              initial={{ y: "0%" }}
              animate={{ y: "-102%" }}
              transition={{ delay: PART_AT, duration: 0.85, ease }}
              onAnimationComplete={() => setGone(true)}
              aria-hidden
            >
              {/* top half of one full-viewport drawing */}
              <div className="absolute inset-x-0 top-0 h-[100dvh]">
                <div className="absolute inset-0 lg:hidden">
                  <SheetPlan variant="detail" />
                </div>
                <div className="absolute inset-0 hidden lg:block">
                  <SheetPlan variant="wide" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0">
                <div className="mx-auto flex max-w-7xl items-end justify-between px-5 pb-6 md:px-8">
                  <Image
                    src="/brand/gdr-lockup.png"
                    alt=""
                    width={1264}
                    height={214}
                    priority
                    className="h-8 w-auto opacity-90 md:h-10 [filter:brightness(0.55)_saturate(1.4)]"
                  />
                  <p className="label hidden text-ink/60 sm:block">Sheet A-001 — The Collection</p>
                </div>
                <div className="h-[2px] w-full bg-green shadow-[0_0_16px_rgba(137,191,88,0.8)]" />
              </div>
              <span className="absolute left-5 top-5 h-4 w-4 border-l-2 border-t-2 border-ink/30 md:left-8 md:top-8" />
              <span className="absolute right-5 top-5 h-4 w-4 border-r-2 border-t-2 border-ink/30 md:right-8 md:top-8" />
            </motion.div>
            <motion.div
              className={`${panel} bottom-0 overflow-hidden`}
              initial={{ y: "0%" }}
              animate={{ y: "102%" }}
              transition={{ delay: PART_AT, duration: 0.85, ease }}
              aria-hidden
            >
              {/* bottom half of the same drawing — the line work meets exactly
                  at the seam until the sheet tears */}
              <div className="absolute inset-x-0 bottom-0 h-[100dvh]">
                <div className="absolute inset-0 lg:hidden">
                  <SheetPlan variant="detail" />
                </div>
                <div className="absolute inset-0 hidden lg:block">
                  <SheetPlan variant="wide" />
                </div>
              </div>
              <div className="absolute inset-x-0 top-0">
                <div className="h-[2px] w-full bg-green shadow-[0_0_16px_rgba(137,191,88,0.8)]" />
                <div className="mx-auto flex max-w-7xl items-start justify-between px-5 pt-6 md:px-8">
                  <p className="label text-ink/60">West Palm Beach · Los Angeles</p>
                  <p className="label hidden text-ink/60 sm:block">Est. 1997 — GR Investment Group</p>
                </div>
              </div>
              <span className="absolute bottom-5 left-5 h-4 w-4 border-b-2 border-l-2 border-ink/30 md:bottom-8 md:left-8" />
              <span className="absolute bottom-5 right-5 h-4 w-4 border-b-2 border-r-2 border-ink/30 md:bottom-8 md:right-8" />
            </motion.div>
          </>
        )}

        {/* Phones: put the lower aerial to bed before the house arrives. Two
            busy photographs blending into each other reads as noise; a house
            rising out of darkness reads as one picture. */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_22%,rgba(11,14,9,0.50)_40%,rgba(11,14,9,0.88)_56%,rgba(11,14,9,0.95)_70%,rgba(11,14,9,0.95)_100%)] lg:hidden"
          aria-hidden
        />

        {/* the work — bled into the frame behind the type */}
        <HeroHouse start={started} paused={descending} />
        {/* the photograph's own footing — sits ABOVE the house so the
            caption and the ticker never land on a sunlit wall */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent lg:h-64"
          aria-hidden
        />

        {/* the words — a single tight block, held clear of the house */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pb-[46%] pt-20 md:px-8 lg:pb-24 lg:pt-24">
          <div ref={wordsRef} className="min-w-0 will-change-transform lg:max-w-[52%]">
            <motion.p
              className="mb-3.5 flex flex-wrap items-center gap-x-3 gap-y-2"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 1.95, duration: 0.6 }}
            >
              <span className="label chamfer-sm bg-green px-3 py-1.5 text-ink">
                Luxury Real Estate Development
              </span>
              <span className="label text-paper/90 [text-shadow:0_1px_10px_rgba(11,14,9,0.9)]">
                West Palm Beach — Est. 1997
              </span>
            </motion.p>
            <RevealLines
              as="h1"
              delay={reduced ? 0 : 2.05}
              /* sized so both lines sit unwrapped at every width */
              className="text-[10vw] leading-[0.98] [text-shadow:0_2px_34px_rgba(11,14,9,0.55)] sm:text-[8.6vw] md:text-[7.4vw] lg:text-[3.1rem] xl:text-[3.8rem] 2xl:text-[4.2rem]"
              lines={[
                "HOUSES THAT",
                <span key="l2">
                  BECOME <em className="text-green">homes.</em>
                </span>,
              ]}
            />
            <motion.div
              ref={copyRef}
              className="min-w-0 will-change-transform"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 2.3, duration: 0.6 }}
            >
              <p className="mt-4 max-w-md text-base leading-relaxed text-paper/95 [text-shadow:0_2px_20px_rgba(11,14,9,0.9),0_1px_4px_rgba(11,14,9,0.7)] md:mt-5 md:text-lg">
                Historic homes rebuilt. New ones built to&nbsp;belong.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 md:mt-6 md:gap-4">
                <Btn href="/residences">View the Residences</Btn>
                <Btn href="/contact" variant="outline">
                  Inquire Directly
                </Btn>
              </div>
              <p className="label mt-4 hidden text-paper/60 [text-shadow:0_1px_10px_rgba(11,14,9,0.9)] lg:block">
                Sold direct by the developer
              </p>
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        {!reduced && (
          <motion.div
            ref={cueRef}
            /* left side: the caption owns the right corner */
            className="absolute bottom-16 left-5 z-10 hidden items-center gap-2 md:flex md:left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9, duration: 0.8 }}
          >
            <span className="label text-paper/70">Scroll</span>
            <motion.span
              className="text-green"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              ↓
            </motion.span>
          </motion.div>
        )}

        {/* descent hand-off into the next section */}
        <div ref={fadeRef} className="pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" aria-hidden />

        {/* the neighborhoods, and only the neighborhoods */}
        {/* solid, not backdrop-blurred: a live blur over playing video is
            the most expensive thing a phone GPU can be asked to do here */}
        <div ref={tickerRef} className="absolute inset-x-0 bottom-0 z-10 border-t border-line bg-ink/85">
          <Ticker />
        </div>
      </div>
    </section>
  );
}
