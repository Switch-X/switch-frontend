/**
 * The message that follows anything moving to interviewing.
 *
 * <p>Three forms can put an application into interviews - editing it directly, marking a
 * screening call as leading to one, or marking a take-home as leading to one - and the rounds
 * live on their own records that none of those forms create. Whichever way the reader got here,
 * the moment they chose it is the only moment they are thinking about it; a prompt on the
 * interviews page later arrives after they have moved on.
 *
 * <p>In the UI rather than the backend on purpose. The API reports what changed; what to say to
 * somebody about it is the screen's business, and the same change made by a script should not
 * be told to go and click something.
 */
const ADD_THE_INTERVIEW = "Saved — now add the interview and its rounds from Interviews";

/**
 * What the toast should say.
 *
 * <p>Only on the way in. Saving something that was already heading for interviews is just a
 * save, and being nudged every time would train the reader to ignore it.
 *
 * @param nowInterviewing  what the form is about to save
 * @param wasInterviewing  what it was before, false for a new record
 * @param saved            what to say when nothing moved
 */
export function savedMessage(
  nowInterviewing: boolean,
  wasInterviewing: boolean,
  saved: string,
): string {
  return nowInterviewing && !wasInterviewing ? ADD_THE_INTERVIEW : saved;
}
