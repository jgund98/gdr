"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/** The record — four figures, counted up once, standing still. */
const stats = [
  { value: 28, suffix: "", label: "Years developing South Florida" },
  { value: 40, suffix: "+", label: "Homes built, restored, or reimagined" },
  { value: 150, suffix: "K+", label: "Square feet of homes delivered" },
  { value: 150, suffix: "M+", prefix: "$", label: "Total development volume" },
] as const;

function Counter({
  value,
  prefix = "",
  suffix = "",
  run,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  run: boolean;
}) {
  const [n, setN] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!run) return;
    if (reduced) {
      setN(value);
      return;
    }
    const t0 = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value, reduced]);

  return (
    <span>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      aria-label="The GDR record"
      className="relative overflow-hidden border-b border-line bg-ink py-14 md:py-16"
    >
      <div ref={ref} className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 md:px-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className="relative border-l border-line pl-4 md:pl-5">
            <p className="display text-[2rem] leading-tight text-green sm:text-5xl md:text-6xl">
              <Counter value={s.value} prefix={"prefix" in s ? s.prefix : ""} suffix={s.suffix} run={inView} />
            </p>
            <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-mist">{s.label}</p>
            <span className="absolute -top-1 right-2 label text-faint">{String(i + 1).padStart(2, "0")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
