import type { RangeStatus } from "../../model/types";

export function useRangeStatus(value: number, min: number, max: number): RangeStatus {
  return value >= min && value <= max ? "ok" : "warn";
}
