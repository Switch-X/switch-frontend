import { Card, CardHeader } from "@/components/ui/Card";
import { ProfileDetailsForm } from "./ProfileDetailsForm";

export function ProfileDetailsSection() {
  return (
    <Card>
      <CardHeader title="Details" description="Shown nowhere public — this is your own record." />
      <ProfileDetailsForm />
    </Card>
  );
}
