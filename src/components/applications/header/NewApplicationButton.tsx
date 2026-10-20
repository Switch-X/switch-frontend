"use client";

import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icons";
import { useApplications } from "@/components/applications/context/ApplicationsProvider";

/** The one interactive piece of the page header, which otherwise renders on the server. */
export function NewApplicationButton() {
  const { editor } = useApplications();

  return (
    <Button onClick={editor.create}>
      <Icon.Plus className="size-4" />
      New application
    </Button>
  );
}
