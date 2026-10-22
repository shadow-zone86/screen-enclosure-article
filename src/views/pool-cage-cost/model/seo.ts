import type { Metadata } from "next";
import { poolCageCostArticle as article } from "@entities/article";

export const metadata: Metadata = {
  title: { absolute: article.title },
  description: article.description,
  alternates: { canonical: article.slug },
  openGraph: {
    type: "article",
    url: article.slug,
    title: article.title,
    description: article.description,
    publishedTime: article.publishedAt,
    modifiedTime: article.modifiedAt,
  },
};
