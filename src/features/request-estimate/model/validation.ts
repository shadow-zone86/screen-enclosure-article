export type EstimateValues = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

type EstimateField = "name" | "phone" | "address";

export type EstimateErrors = Partial<Record<EstimateField, string>>;

export const EMPTY_ESTIMATE: EstimateValues = { name: "", phone: "", address: "", notes: "" };

export const MIN_PHONE_DIGITS = 10;

export const ESTIMATE_MESSAGES: Record<"name" | "phone" | "address", string> = {
  name: "Please enter the name we should ask for.",
  phone: "Enter a 10-digit phone number, for example (239) 555-0142.",
  address: "Enter the property address, including the city.",
};

export function countDigits(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

/** Валидация возвращает коды-сообщения только для невалидных полей. */
export function validateEstimate(values: EstimateValues): EstimateErrors {
  const errors: EstimateErrors = {};

  if (values.name.trim().length < 2) errors.name = ESTIMATE_MESSAGES.name;
  if (countDigits(values.phone) < MIN_PHONE_DIGITS) errors.phone = ESTIMATE_MESSAGES.phone;
  if (values.address.trim().length < 8) errors.address = ESTIMATE_MESSAGES.address;

  return errors;
}
