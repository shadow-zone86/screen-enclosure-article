import type { MetadataRoute } from "next";
import { SITE } from "@shared/config/constants";
import { ROBOTS_RULES } from "./config/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ROBOTS_RULES,
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
