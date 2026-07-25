import Image from "next/image";
import Btn from "@/components/Btn";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { site } from "@/lib/site";

export default function DeveloperBlock() {
  return (
    <section className="relative overflow-hidden bg-ink-2 py-24 md:py-32">
      <div className="glow-tl relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <div className="plate">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/site/gus-hq.webp"
                  alt="Gus Renny inside a gutted historic home, plans in hand"
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 18%" }}
                />
              </div>
            </div>
            <p className="label mt-5 text-faint">
              Gus Renny — inside a rebuild, where he usually is.
            </p>
          </Reveal>

          <div className="lg:col-span-7 lg:pl-6">
            <SectionHead
              index="09"
              tag="The Developer"
              lines={[
                "THE DEVELOPER",
                <span key="l2">
                  <em className="text-green">is</em> THE PRACTICE.
                </span>,
              ]}
              lede={
                <>
                  Twenty-eight years of South Florida development — from the
                  restoration of Miami&rsquo;s historic Century Hotel to some of
                  the most coveted streets in West Palm Beach. Gus walks every
                  site, signs every plan, and builds each home as if his own
                  family would live&nbsp;in&nbsp;it.
                </>
              }
            />
            <Reveal delay={0.15} className="mt-9 flex flex-wrap gap-4">
              <Btn href="/practice">Inside the Practice</Btn>
              <Btn href={site.gusUrl} variant="outline" external>
                GUSRENNY.COM ↗
              </Btn>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
