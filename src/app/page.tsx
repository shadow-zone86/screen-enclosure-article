import type { Metadata } from "next";
import { HomePage, metadata as pageMetadata } from "@views/home";

export const metadata: Metadata = pageMetadata;

export default function Page() {
  return <HomePage />;
}
