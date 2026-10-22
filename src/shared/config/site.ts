export const SITE = {
  name: "Gulf Coast Screen & Pool Enclosures",
  shortName: "Gulf Coast Screen",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://screen-enclosure-article.vercel.app",
  tagline: "Screened pools, patios, and lanais across Southwest Florida",
  serviceArea: ["Naples", "Fort Myers", "Cape Coral"],
  phone: "(239) 555-0142",
} as const;

export const NAV_LINKS = [
  { label: "Cost guide", href: "/blog/screen-enclosure-cost-florida" },
  { label: "Pool cage cost", href: "/blog/pool-cage-cost" },
] as const;

export const ESTIMATE_HREF = "/free-estimate";
