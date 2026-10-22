import type { HomeCard, HomePageText } from "../model/types";

export const HOME_PAGE_TEXT: HomePageText = {
  title: "Screened pools and patios, built for Florida weather",
  leadPrefix: "We design, engineer, permit, and install aluminum screen enclosures across",
  leadSuffix: "Start with the cost guide, then book a free on-site measurement.",
};

export const HOME_CARDS: readonly HomeCard[] = [
  {
    href: "/blog/screen-enclosure-cost-florida",
    label: "Cost guide",
    title: "How much does a screen enclosure cost in Florida?",
    text: "Starting prices for pool cages, patio screens, and lanais, plus permits, wind load, and timelines.",
  },
  {
    href: "/blog/pool-cage-cost",
    label: "Pool cages",
    title: "Pool cage cost: what changes the quote",
    text: "Roof shape, mesh, footers, and access — the four lines that move the price most.",
  },
  {
    href: "/free-estimate",
    label: "Estimate",
    title: "Book a free on-site measurement",
    text: "We measure, check HOA rules, and show a 3D visualization before you decide.",
  },
];
