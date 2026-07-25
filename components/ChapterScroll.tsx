"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import Reveal from "@/components/Reveal";

/**
 * The Method, in four chapters — a pinned sequence the scroll conducts.
 * Full-bleed acts crossfade as giant chapter words trade places; a green
 * progress rail keeps score. Layout-based rAF (Lenis-safe), style writes
 * only — no React state in the hot path.
 */
const chapters = [
  {
    word: "FIND",
    img: "/properties/greymon-335/08.webp",
    line: "The worst house on the best street.",
    sub: "Acquired for what it could be — never for what it is.",
  },
  {
    word: "GUT",
    img: "/site/gus-jobsite-wide.webp",
    pos: "50% 10%",
    line: "Down to the bones. Then better bones.",
    sub: "Structure, systems, circulation — solved before anything is beautiful.",
  },
  {
    word: "REBUILD",
    img: "/properties/greymon-317/01.webp",
    line: "One vision, zero shortcuts.",
    sub: "The same eye that approved the lot approves the last cabinet pull.",
  },
  {
    word: "DELIVER",
    img: "/properties/greymon-227/02.webp",
    line: "The street gets its best house back.",
    sub: "Sold direct by the developer who built it.",
  },
] as const;

export default function ChapterScroll() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let lastCount = "";
    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const N = chapters.length;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return; // offscreen — skip work
      const p = clamp(-r.top / (r.height - vh));
      const seg = p * N;
      for (let i = 0; i < N; i++) {
        const start = i;
        const end = i + 1;
        let op: number;
        if (i === 0 && seg <= start + 0.5) op = 1;
        else if (seg < start - 0.001) op = 0;
        else if (seg < start + 0.35) op = (seg - start) / 0.35;
        else op = 1;
        // hide only once the NEXT act has fully faded in over this one
        if (i < N - 1 && seg > end + 0.36) op = 0;
        // the incoming layer fades in OVER the previous one; previous only
        // hides once fully covered, so there is never a black frame
        const layer = layerRefs.current[i];
        if (layer) {
          layer.style.opacity = String(op);
          const sc = 1.07 - 0.07 * clamp(seg - start + 0.35, 0, 1.35) / 1.35;
          layer.style.transform = `scale(${sc})`;
        }
        const text = textRefs.current[i];
        if (text) {
          // text belongs to its chapter alone — crossfade harder
          const local = seg - i;
          const tOp =
            i === 0 && local < 0.5
              ? clamp(1 - Math.max(0, local - 0.62) / 0.25)
              : clamp(Math.min((local - 0.05) / 0.22, 1 - (local - 0.62) / 0.25, 1));
          text.style.opacity = String(i === N - 1 ? clamp(Math.min((local - 0.05) / 0.22, 1)) : tOp);
          text.style.transform = `translateY(${(1 - Math.min(1, Math.max(0, (local + 0.3) / 0.5))) * 26}px)`;
        }
      }
      if (barRef.current) barRef.current.style.transform = `scaleY(${p})`;
      const c = String(Math.min(N, Math.floor(seg) + 1)).padStart(2, "0");
      if (countRef.current && c !== lastCount) {
        lastCount = c;
        countRef.current.textContent = c;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  /* Reduced motion: the four chapters, stacked and honest. */
  if (reduced) {
    return (
      <section className="relative bg-ink">
        {chapters.map((c, i) => (
          <div key={c.word} className="relative overflow-hidden">
            <div className="relative h-[70svh]">
              <Image src={c.img} alt={c.line} fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-ink/55" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-12">
                <p className="tag-index">0{i + 1} — The Method</p>
                <p className="display mt-3 text-6xl text-paper md:text-8xl">{c.word}</p>
                <p className="lede mt-3 max-w-xl text-paper/90">{c.line}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section aria-label="The GDR method" className="relative">
      <div ref={wrapRef} className="relative h-[440svh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-ink">
          <p className="tag-index absolute left-5 top-28 z-10 md:left-8">01 — The Method</p>
          {/* acts */}
          {chapters.map((c, i) => (
            <div
              key={c.word}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className="absolute inset-0 will-change-transform"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Image
                src={c.img}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                style={"pos" in c && c.pos ? { objectPosition: c.pos } : undefined}
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/40" aria-hidden />
            </div>
          ))}

          {/* words */}
          {chapters.map((c, i) => (
            <div
              key={c.word}
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className="absolute inset-x-0 bottom-0 will-change-transform"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div className="mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
                <h3 className="display text-[14.5vw] leading-none text-paper sm:text-[12vw] lg:text-[10rem]">
                  {c.word}
                  <span className="text-green">.</span>
                </h3>
                <p className="lede mt-4 max-w-xl text-paper">{c.line}</p>
                <p className="mt-2 max-w-xl text-mist">{c.sub}</p>
              </div>
            </div>
          ))}

          {/* the rail */}
          <div className="absolute bottom-16 right-5 top-24 hidden w-px bg-paper/20 md:right-10 md:block" aria-hidden>
            <div
              ref={barRef}
              className="absolute inset-x-0 top-0 h-full origin-top bg-green"
              style={{ transform: "scaleY(0)" }}
            />
          </div>
          <p className="label absolute right-4 top-14 hidden text-paper/70 md:right-7 md:block" aria-hidden>
            <span ref={countRef} className="text-green">
              01
            </span>
            &thinsp;/&thinsp;04
          </p>
        </div>
      </div>
    </section>
  );
}
