import type { MetadataRoute } from "next";

import { categories, projects } from "@/content/portfolio";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

/** Requires NEXT_PUBLIC_SITE_URL — a sitemap needs absolute URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  const base = siteConfig.url;

  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/portfolio`, changeFrequency: "monthly", priority: 0.9 },
    ...categories.map((category) => ({
      url: `${base}/portfolio/${category.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...services.map((service) => ({
      url: `${base}/services/${service.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
