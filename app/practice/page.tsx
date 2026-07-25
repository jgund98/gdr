import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Btn from "@/components/Btn";
import Partners from "@/components/Partners";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Practice — A Developer-Led Approach to Historic Homes",
  description:
    "Inside GDR Development: 28 years of South Florida development, from Miami's Century Hotel to West Palm Beach's historic districts. Respect for character, structure first, and the developer on site.",
};

const principles = [
  {
    title: "Respect for character",
    body: "Defining architectural elements stay. Systems and finishes don't. Every decision honors the home's roots and the integrity of the street around it.",
  },
  {
    title: "Structure first",
    body: "Foundations reinforced, circulation and natural light improved, the whole frame made stronger. A house should feel grounded before it feels beautiful.",
  },
  {
    title: "Design with purpose",
    body: "Rooms redrawn for how people actually live — efficient layouts, honest flow, no wasted space. Materials picked for comfort and decades of use.",
  },
  {
    title: "The developer on site",
    body: "Gus stays personally involved in every phase, backed by a loyal team — never rotating crews. One standard, held from demolition to delivery.",
  },
] as const;

export default function PracticePage() {
  return (
    <>
      {/* opener */}
      <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="survey pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="glow-tl relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHead
                as="h1"
                index="The Practice"
                tag="GDR Development"
                lines={[
                  "BUILT LIKE HIS",
                  <span key="l2">
                    OWN FAMILY WOULD <em className="text-green">live there.</em>
                  </span>,
                ]}
                lede={
                  <>
                    That's the standard, and it isn't a slogan. For more than
                    twenty-eight years Gus Renny has shaped South Florida real
                    estate with intention, integrity, and thoughtful design —
                    and every GDR residence is built to it.
                  </>
                }
              />
            </div>
            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="plate">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/site/gus-plans.webp"
                    alt="Gus Renny standing inside a gutted historic home, holding plans"
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: "50% 22%" }}
                  />
                </div>
              </div>
              <p className="label mt-5 text-faint">The developer, where the work is.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* the story */}
      <section className="relative border-t border-line bg-ink-2 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="tag-index">The lineage</p>
            <p className="display mt-4 text-3xl sm:text-4xl">
              CENTURY HOTEL TO <em className="text-green">el cid.</em>
            </p>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="lede text-paper/90">
                Gus Renny isn't just a developer — he's a recognized name in
                South Florida prestige real estate, with a record that runs from
                the restoration of Miami's historic Century Hotel to some of the
                most coveted homes in Southern Florida.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede mt-6 text-mist">
                GDR Development brings that record to a limited collection of
                residences: decades of experience across acquisition,
                construction, development, and renovation, applied one house at
                a time — honoring architectural character while elevating the
                way modern homes live.
              </p>
            </Reveal>
            <Reveal delay={0.18} className="mt-9 flex flex-wrap gap-4">
              <Btn href={site.gusUrl} variant="outline" external>
                The Full Story — GUSRENNY.COM ↗
              </Btn>
            </Reveal>
          </div>
        </div>
      </section>

      {/* principles */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead
            index="How We Work"
            tag="Four Principles"
            lines={[
              "THE WAY A HOUSE",
              <span key="l2">
                EARNS ITS <em className="text-green">street.</em>
              </span>,
            ]}
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {principles.map((pr, i) => (
              <Reveal key={pr.title} delay={0.06 * i} className="bg-ink">
                <div className="group h-full p-7 transition-colors hover:bg-ink-2 md:p-10">
                  <p className="label text-green">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="display mt-4 text-2xl md:text-3xl">{pr.title}</h3>
                  <p className="mt-4 leading-relaxed text-mist">{pr.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* partners — the bench */}
      <Partners index="04" />

      {/* closing CTA */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="glow-br relative mx-auto max-w-7xl px-5 text-center md:px-8">
          <Reveal>
            <p className="tag-index">Next</p>
            <h2 className="display mx-auto mt-4 max-w-3xl text-4xl sm:text-5xl">
              SEE WHAT THE PRACTICE <em className="text-green">builds.</em>
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Btn href="/residences">View the Residences</Btn>
              <Btn href="/contact" variant="outline">
                Inquire Directly
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
