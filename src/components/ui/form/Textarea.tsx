import type { TextareaHTMLAttributes } from "react";
import { cx } from "@/lib/cx";
import { controlClass } from "./control.styles";

export function Textarea({
  error,
  className,
  ...rest
}: { error?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={controlClass(error, cx("resize-y", className))}
      aria-invalid={!!error}
      {...rest}
    />
  );
}
