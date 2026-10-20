"use client";

/**
 * The company name, asked for only when no application is linked.
 *
 * <p>The companion to `ApplicationSelect`, and the reason it takes `applicationId` rather than a
 * boolean: it is the field's own business when it appears, so a form cannot wire it up and forget
 * the condition. Picking an application hides it, because the application is then where the
 * company lives - which is exactly what `CompanyName.stored` does on the backend, and the two
 * being one rule is the point.
 *
 * <p>Required when it does appear. An interview or take-home with neither an application nor a
 * company has no name to show on a list: it read as "Not linked" on the interviews page and as
 * "Take-home assignment" on the overview. The backend refuses it too, so marking it here is what
 * turns that refusal into the browser stopping the submit.
 */

import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";

export function StandaloneCompanyField({
  applicationId,
  id,
  value,
  error,
  hint,
  onChange,
}: {
  /** The application the record is linked to. The field hides itself when there is one. */
  applicationId: number | null;
  id: string;
  value: string;
  error?: string;
  hint: string;
  onChange: (value: string) => void;
}) {
  if (applicationId !== null) return null;

  return (
    <Field label="Company" htmlFor={id} required error={error} hint={hint}>
      <Input
        id={id}
        required
        maxLength={200}
        value={value}
        placeholder="Datadog"
        error={error}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}
