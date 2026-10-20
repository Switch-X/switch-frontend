import { Card, CardHeader } from "@/components/ui/layout/Card";
import { RecentActivityList } from "./RecentActivityList";

/** "Latest movement" - the card renders on the server, the list inside it on the client. */
export function RecentActivity() {
  return (
    <Card>
      <CardHeader
        title="Latest movement"
        description="The applications that changed most recently."
      />
      <RecentActivityList />
    </Card>
  );
}
