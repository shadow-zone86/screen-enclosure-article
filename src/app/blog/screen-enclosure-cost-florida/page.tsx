import type { Metadata } from "next";
import {
  ScreenEnclosureCostPage,
  metadata as pageMetadata,
} from "@views/screen-enclosure-cost";

export const metadata: Metadata = pageMetadata;

export default function Page() {
  return <ScreenEnclosureCostPage />;
}
