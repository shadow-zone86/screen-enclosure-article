import Link from "next/link";
import type { PriceRow } from "@shared/model/types";
import { PRICE_TABLE_COLUMNS } from "@shared/config/constants";
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
            <th scope="col">{PRICE_TABLE_COLUMNS.projectType}</th>
            <th scope="col">{PRICE_TABLE_COLUMNS.startingPrice}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td data-label={PRICE_TABLE_COLUMNS.projectType}>
                {row.href ? <Link href={row.href}>{row.name}</Link> : row.name}
                {row.qualifier ? ` ${row.qualifier}` : ""}
              </td>
              <td data-label={PRICE_TABLE_COLUMNS.startingPrice}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
