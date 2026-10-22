import { describe, expect, it } from "vitest";
import { EMPTY_ESTIMATE, ESTIMATE_MESSAGES, MIN_PHONE_DIGITS } from "../config/constants";
import { countDigits, validateEstimate } from "./validation";

const VALID = {
  name: "Dana Reed",
  phone: "(239) 555-0142",
  address: "1420 Gulf Shore Blvd, Naples",
  notes: "",
};

describe("валидация заявки на замер", () => {
  it("возвращает три ошибки на пустую форму", () => {
    const errors = validateEstimate(EMPTY_ESTIMATE);

    expect(Object.keys(errors)).toHaveLength(3);
    expect(errors.phone).toBe(ESTIMATE_MESSAGES.phone);
  });

  it("не пропускает короткий телефон", () => {
    const errors = validateEstimate({ ...VALID, phone: "(239) 555" });

    expect(countDigits("(239) 555")).toBeLessThan(MIN_PHONE_DIGITS);
    expect(errors.phone).toBe(ESTIMATE_MESSAGES.phone);
  });

  it("пропускает заполненную заявку", () => {
    expect(validateEstimate(VALID)).toEqual({});
  });

  it("считает только цифры в телефоне", () => {
    expect(countDigits("+1 (239) 555-0142")).toBe(11);
  });
});
