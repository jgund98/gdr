import Link from "next/link";
import Image from "next/image";
import { DimLine } from "@/components/PlanArt";
import { nav, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2">
      <div className="relative mx-auto max-w-7xl px-5 pt-16 md:px-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-0">
          <div className="md:col-span-5 md:pr-12">
            <Link href="/" aria-label="GDR Development — home" className="inline-block">
              <Image
                src="/brand/gdr-lockup.png"
                alt="GDR Development"
                width={1264}
                height={214}
                className="h-10 w-auto md:h-12"
              />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-mist">
              A limited collection of rebuilt historic homes and ground-up
              residences — developed start to finish, and sold direct.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="navline label inline-block pb-1 text-paper/70 hover:text-paper"
              >
                Instagram&ensp;↗
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="navline label inline-block pb-1 text-paper/70 hover:text-paper"
              >
                Facebook&ensp;↗
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="navline label inline-block pb-1 text-paper/70 hover:text-paper"
              >
                TikTok&ensp;↗
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:border-l md:border-line md:px-10">
            <p className="label mb-5 text-faint">Explore</p>
            <ul className="flex flex-col gap-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-paper/80 transition-colors hover:text-green">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 md:border-l md:border-line md:pl-10">
            <p className="label mb-5 text-faint">The family</p>
            <div className="flex flex-col gap-3">
              <a
                href={site.gusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/80 transition-colors hover:text-green"
              >
                GUSRENNY.COM&ensp;↗
              </a>
              <a
                href={site.rennyRealtyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/80 transition-colors hover:text-green"
              >
                Renny Realty&ensp;↗
              </a>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-mist">
              A {site.parent} company.
              <br />
              West Palm Beach · Los Angeles · Est. {site.founded}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-line py-7 sm:flex-row sm:items-center">
          <p className="text-sm text-faint">© {year} GDR Development — All rights reserved.</p>
          <a
            href="https://epicdevsolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 opacity-70 transition-opacity hover:opacity-100"
          >
            <span className="text-sm text-faint transition-colors group-hover:text-mist">Site by</span>
            <Image
              src="/brand/epic-logo-white.webp"
              alt="Epic Dev Solutions"
              width={101}
              height={24}
              className="h-6 w-auto"
            />
          </a>
        </div>
      </div>

      {/* the measured sign-off */}
      <div className="mx-auto max-w-7xl px-5 pb-4 md:px-8">
        <DimLine label="Est. 1997 — West Palm Beach · Los Angeles" />
      </div>

      {/* the sign-off: the name, edge to edge on every screen */}
      <div className="relative overflow-hidden pb-2" aria-hidden>
        <svg viewBox="0 0 1200 116" className="block w-full">
          <text
            x="600"
            y="108"
            textAnchor="middle"
            textLength="1176"
            lengthAdjust="spacingAndGlyphs"
            className="display"
            style={{ fontSize: 130, fill: "rgba(137,191,88,0.92)" }}
          >
            GDR DEVELOPMENT
          </text>
        </svg>
      </div>
    </footer>
  );
}
