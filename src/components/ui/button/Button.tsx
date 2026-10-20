import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Spinner } from "@/components/ui/feedback/Spinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "subtle" | "inverse";
type ButtonSize = "sm" | "md";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-strong shadow-sm",
  secondary: "bg-surface text-ink border border-border-strong hover:bg-surface-muted",
  ghost: "text-ink-muted hover:bg-surface-sunken hover:text-ink",
  subtle: "bg-brand-soft text-brand hover:bg-brand-ring/50",
  danger: "bg-bad text-white hover:brightness-95 shadow-sm",
  /* For the dark hero and the dark CTA card. It exists as a variant rather than as a
     `className="bg-white text-ink"` override because `cx` is a plain join with no Tailwind
     conflict resolution: passing `text-ink` alongside the variant's `text-white` leaves both
     in the class list, and the stylesheet's own order decides the winner, not the order they
     were written in. That is how you get a white button with white text on it. */
  inverse: "bg-white text-ink hover:bg-white/90 shadow-sm",
};

/**
 * The classes that make something look like a `Button`.
 *
 * <p>Exported for the places that need the look without the element - a `Link` that navigates,
 * or a trigger that opens a dialog. Wrapping a `<Button>` in a `<Link>` instead nests a button
 * inside an anchor, which is invalid HTML and leaves keyboard users two tab stops for one action.
 */
export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}): string {
  return cx(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition",
    "disabled:cursor-not-allowed disabled:opacity-55",
    size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2.5 text-sm",
    BUTTON_VARIANTS[variant],
    className,
  );
}

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      // Not `type="submit"`: an unspecified button inside a form submits it, which is how a
      // "Cancel" or "Add row" button ends up saving the record.
      type="button"
      disabled={disabled || loading}
      className={buttonClass({ variant, size, className })}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
