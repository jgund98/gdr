import Image from "next/image";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

/**
 * The family of companies — the institutional footing under the collection.
 * Real marks only.
 */
export default function GroupStrip() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ink-2 py-16 md:py-20">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="label text-faint">A {site.parent} company — Est. {site.founded}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-8 flex items-center gap-x-6 sm:gap-x-14">
            <Image
              src="/brand/gdr-lockup.png"
              alt="GDR Development"
              width={1264}
              height={214}
              className="h-6 w-auto sm:h-9 md:h-10"
            />
            <a href={site.gusUrl} target="_blank" rel="noopener noreferrer" className="opacity-80 transition-opacity hover:opacity-100">
              <Image
                src="/brand/gr-logo-full.png"
                alt="GUSRENNY.COM"
                width={500}
                height={408}
                className="h-9 w-auto sm:h-12 md:h-14"
              />
            </a>
            <a href={site.rennyRealtyUrl} target="_blank" rel="noopener noreferrer" className="opacity-80 transition-opacity hover:opacity-100">
              <Image
                src="/brand/renny-realty.png"
                alt="Renny Realty"
                width={1200}
                height={1200}
                className="h-10 w-auto sm:h-14 md:h-16"
              />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-8 max-w-2xl leading-relaxed text-mist">
            Development, brokerage, and a builder's record spanning three
            decades — one family of companies behind every GDR residence.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
