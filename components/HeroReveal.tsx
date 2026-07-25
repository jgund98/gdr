"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Btn from "@/components/Btn";
import RevealLines from "@/components/RevealLines";
import Ticker from "@/components/Ticker";

/**
 * The opening move, in two acts.
 *
 * Act I — load: a drafting sheet parts along a plotted green line and the
 * city fills the window. The drawing becomes the neighborhood.
 *
 * Act II — first scroll: the hero pins and the camera descends toward the
 * street grid while a survey overlay plots the block in real time — lot
 * lines, dimension ticks, coordinates. The developer claiming the ground.
 *
 * All scroll work runs in a layout-based rAF (Lenis-safe); every animated
 * property is a transform, opacity, or SVG dashoffset.
 */
export default function HeroReveal() {
  const reduced = useReducedMotion();
  const [gone, setGone] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLElement | null>(null);
  const zoomRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLDivElement | null>(null);
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  // Act II — the descent
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    // each plotted stroke draws across its own slice of the scroll
    const strokes: { el: SVGElement | null; start: number; dur: number }[] = [];
    if (svgRef.current) {
      svgRef.current.querySelectorAll<SVGElement>("[data-plot]").forEach((el, i) => {
        strokes.push({ el, start: 0.12 + i * 0.09, dur: 0.2 });
      });
    }
    const labels = svgRef.current
      ? [...svgRef.current.querySelectorAll<SVGElement>("[data-label]")]
      : [];
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp(-r.top / (r.height - vh));
      const zoom = zoomRef.current;
      if (zoom) {
        const s = 1 + p * (window.innerWidth < 768 ? 0.55 : 1.05);
        zoom.style.transform = `scale(${s}) translateY(${p * 5}%)`;
      }
      if (wordsRef.current) {
        wordsRef.current.style.opacity = String(clamp(1 - p * 2.4));
        wordsRef.current.style.transform = `translateY(${-p * 14}vh)`;
      }
      if (tickerRef.current) tickerRef.current.style.opacity = String(clamp(1 - p * 1.2));
      if (cueRef.current) cueRef.current.style.opacity = String(clamp(1 - p * 5));
      if (fadeRef.current) fadeRef.current.style.opacity = String(clamp((p - 0.72) / 0.28) * 0.92);
      if (svgRef.current) svgRef.current.style.opacity = String(clamp(p * 4) * clamp((1 - p) * 6));
      for (const s of strokes) {
        if (!s.el) continue;
        const d = clamp((p - s.start) / s.dur);
        (s.el as SVGGeometryElement).style.strokeDashoffset = String(1 - d);
      }
      for (const l of labels) {
        l.style.opacity = String(clamp((p - 0.42) / 0.15) * clamp((1 - p) * 6));
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const panel = "absolute inset-x-0 z-30 h-1/2 bg-paper survey-ink";
  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <section
      ref={wrapRef}
      aria-label="GDR Development"
      className={reduced ? "relative h-[100svh] min-h-[520px]" : "relative h-[240svh]"}
    >
      <div className="sticky top-0 h-[100svh] min-h-[520px] overflow-hidden">
        {/* the city — West Palm Beach from above, running to the Intracoastal */}
        <div ref={zoomRef} className="absolute inset-0 will-change-transform" style={{ transformOrigin: "50% 64%" }}>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/wpb-aerial.mp4"
            poster="/videos/wpb-aerial-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/20 to-ink/85" aria-hidden />

        {/* the survey overlay — drawn by the scroll */}
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
              strokeWidth="2"
              pathLength={1}
              strokeDasharray="1"
              style={{ filter: "drop-shadow(0 0 6px rgba(137,191,88,0.65))" }}
            >
              {/* the block */}
              <path data-plot d="M 285 585 L 715 585" strokeDashoffset={1} />
              <path data-plot d="M 715 585 L 715 855" strokeDashoffset={1} />
              <path data-plot d="M 715 855 L 285 855" strokeDashoffset={1} />
              <path data-plot d="M 285 855 L 285 585" strokeDashoffset={1} />
              {/* lot divisions */}
              <path data-plot d="M 430 585 L 430 855" strokeWidth="1.4" strokeDashoffset={1} />
              <path data-plot d="M 570 585 L 570 855" strokeWidth="1.4" strokeDashoffset={1} />
              {/* dimension line above the block */}
              <path data-plot d="M 285 548 L 715 548" strokeWidth="1.2" strokeDashoffset={1} />
            </g>
            {/* corner ticks */}
            <g stroke="#89bf58" strokeWidth="3" data-label style={{ opacity: 0 }}>
              <path d="M 285 585 h 16 M 285 585 v 16" fill="none" />
              <path d="M 715 585 h -16 M 715 585 v 16" fill="none" />
              <path d="M 715 855 h -16 M 715 855 v -16" fill="none" />
              <path d="M 285 855 h 16 M 285 855 v -16" fill="none" />
            </g>
            <g
              data-label
              style={{ opacity: 0 }}
              fill="#a6d977"
              fontSize="17"
              fontFamily="var(--font-instrument-sans), sans-serif"
              letterSpacing="0.18em"
            >
              <text x="285" y="530">26.68° N · 80.05° W</text>
              <text x="500" y="900" textAnchor="middle" fill="#89bf58">
                THE NEXT STREET IS ALREADY CHOSEN
              </text>
            </g>
          </svg>
        )}

        {/* the drafting sheet — unmounts once it has parted */}
        {!reduced && !gone && (
          <>
            <motion.div
              className={`${panel} top-0`}
              initial={{ y: "0%" }}
              animate={{ y: ["0%", "-26%", "-26%", "-102%"] }}
              transition={{ duration: 2.15, times: [0, 0.34, 0.56, 1], ease: [ease, ease, ease] }}
              onAnimationComplete={() => setGone(true)}
              aria-hidden
            >
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
              className={`${panel} bottom-0`}
              initial={{ y: "0%" }}
              animate={{ y: ["0%", "26%", "26%", "102%"] }}
              transition={{ duration: 2.15, times: [0, 0.34, 0.56, 1], ease: [ease, ease, ease] }}
              aria-hidden
            >
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

        {/* the words — landing as the sheet parts, drifting out on descent */}
        <div ref={wordsRef} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-20 will-change-transform md:px-8 md:pb-28">
          <motion.p
            className="label mb-5 text-green"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 1.55, duration: 0.6 }}
          >
            Luxury Development — West Palm Beach — Est. 1997
          </motion.p>
          <RevealLines
            as="h1"
            delay={reduced ? 0 : 1.68}
            className="text-[12.5vw] leading-[0.98] sm:text-[10.5vw] md:text-[9vw] lg:text-[7.2rem] xl:text-[8.2rem] 2xl:text-[9rem]"
            lines={[
              "THE BEST HOUSE",
              <span key="l2">
                ON THE <em className="text-green">street.</em>
              </span>,
            ]}
          />
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 1.95, duration: 0.6 }}
          >
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mist md:mt-6 md:max-w-2xl md:text-xl">
              A limited collection of historic rebuilds and ground-up residences
              across El&nbsp;Cid, Flamingo&nbsp;Park, and the South&nbsp;End —
              developed start to finish by Gus&nbsp;Renny, sold&nbsp;direct.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-8 md:gap-4">
              <Btn href="/residences">View the Residences</Btn>
              <Btn href="/contact" variant="outline">
                Inquire Directly
              </Btn>
            </div>
          </motion.div>
        </div>

        {/* scroll cue */}
        {!reduced && (
          <motion.div
            ref={cueRef}
            className="absolute bottom-20 right-6 z-10 hidden items-center gap-2 md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.8 }}
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
        <div ref={tickerRef} className="absolute inset-x-0 bottom-0 z-10 border-t border-line bg-ink/60 backdrop-blur-sm">
          <Ticker />
        </div>
      </div>
    </section>
  );
}
