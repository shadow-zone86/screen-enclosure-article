import type { Metadata } from "next";
import { SITE } from "@shared/config/constants";
import { SiteHeader } from "@widgets/site-header";
import { SiteFooter } from "@widgets/site-footer";
import { SKIP_LINK_LABEL } from "./config/constants";
import "@shared/styles/main.scss";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}: Screen Enclosures in Southwest Florida`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.tagline,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: "/",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          {SKIP_LINK_LABEL}
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
