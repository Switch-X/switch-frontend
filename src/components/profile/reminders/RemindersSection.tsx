import { Card, CardHeader } from "@/components/ui/Card";
import { RemindersForm } from "./RemindersForm";

export function RemindersSection() {
  return (
    <Card>
      <CardHeader title="Reminders" description="When it is reasonable to contact you." />
      <RemindersForm />
    </Card>
  );
}
