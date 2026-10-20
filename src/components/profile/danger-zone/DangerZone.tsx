import { Card, CardHeader } from "@/components/ui/layout/Card";
import { DeleteAccountControls } from "./DeleteAccountControls";

export function DangerZone() {
  return (
    <Card className="border-bad/25">
      <CardHeader
        title="Delete this account"
        description="Removes the account and every application, interview, assignment and call on it."
      />
      <DeleteAccountControls>
        <p className="text-sm text-ink-muted">
          Your sign-in is removed first, then everything saved against it. There is no undo.
        </p>
      </DeleteAccountControls>
    </Card>
  );
}
