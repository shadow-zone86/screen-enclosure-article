import type { Metadata } from "next";
import { FreeEstimatePage, metadata as pageMetadata } from "@views/free-estimate";

export const metadata: Metadata = pageMetadata;

export default function Page() {
  return <FreeEstimatePage />;
}
