import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import RevealLines from "@/components/RevealLines";
import FilmTheater from "@/components/FilmTheater";
import Btn from "@/components/Btn";
import { StatusChip } from "@/components/PropertyCard";
import { bySlug, gallery, properties } from "@/lib/properties";
import { noWidow } from "@/lib/text";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return {};
  return {
    title: `${p.address}, ${p.city}`,
    description: `${p.blurb} A GDR Development residence in ${p.neighborhood}.`,
    openGraph: { images: [{ url: `/properties/${p.slug}/01.webp` }] },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();

  const imgs = gallery(p);
  const asFound = new Set(p.asFound ?? []);
  const finished = imgs.filter((_, i) => !asFound.has(i + 1));
  const found = imgs.filter((_, i) => asFound.has(i + 1));
  const allAsFound = found.length === imgs.length;

  const idx = properties.findIndex((x) => x.slug === p.slug);
  const prev = properties[(idx - 1 + properties.length) % properties.length];
  const next = properties[(idx + 1) % properties.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: `${p.address}, ${p.city}`,
    address: { "@type": "PostalAddress", streetAddress: p.address, addressLocality: p.city.split(",")[0], addressRegion: p.region === "West Palm Beach" ? "FL" : "CA" },
    image: `/properties/${p.slug}/01.webp`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* opener */}
      <section className="relative h-[72svh] min-h-[480px] overflow-hidden">
        <Image
          src={imgs[0]}
          alt={`${p.address}, ${p.city}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink" aria-hidden />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-5 pb-10 md:px-8 md:pb-14">
            <Reveal>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <StatusChip status={p.status} />
                <span className="label text-paper/80">
                  {p.neighborhood} · {p.city}
                </span>
              </div>
            </Reveal>
            <RevealLines
              as="h1"
              className="text-[11vw] leading-[0.98] sm:text-6xl lg:text-7xl xl:text-8xl"
              lines={[noWidow(p.address)]}
            />
          </div>
        </div>
      </section>

      {/* story + facts */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {p.body.map((para) => (
              <Reveal key={para.slice(0, 24)}>
                <p className="lede mb-6 text-paper/90">{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <div className="relative border border-line bg-ink-2 p-7">
              {/* plan-corner ticks — the record reads like a title block */}
              <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-green/60" aria-hidden />
              <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-green/60" aria-hidden />
              <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-green/60" aria-hidden />
              <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-green/60" aria-hidden />
              <p className="tag-index">The record</p>
              <dl className="mt-5 flex flex-col gap-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-faint">Address</dt>
                  <dd className="text-right text-paper/90">{p.address}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-faint">Neighborhood</dt>
                  <dd className="text-right text-paper/90">{p.neighborhood}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-faint">Market</dt>
                  <dd className="text-right text-paper/90">{p.city}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-faint">Status</dt>
                  <dd className="text-right text-paper/90">{p.status}</dd>
                </div>
              </dl>
              {p.specs && (
                <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-6">
                  {p.specs.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-mist">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-green" aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-7">
                <Btn href={`/contact?re=${encodeURIComponent(p.address)}`} className="w-full text-center">
                  Inquire About This Residence
                </Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* the film, when there is one */}
      {p.video && (
        <section className="relative pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <FilmTheater src={p.video.src} poster={p.video.poster} label={p.video.label} />
          </div>
        </section>
      )}

      {/* gallery */}
      {finished.length > 1 && !allAsFound && (
        <section className="relative pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <p className="tag-index mb-8">
                {p.status === "Completed" ? "The residence — delivered" : "The residence — as planned"}
              </p>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {finished.slice(1).map((src, i) => (
                <Reveal
                  key={src}
                  delay={0.04 * (i % 2)}
                  className={i % 5 === 0 ? "sm:col-span-2" : undefined}
                >
                  <div
                    className={`relative overflow-hidden ${i % 5 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}
                  >
                    <Image
                      src={src}
                      alt={`${p.address} — photo ${i + 2}`}
                      fill
                      sizes={i % 5 === 0 ? "(min-width: 1280px) 1216px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* as found — the honest chapter */}
      {found.length > 0 && (
        <section className="relative border-t border-line bg-ink-2 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <p className="tag-index">As found</p>
              <h2 className="display mt-4 max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
                {allAsFound ? (
                  <>
                    THE STARTING <em className="text-green">line.</em>
                  </>
                ) : (
                  <>
                    WHERE THIS ONE <em className="text-green">began.</em>
                  </>
                )}
              </h2>
              <p className="lede mt-5 max-w-2xl text-mist">
                {allAsFound
                  ? "The property as acquired — before the rebuild begins. We publish the before because we're proud of the distance."
                  : "The same lot, before the work. Every GDR residence page keeps its full record."}
              </p>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {(allAsFound ? found.slice(1) : found).map((src, i) => (
                <Reveal key={src} delay={0.04 * (i % 3)}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={src}
                      alt={`${p.address} as acquired — photo ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale-[35%] transition-all duration-700 hover:scale-[1.03] hover:grayscale-0"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* prev / next */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-2">
          <Link
            href={`/residences/${prev.slug}`}
            className="group flex items-center justify-between gap-4 border-b border-line px-5 py-8 transition-colors hover:bg-ink-2 sm:border-b-0 sm:border-r md:px-8"
          >
            <span>
              <span className="label text-faint">Previous</span>
              <span className="display mt-1 block text-2xl transition-colors group-hover:text-green">
                {noWidow(prev.address)}
              </span>
            </span>
            <span className="text-green" aria-hidden>
              ←
            </span>
          </Link>
          <Link
            href={`/residences/${next.slug}`}
            className="group flex items-center justify-between gap-4 px-5 py-8 text-right transition-colors hover:bg-ink-2 md:px-8"
          >
            <span className="text-green" aria-hidden>
              →
            </span>
            <span>
              <span className="label text-faint">Next</span>
              <span className="display mt-1 block text-2xl transition-colors group-hover:text-green">
                {noWidow(next.address)}
              </span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
