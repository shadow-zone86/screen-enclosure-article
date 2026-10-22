export type RangeStatus = "ok" | "warn";

export type EditorNotesTarget = {
  minWords: number;
  maxWords: number;
  minKeyword: number;
  maxKeyword: number;
  titleLimit: number;
  descriptionLimit: number;
};

export type EditorNotesText = {
  summary: string;
  title: string;
  description: string;
  slug: string;
  keyword: string;
  keywordSuffix: string;
  volume: string;
  volumeSuffix: string;
  internalLinks: string;
  bannedClaims: string;
  bannedNone: string;
  ctaAnchor: string;
};
