export type TextFieldConfig = {
  field: "name" | "phone" | "address";
  label: string;
  type: "text" | "tel";
  autoComplete: string;
  hint: string;
};

export type EstimateValues = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

type EstimateField = "name" | "phone" | "address";

export type EstimateErrors = Partial<Record<EstimateField, string>>;

export type EstimateMessages = Record<EstimateField, string>;

export type EstimateFormText = {
  notesLabel: string;
  submitLabel: string;
  demoHint: string;
  successTitle: string;
  successPrefix: string;
  successSuffix: string;
};
