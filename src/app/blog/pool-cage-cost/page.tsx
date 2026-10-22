import type { Metadata } from "next";
import { PoolCageCostPage, metadata as pageMetadata } from "@views/pool-cage-cost";

export const metadata: Metadata = pageMetadata;

export default function Page() {
  return <PoolCageCostPage />;
}
