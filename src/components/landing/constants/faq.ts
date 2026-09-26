/** The questions someone landing on this page would actually ask. */
export const FAQ_ITEMS = [
  {
    question: "Is there really no password?",
    answer:
      "Not yet — and the sign-in screen tells you so instead of showing a password box that does nothing. For now you sign in by picking your account from a list. That is fine for trying this out on your own machine, and it is not safe for anything real, so please do not keep anything here you would mind someone else seeing. Proper sign-in is the next thing being built.",
  },
  {
    question: "What happens to my quiet hours when I travel?",
    answer:
      "Nothing, which is the point. Your quiet hours are saved as a time of day in your home city, so 22:00 means 22:00 there. If that country puts its clocks forward or back, your quiet hours follow along instead of drifting by an hour.",
  },
  {
    question: "Can I track something that is not tied to an application?",
    answer:
      "Yes, and that happens a lot. When a recruiter calls you out of the blue there is no application behind it, so screening calls, interviews and assignments can each stand on their own. Every list has a filter to show just those, and you can attach one to an application later if it turns into something.",
  },
  {
    question: "What happens when I delete an application?",
    answer:
      "Every interview, assignment and screening call attached to it is deleted with it, and the confirmation box tells you that before you go ahead. They go together on purpose: an interview with no application left behind it has nothing to show you.",
  },
  {
    question: "Does it email me?",
    answer:
      "Not yet. Your profile already stores your city, your quiet hours and how often you would like to hear from us, so that when reminders are switched on they turn up at a sensible time of day for you. Nothing is sent today — that was left out on purpose, not forgotten.",
  },
  {
    question: "What is it built on?",
    answer:
      "Java and Spring Boot with a PostgreSQL database behind the scenes, and Next.js with React for the pages you are looking at. It is a personal project built by one person rather than a company product.",
  },
];
