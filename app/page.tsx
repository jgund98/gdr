import HeroReveal from "@/components/HeroReveal";
import Stats from "@/components/Stats";
import ThePlot from "@/components/ThePlot";
import TheTurn from "@/components/TheTurn";
import TheStreet from "@/components/TheStreet";
import FilmTheater from "@/components/FilmTheater";
import Standard from "@/components/Standard";
import QuoteTheater from "@/components/QuoteTheater";
import DeveloperBlock from "@/components/DeveloperBlock";
import GroupStrip from "@/components/GroupStrip";
import Monument from "@/components/Monument";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";

export default function Home() {
  return (
    <>
      <HeroReveal />
      <Stats />
      <ThePlot />
      <TheStreet />
      <TheTurn />

      {/* № 04 — the walkthrough */}
      <section className="relative overflow-hidden bg-ink-2 py-16 md:py-32">
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead
            index="04"
            tag="The Walkthrough"
            lines={[
              "317 GREYMON DR,",
              <span key="l2">
                <em className="text-green">delivered.</em>
              </span>,
            ]}
            lede="No renderings, no staging tricks — the completed residence as the camera found it."
          />
          <Reveal delay={0.12} className="mt-12">
            <FilmTheater
              src="/videos/film-317.mp4"
              poster="/videos/film-317-poster.webp"
              label="Walkthrough — 317 Greymon Dr"
            />
          </Reveal>
        </div>
      </section>

      <Standard />
      <QuoteTheater />
      <DeveloperBlock />
      <GroupStrip />
      <Monument />
    </>
  );
}
