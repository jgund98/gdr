import { MARK_PATH, MARK_W, MARK_H } from "@/lib/mark";
import { cn } from "@/lib/cn";

/** The R, everywhere it belongs — inherits currentColor. */
export default function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${MARK_W} ${MARK_H}`}
      className={cn("inline-block", className)}
      aria-hidden
    >
      <path d={MARK_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
