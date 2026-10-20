import type { InputHTMLAttributes } from "react";
import { controlClass } from "./control.styles";

export function Input({
  error,
  className,
  ...rest
}: { error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return <input className={controlClass(error, className)} aria-invalid={!!error} {...rest} />;
}
