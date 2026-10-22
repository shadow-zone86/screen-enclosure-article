"use client";

import { useState } from "react";
import { Button } from "@shared/ui/Button";
import { EMPTY_ESTIMATE, ESTIMATE_FORM_TEXT, TEXT_FIELDS } from "../config/constants";
import { validateEstimate } from "../lib/validation";
import type { EstimateErrors, EstimateValues } from "../model/types";
import { TextField } from "./components/TextField";
import styles from "./EstimateForm.module.scss";

export function EstimateForm() {
  const [values, setValues] = useState<EstimateValues>(EMPTY_ESTIMATE);
  const [errors, setErrors] = useState<EstimateErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof EstimateValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateEstimate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className={styles.success} role="status">
        <strong>{ESTIMATE_FORM_TEXT.successTitle}</strong> {ESTIMATE_FORM_TEXT.successPrefix}{" "}
        {values.name.trim()} {ESTIMATE_FORM_TEXT.successSuffix}
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {TEXT_FIELDS.map((config) => (
        <TextField
          key={config.field}
          config={config}
          value={values[config.field]}
          error={errors[config.field]}
          onChange={(value) => update(config.field, value)}
        />
      ))}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="notes">
          {ESTIMATE_FORM_TEXT.notesLabel}
        </label>
        <textarea
          className={styles.input}
          id="notes"
          name="notes"
          rows={3}
          value={values.notes}
          onChange={(event) => update("notes", event.target.value)}
        />
      </div>

      <Button type="submit">{ESTIMATE_FORM_TEXT.submitLabel}</Button>
      <span className={styles.hint}>{ESTIMATE_FORM_TEXT.demoHint}</span>
    </form>
  );
}
