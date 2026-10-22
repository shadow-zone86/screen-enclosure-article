import type { MetadataRoute } from "next";
import { poolCageCostArticle, screenEnclosureCostArticle } from "@entities/article";
import { SITE } from "@shared/config/site";

const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: screenEnclosureCostArticle.slug, priority: 0.9 },
  { path: poolCageCostArticle.slug, priority: 0.7 },
  { path: "/free-estimate", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
