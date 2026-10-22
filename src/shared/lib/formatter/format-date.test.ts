import { describe, expect, it } from "vitest";
import { formatMonthYear } from "./format-date";

describe("форматирование даты", () => {
  it("превращает ISO-дату в месяц и год", () => {
    expect(formatMonthYear("2026-10-22")).toBe("October 2026");
  });

  it("не съезжает на соседний месяц в декабре", () => {
    expect(formatMonthYear("2025-12-31")).toBe("December 2025");
  });

  it("работает для первого дня месяца", () => {
    expect(formatMonthYear("2026-01-01")).toBe("January 2026");
  });
});
