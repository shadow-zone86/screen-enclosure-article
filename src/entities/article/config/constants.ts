import type { Article } from "../model/types";

export const BANNED_CLAIMS: readonly string[] = ["best", "cheapest", "number one"];

export const screenEnclosureCostArticle: Article = {
  slug: "/blog/screen-enclosure-cost-florida",
  h1: "How Much Does a Screen Enclosure Cost in Florida?",
  title: "Screen Enclosure Cost in Florida: 2026 Price Guide",
  description:
    "See what a screen enclosure costs in Florida: pool cages from $13,500, patio screens from $9,500, plus permit timelines and wind-load rules.",
  primaryKeyword: "screen enclosure cost Florida",
  publishedAt: "2026-10-22",
  modifiedAt: "2026-10-22",
  readingTime: "4 min read",
  lead:
    "In Florida, a screened patio or pool is what makes the yard usable most of the year, not just in the cooler months. The screen enclosure cost Florida homeowners pay runs from $9,500 for a simple screen room to $33,500 and up for a large pool cage. Below is a breakdown of the numbers, what moves them, and how long the work takes.",
  blocks: [
    { type: "heading", id: "prices", text: "Screen Enclosure Prices at a Glance" },
    {
      type: "paragraph",
      text:
        "Three project types cover most of what gets built. Each starting price below is for standard finishes, and the final screen enclosure cost Florida homeowners face depends on measurements, roof shape, and the finishes they pick.",
    },
    {
      type: "table",
      caption: "Starting prices for standard finishes. Final quotes depend on site measurements.",
      rows: [
        {
          name: "Pool cage",
          qualifier: "(screen over a pool)",
          href: "/blog/pool-cage-cost",
          value: "$13,500 for small pools, $33,500+ for large ones",
        },
        {
          name: "Screen enclosure without a pool",
          value: "From $9,500",
        },
        {
          name: "Covered patio screen (under an existing roof)",
          value: "From $10,900",
        },
      ],
    },
    {
      type: "heading",
      id: "price-drivers",
      text: "What Moves the Screen Enclosure Cost in Florida",
    },
    {
      type: "paragraph",
      text:
        "Two homes on one street can get quotes that differ by thousands of dollars. The usual reasons:",
    },
    {
      type: "list",
      items: [
        {
          lead: "Size and roof shape",
          text:
            "flat, gable, mansard, and multi-plane roofs use different amounts of aluminum and different anchoring",
        },
        {
          lead: "Mesh type",
          text: "standard insect screen, no-see-um, or solar and privacy screens",
        },
        {
          lead: "Add-ons",
          text: "LED lighting, ceiling fans, or extra concrete footers for the posts",
        },
        {
          lead: "Site access",
          text: "how much decking or concrete has to be cut and restored",
        },
      ],
    },
    { type: "heading", id: "permits", text: "Permits, Engineering, and Wind Load" },
    {
      type: "paragraph",
      text:
        "A screen enclosure is a permanent structure, so every Florida county requires a permit and an inspection. Plans must satisfy the Florida Building Code and local wind-load rules. In many areas the frame is engineered for 130+ mph winds, following what the local code and the approved drawings call for.",
    },
    {
      type: "paragraph",
      text:
        "Engineering drawings usually take 1–2 weeks. Permit review runs from about one week in some counties to six to eight weeks in others. Once the permit is issued and materials are on site, installation takes 2–4 days.",
    },
    { type: "heading", id: "warranty", text: "Warranty and What Is Included" },
    {
      type: "paragraph",
      text:
        "Coverage is up to 10 years on the aluminum structure, 5 years on the screen, and 365 days on the workmanship. Design, engineering, permit filing, and HOA approval can be handled for you, which keeps the paperwork off your desk. A written quote should break out every line item, so the price you agree to at the start is the price on the final invoice.",
    },
    {
      type: "cta",
      title: "Get a Free Estimate With an On-Site Measurement",
      text:
        "Ready to see real numbers for your yard? Request a free estimate with an on-site measurement. We'll show you a 3D visualization of the finished enclosure before you commit, so you know exactly what you're paying for.",
    },
  ],
};

export const poolCageCostArticle: Article = {
  slug: "/blog/pool-cage-cost",
  h1: "Pool Cage Cost in Florida: What Changes the Quote",
  title: "Pool Cage Cost in Florida: What Changes the Quote",
  description:
    "Pool cage prices in Florida start at $13,500 for small pools. See how roof shape, mesh, footers, and site access change the final quote.",
  primaryKeyword: "pool cage cost Florida",
  publishedAt: "2026-10-22",
  modifiedAt: "2026-10-22",
  readingTime: "3 min read",
  lead:
    "A pool cage is the largest enclosure we build, and it is also the one with the widest price range. Small pools start around $13,500, while large custom cages with complex roofs pass $33,500. Here is where that difference comes from.",
  blocks: [
    { type: "heading", id: "price-drivers", text: "Four lines that move the price" },
    {
      type: "paragraph",
      text:
        "Two cages with the same footprint can land thousands of dollars apart. In practice, the quote is decided by four things:",
    },
    {
      type: "list",
      items: [
        {
          lead: "Roof shape",
          text: "a flat or gable roof uses less aluminum than a multi-plane mansard design",
        },
        {
          lead: "Mesh",
          text: "standard insect screen, no-see-um, or solar screen, each with a different material cost",
        },
        {
          lead: "Footers",
          text: "new concrete footers are priced separately from the frame",
        },
        {
          lead: "Access",
          text: "a narrow side yard or a screen over finished pavers adds labor",
        },
      ],
    },
    {
      type: "heading",
      id: "permits",
      text: "Permit and engineering are part of the schedule",
    },
    {
      type: "paragraph",
      text:
        "Every Florida county reviews pool cage plans against the Florida Building Code and local wind-load rules, so engineering drawings come first (1–2 weeks) and the permit review follows (one week to six to eight weeks, depending on the county). Installation itself takes 2–4 days once the permit is issued.",
    },
    {
      type: "paragraph",
      text:
        "For the full price table, including patio screens and lanais, read the screen enclosure cost guide. Then book a free on-site measurement to price your own pool.",
    },
    {
      type: "cta",
      title: "Get a Free Estimate With an On-Site Measurement",
      text:
        "We measure the opening, check HOA rules, and show a 3D visualization of the finished cage before you decide.",
    },
  ],
};
