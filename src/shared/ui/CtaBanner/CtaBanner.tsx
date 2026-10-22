import { Button } from "@shared/ui/Button";
import { ESTIMATE_HREF } from "@shared/config/site";
import styles from "./CtaBanner.module.scss";

type CtaBannerProps = {
  title: string;
  text: string;
  label?: string;
};

export function CtaBanner({ title, text, label = "Request a free estimate" }: CtaBannerProps) {
  return (
    <section className={styles.banner}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
      <Button href={ESTIMATE_HREF}>{label}</Button>
      <span className={styles.meta}>No obligation · On-site measurement · 3D preview</span>
    </section>
  );
}
