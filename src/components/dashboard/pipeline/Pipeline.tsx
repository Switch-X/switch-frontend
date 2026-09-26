import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { PipelineBreakdown } from "./PipelineBreakdown";

/** "Where they stand" - the card renders on the server, the chart inside it on the client. */
export function Pipeline() {
  return (
    <Card>
      <CardHeader
        title="Where they stand"
        description="Every application by status."
        actions={
          <Link href="/applications" className="text-sm font-medium text-brand hover:underline">
            All applications
          </Link>
        }
      />
      <PipelineBreakdown />
    </Card>
  );
}
