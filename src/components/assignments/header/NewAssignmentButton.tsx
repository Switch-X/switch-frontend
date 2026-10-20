"use client";

import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icons";
import { useAssignments } from "@/components/assignments/context/AssignmentsProvider";

export function NewAssignmentButton() {
  const { editor } = useAssignments();

  return (
    <Button onClick={editor.create}>
      <Icon.Plus className="size-4" />
      New assignment
    </Button>
  );
}
