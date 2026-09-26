/**
 * Profile, employment history, and how reminders should reach you.
 *
 * <p>Two forms with two save buttons, because the backend splits them: `PUT /v1/users/me` replaces
 * the profile and refuses to carry preferences, and `PUT /v1/users/me/notification-preferences`
 * merges into what is already there.
 *
 * <p>A server component. Each card's frame and wording render here; the account summary, the
 * forms and the two buttons that act on the account are client islands in their section folders
 * under `components/profile/`. The app shell only renders this page for a signed-in account, so
 * each island can count on there being a user to read.
 */

import { DangerZone } from "@/components/profile/danger-zone/DangerZone";
import { ProfileDetailsSection } from "@/components/profile/details/ProfileDetailsSection";
import { RemindersSection } from "@/components/profile/reminders/RemindersSection";
import { SampleDataSection } from "@/components/profile/sample-data/SampleDataSection";
import { ProfileSummary } from "@/components/profile/summary/ProfileSummary";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Who you are, and how SWITCH should reach you." />

      <ProfileSummary />
      <ProfileDetailsSection />
      <RemindersSection />
      <SampleDataSection />
      <DangerZone />
    </div>
  );
}
