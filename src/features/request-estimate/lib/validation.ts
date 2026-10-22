import { ESTIMATE_MESSAGES, MIN_PHONE_DIGITS } from "../config/constants";
import type { EstimateErrors, EstimateValues } from "../model/types";

export function countDigits(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

export function validateEstimate(values: EstimateValues): EstimateErrors {
  const errors: EstimateErrors = {};

  if (values.name.trim().length < 2) errors.name = ESTIMATE_MESSAGES.name;
  if (countDigits(values.phone) < MIN_PHONE_DIGITS) errors.phone = ESTIMATE_MESSAGES.phone;
  if (values.address.trim().length < 8) errors.address = ESTIMATE_MESSAGES.address;

  return errors;
}
