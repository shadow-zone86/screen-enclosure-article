export type NotFoundText = {
  title: string;
  lead: string;
  costGuideLink: string;
  middle: string;
  estimateLink: string;
};

export type SitemapRoute = {
  path: string;
  priority: number;
};

export type RobotsRule = {
  userAgent: string;
  allow: string;
};
