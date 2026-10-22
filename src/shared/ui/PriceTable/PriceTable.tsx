import Link from "next/link";
import type { PriceRow } from "@shared/model/types";
import styles from "./PriceTable.module.scss";

type PriceTableProps = {
  caption: string;
  rows: PriceRow[];
};

export function PriceTable({ caption, rows }: PriceTableProps) {
  return (
    <figure className={styles.card}>
      <figcaption className={styles.caption}>{caption}</figcaption>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Project type</th>
            <th scope="col">Typical starting price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td data-label="Project type">
                {row.href ? <Link href={row.href}>{row.name}</Link> : row.name}
                {row.qualifier ? ` ${row.qualifier}` : ""}
              </td>
              <td data-label="Typical starting price">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
