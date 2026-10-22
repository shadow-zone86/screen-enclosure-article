import type { MetadataRoute } from "next";
import { SITE } from "@shared/config/constants";
import { SITEMAP_CHANGE_FREQUENCY, SITEMAP_ROUTES } from "./config/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITEMAP_ROUTES.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified,
    changeFrequency: SITEMAP_CHANGE_FREQUENCY,
    priority: route.priority,
  }));
}
