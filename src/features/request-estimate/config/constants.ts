import type {
  EstimateFormText,
  EstimateMessages,
  EstimateValues,
  TextFieldConfig,
} from "../model/types";

export const TEXT_FIELDS: TextFieldConfig[] = [
  {
    field: "name",
    label: "Name",
    type: "text",
    autoComplete: "name",
    hint: "",
  },
  {
    field: "phone",
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
    hint: "10 digits, US format.",
  },
  {
    field: "address",
    label: "Property address",
    type: "text",
    autoComplete: "street-address",
    hint: "Street, city, and ZIP. HOA name is helpful if you have one.",
  },
];

export const EMPTY_ESTIMATE: EstimateValues = { name: "", phone: "", address: "", notes: "" };

export const MIN_PHONE_DIGITS = 10;

export const ESTIMATE_MESSAGES: EstimateMessages = {
  name: "Please enter the name we should ask for.",
  phone: "Enter a 10-digit phone number, for example (239) 555-0142.",
  address: "Enter the property address, including the city.",
};

export const ESTIMATE_FORM_TEXT: EstimateFormText = {
  notesLabel: "Anything we should know? (optional)",
  submitLabel: "Request my free estimate",
  demoHint: "Demo form: nothing is sent or stored, the request stops in this browser.",
  successTitle: "Request received.",
  successPrefix: "We will call",
  successSuffix: "within one business day to schedule the measurement.",
};
