import { screenEnclosureCostArticle } from "@entities/article";
import { ArticleView } from "@widgets/article-view";
import { EditorNotes } from "@widgets/editor-notes";

export function ScreenEnclosureCostPage() {
  return (
    <ArticleView
      article={screenEnclosureCostArticle}
      aside={<EditorNotes article={screenEnclosureCostArticle} />}
    />
  );
}
