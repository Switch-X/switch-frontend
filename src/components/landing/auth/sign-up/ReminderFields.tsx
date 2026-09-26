import { DIGEST_MODE } from "@/lib/enums";
import { detectTimeZone, timezoneChoices } from "@/lib/timezone";
import { Icon } from "@/components/ui/icons";
import { Checkbox } from "@/components/ui/form/Checkbox";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { Select } from "@/components/ui/form/Select";
import {
  DEFAULT_DIGEST_MODE,
  DEFAULT_TIMEZONE,
} from "@/components/shared/constants/profileDefaults";
import type { SignUpFormState } from "@/components/landing/types/auth";

/** The reminder settings, boxed off at the end of sign-up. */
export function ReminderFields({
  form,
  set,
  fieldErrors,
}: {
  form: SignUpFormState;
  set: <K extends keyof SignUpFormState>(key: K, value: SignUpFormState[K]) => void;
  fieldErrors: Record<string, string>;
}) {
  const detected = detectTimeZone() ?? DEFAULT_TIMEZONE;

  return (
    <div className="rounded-xl border border-border bg-surface-muted p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-ink">
        <Icon.Globe className="size-4 text-brand" />
        Reminders
      </p>

      <div className="mt-3 space-y-4">
        <Field label="Timezone" htmlFor="signup-tz" error={fieldErrors.timezone}>
          <Select
            id="signup-tz"
            value={form.timezone}
            onChange={(event) => set("timezone", event.target.value)}
          >
            {timezoneChoices(form.timezone).map((zone) => (
              <option key={zone} value={zone}>
                {zone}
                {zone === detected ? " (detected)" : ""}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Quiet from" htmlFor="signup-quiet-start">
            <Input
              id="signup-quiet-start"
              type="time"
              value={form.quietStart}
              onChange={(event) => set("quietStart", event.target.value)}
            />
          </Field>
          <Field label="Quiet until" htmlFor="signup-quiet-end">
            <Input
              id="signup-quiet-end"
              type="time"
              value={form.quietEnd}
              onChange={(event) => set("quietEnd", event.target.value)}
            />
          </Field>
        </div>

        <Field label="Delivery" htmlFor="signup-digest">
          <EnumSelect
            id="signup-digest"
            table={DIGEST_MODE}
            value={form.digestMode}
            placeholder="Choose one"
            onChange={(value) => set("digestMode", value ?? DEFAULT_DIGEST_MODE)}
          />
        </Field>

        <Checkbox
          id="signup-paused"
          label="Pause reminders for now"
          description="Nothing will be sent until you turn this back off."
          checked={form.remindersPaused}
          onChange={(checked) => set("remindersPaused", checked)}
        />
      </div>
    </div>
  );
}
