import { WORKING_PROFILE } from "@/lib/enums";
import { EnumSelect } from "@/components/ui/form/EnumSelect";
import { Field } from "@/components/ui/form/Field";
import { Input } from "@/components/ui/form/Input";
import { DEFAULT_WORKING_PROFILE } from "@/components/shared/constants/profileDefaults";
import type { StepProps } from "@/components/landing/auth/sign-up/signUp.types";

/** Step one: who you are, where you are in your career, and what you are aiming at. */
export function ExperienceStep({ form, set, fieldErrors }: StepProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Field label="Your name" htmlFor="signup-name" error={fieldErrors.fullName}>
        <Input
          id="signup-name"
          value={form.fullName}
          onChange={(event) => set("fullName", event.target.value)}
          placeholder="Ada Lovelace"
        />
      </Field>

      <Field
        label="Years of experience"
        htmlFor="signup-years"
        error={fieldErrors.yearsOfExperience}
      >
        <Input
          id="signup-years"
          type="number"
          min={0}
          max={60}
          value={form.yearsOfExperience}
          onChange={(event) => set("yearsOfExperience", event.target.value)}
        />
      </Field>

      <Field label="Where you are" htmlFor="signup-stage" error={fieldErrors.workingProfile}>
        <EnumSelect
          id="signup-stage"
          table={WORKING_PROFILE}
          value={form.workingProfile}
          placeholder="Choose one"
          onChange={(value) => set("workingProfile", value ?? DEFAULT_WORKING_PROFILE)}
        />
      </Field>

      <Field label="Skills" htmlFor="signup-skills" hint="Comma separated">
        <Input
          id="signup-skills"
          value={form.skills}
          placeholder="java, spring, postgresql"
          onChange={(event) => set("skills", event.target.value)}
        />
      </Field>

      <Field
        label="Roles you are targeting"
        htmlFor="signup-roles"
        hint="Comma separated"
        className="sm:col-span-2"
      >
        <Input
          id="signup-roles"
          value={form.targetedRoles}
          placeholder="Backend Engineer, Platform Engineer"
          onChange={(event) => set("targetedRoles", event.target.value)}
        />
      </Field>
    </div>
  );
}
