/**
 * Profile, employment history, and how reminders should reach you.
 *
 * <p>Two forms with two save buttons, because the backend splits them: `PATCH /v1/users/me`
 * changes the profile and refuses to carry preferences, and
 * `PATCH /v1/users/me/notification-preferences` changes only the reminder settings.
 *
 * <p>A server component. Each card's frame and wording render here; the account summary, the
 * forms and the two buttons that act on the account are client islands in their section folders
 * under `components/profile/`. The app shell only renders this page for a signed-in account, so
 * each island can count on there being a user to read.
 */

import { DangerZone } from "@/components/profile/danger-zone/DangerZone";
import { ProfileDetailsSection } from "@/components/profile/details/ProfileDetailsSection";
import { RemindersSection } from "@/components/profile/reminders/RemindersSection";
import { ProfileSummary } from "@/components/profile/summary/ProfileSummary";
import { PageHeader } from "@/components/ui/layout/PageHeader";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Who you are, and how SWITCH should reach you." />

      <ProfileSummary />
      <ProfileDetailsSection />
      <RemindersSection />
      <DangerZone />
    </div>
  );
}
