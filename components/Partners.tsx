import Image from "next/image";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import PalmShadow from "@/components/PalmShadow";

/**
 * The Bench — the specialists GDR actually builds with. Marks only, on
 * matched survey plates: their real logo where one exists, a set monogram
 * where it doesn't. No mismatched headshots, no stock faces.
 */
const partners = [
  {
    name: "Seneca Moss Reynolds",
    firm: "SMR Consulting",
    role: "Interior Design",
    note: "The rooms — materials, light, and the calm that reads as expensive restraint.",
    monogram: "SMR",
  },
  {
    name: "Kristin Kellogg",
    firm: "Smith Kellogg Architecture",
    role: "Historic Preservation Architecture",
    note: "The conscience — what the neighborhood protects, she protects first.",
    logo: "/partners/smith-kellogg-logo.png",
    url: "https://www.smithkellogg.com/",
  },
  {
    name: "David J. Gengler",
    firm: "Gengler Architects, Inc.",
    role: "Classic South Florida Architecture",
    note: "The language — Mediterranean, Mission, and coastal, spoken natively.",
    monogram: "GA",
    url: "https://www.genglerarchitects.com/",
  },
] as const;

export default function Partners({ index = "10" }: { index?: string }) {
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

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {partners.map((pt, i) => {
            const media = (
              <div className="survey-ink relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-ink/10 bg-[#eef1e4] transition-colors duration-500 group-hover:bg-[#e9edda]">
                {"logo" in pt && pt.logo ? (
                  <Image
                    src={pt.logo}
                    alt={`${pt.firm} logo`}
                    width={256}
                    height={256}
                    className="h-24 w-24 object-contain transition-transform duration-500 group-hover:scale-105 md:h-28 md:w-28"
                  />
                ) : (
                  <span className="font-serif text-7xl italic leading-none text-moss transition-transform duration-500 group-hover:scale-105 md:text-8xl">
                    {"monogram" in pt ? pt.monogram : ""}
                  </span>
                )}
                <span className="label absolute bottom-3 right-4 text-ink/30">{String(i + 1).padStart(2, "0")}</span>
              </div>
            );
            const body = (
              <div className="flex flex-1 flex-col p-7 md:p-8">
                <p className="label text-moss">{pt.role}</p>
                <p className="display mt-3 text-2xl md:text-[1.6rem]">{pt.name}</p>
                <p className="mt-1 text-ink/60">{pt.firm}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/60">{pt.note}</p>
                {"url" in pt && pt.url ? (
                  <p className="label mt-6 text-moss transition-colors group-hover:text-ink">Visit ↗</p>
                ) : (
                  <p className="label mt-6 text-ink/30">West Palm Beach</p>
                )}
              </div>
            );
            const card = (
              <div className="flex h-full flex-col border border-ink/15 bg-paper transition-colors duration-300 hover:border-moss/50">
                {media}
                {body}
              </div>
            );
            return (
              <Reveal key={pt.name} delay={0.07 * i}>
                {"url" in pt && pt.url ? (
                  <a href={pt.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
                    {card}
                  </a>
                ) : (
                  <div className="group h-full">{card}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
