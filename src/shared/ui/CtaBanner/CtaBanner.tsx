import { Button } from "@shared/ui/Button";
import { CTA_DEFAULT_LABEL, CTA_META, ESTIMATE_HREF } from "@shared/config/constants";
import styles from "./CtaBanner.module.scss";

type CtaBannerProps = {
  title: string;
  text: string;
  label?: string;
};

export function CtaBanner({ title, text, label = CTA_DEFAULT_LABEL }: CtaBannerProps) {
  return (
    <section className={styles.banner}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
      <Button href={ESTIMATE_HREF}>{label}</Button>
      <span className={styles.meta}>{CTA_META}</span>
    </section>
  );
}
