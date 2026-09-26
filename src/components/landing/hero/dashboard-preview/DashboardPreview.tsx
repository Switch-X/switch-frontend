/**
 * The hero's product shot, except it moves.
 *
 * <p>A static screenshot is the usual answer here and it is a weak one: it dates the moment the
 * UI changes, it cannot show what the product *does*, and nobody looks at it for more than a
 * second. This is the real layout rebuilt at miniature scale, cycling through three views on a
 * timer, so the thing a visitor sees is the thing they get.
 *
 * <p>The three panes are static markup and render here, on the server. Only the window around
 * them - the timer, the address bar and the highlighted nav row - runs in the browser.
 */

import { ApplicationsPane } from "./ApplicationsPane";
import { InterviewsPane } from "./InterviewsPane";
import { OverviewPane } from "./OverviewPane";
import { PreviewWindow } from "./PreviewWindow";

export function DashboardPreview() {
  return (
    <PreviewWindow
      overview={<OverviewPane />}
      applications={<ApplicationsPane />}
      interviews={<InterviewsPane />}
    />
  );
}
