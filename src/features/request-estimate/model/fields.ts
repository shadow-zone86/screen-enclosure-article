export type TextFieldConfig = {
  field: "name" | "phone" | "address";
  label: string;
  type: "text" | "tel";
  autoComplete: string;
  hint: string;
};

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
