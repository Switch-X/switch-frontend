import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import type { StepProps } from "@/components/landing/auth/sign-up/signUp.types";

/** Step one: who you are. Three fields, none of them an id or a handle to invent. */
export function AccountInfoStep({ form, set, fieldErrors }: StepProps) {
  return (
    <div className="space-y-5">
      <Field label="Full name" htmlFor="signup-name" required error={fieldErrors.fullName}>
        <Input
          id="signup-name"
          required
          value={form.fullName}
          placeholder="Ada Lovelace"
          autoComplete="name"
          onChange={(event) => set("fullName", event.target.value)}
        />
      </Field>

      <Field label="Email" htmlFor="signup-email" required error={fieldErrors.email}>
        <Input
          id="signup-email"
          type="email"
          required
          value={form.email}
          placeholder="ada@example.com"
          autoComplete="email"
          onChange={(event) => set("email", event.target.value)}
        />
      </Field>

      <Field
        label="Password"
        htmlFor="signup-password"
        required
        error={fieldErrors.password}
      >
        <Input
          id="signup-password"
          type="password"
          required
          value={form.password}
          placeholder="••••••••••"
          autoComplete="new-password"
          onChange={(event) => set("password", event.target.value)}
        />
      </Field>
    </div>
  );
}
