"use client";

/**
 * How reminders should reach you - saved through the preferences endpoint, which merges.
 *
 * <p>The timezone is the field that matters most here and the one most easily got wrong. Quiet
 * hours are wall-clock times read against this zone and nothing else, so changing the zone moves
 * every quiet window - which is why the form says so rather than leaving it as a dropdown among
 * dropdowns.
 */

import { usersApi } from "@/components/profile/user.api";
import { useState, type FormEvent } from "react";
import { ApiError } from "@/lib/api";
import { DIGEST_MODE } from "@/lib/enums";
import { useFormFields } from "@/lib/hooks/useFormFields";
import { changedFields } from "@/lib/patch";
import { useSession } from "@/lib/session";
import { detectTimeZone, timezoneChoices } from "@/lib/timezone";
import type { NotificationPreferencesDto } from "@/components/profile/user.types";
import { Button } from "@/components/ui/button/Button";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { useToast } from "@/components/ui/feedback/Toast";
import { Checkbox } from "@/components/ui/form/Checkbox";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { Select } from "@/components/ui/form/Select";
import { DEFAULT_DIGEST_MODE } from "@/components/shared/constants/profileDefaults";
import {
  initialRemindersForm,
  toPreferencesPayload,
} from "@/components/profile/reminders/remindersForm.utils";
import { TimezoneMismatchNotice } from "./TimezoneMismatchNotice";

export function RemindersForm() {
  const { user } = useSession();
  if (!user) return null;

  // Keyed on `updatedAt`, like the details form, so a save rebuilds it from the server's answer.
  return <PreferencesForm key={user.updatedAt} preferences={user.notificationPreferences} />;
}

function PreferencesForm({ preferences }: { preferences: NotificationPreferencesDto | null }) {
  const { refresh } = useSession();
  const toast = useToast();

  const [form, set] = useFormFields(() => initialRemindersForm(preferences));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const detected = detectTimeZone();

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setBusy(true);

    try {
      await usersApi.updatePreferences(
        changedFields(
          toPreferencesPayload(initialRemindersForm(preferences)),
          toPreferencesPayload(form),
        ),
      );
      await refresh();
      toast("Preferences saved");
    } catch (failure) {
      if (failure instanceof ApiError) {
        setFieldErrors(failure.fieldErrors);
        setError(failure.message);
      } else {
        setError("Could not reach SWITCH. Your changes were not saved.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="space-y-4 p-5" onSubmit={submit}>
      <Field
        label="Timezone"
        htmlFor="pref-tz"
        required
        error={fieldErrors.timezone}
        hint="Your quiet hours below follow this city, so changing it shifts them with you."
      >
        <Select id="pref-tz" value={form.timezone} onChange={(event) => set("timezone", event.target.value)}>
          {timezoneChoices(form.timezone, detected).map((zone) => (
            <option key={zone} value={zone}>
              {zone}
              {zone === detected ? " (this browser)" : ""}
            </option>
          ))}
        </Select>
      </Field>

      {detected && detected !== form.timezone && (
        <TimezoneMismatchNotice detected={detected} onUse={() => set("timezone", detected)} />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Quiet from" htmlFor="pref-start" error={fieldErrors["quietHours.start"]}>
          <Input
            id="pref-start"
            type="time"
            value={form.quietStart}
            onChange={(event) => set("quietStart", event.target.value)}
          />
        </Field>
        <Field label="Quiet until" htmlFor="pref-end" error={fieldErrors["quietHours.end"]}>
          <Input
            id="pref-end"
            type="time"
            value={form.quietEnd}
            onChange={(event) => set("quietEnd", event.target.value)}
          />
        </Field>
      </div>

      <Field label="Delivery" htmlFor="pref-digest" error={fieldErrors.digestMode}>
        <EnumSelect
          id="pref-digest"
          table={DIGEST_MODE}
          value={form.digestMode}
          placeholder="Choose one"
          onChange={(value) => set("digestMode", value ?? DEFAULT_DIGEST_MODE)}
        />
      </Field>

      <Checkbox
        id="pref-paused"
        label="Pause reminders"
        description="Nothing will be sent until you turn this back off."
        checked={form.remindersPaused}
        onChange={(checked) => set("remindersPaused", checked)}
      />

      {error && <ErrorNote>{error}</ErrorNote>}

      <div className="flex justify-end">
        <Button type="submit" loading={busy}>
          Save preferences
        </Button>
      </div>
    </form>
  );
}
