import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRangeStatus } from "./useRangeStatus";

describe("статус значения для панели редактора", () => {
  it("возвращает ok внутри диапазона", () => {
    expect(renderHook(() => useRangeStatus(450, 400, 500)).result.current).toBe("ok");
  });

  it("включает границы диапазона", () => {
    expect(renderHook(() => useRangeStatus(400, 400, 500)).result.current).toBe("ok");
    expect(renderHook(() => useRangeStatus(500, 400, 500)).result.current).toBe("ok");
  });

  it("возвращает warn за пределами диапазона", () => {
    expect(renderHook(() => useRangeStatus(399, 400, 500)).result.current).toBe("warn");
    expect(renderHook(() => useRangeStatus(501, 400, 500)).result.current).toBe("warn");
  });
});
