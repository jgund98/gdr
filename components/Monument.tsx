"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import Btn from "@/components/Btn";
import Reveal from "@/components/Reveal";
import { MARK_PATH, MARK_W, MARK_H } from "@/lib/mark";

/**
 * The Monument — the R rises off the drawing board. A perspective survey
 * floor recedes into the dark; the mark extrudes out of it layer by layer,
 * then stands and answers the cursor. Flat drawing → built object: the
 * whole practice, in one move. CSS 3D only; every layer is the real
 * traced mark.
 */
const LAYERS = 14;
const STEP = 3.2; // px of extrusion per layer

export default function Monument() {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement | null>(null);
  const rigRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let t0 = performance.now();
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const rig = rigRef.current;
      if (!rig) return;
      // idle breath so it never sits dead, pointer wins when present
      const idle = Math.sin((t - t0) / 2600) * 6;
      const tx = target.current.x || idle;
      const ty = target.current.y || -4;
      current.current.x += (tx - current.current.x) * 0.06;
      current.current.y += (ty - current.current.y) * 0.06;
      rig.style.transform = `rotateY(${current.current.x}deg) rotateX(${current.current.y}deg)`;
    };
    raf = requestAnimationFrame(loop);
    const host = hostRef.current;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !host) return;
      const r = host.getBoundingClientRect();
      target.current.x = ((e.clientX - r.left) / r.width - 0.5) * 34;
      target.current.y = -((e.clientY - r.top) / r.height - 0.5) * 20;
    };
    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
    };
    host?.addEventListener("pointermove", onMove);
    host?.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host?.removeEventListener("pointermove", onMove);
      host?.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <section
      ref={hostRef}
      className="relative overflow-hidden bg-ink py-24 md:py-36"
      aria-label="GDR Development — built to be kept"
    >
      {/* the board the mark rises from */}
      <div className="pointer-events-none absolute inset-x-[-40%] bottom-[-6%] h-[70%] [perspective:900px]" aria-hidden>
        <div className="survey h-full w-full opacity-80 [transform:rotateX(72deg)] [transform-origin:50%_100%] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.9),transparent_78%)]" />
      </div>
      <div className="glow-br relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* the mark, standing */}
          <div className="flex justify-center lg:col-span-6">
            <div className="[perspective:1100px]">
              <div
                ref={rigRef}
                className="relative h-[240px] w-[280px] will-change-transform [transform-style:preserve-3d] sm:h-[300px] sm:w-[352px] md:h-[340px] md:w-[400px]"
              >
                {Array.from({ length: reduced ? 1 : LAYERS }, (_, i) => {
                  const front = i === (reduced ? 0 : LAYERS - 1);
                  const depth = i / Math.max(1, LAYERS - 1);
                  return (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      style={{ transformStyle: "preserve-3d" }}
                      initial={reduced ? false : { opacity: 0, transform: "translateZ(0px)" }}
                      whileInView={{
                        opacity: 1,
                        transform: `translateZ(${i * STEP}px)`,
                      }}
                      viewport={{ once: true, margin: "-140px" }}
                      transition={{ delay: 0.15 + i * 0.055, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <svg
                        viewBox={`0 0 ${MARK_W} ${MARK_H}`}
                        className="h-full w-full"
                        style={
                          front
                            ? { filter: "drop-shadow(0 0 26px rgba(137,191,88,0.45))" }
                            : undefined
                        }
                        aria-hidden
                      >
                        <path
                          d={MARK_PATH}
                          fill={
                            front
                              ? "#89bf58"
                              : `rgba(${34 + depth * 60}, ${58 + depth * 90}, ${16 + depth * 40}, 0.96)`
                          }
                          fillRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* the sign-off */}
          <div className="relative text-center lg:col-span-6 lg:text-left">
            <Reveal>
              <p className="label text-green">GDR Development — Est. 1997</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-4 text-5xl sm:text-6xl xl:text-7xl">
                BUILT TO BE <em className="text-green">kept.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="lede mx-auto mt-6 max-w-md text-mist lg:mx-0">
                Off the board, onto the street — one residence at a time.
              </p>
            </Reveal>
            <Reveal delay={0.22} className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Btn href="/contact">Inquire Directly</Btn>
              <Btn href="/residences" variant="outline">
                The Residences
              </Btn>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
