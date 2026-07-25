import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import InquiryForm from "@/components/InquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Inquire About a GDR Residence",
  description:
    "Interested in a current GDR residence or a project in development? Reach the developer directly for pricing, timelines, and answers.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="survey pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="glow-tl relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
            <div>
              <SectionHead
                as="h1"
                index="Contact"
                tag="The Inquiry Line"
                lines={[
                  "TALK TO THE",
                  <span key="l2">
                    <em className="text-green">developer.</em>
                  </span>,
                ]}
                lede="Interested in a current residence or a project in development? Ask directly — pricing, timelines, and every answer from the people doing the work."
              />

              <Reveal delay={0.15} className="mt-10">
                <div className="plate hidden lg:block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/properties/greymon-227/01.webp"
                      alt="227 Greymon Dr — a delivered GDR residence in West Palm Beach"
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 pt-14">
                      <p className="label text-paper/85">West Palm Beach · Los Angeles</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2} className="mt-10">
                <p className="label text-faint">Elsewhere</p>
                <div className="mt-4 flex flex-wrap gap-6">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navline label pb-1 text-paper/70 hover:text-paper"
                  >
                    Instagram&ensp;↗
                  </a>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navline label pb-1 text-paper/70 hover:text-paper"
                  >
                    Facebook&ensp;↗
                  </a>
                  <a
                    href={site.rennyRealtyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navline label pb-1 text-paper/70 hover:text-paper"
                  >
                    Renny Realty&ensp;↗
                  </a>
                </div>
              </Reveal>
            </div>

            <div>
              <Suspense fallback={<div className="min-h-[420px] border border-line bg-ink-2" aria-hidden />}>
                <InquiryForm />
              </Suspense>
              <Reveal delay={0.1} className="mt-8">
                <p className="label text-faint">What happens next</p>
                <ol className="mt-4 flex flex-col gap-3">
                  {[
                    "Your inquiry lands on the developer's desk — not in a CRM queue.",
                    "You get a direct conversation. No handoffs, no scripts.",
                    "When you're ready, we walk the residence together.",
                  ].map((step, i) => (
                    <li key={step} className="flex items-baseline gap-4 border-b border-line pb-3">
                      <span className="label text-green">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-mist">{step}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
