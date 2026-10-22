import type { TextFieldConfig } from "../../model/fields";
import styles from "../EstimateForm.module.scss";

type TextFieldProps = {
  config: TextFieldConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function TextField({ config, value, error, onChange }: TextFieldProps) {
  const hintId = `${config.field}-hint`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={config.field}>
        {config.label}
      </label>
      <input
        className={styles.input}
        id={config.field}
        name={config.field}
        type={config.type}
        autoComplete={config.autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={hintId}
      />
      <span className={styles.hint} id={hintId}>
        {error ?? config.hint}
      </span>
    </div>
  );
}
