"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Mark from "@/components/Mark";
import { cn } from "@/lib/cn";

/**
 * The screening frame — a player set like a working drawing.
 * Idle: the poster drifts under a slow survey scanline, corner ticks hold
 * the frame, and the title reads like a plan block. Play: the sheet parts,
 * sound comes up, and the scrubber is a dimension line — elapsed time
 * measured with a diamond. Custom controls, desktop and mobile alike.
 */
function fmt(t: number) {
  if (!Number.isFinite(t)) return "00:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function FilmTheater({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [controls, setControls] = useState(true);

  // keep the readout measured
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      setTime(v.currentTime);
      if (v.duration) setProgress(v.currentTime / v.duration);
    };
    const onMeta = () => setDuration(v.duration || 0);
    const onEnd = () => {
      setPlaying(false);
      setControls(true);
    };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("ended", onEnd);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("ended", onEnd);
    };
  }, [started]);

  // leave the viewport, hold the film
  useEffect(() => {
    const host = hostRef.current;
    const v = videoRef.current;
    if (!host || !v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting && !v.paused) {
          v.pause();
          setPlaying(false);
          setControls(true);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  const poke = () => {
    setControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControls(false), 2600);
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      if (!started) setStarted(true);
      v.muted = false;
      setMuted(false);
      v.play().catch(() => {});
      setPlaying(true);
      poke();
    } else {
      v.pause();
      setPlaying(false);
      setControls(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    }
  };

  const seekTo = (clientX: number) => {
    const rail = railRef.current;
    const v = videoRef.current;
    if (!rail || !v || !v.duration) return;
    const r = rail.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    v.currentTime = p * v.duration;
    setProgress(p);
    poke();
  };

  const goFull = () => {
    const v = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else v.webkitEnterFullscreen?.();
  };

  return (
    <div className={cn("plate", className)}>
      <div
        ref={hostRef}
        className="group relative aspect-video w-full overflow-hidden bg-ink-3"
        onPointerMove={() => playing && poke()}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          onClick={() => (playing ? toggle() : undefined)}
        />

        {/* idle: the drifting poster under a survey scan */}
        {!started && (
          <button
            type="button"
            aria-label={`Play — ${label}`}
            className="absolute inset-0 z-10 block h-full w-full cursor-pointer overflow-hidden text-left"
            onClick={toggle}
          >
            <motion.div
              className="absolute inset-0"
              animate={reduced ? undefined : { scale: [1, 1.055, 1] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
            </motion.div>
            <div className="survey absolute inset-0 opacity-40" aria-hidden />
            <div className="absolute inset-0 bg-ink/25 transition-colors duration-300 group-hover:bg-ink/10" aria-hidden />
            {/* play control — a drawn ring around the mark */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="relative flex h-20 w-20 items-center justify-center md:h-24 md:w-24">
                <motion.svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
                  <circle cx="50" cy="50" r="46" fill="rgba(11,14,9,0.55)" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#89bf58"
                    strokeWidth="2.5"
                    initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                  />
                </motion.svg>
                <svg width="22" height="26" viewBox="0 0 26 30" fill="#f3f5ed" className="relative translate-x-0.5" aria-hidden>
                  <path d="M0 0v30l26-15L0 0Z" />
                </svg>
              </span>
            </span>
            {/* plan-block title */}
            <span className="absolute bottom-4 left-4 flex items-center gap-2.5 border border-green/40 bg-ink/70 px-3.5 py-2 backdrop-blur-sm">
              <Mark className="h-3.5 w-auto text-green" />
              <span className="label text-paper">{label}</span>
            </span>
            {/* corner ticks */}
            <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-green/70" aria-hidden />
            <span className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-green/70" aria-hidden />
            <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-green/70" aria-hidden />
          </button>
        )}

        {/* the sheet parts on first play */}
        <AnimatePresence>
          {started && (
            <motion.div
              key="open"
              className="pointer-events-none absolute inset-0 z-20"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2 origin-top bg-ink"
                initial={{ scaleY: reduced ? 0 : 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-ink"
                initial={{ scaleY: reduced ? 0 : 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-green shadow-[0_0_16px_rgba(137,191,88,0.8)]"
                initial={{ opacity: reduced ? 0 : 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              />
              {/* the ident — the mark stamps as the sheet parts */}
              {!reduced && (
                <motion.span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0.55 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.55, 1, 1.04, 1.1] }}
                  transition={{ duration: 1.0, times: [0, 0.3, 0.75, 1], ease: "easeOut" }}
                >
                  <Mark className="h-14 w-auto text-green drop-shadow-[0_0_24px_rgba(137,191,88,0.8)] md:h-20" />
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* the bug — quiet corner mark while the reel runs */}
        {started && (
          <span className="pointer-events-none absolute right-4 top-4 z-20 opacity-45" aria-hidden>
            <Mark className="h-5 w-auto text-green md:h-6" />
          </span>
        )}

        {/* measured controls */}
        {started && (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-30 transition-opacity duration-300",
              controls || !playing ? "opacity-100" : "opacity-0"
            )}
            onPointerMove={poke}
          >
            <div className="bg-gradient-to-t from-ink/90 via-ink/50 to-transparent px-4 pb-4 pt-10 md:px-5">
              {/* the dimension line */}
              <div
                ref={railRef}
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
                tabIndex={0}
                className="relative h-6 cursor-pointer"
                onPointerDown={(e) => {
                  (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                  seekTo(e.clientX);
                }}
                onPointerMove={(e) => e.buttons > 0 && seekTo(e.clientX)}
                onKeyDown={(e) => {
                  const v = videoRef.current;
                  if (!v) return;
                  if (e.key === "ArrowRight") v.currentTime += 5;
                  if (e.key === "ArrowLeft") v.currentTime -= 5;
                }}
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-paper/25" />
                <span
                  className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-green shadow-[0_0_10px_rgba(137,191,88,0.7)]"
                  style={{ width: `${progress * 100}%` }}
                />
                <span
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-paper/60 bg-green"
                  style={{ left: `${progress * 100}%` }}
                />
                {/* end ticks, like a measured string */}
                <span className="absolute left-0 top-1/2 h-3 w-px -translate-y-1/2 bg-paper/40" />
                <span className="absolute right-0 top-1/2 h-3 w-px -translate-y-1/2 bg-paper/40" />
              </div>

              <div className="mt-1.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={playing ? "Pause" : "Play"}
                    onClick={toggle}
                    className="flex h-9 w-9 items-center justify-center bg-green text-ink transition-colors hover:bg-green-bright chamfer-sm"
                  >
                    {playing ? (
                      <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor" aria-hidden>
                        <path d="M0 0h3.6v13H0zM7.4 0H11v13H7.4z" />
                      </svg>
                    ) : (
                      <svg width="11" height="13" viewBox="0 0 26 30" fill="currentColor" aria-hidden>
                        <path d="M0 0v30l26-15L0 0Z" />
                      </svg>
                    )}
                  </button>
                  <span className="label tabular-nums text-paper/85">
                    {fmt(time)}&thinsp;—&thinsp;{fmt(duration)}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    aria-label={muted ? "Unmute" : "Mute"}
                    onClick={() => {
                      const v = videoRef.current;
                      if (!v) return;
                      v.muted = !v.muted;
                      setMuted(v.muted);
                      poke();
                    }}
                    className="flex h-9 w-9 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-green hover:text-green chamfer-sm"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="M11 4.7 6.4 8.6H3v6.8h3.4l4.6 3.9V4.7Z" />
                      {muted ? <path d="M16 9l5 6M21 9l-5 6" /> : <path d="M16 8.5a5 5 0 0 1 0 7" />}
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Fullscreen"
                    onClick={goFull}
                    className="flex h-9 w-9 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-green hover:text-green chamfer-sm"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* paused-state resume target over the frame */}
        {started && !playing && (
          <button
            type="button"
            aria-label="Resume"
            onClick={toggle}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center bg-ink/60 text-paper backdrop-blur-sm chamfer-sm">
              <svg width="18" height="22" viewBox="0 0 26 30" fill="currentColor" aria-hidden>
                <path d="M0 0v30l26-15L0 0Z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
