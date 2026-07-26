"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A section rising into place. Identical to the motion version it replaced —
 * same 28px lift, same 0.7s easing, same "-80px" trigger, same play-once —
 * but the movement is a CSS keyframe and every instance shares a single
 * IntersectionObserver. The home page holds three dozen of these, and
 * hydrating three dozen animation runtimes was the largest block of
 * main-thread work in the first second of the site's life.
 */
let observer: IntersectionObserver | null = null;

function watch(el: HTMLElement) {
  if (typeof IntersectionObserver === "undefined") {
    el.classList.add("is-in"); // never leave content stranded at opacity 0
    return () => {};
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          observer?.unobserve(e.target); // once
        }
      },
      { rootMargin: "-80px 0px -80px 0px" }
    );
  }
  observer.observe(el);
  return () => observer?.unobserve(el);
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return watch(el);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--rv-y": `${y}px`, "--rv-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
