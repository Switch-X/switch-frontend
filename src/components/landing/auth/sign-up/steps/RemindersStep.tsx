import { DIGEST_MODE } from "@/lib/enums";
import { detectTimeZone, timezoneChoices } from "@/lib/timezone";
import { Checkbox } from "@/components/ui/form/Checkbox";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { Select } from "@/components/ui/form/Select";
import {
  DEFAULT_DIGEST_MODE,
  DEFAULT_TIMEZONE,
} from "@/components/shared/constants/profileDefaults";
import type { StepProps } from "@/components/landing/auth/sign-up/signUp.types";

/**
 * Step two: when it is reasonable to reach you.
 *
 * <p>The timezone is pre-filled from the browser rather than defaulted. The backend falls back
 * to `switch.default-timezone` (UTC out of the box) for a profile that arrives without one, and
 * its own comments are blunt that this is a guess wrong for most of the world. The client knows
 * the real answer for free, so it sends it.
 */
export function RemindersStep({ form, set, fieldErrors }: StepProps) {
  const detected = detectTimeZone() ?? DEFAULT_TIMEZONE;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Field
        label="Your city's timezone"
        htmlFor="signup-tz"
        error={fieldErrors.timezone}
        hint="Quiet hours below are read against this, so they hold when the clocks change."
        className="sm:col-span-2"
      >
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

      <Field label="How often" htmlFor="signup-digest">
        <EnumSelect
          id="signup-digest"
          table={DIGEST_MODE}
          value={form.digestMode}
          placeholder="Choose one"
          onChange={(value) => set("digestMode", value ?? DEFAULT_DIGEST_MODE)}
        />
      </Field>

      <div className="self-end rounded-xl border border-border bg-surface-muted p-4">
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
