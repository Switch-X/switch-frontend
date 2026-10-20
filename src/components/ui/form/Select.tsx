import type { SelectHTMLAttributes } from "react";
import { cx } from "@/lib/cx";
import { controlClass } from "./control.styles";

export function Select({
  error,
  className,
  children,
  ...rest
}: { error?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={controlClass(error, cx("pr-8", className))} aria-invalid={!!error} {...rest}>
      {children}
    </select>
  );
}
