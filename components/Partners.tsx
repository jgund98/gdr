import Image from "next/image";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import PalmShadow from "@/components/PalmShadow";

/**
 * The Bench — the specialists GDR actually builds with, shown as people,
 * not a logo wall. Real portraits and marks from their own firms.
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
    photo: "/partners/kristin-kellogg.webp",
    logo: "/partners/smith-kellogg-logo.png",
    url: "https://www.smithkellogg.com/",
  },
  {
    name: "David J. Gengler",
    firm: "Gengler Architects, Inc.",
    role: "Classic South Florida Architecture",
    note: "The language — Mediterranean, Mission, and coastal, spoken natively.",
    photo: "/partners/david-gengler.webp",
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
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e8ecdd]">
                {"photo" in pt && pt.photo ? (
                  <Image
                    src={pt.photo}
                    alt={pt.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="survey-ink absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-8xl italic text-moss">
                      {pt.monogram}
                    </span>
                  </div>
                )}
                {"logo" in pt && pt.logo && (
                  <span className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center bg-paper/90 p-2 backdrop-blur-sm">
                    <Image src={pt.logo} alt={`${pt.firm} logo`} width={44} height={44} className="h-auto w-full" />
                  </span>
                )}
              </div>
            );
            const body = (
              <>
                <p className="label mt-6 text-moss">{pt.role}</p>
                <p className="display mt-2 text-2xl md:text-[1.65rem]">{pt.name}</p>
                <p className="mt-1 text-ink/60">{pt.firm}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">{pt.note}</p>
                {"url" in pt && pt.url && (
                  <p className="label mt-5 text-moss transition-colors group-hover:text-ink">Visit ↗</p>
                )}
              </>
            );
            return (
              <Reveal key={pt.name} delay={0.07 * i}>
                {"url" in pt && pt.url ? (
                  <a href={pt.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="plate plate-ink">{media}</div>
                    {body}
                  </a>
                ) : (
                  <div className="group">
                    <div className="plate plate-ink">{media}</div>
                    {body}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
