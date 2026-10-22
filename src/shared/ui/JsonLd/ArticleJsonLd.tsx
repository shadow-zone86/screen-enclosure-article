import { JSON_LD_LOCALE, SITE } from "@shared/config/constants";

type ArticleJsonLdProps = {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
};

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
    inLanguage: JSON_LD_LOCALE,
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
