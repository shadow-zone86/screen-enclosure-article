import type { ArticleBlock } from "@entities/article";
import { CtaBanner } from "@shared/ui/CtaBanner";
import { PriceTable } from "@shared/ui/PriceTable";

export function ArticleBlockView({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 id={block.id}>{block.text}</h2>;
    case "paragraph":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item.lead}>
              <strong>{item.lead}</strong> — {item.text}
            </li>
          ))}
        </ul>
      );
    case "table":
      return <PriceTable caption={block.caption} rows={block.rows} />;
    case "cta":
      return <CtaBanner title={block.title} text={block.text} />;
  }
}
