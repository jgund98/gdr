import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/lib/properties";
import { cn } from "@/lib/cn";
import { noWidow } from "@/lib/text";

export function StatusChip({ status, className }: { status: Property["status"]; className?: string }) {
  return (
    <span
      className={cn(
        "label px-3 py-1.5 chamfer-sm",
        status === "Completed" && "bg-green text-ink",
        status === "Coming Soon" && "border border-green/60 bg-ink/70 text-green backdrop-blur-sm",
        status === "Sold" && "bg-paper text-ink",
        className
      )}
    >
      {status}
    </span>
  );
}

export default function PropertyCard({
  property,
  priority = false,
}: {
  property: Property;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/residences/${property.slug}`}
      className="group block"
      aria-label={`${property.address} — ${property.city}`}
    >
      <div className="plate">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={`/properties/${property.slug}/01.webp`}
            alt={`${property.address}, ${property.city}`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
          <StatusChip status={property.status} className="absolute left-4 top-4 z-10" />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40"
            aria-hidden
          />
        </div>
      </div>
      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="display text-2xl transition-colors group-hover:text-green md:text-3xl">
            {noWidow(property.address)}
          </p>
          <p className="label mt-2 text-faint">
            {property.neighborhood} · {property.city}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">{property.blurb}</p>
        </div>
        <span
          className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-line text-green transition-colors duration-300 chamfer-sm group-hover:bg-green group-hover:text-ink"
          aria-hidden
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 14 14 2M6 2h8v8" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
