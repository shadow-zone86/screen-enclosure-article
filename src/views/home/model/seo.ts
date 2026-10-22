import type { Metadata } from "next";
import { SITE } from "@shared/config/site";

export const metadata: Metadata = {
  title: "Screen Enclosures in Southwest Florida",
  description:
    "Pool cages, screened patios, and lanais across Naples, Fort Myers, and Cape Coral. Free on-site estimate with a 3D preview.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Screen Enclosures in Southwest Florida",
    description: SITE.tagline,
  },
};
