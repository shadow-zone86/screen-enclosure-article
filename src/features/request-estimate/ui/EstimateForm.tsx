"use client";

import { useState } from "react";
import { Button } from "@shared/ui/Button";
import {
  EMPTY_ESTIMATE,
  validateEstimate,
  type EstimateErrors,
  type EstimateValues,
} from "../model/validation";
import { TEXT_FIELDS } from "../model/fields";
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
        <strong>Request received.</strong> We will call {values.name.trim()} within one business
        day to schedule the measurement.
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
          Anything we should know? (optional)
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

      <Button type="submit">Request my free estimate</Button>
      <span className={styles.hint}>
        Demo form: nothing is sent or stored, the request stops in this browser.
      </span>
    </form>
  );
}
