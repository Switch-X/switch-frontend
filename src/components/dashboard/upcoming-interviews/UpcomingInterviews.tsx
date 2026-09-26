import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/Card";
import { UpcomingInterviewList } from "./UpcomingInterviewList";

/** The card and its heading render on the server; only the list inside needs the account. */
export function UpcomingInterviews() {
  return (
    <Card>
      <CardHeader
        title="Coming up"
        description="Interviews still ahead of you."
        actions={
          <Link href="/interviews" className="text-sm font-medium text-brand hover:underline">
            All interviews
          </Link>
        }
      />
      <UpcomingInterviewList />
    </Card>
  );
}
