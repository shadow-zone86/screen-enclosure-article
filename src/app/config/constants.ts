import { poolCageCostArticle, screenEnclosureCostArticle } from "@entities/article";
import { ESTIMATE_HREF } from "@shared/config/constants";
import type { NotFoundText, RobotsRule, SitemapRoute } from "../model/types";

export const SKIP_LINK_LABEL = "Skip to content";

export const NOT_FOUND_TEXT: NotFoundText = {
  title: "Page not found",
  lead: "The page you are looking for has moved. Start from the",
  costGuideLink: "screen enclosure cost guide",
  middle: "or book a",
  estimateLink: "free on-site estimate",
};

export const SITEMAP_ROUTES: SitemapRoute[] = [
  { path: "", priority: 1 },
  { path: screenEnclosureCostArticle.slug, priority: 0.9 },
  { path: poolCageCostArticle.slug, priority: 0.7 },
  { path: ESTIMATE_HREF, priority: 0.8 },
];

export const SITEMAP_CHANGE_FREQUENCY = "monthly" as const;

export const ROBOTS_RULES: RobotsRule[] = [{ userAgent: "*", allow: "/" }];
