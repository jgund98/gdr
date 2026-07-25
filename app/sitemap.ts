import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { properties } from "@/lib/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.domain}/`, lastModified: now, priority: 1 },
    { url: `${site.domain}/residences`, lastModified: now, priority: 0.9 },
    ...properties.map((p) => ({
      url: `${site.domain}/residences/${p.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
    { url: `${site.domain}/practice`, lastModified: now, priority: 0.7 },
    { url: `${site.domain}/contact`, lastModified: now, priority: 0.6 },
  ];
}
