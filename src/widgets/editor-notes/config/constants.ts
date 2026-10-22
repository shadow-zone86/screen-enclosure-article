import type { EditorNotesTarget, EditorNotesText } from "../model/types";

export const EDITOR_NOTES_TARGET: EditorNotesTarget = {
  minWords: 400,
  maxWords: 500,
  minKeyword: 2,
  maxKeyword: 4,
  titleLimit: 60,
  descriptionLimit: 155,
};

export const EDITOR_NOTES_TEXT: EditorNotesText = {
  summary: "SEO-поля и заметки для редактора (служебная панель)",
  title: "Title",
  description: "Meta description",
  slug: "URL slug",
  keyword: "Основной ключ",
  keywordSuffix: "вхождения",
  volume: "Объём",
  volumeSuffix: "слов · H1 — 1 · H2 —",
  internalLinks: "Внутренние ссылки",
  bannedClaims: "Запрещённые заявления",
  bannedNone: "не найдены",
  ctaAnchor: "Request a free estimate",
};
