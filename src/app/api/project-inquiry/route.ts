type ProjectInquiry = {
  audience?: string;
  budget?: string;
  challenge?: string;
  company?: string;
  email?: string;
  fullName?: string;
  message?: string;
  mustHave?: string;
  primaryGoal?: string;
  projectType?: string;
  timeline?: string;
};

const MAX_BODY_BYTES = 64 * 1024;
const IP_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const EMAIL_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const IP_MAX_ATTEMPTS = 5;
const EMAIL_MAX_ATTEMPTS = 3;

const EMAILJS_SERVICE_ID =
  process.env.EMAILJS_SERVICE_ID ??
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ??
  "service_crjpq5p";
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY =
  process.env.EMAILJS_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

type RateBucket = {
  count: number;
  resetAt: number;
};

const rateBuckets = new Map<string, RateBucket>();

function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { limited: boolean; retryAfterSeconds?: number } {
  const now = Date.now();

  for (const [bucketKey, bucket] of rateBuckets) {
    if (bucket.resetAt <= now) {
      rateBuckets.delete(bucketKey);
    }
  }

  const bucket = rateBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return { limited: false };
  }

  if (bucket.count >= limit) {
    return {
      limited: true,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { limited: false };
}

function rateLimitError(retryAfterSeconds = 60) {
  return Response.json(
    {
      error:
        "Too many project requests. Please wait a moment before trying again.",
    },
    {
      headers: {
        "Retry-After": String(retryAfterSeconds),
      },
      status: 429,
    },
  );
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > MAX_BODY_BYTES) {
    return jsonError("Project inquiry payload is too large.", 413);
  }

  const ipLimit = checkRateLimit(
    `ip:${getClientIp(request)}`,
    IP_MAX_ATTEMPTS,
    IP_LIMIT_WINDOW_MS,
  );

  if (ipLimit.limited) {
    return rateLimitError(ipLimit.retryAfterSeconds);
  }

  let body: ProjectInquiry;

  try {
    body = (await request.json()) as ProjectInquiry;
  } catch {
    return jsonError("Invalid project inquiry payload.");
  }

  const fullName = body.fullName?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!fullName) {
    return jsonError("Please enter your name.");
  }

  if (!email || !isValidEmail(email)) {
    return jsonError("Use a valid email address, like hello@company.com.");
  }

  const emailLimit = checkRateLimit(
    `email:${email.toLowerCase()}`,
    EMAIL_MAX_ATTEMPTS,
    EMAIL_LIMIT_WINDOW_MS,
  );

  if (emailLimit.limited) {
    return rateLimitError(emailLimit.retryAfterSeconds);
  }

  if (!EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    return jsonError("Email is not configured yet.", 500);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  let response: Response;

  try {
    response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      body: JSON.stringify({
        accessToken: EMAILJS_PRIVATE_KEY,
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          budget: body.budget || "Not provided",
          challenge: body.challenge || "Not provided",
          company: body.company || "Not provided",
          email,
          full_name: fullName,
          audience: body.audience || "Not provided",
          must_have: body.mustHave || "Not provided",
          message: body.message || "Not provided",
          primary_goal: body.primaryGoal || "Not provided",
          project_type: body.projectType || "Not sure yet",
          timeline: body.timeline || "Not provided",
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      signal: controller.signal,
    });
  } catch {
    return jsonError("EmailJS could not send the project details.", 502);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    return jsonError("EmailJS could not send the project details.", 502);
  }

  return Response.json({ ok: true });
}
