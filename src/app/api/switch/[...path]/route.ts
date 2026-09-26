/**
 * Passes browser calls through to the Spring Boot backend.
 *
 * <p>The browser talks to this app's own origin and this handler talks to the backend, so the
 * request the backend sees is server-to-server and never a cross-origin one. That matters because
 * `switch-backend` configures no CORS at all: a `fetch` straight from `localhost:3000` to
 * `localhost:8080` would be refused by the browser before the backend ever saw it. Proxying keeps
 * the backend untouched.
 *
 * <p>It also keeps the backend's address server-side. `SWITCH_API_BASE_URL` is read here, not
 * shipped to the client as a `NEXT_PUBLIC_` variable, so pointing this at a deployed backend is a
 * deployment concern rather than a rebuild.
 *
 * <p>For the same reason, failures are split in two here. Whatever went wrong on the far side -
 * the backend not running, a wrong address, an exception with a stack trace - is written to this
 * server's log in full, for whoever runs it. The browser gets one of the plain messages in
 * `lib/errorMessages.ts` and nothing else: no address, no configuration, no internals. The
 * backend's 4xx answers still pass through untouched, because those are written for the reader -
 * they are how a form learns which field was rejected.
 *
 * <p>What it deliberately does not do is invent identity. `X-User-Id` is forwarded exactly as the
 * caller sent it - the backend's `HeaderCurrentUser` is an unverified stand-in for a JWT subject,
 * and dressing it up here would only hide that. When the resource server is wired, this handler
 * attaches the token instead and nothing else in the app moves.
 */

import { NextRequest, NextResponse } from "next/server";
import { ERROR_MESSAGES } from "@/lib/errorMessages";

const BACKEND = process.env.SWITCH_API_BASE_URL ?? "http://localhost:8080/api";

/** Hop-by-hop and host-specific headers that must not be replayed onto the upstream request. */
const STRIPPED = new Set([
  "host",
  "connection",
  "content-length",
  "transfer-encoding",
  "keep-alive",
  "upgrade",
  "accept-encoding",
]);

/** A failure in the backend's own envelope, so the client reads it like any other answer. */
function failure(status: number, responseCode: string, message: string): NextResponse {
  return NextResponse.json(
    {
      success: false,
      data: null,
      message,
      responseCode,
      traceId: null,
      timestamps: new Date().toISOString(),
    },
    { status },
  );
}

async function proxy(request: NextRequest, path: string[]): Promise<NextResponse> {
  const search = request.nextUrl.search;
  const target = `${BACKEND}/${path.join("/")}${search}`;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!STRIPPED.has(key.toLowerCase())) headers.set(key, value);
  });

  // GET and DELETE carry no body, and handing fetch an empty one for them is an error.
  const hasBody = request.method !== "GET" && request.method !== "DELETE";
  const body = hasBody ? await request.text() : undefined;

  let upstream: Response;
  let payload: string | null;
  try {
    upstream = await fetch(target, {
      method: request.method,
      headers,
      body: body && body.length > 0 ? body : undefined,
      // The backend sets no cookies and this is a per-user call either way.
      cache: "no-store",
      redirect: "manual",
    });
    // 204 and 304 must not carry a body - constructing a Response with one throws.
    payload = upstream.status === 204 || upstream.status === 304 ? null : await upstream.text();
  } catch (unreachable) {
    // A dead backend is by far the most common failure while developing, so the log says what to
    // do about it. The browser is told only that SWITCH is unavailable.
    console.error(
      `[switch proxy] ${request.method} ${target} failed before the backend answered. ` +
        "Is it running, and is SWITCH_API_BASE_URL pointing at it?",
      unreachable,
    );
    return failure(502, "SERVICE_UNAVAILABLE", ERROR_MESSAGES.unavailable);
  }

  if (upstream.status >= 500) {
    // Past 500 the body is written for whoever is debugging it - exception text, the names of the
    // services behind the backend - so it goes to the log and the reader gets the plain version.
    console.error(
      `[switch proxy] ${request.method} ${target} answered ${upstream.status}:`,
      payload,
    );
    return failure(upstream.status, "SERVER_ERROR", ERROR_MESSAGES.serverError);
  }

  const response = new NextResponse(payload, { status: upstream.status });
  const contentType = upstream.headers.get("content-type");
  if (contentType) response.headers.set("content-type", contentType);
  return response;
}

type Context = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, context: Context) {
  return proxy(request, (await context.params).path);
}

export async function POST(request: NextRequest, context: Context) {
  return proxy(request, (await context.params).path);
}

export async function PUT(request: NextRequest, context: Context) {
  return proxy(request, (await context.params).path);
}

export async function PATCH(request: NextRequest, context: Context) {
  return proxy(request, (await context.params).path);
}

export async function DELETE(request: NextRequest, context: Context) {
  return proxy(request, (await context.params).path);
}
