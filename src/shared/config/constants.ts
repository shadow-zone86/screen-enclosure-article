import type { NavLink, PriceTableColumns, SiteConfig } from "@shared/model/types";

export const SITE: SiteConfig = {
  name: "Gulf Coast Screen & Pool Enclosures",
  shortName: "Gulf Coast Screen",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://screen-enclosure-article.vercel.app",
  tagline: "Screened pools, patios, and lanais across Southwest Florida",
  serviceArea: ["Naples", "Fort Myers", "Cape Coral"],
  phone: "(239) 555-0142",
};

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Cost guide", href: "/blog/screen-enclosure-cost-florida" },
  { label: "Pool cage cost", href: "/blog/pool-cage-cost" },
];

export const ESTIMATE_HREF = "/free-estimate";

export const CTA_DEFAULT_LABEL = "Request a free estimate";

export const CTA_META = "No obligation · On-site measurement · 3D preview";

export const PRICE_TABLE_COLUMNS: PriceTableColumns = {
  projectType: "Project type",
  startingPrice: "Typical starting price",
};

export const JSON_LD_LOCALE = "en-US";
