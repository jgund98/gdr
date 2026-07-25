import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import PropertyCard from "@/components/PropertyCard";
import ThePlot from "@/components/ThePlot";
import { properties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Residences — Historic Rebuilds in West Palm Beach & Los Angeles",
  description:
    "The GDR collection: rebuilt historic homes and ground-up residences across West Palm Beach's most established neighborhoods and the California hillsides. No repeated plans, no packaged designs.",
};

export default function ResidencesPage() {
  const wpb = properties.filter((p) => p.region === "West Palm Beach");
  const la = properties.filter((p) => p.region === "Los Angeles");

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="survey pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead
            as="h1"
            index="Index"
            tag="The Collection"
            lines={[
              "EVERY HOUSE,",
              <span key="l2">
                ITS OWN <em className="text-green">answer.</em>
              </span>,
            ]}
            lede="Rebuilt historic homes and selective new construction — each residence approached individually, with no repeated plans and no packaged designs."
          />
        </div>
      </section>

      {/* the plot — point at a pin, open a record */}
      <ThePlot compact />

      <section className="relative pb-24 pt-24 md:pb-32 md:pt-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <div className="flex items-baseline gap-5 border-b border-line pb-5">
              <h2 className="display text-3xl md:text-4xl">West Palm Beach</h2>
              <p className="label text-faint">{wpb.length} residences · Florida</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {wpb.map((p, i) => (
              <Reveal key={p.slug} delay={0.05 * (i % 3)}>
                <PropertyCard property={p} priority={i < 3} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-24">
            <div className="flex items-baseline gap-5 border-b border-line pb-5">
              <h2 className="display text-3xl md:text-4xl">Los Angeles</h2>
              <p className="label text-faint">{la.length} residences · California</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {la.map((p, i) => (
              <Reveal key={p.slug} delay={0.05 * (i % 3)}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
