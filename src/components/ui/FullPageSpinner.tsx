import { Spinner } from "./Spinner";

/** The whole screen, waiting - shown while the browser works out who is signed in. */
export function FullPageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-6 text-brand" />
    </div>
  );
}
