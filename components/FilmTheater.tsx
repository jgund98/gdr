"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * The theater: poster, one green play control, then the film with sound.
 * No autoplaying audio, no chrome until the visitor asks for it.
 */
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
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduced = useReducedMotion();

  return (
    <div className={cn("plate", className)}>
      <div className="relative aspect-video w-full overflow-hidden bg-ink-3">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          preload="none"
          controls={playing}
          playsInline
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button
            type="button"
            aria-label={`Play — ${label}`}
            className="group absolute inset-0 flex items-center justify-center"
            onClick={() => {
              setPlaying(true);
              const v = videoRef.current;
              if (v) {
                v.muted = false;
                v.play().catch(() => {});
              }
            }}
          >
            <span className="absolute inset-0 bg-ink/35 transition-colors duration-300 group-hover:bg-ink/20" aria-hidden />
            <motion.span
              className="relative flex h-20 w-20 items-center justify-center bg-green text-ink chamfer-sm md:h-24 md:w-24"
              whileHover={reduced ? undefined : { scale: 1.06 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="26" height="30" viewBox="0 0 26 30" fill="currentColor" aria-hidden>
                <path d="M0 0v30l26-15L0 0Z" />
              </svg>
            </motion.span>
            <span className="label absolute bottom-5 left-5 bg-ink/70 px-3 py-1.5 text-paper backdrop-blur-sm chamfer-sm">
              {label}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
