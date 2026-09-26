import { SAMPLE_DATA_COUNTS } from "@/lib/sampleData";
import { Card, CardHeader } from "@/components/ui/Card";
import { ProfileSampleDataButton } from "./ProfileSampleDataButton";

/**
 * Reachable from here whatever state the account is in.
 *
 * <p>The list pages only offer this while they are empty, which is the right moment to suggest it
 * but leaves no way back once there is a single row. This is that way back.
 */
export function SampleDataSection() {
  return (
    <Card>
      <CardHeader
        title="Sample data"
        description="Fill this account with a worked example of a job search."
      />
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <p className="max-w-xl text-sm text-ink-muted">
          {SAMPLE_DATA_COUNTS.applications} applications spanning every status,{" "}
          {SAMPLE_DATA_COUNTS.interviews} interviews with their {SAMPLE_DATA_COUNTS.rounds} rounds,{" "}
          {SAMPLE_DATA_COUNTS.assignments} assignments and {SAMPLE_DATA_COUNTS.screeningCalls}{" "}
          screening calls — dated relative to today, so deadlines and upcoming interviews land
          where you would expect. It adds to what is already here.
        </p>
        <ProfileSampleDataButton />
      </div>
    </Card>
  );
}
