import type { Metadata } from "next";
import { screenEnclosureCostArticle as article } from "@entities/article";

export const metadata: Metadata = {
  title: { absolute: article.title },
  description: article.description,
  keywords: [
    article.primaryKeyword,
    "pool cage cost Florida",
    "screen enclosure prices",
    "covered patio screen",
    "Florida Building Code screen enclosure",
  ],
  alternates: { canonical: article.slug },
  openGraph: {
    type: "article",
    url: article.slug,
    title: article.title,
    description: article.description,
    publishedTime: article.publishedAt,
    modifiedTime: article.modifiedAt,
  },
  twitter: {
    card: "summary_large_image",
    title: article.title,
    description: article.description,
  },
};
