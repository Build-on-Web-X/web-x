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

const EMAILJS_SERVICE_ID =
  process.env.EMAILJS_SERVICE_ID ??
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ??
  "service_crjpq5p";
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY =
  process.env.EMAILJS_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
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

  if (!EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    return jsonError("Email is not configured yet.", 500);
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
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
  });

  if (!response.ok) {
    return jsonError("EmailJS could not send the project details.", 502);
  }

  return Response.json({ ok: true });
}
