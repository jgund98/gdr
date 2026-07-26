"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/lib/site";
import { MARK_PATH, MARK_W, MARK_H } from "@/lib/mark";
import { cn } from "@/lib/cn";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /**
   * The mark always goes home, and home always means the top. A Link to the
   * route you are already on is a no-op in Next, so on "/" the click has to
   * do the scrolling itself — through Lenis when it is running, so its
   * internal position stays in step with the page.
   */
  const goHome = (e: React.MouseEvent) => {
    setOpen(false);
    if (pathname !== "/") return; // let the Link navigate; the route change lands at top
    e.preventDefault();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } })
      .__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 0.9 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const pathname = usePathname();

  /**
   * The bar only takes its dark backing once the page is genuinely moving.
   * The home hero is pinned for well over a viewport while its descent
   * plays, and scrollY climbs the whole time even though nothing has
   * physically travelled yet — darkening there reads as a bug. So on a page
   * that declares a pinned hero, the threshold is the point that hero
   * releases; everywhere else it stays the usual few pixels.
   */
  useEffect(() => {
    let threshold = 24;
    const measure = () => {
      const hero = document.querySelector<HTMLElement>("[data-pinned-hero]");
      threshold = hero ? Math.max(24, hero.offsetHeight - window.innerHeight - 40) : 24;
    };
    const onScroll = () => setScrolled(window.scrollY > threshold);
    measure();
    onScroll();
    const onResize = () => {
      measure();
      onScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
        scrolled && !open
          ? "border-line bg-ink/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      {/* legibility scrim while the header floats over imagery */}
      {!scrolled && !open && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/75 to-transparent"
          aria-hidden
        />
      )}

      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:h-24 md:px-8">
        <Link
          href="/"
          aria-label="GDR Development — home"
          onClick={goHome}
          className="relative z-[70] drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]"
        >
          <Image
            src="/brand/gdr-lockup.png"
            alt="GDR Development"
            width={1264}
            height={214}
            priority
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={pathname === item.href || pathname.startsWith(item.href + "/")}
              className="navline label text-paper/85 transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="chamfer-sm bg-green px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-green-bright"
          >
            Inquire
          </Link>
        </nav>

        {/* mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[70] flex h-11 w-11 items-center justify-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] lg:hidden"
        >
          <span className="relative block h-3.5 w-7">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-full bg-paper transition-transform duration-300",
                open && "top-1/2 -translate-y-1/2 rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-0.5 w-full bg-paper transition-transform duration-300",
                open && "bottom-auto top-1/2 -translate-y-1/2 -rotate-45"
              )}
            />
          </span>
        </button>
      </div>

      {/* mobile menu — brand curtain */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink lg:hidden"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <svg
              viewBox={`0 0 ${MARK_W} ${MARK_H}`}
              className="pointer-events-none absolute -right-[16%] top-1/2 h-[64vh] w-auto -translate-y-1/2 opacity-[0.07]"
              aria-hidden
            >
              <path d={MARK_PATH} fill="var(--color-green)" fillRule="evenodd" />
            </svg>
            <nav className="relative flex flex-1 flex-col justify-center gap-3 px-8 pt-24" aria-label="Mobile">
              {[...nav].map((item, i) => (
                <div key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%", transition: { duration: 0.25, delay: 0.02 * i } }}
                    transition={{ delay: 0.24 + 0.07 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-2 display text-[2.9rem] leading-none transition-colors",
                        pathname === item.href ? "text-green" : "text-paper active:text-green"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="relative border-t border-line px-8 py-7"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="display text-2xl text-green">West Palm Beach</p>
              <p className="label mt-3 text-faint">GDR DEVELOPMENT&ensp;·&ensp;Est. 1997</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
