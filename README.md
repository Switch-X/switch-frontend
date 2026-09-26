# SWITCH — frontend

A Next.js app over the `switch-backend` REST API: applications, interviews and their rounds,
assignments, screening calls, and the profile that ties them together.

## Running it

The backend has to be up first — this app talks to nothing else.

```bash
# 1. Backend, from source code/switch-backend
mvn spring-boot:run          # http://localhost:8080/api

# 2. Frontend, from here
npm install
npm run dev                  # http://localhost:3000
```

Then open <http://localhost:3000> and pick one of the three demo accounts. They are the ones
`V900__demo_data.sql` seeds on a fresh database, so the dashboard lands with real rows in it
rather than an empty state.

## Sample data

The backend seed runs once, on a fresh database, for three fixed accounts. It cannot help an
account you have just signed up with, and it cannot be re-run — so the frontend carries its own
worked example in [`src/lib/sampleData.ts`](src/lib/sampleData.ts), loadable for **any** account
from a **Load sample data** button.

It creates 11 applications covering every one of the ten `ApplicationStatus` values, 4 interviews
with 8 rounds between them (questions, feedback, and a rejection with its reasons), 4 assignments
and 5 screening calls.

The button appears in three places: on the dashboard when the account has nothing at all, in the
empty state of each list page, and permanently under **Profile → Sample data** for once the
account is no longer empty.

Two things about it worth knowing:

- **Every date is an offset from today**, not a literal. A fixture with dates baked in stops
  demonstrating anything a few weeks later — "apply before 15 Sep" reads as a stale row, not an
  urgent one. Offsets mean the dashboard's "needs you this week" block, the overdue colouring and
  the upcoming/past interview split are always populated.
- **It adds; it does not replace.** Run it twice and you get two of everything. The confirmation
  dialog says so.

It goes through the ordinary API — there is no mock layer and nothing that can drift out of step
with the real endpoints. What it produces is indistinguishable from records typed in by hand.

### Configuration

One variable, in `.env.local`:

```
SWITCH_API_BASE_URL=http://localhost:8080/api
```

It is read on the server only. There is no `NEXT_PUBLIC_` copy, so pointing this at a deployed
backend is a restart rather than a rebuild.

## How it talks to the backend

The browser calls this app's own `/api/switch/...`, and
[`src/app/api/switch/[...path]/route.ts`](src/app/api/switch/[...path]/route.ts) forwards each
call to the Spring Boot service.

That indirection is doing real work. `switch-backend` configures no CORS at all, so a `fetch`
straight from `localhost:3000` to `localhost:8080` is refused by the browser before the backend
ever sees it. Proxying means the integration works against the backend exactly as it is — no
`@CrossOrigin`, no `WebMvcConfigurer`, no changes on that side.

### Signing in

`HeaderCurrentUser` on the backend reads the caller from an `X-User-Id` request header and trusts
it outright — there is no password to check and no token to verify. So the sign-in screen here is
an account **chooser**, not an authenticator, and it says so rather than painting a fake password
box over it.

The id is held in `localStorage` and attached to every request by
[`src/lib/api.ts`](src/lib/api.ts). When the resource server is wired up, the proxy attaches a
bearer token instead and nothing else in the app moves.

### When the backend fails

The proxy splits every failure in two. The detail - the address it tried, the underlying error,
whatever body a 5xx came back with - is written to the Next.js server's log, for whoever runs it.
The browser gets one of three plain messages from
[`src/lib/errorMessages.ts`](src/lib/errorMessages.ts) and nothing else, so an outage never shows
anyone an internal address, a config variable or a stack trace. The backend's 4xx answers still
pass through untouched: those are written for the reader, and they are how a form learns which
field was rejected.

## The landing page

Rebuilt as a product page rather than a form with copy beside it. One folder per section, under
`src/components/landing/`:

| Folder | What it does |
|---|---|
| `hero/` | Aurora background, gradient headline, and three demo chips that sign you in with one click |
| `hero/dashboard-preview/` | The real layout at miniature scale, cycling through three views on a timer |
| `journey/` | Five stages of a job search — auto-advancing, clickable, pauses the moment you touch it |
| `world-clocks/` | Three genuinely live clocks; a card goes dark when that person's quiet hours are running |
| `stats/`, `features/` | Counted stats, and a bento grid with a cursor-following spotlight |
| `faq/` | `<details>` accordion — keyboard operable, findable by in-page search, no JavaScript at all |
| `auth/` | The sign-in / sign-up dialog, and the buttons around the page that open it |
| `shared/`, `hooks/` | The section wrapper, reveal-on-scroll and the session gate; count-up, spotlight and timer hooks |

Two rules it follows:

- **Reveal-on-scroll always has a failsafe.** Hiding content and waiting for an
  `IntersectionObserver` means any case where that callback does not arrive leaves the section
  invisible *permanently*. Every reveal also fires on a 1.6s timer, so the worst case is a section
  that appears without animating rather than one that never appears. The hidden state is also
  scoped to `[data-reveal-ready]`, which is only set once JS runs.
- **Motion is for this page only.** The app itself does not animate — an interface you use daily
  should hold still. Everything here is `transform` and `opacity` so the compositor handles it,
  and all of it collapses under `prefers-reduced-motion`.

Fonts are **Bricolage Grotesque** (display), **Plus Jakarta Sans** (UI) and **JetBrains Mono**
(code), loaded through `next/font` so they are self-hosted, preloaded, and metric-matched against
a local fallback — no flash, no layout shift, no second origin on the critical path.

## Layout

```
src/
  app/                          routes only - each page.tsx lists its page's sections, in order
    page.tsx                    landing + sign in / sign up
    (app)/                      everything behind a session
      layout.tsx                the shell: session gate, sidebar, mobile header
      dashboard/                overview: what needs you this week
      applications/             paged table, filters, CRUD
      interviews/               cards with per-round CRUD
      assignments/              table, filters, CRUD
      screening-calls/          table, filters, CRUD
      profile/                  profile, history, reminders, delete account
    api/switch/[...path]/       the proxy
  components/
    <page>/                     one folder per page: landing, app-shell, dashboard, applications,
                                interviews, assignments, screening-calls, profile
      <section>/                one folder per section of that page, holding its components
      context/                  the page's shared client state - a provider and its hook
      constants/                static data: defaults, thresholds, table columns, copy lists
      utils/                    pure functions: sorting, urgency colours, form <-> request body
      types/                    the page's own types: form state, filters
      hooks/                    hooks only that page uses
    shared/                     used by more than one page: filters, tables, sample data, ...
    ui/                         primitives - Button, Card, Badge, Modal, form controls, icons
  lib/
    types.ts                    hand-written against the Java DTOs
    api.ts                      typed client, envelope unwrapping, ApiError
    errorMessages.ts            the only words a failure may show a user
    enums.ts                    backend enums to human wording and colour
    session.tsx                 who is signed in
    format.ts                   dates, durations, tenure, counts
    timezone.ts                 the browser's zone, and the zones a picker offers
    hooks.ts                    list loading with a staleness guard, dialogs, form fields
```

### Server and client components

Every `page.tsx` and `layout.tsx` is a server component, and so is anything that only renders
markup. `"use client"` goes on a file only when it holds state, runs an effect, reads context or
uses a browser-only hook - nowhere else. Where a static block needs one interactive piece, that
piece is its own small client component and the block around it stays on the server. Where a
client wrapper has static content inside it - a reveal animation, the sidebar's sliding frame, the
hero's preview window - the content is passed in as `children` or props, so it still renders on the
server.

The data pages cannot move their data to the server: the session that says whose data it is lives
in the browser. So each keeps one client provider in its `context/` folder, and its islands read
from that while the headings and cards around them render on the server.

## Things worth knowing before changing it

**Plain dates never become a `Date`.** `appliedOn`, `applyBefore`, `interviewDate` and friends are
`LocalDate` on the wire — calendar facts with no zone. `new Date("2026-09-12")` parses that as
midnight UTC and renders it in the viewer's zone, which shows the 11th to everyone west of
Greenwich. [`format.ts`](src/lib/format.ts) splits the string instead. `createdAt` and
`lastActivity` are `Instant`s and *are* rendered in the reader's local zone, which is correct for
those.

**Interview order comes from the backend.** `InterviewServiceImpl` sorts upcoming-first against
the *account holder's* timezone, not the server's. Re-sorting in the browser would substitute this
machine's zone and get it wrong for anyone else.

**Rounds are not edited through the interview form.** The backend's `UpdateInterviewRequest`
carries no rounds and its update leaves the collection untouched; rounds have their own endpoints.
A combined form would silently discard round edits on save.

**The whole employment history is sent on every profile save.** The backend replaces the list and
relies on orphan removal, so dropping an entry from the array is how it gets deleted.

**Filters are omitted, not blanked.** Every list filter is `@RequestParam(required = false)`.
Sending `?source=` hands Spring an empty string to coerce into an enum and earns a 400, so
[`api.ts`](src/lib/api.ts) drops empty values instead of serialising them.
