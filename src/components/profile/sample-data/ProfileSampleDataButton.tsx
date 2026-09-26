"use client";

import { useRouter } from "next/navigation";
import { SampleDataButton } from "@/components/shared/sample-data/SampleDataButton";

/**
 * The sample-data button, for a page that shows none of the records it creates.
 *
 * <p>Nothing here needs invalidating - every list refetches when it mounts - so the toast is the
 * whole confirmation. It is a separate island only because the card around it is a server
 * component, and a server component cannot hand a button its `onLoaded` callback.
 */
export function ProfileSampleDataButton() {
  const router = useRouter();

  return <SampleDataButton variant="secondary" onLoaded={() => router.refresh()} />;
}
