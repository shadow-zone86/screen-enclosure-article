export type PriceRow = {
  name: string;
  qualifier?: string;
  href?: string;
  value: string;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  url: string;
  tagline: string;
  serviceArea: string[];
  phone: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type PriceTableColumns = {
  projectType: string;
  startingPrice: string;
};
