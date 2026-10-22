/** Общие типы UI-кита и контента, не привязанные к слою. */

/** Строка таблицы цен. `href` превращает название в внутреннюю ссылку. */
export type PriceRow = {
  name: string;
  qualifier?: string;
  href?: string;
  value: string;
};
