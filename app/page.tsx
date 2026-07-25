import HeroReveal from "@/components/HeroReveal";
import Stats from "@/components/Stats";
import ThePlot from "@/components/ThePlot";
import TheTurn from "@/components/TheTurn";
import TheStreet from "@/components/TheStreet";
import FilmTheater from "@/components/FilmTheater";
import Standard from "@/components/Standard";
import BuyDirect from "@/components/BuyDirect";
import QuoteTheater from "@/components/QuoteTheater";
import DeveloperBlock from "@/components/DeveloperBlock";
import Partners from "@/components/Partners";
import GroupStrip from "@/components/GroupStrip";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";

export default function Home() {
  return (
    <>
      <HeroReveal />
      <Stats />
      <ThePlot />
      <TheTurn />
      <TheStreet />

      {/* № 04 — the film */}
      <section className="relative overflow-hidden bg-ink-2 py-24 md:py-32">
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead
            index="04"
            tag="The Film"
            lines={[
              "WALK A FINISHED",
              <span key="l2">
                GDR <em className="text-green">home.</em>
              </span>,
            ]}
            lede="317 Greymon Dr, completed. No renderings, no staging tricks — the delivered residence, inside and above."
          />
          <Reveal delay={0.12} className="mt-12">
            <FilmTheater
              src="/videos/film-317.mp4"
              poster="/videos/film-317-poster.webp"
              label="The film — 317 Greymon Dr, completed"
            />
          </Reveal>
        </div>
      </section>

      <Standard />
      <BuyDirect />
      <QuoteTheater />
      <DeveloperBlock />
      <Partners />
      <GroupStrip />
    </>
  );
}
