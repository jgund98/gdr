"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Low-memory devices scroll smoother natively than through a rAF loop.
    const mem = (navigator as { deviceMemory?: number }).deviceMemory;
    if (mem !== undefined && mem <= 4) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 });
    lenisRef.current = lenis;
    // the header needs it to send you home smoothly from the same route
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Lenis keeps its own scroll state across route changes — force-sync it
  // on every navigation, to the anchor target or the top.
  useEffect(() => {
    const lenis = lenisRef.current;
    const hash = window.location.hash.slice(1);
    const target = hash ? document.getElementById(hash) : null;
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, { immediate: true, force: true, offset: -120 });
      } else {
        target.scrollIntoView();
      }
      return;
    }
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
