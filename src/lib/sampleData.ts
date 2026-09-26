/**
 * A realistic job search, written out so any account can be filled with one click.
 *
 * <p>Why this lives in the frontend rather than in another Flyway migration: the backend seed
 * runs once, on a fresh database, for three fixed accounts. It cannot help the account you just
 * signed up with, and it cannot be re-run. This can, for anybody, at any time - and it goes
 * through the ordinary API, so what it produces is indistinguishable from data typed in by hand.
 * There is no mock layer here and nothing to drift out of step with the real endpoints.
 *
 * <p>Every date is relative to today. A fixture with dates hard-coded into it is only a good
 * demonstration for a few weeks - "apply before 15 Sep 2026" reads as a stale row, not an urgent
 * one, the moment that date passes. Offsets mean the dashboard's "needs you this week" block,
 * the overdue colouring and the upcoming/past interview split are populated whenever this runs.
 */

import { api } from "./api";
import type {
  ApplicationPayload,
  AssignmentPayload,
  CreateInterviewPayload,
  InterviewRoundPayload,
  ScreeningCallPayload,
} from "./types";

/** `yyyy-MM-dd`, `offset` days from today, in the reader's own zone. */
function day(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const dayOfMonth = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${dayOfMonth}`;
}

/**
 * Ten applications covering every status the backend defines.
 *
 * <p>Deliberately not ten healthy ones. A tracker that only ever shows "Applied" and "Offered"
 * hides exactly the states people need to see working - the deadline three days out that has not
 * been applied to, the one that lapsed, the offer that was pulled.
 */
const APPLICATIONS: (ApplicationPayload & { ref: string })[] = [
  {
    ref: "vercel",
    companyName: "Vercel",
    jobProfile: "Senior Frontend Engineer",
    jobId: "VRC-2291",
    appliedOn: day(-12),
    applyBefore: day(4),
    referral: "SKIPPED",
    source: "LINKEDIN",
    applicationStatus: "APPLIED",
  },
  {
    ref: "stripe",
    companyName: "Stripe",
    jobProfile: "Backend Engineer, Payments",
    jobId: "STR-8814",
    appliedOn: day(-25),
    applyBefore: day(18),
    referral: "RECEIVED",
    source: "REFERRAL",
    applicationStatus: "INTERVIEWING",
  },
  {
    ref: "datadog",
    companyName: "Datadog",
    jobProfile: "Platform Engineer",
    jobId: "DD-1043",
    appliedOn: day(-9),
    applyBefore: day(6),
    referral: "REQUESTED",
    source: "CAREER_PORTAL",
    applicationStatus: "ASSIGNMENT",
  },
  {
    // The one that matters: a deadline inside the week on something not yet applied to.
    ref: "linear",
    companyName: "Linear",
    jobProfile: "Product Engineer",
    jobId: "LIN-204",
    appliedOn: null,
    applyBefore: day(3),
    referral: "SKIPPED",
    source: "COLD_EMAIL",
    applicationStatus: "NOT_APPLIED_YET",
  },
  {
    ref: "cloudflare",
    companyName: "Cloudflare",
    jobProfile: "Systems Engineer",
    jobId: "CF-5567",
    appliedOn: day(-40),
    applyBefore: day(-18),
    referral: "SKIPPED",
    source: "LINKEDIN",
    applicationStatus: "REJECTED",
  },
  {
    ref: "figma",
    companyName: "Figma",
    jobProfile: "Senior Backend Engineer",
    jobId: "FIG-909",
    appliedOn: day(-55),
    applyBefore: day(-30),
    referral: "RECEIVED",
    source: "REFERRAL",
    applicationStatus: "OFFERED",
  },
  {
    ref: "notion",
    companyName: "Notion",
    jobProfile: "Infrastructure Engineer",
    jobId: "NTN-118",
    appliedOn: day(-30),
    applyBefore: null,
    referral: "REQUESTED",
    source: "CAREER_PORTAL",
    applicationStatus: "HOLD",
  },
  {
    ref: "canva",
    companyName: "Canva",
    jobProfile: "Backend Engineer",
    jobId: null,
    appliedOn: day(-5),
    applyBefore: null,
    referral: null,
    source: "OTHERS",
    applicationStatus: "APPLIED",
  },
  {
    ref: "atlassian",
    companyName: "Atlassian",
    jobProfile: "Senior Platform Engineer",
    jobId: "ATL-7120",
    appliedOn: null,
    applyBefore: day(-10),
    referral: "SKIPPED",
    source: "CAREER_PORTAL",
    applicationStatus: "MISSED",
  },
  {
    ref: "razorpay",
    companyName: "Razorpay",
    jobProfile: "Backend Engineer",
    jobId: "RZP-331",
    appliedOn: day(-20),
    applyBefore: day(-2),
    referral: "RECEIVED",
    source: "LINKEDIN",
    applicationStatus: "WITHDRAWN",
  },
  {
    // The worst outcome the tracker models, and the one a demo would normally leave out.
    ref: "zomato",
    companyName: "Zomato",
    jobProfile: "Senior Backend Engineer",
    jobId: "ZOM-1180",
    appliedOn: day(-62),
    applyBefore: day(-45),
    referral: "RECEIVED",
    source: "REFERRAL",
    applicationStatus: "OFFER_REVOKED",
  },
];

type InterviewFixture = {
  /** Which application this hangs off, or null for a process with no application behind it. */
  ref: string | null;
  interview: Omit<CreateInterviewPayload, "applicationId" | "rounds">;
  rounds: InterviewRoundPayload[];
};

const INTERVIEWS: InterviewFixture[] = [
  {
    // A loop in progress: two rounds behind, one ahead. The upcoming one is what the dashboard
    // and the interview list's "upcoming first" ordering are for.
    ref: "stripe",
    interview: { interviewDate: day(5), interviewProceedingVia: "APPLIED_APPLICATION" },
    rounds: [
      {
        interviewerName: "Ana Ruiz",
        interviewerEmail: "ana.ruiz@stripe.example",
        scheduledAt: day(-14),
        durationInMinutes: 45,
        difficultyLevel: "MEDIUM",
        interviewType: "ONLINE",
        interviewOutcome: "CLEARED",
        questionsAsked: [
          "Implement an LRU cache",
          "Topological sort on a build graph",
          "When would you reach for a heap over a sorted list?",
        ],
        feedbackFromInterviewer: "Clean solution, good communication. Comfortable moving on.",
        remarks: "DS and algorithms screen. Shared editor, no compiler.",
        rejectionReasons: [],
      },
      {
        interviewerName: "Bo Chen",
        interviewerEmail: "bo.chen@stripe.example",
        scheduledAt: day(-6),
        durationInMinutes: 60,
        difficultyLevel: "HARD",
        interviewType: "ONLINE",
        interviewOutcome: "CLEARED",
        questionsAsked: [
          "Design an idempotent payment capture API",
          "How would you make retries safe across a network partition?",
          "Walk through a schema for multi-currency ledgers",
        ],
        feedbackFromInterviewer:
          "Strong on idempotency and failure modes. Wanted more depth on the ledger schema.",
        remarks: "System design. Asked about the exactly-once claim; worth reading up before onsite.",
        rejectionReasons: [],
      },
      {
        interviewerName: "Priya Nair",
        interviewerEmail: "priya.nair@stripe.example",
        scheduledAt: day(5),
        durationInMinutes: 90,
        difficultyLevel: "HARD",
        interviewType: "ONSITE",
        interviewOutcome: "AWAITED",
        questionsAsked: [],
        feedbackFromInterviewer: null,
        remarks: "Final round. Hiring manager plus one senior engineer.",
        rejectionReasons: [],
      },
    ],
  },
  {
    ref: "figma",
    interview: { interviewDate: day(-12), interviewProceedingVia: "CONNECTION" },
    rounds: [
      {
        interviewerName: "Marta Oliveira",
        interviewerEmail: "marta@figma.example",
        scheduledAt: day(-26),
        durationInMinutes: 60,
        difficultyLevel: "MEDIUM",
        interviewType: "ONLINE",
        interviewOutcome: "CLEARED",
        questionsAsked: ["Debug a slow N+1 query", "Explain optimistic locking"],
        feedbackFromInterviewer: "Found the N+1 quickly and explained the fix well.",
        remarks: null,
        rejectionReasons: [],
      },
      {
        interviewerName: "Tom Whitaker",
        interviewerEmail: "tom.w@figma.example",
        scheduledAt: day(-12),
        durationInMinutes: 75,
        difficultyLevel: "HARD",
        interviewType: "ONSITE",
        interviewOutcome: "CLEARED",
        questionsAsked: ["Design collaborative document sync", "Talk me through a hard rollback"],
        feedbackFromInterviewer: "Offer recommended.",
        remarks: "Went well. Offer landed four days later.",
        rejectionReasons: [],
      },
    ],
  },
  {
    // The one that did not work out, with the reasons recorded - which is the point of keeping it.
    ref: "cloudflare",
    interview: { interviewDate: day(-25), interviewProceedingVia: "APPLIED_APPLICATION" },
    rounds: [
      {
        interviewerName: "Sam Okafor",
        interviewerEmail: "sam.okafor@cloudflare.example",
        scheduledAt: day(-33),
        durationInMinutes: 45,
        difficultyLevel: "MEDIUM",
        interviewType: "ONLINE",
        interviewOutcome: "CLEARED",
        questionsAsked: ["Parse a malformed HTTP header stream"],
        feedbackFromInterviewer: "Solid.",
        remarks: null,
        rejectionReasons: [],
      },
      {
        interviewerName: "Devika Rao",
        interviewerEmail: "devika.rao@cloudflare.example",
        scheduledAt: day(-25),
        durationInMinutes: 60,
        difficultyLevel: "INSANE",
        interviewType: "ONLINE",
        interviewOutcome: "REJECTED",
        questionsAsked: [
          "Write a lock-free ring buffer",
          "Reason about memory ordering on ARM vs x86",
        ],
        feedbackFromInterviewer:
          "Got to a working answer but not within the time budget they wanted.",
        remarks: "Systems-heavy. Well outside what I use day to day.",
        rejectionReasons: [
          "Wanted deeper low-level concurrency experience",
          "Looking for someone who has shipped in Rust or C",
        ],
      },
    ],
  },
  {
    // No application behind it: a recruiter who went straight to a conversation.
    ref: null,
    interview: { interviewDate: day(9), interviewProceedingVia: "RECRUITER_REACH_OUT" },
    rounds: [
      {
        interviewerName: "Hannah Berg",
        interviewerEmail: "hannah@northwind.example",
        scheduledAt: day(9),
        durationInMinutes: 30,
        difficultyLevel: "EASY",
        interviewType: "ON_CALL",
        interviewOutcome: "AWAITED",
        questionsAsked: [],
        feedbackFromInterviewer: null,
        remarks: "Intro chat. No formal application - they reached out on LinkedIn.",
        rejectionReasons: [],
      },
    ],
  },
];

const ASSIGNMENTS: (AssignmentPayload & { ref: string | null })[] = [
  {
    // Due inside the week and not finished: the row the dashboard should be shouting about.
    ref: "datadog",
    dateAssigned: day(-3),
    submissionBefore: day(2),
    submission: "IN_PROCESS",
    assignmentOutcome: "AWAITING",
    difficultyLevel: "HARD",
    remarks:
      "Build a metrics ingestion pipeline with backpressure. Roughly six hours of work; about half done.",
  },
  {
    ref: "stripe",
    dateAssigned: day(-22),
    submissionBefore: day(-15),
    submission: "COMPLETED",
    assignmentOutcome: "INTERVIEWING",
    difficultyLevel: "MEDIUM",
    remarks: "Idempotent webhook receiver with replay protection. Submitted two days early.",
  },
  {
    ref: "linear",
    dateAssigned: day(-1),
    submissionBefore: day(6),
    submission: "PENDING",
    assignmentOutcome: "AWAITING",
    difficultyLevel: "INSANE",
    remarks: "Offline-first sync engine with conflict resolution. Not started yet.",
  },
  {
    ref: null,
    dateAssigned: day(-38),
    submissionBefore: day(-31),
    submission: "COMPLETED",
    assignmentOutcome: "REJECTED",
    difficultyLevel: "EASY",
    remarks: "CRUD API with tests. Rejected on code style rather than correctness.",
  },
];

const SCREENING_CALLS: (ScreeningCallPayload & { ref: string | null })[] = [
  {
    ref: "stripe",
    contactedOn: day(-28),
    discussionDuration: 30,
    hrName: "Laura Simmons",
    companyName: "Stripe",
    proceeding: "INTERVIEWING",
    callReceivedVia: "APPLIED_APPLICATION",
  },
  {
    ref: "datadog",
    contactedOn: day(-12),
    discussionDuration: 25,
    hrName: "Kofi Mensah",
    companyName: "Datadog",
    proceeding: "ASSIGNMENT",
    callReceivedVia: "RECRUITER_REACH_OUT",
  },
  {
    ref: "vercel",
    contactedOn: day(-10),
    discussionDuration: 20,
    hrName: "Ines Duarte",
    companyName: "Vercel",
    proceeding: "AWAITED",
    callReceivedVia: "APPLIED_APPLICATION",
  },
  {
    ref: null,
    contactedOn: day(-2),
    discussionDuration: 15,
    hrName: "Greg Palmer",
    companyName: "Northwind Labs",
    proceeding: "AWAITED",
    callReceivedVia: "RECRUITER_REACH_OUT",
  },
  {
    ref: null,
    contactedOn: day(-35),
    discussionDuration: 40,
    hrName: "Yuki Tanaka",
    companyName: "Mercari",
    proceeding: "REJECTED",
    callReceivedVia: "CONNECTION",
  },
];

export type SampleDataProgress = {
  /** What is being created right now, for the button to show. */
  step: string;
  done: number;
  total: number;
};

export type SampleDataResult = {
  applications: number;
  interviews: number;
  rounds: number;
  assignments: number;
  screeningCalls: number;
};

/** Everything this will create, for the confirmation dialog to state up front. */
export const SAMPLE_DATA_COUNTS: SampleDataResult = {
  applications: APPLICATIONS.length,
  interviews: INTERVIEWS.length,
  rounds: INTERVIEWS.reduce((sum, fixture) => sum + fixture.rounds.length, 0),
  assignments: ASSIGNMENTS.length,
  screeningCalls: SCREENING_CALLS.length,
};

/**
 * Creates the whole set for whoever is signed in.
 *
 * <p>Applications go first because everything else points at one, and the ids only exist once
 * the backend has answered. The fixtures refer to applications by a name rather than an id for
 * that reason - the real ids are resolved here, after the fact.
 *
 * <p>Sequential rather than parallel on purpose. It is a handful of requests either way, and
 * firing forty at once makes the failure case impossible to report sensibly: half-written data
 * with no way to say which half.
 */
export async function loadSampleData(
  onProgress?: (progress: SampleDataProgress) => void,
): Promise<SampleDataResult> {
  const total =
    SAMPLE_DATA_COUNTS.applications +
    SAMPLE_DATA_COUNTS.interviews +
    SAMPLE_DATA_COUNTS.rounds +
    SAMPLE_DATA_COUNTS.assignments +
    SAMPLE_DATA_COUNTS.screeningCalls;

  let done = 0;
  const report = (step: string) => onProgress?.({ step, done, total });

  const idOf = new Map<string, number>();
  const created: SampleDataResult = {
    applications: 0,
    interviews: 0,
    rounds: 0,
    assignments: 0,
    screeningCalls: 0,
  };

  for (const { ref, ...payload } of APPLICATIONS) {
    report(`Adding ${payload.companyName}`);
    const application = await api.applications.create(payload);
    idOf.set(ref, application.id);
    created.applications++;
    done++;
  }

  for (const fixture of INTERVIEWS) {
    const applicationId = fixture.ref === null ? null : (idOf.get(fixture.ref) ?? null);
    report("Adding interviews");
    // Rounds are added one at a time rather than inline on the create, so a round the backend
    // rejects points at itself instead of failing the whole interview.
    const interview = await api.interviews.create({ ...fixture.interview, applicationId, rounds: [] });
    created.interviews++;
    done++;

    for (const round of fixture.rounds) {
      report(`Adding round for ${round.interviewerName ?? "interview"}`);
      await api.interviews.addRound(interview.id, round);
      created.rounds++;
      done++;
    }
  }

  for (const { ref, ...payload } of ASSIGNMENTS) {
    report("Adding assignments");
    await api.assignments.create({
      ...payload,
      applicationId: ref === null ? null : (idOf.get(ref) ?? null),
    });
    created.assignments++;
    done++;
  }

  for (const { ref, ...payload } of SCREENING_CALLS) {
    report("Adding screening calls");
    await api.screeningCalls.create({
      ...payload,
      applicationId: ref === null ? null : (idOf.get(ref) ?? null),
    });
    created.screeningCalls++;
    done++;
  }

  report("Done");
  return created;
}
