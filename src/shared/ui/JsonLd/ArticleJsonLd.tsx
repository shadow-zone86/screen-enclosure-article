import { SITE } from "@shared/config/site";

type ArticleJsonLdProps = {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
};

/** Article schema для rich results. Поля берутся из тех же данных, что и страница. */
export function ArticleJsonLd({
  headline,
  description,
  slug,
  datePublished,
  dateModified,
}: ArticleJsonLdProps) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified,
    inLanguage: "en-US",
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}${slug}` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
    />
  );
}
