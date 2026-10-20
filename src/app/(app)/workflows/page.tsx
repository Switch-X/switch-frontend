/**
 * Workflows: one application's story at a time.
 *
 * <p>Reads the trail the backend writes as things happen rather than working it out here - see
 * `ApplicationTimelineRecorder`. The list down the side is the light `options` call, so picking
 * between applications costs an id and a label each, not the whole record.
 *
 * <p>A server component: the heading and the frame render here, the picker and the timeline are
 * client islands sharing one provider.
 */

import { WorkflowsProvider } from "@/components/workflows/context/WorkflowsProvider";
import { WorkflowPicker } from "@/components/workflows/picker/WorkflowPicker";
import { SelectedWorkflow } from "@/components/workflows/timeline/SelectedWorkflow";
import { Card } from "@/components/ui/layout/Card";
import { PageHeader } from "@/components/ui/layout/PageHeader";

export default function WorkflowsPage() {
  return (
    <WorkflowsProvider>
      <div className="space-y-6">
        <PageHeader
          title="Workflows"
          description="How far each application has got, step by step."
        />

        <div className="grid gap-4 lg:grid-cols-[18rem_1fr]">
          <Card className="lg:sticky lg:top-6 lg:self-start">
            <WorkflowPicker />
          </Card>

          <Card>
            <SelectedWorkflow />
          </Card>
        </div>
      </div>
    </WorkflowsProvider>
  );
}
