import Image from "next/image";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import PalmShadow from "@/components/PalmShadow";

/**
 * The Bench — set like end credits, not cards. Three full-width rows,
 * hairline rules, names at display scale, the one real firm mark inline.
 */
const partners = [
  {
    name: "Seneca Moss Reynolds",
    firm: "SMR Consulting",
    role: "Interior Design",
    note: "materials, light, and the calm that reads as expensive restraint",
  },
  {
    name: "Kristin Kellogg",
    firm: "Smith Kellogg Architecture",
    role: "Historic Preservation Architecture",
    note: "what the neighborhood protects, she protects first",
    logo: "/partners/smith-kellogg-logo.png",
    url: "https://www.smithkellogg.com/",
  },
  {
    name: "David J. Gengler",
    firm: "Gengler Architects, Inc.",
    role: "Classic South Florida Architecture",
    note: "Mediterranean, Mission, and coastal — spoken natively",
    url: "https://www.genglerarchitects.com/",
  },
] as const;

export default function Partners({ index = "09" }: { index?: string }) {
  return (
    <section id="partners" className="relative overflow-hidden bg-paper py-24 text-ink md:py-32">
      <PalmShadow className="right-[-7%] top-[-5%] h-[420px] w-[420px] opacity-20 md:h-[600px] md:w-[600px]" flip delay={1} />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          tone="paper"
          index={index}
          tag="The Bench"
          lines={[
            "THE COMPANY",
            <span key="l2">
              WE <em className="text-moss">keep.</em>
            </span>,
          ]}
          lede="Every rebuild is a collaboration between the developer and specialists who have spent careers on South Florida houses. These are the three."
        />

        <div className="mt-14 border-t border-ink/15">
          {partners.map((pt, i) => {
            const row = (
              <div className="group grid items-center gap-x-8 gap-y-3 border-b border-ink/15 py-8 transition-colors md:grid-cols-12 md:py-10">
                <div className="md:col-span-3">
                  <p className="label text-moss">{pt.role}</p>
                </div>
                <div className="md:col-span-6">
                  <p className="display text-3xl transition-colors group-hover:text-moss md:text-4xl xl:text-[2.9rem]">
                    {pt.name}
                  </p>
                  <p className="mt-2 text-ink/60">
                    {pt.firm}
                    <span className="text-ink/35">
                      {" "}
                      — <em className="font-serif italic">{pt.note}.</em>
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-6 md:col-span-3 md:justify-end">
                  {"logo" in pt && pt.logo && (
                    <Image
                      src={pt.logo}
                      alt={`${pt.firm} logo`}
                      width={256}
                      height={256}
                      className="h-12 w-12 object-contain opacity-80 transition-opacity group-hover:opacity-100 md:h-14 md:w-14"
                    />
                  )}
                  {"url" in pt && pt.url ? (
                    <p className="label whitespace-nowrap text-moss transition-colors group-hover:text-ink">
                      Visit ↗
                    </p>
                  ) : (
                    <p className="label whitespace-nowrap text-ink/35">West Palm Beach</p>
                  )}
                </div>
              </div>
            );
            return (
              <Reveal key={pt.name} delay={0.06 * i}>
                {"url" in pt && pt.url ? (
                  <a href={pt.url} target="_blank" rel="noopener noreferrer" className="block">
                    {row}
                  </a>
                ) : (
                  row
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-sm leading-relaxed text-ink/45">
            Assembled by the developer, held to his standard — one bench across
            every GDR residence.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
