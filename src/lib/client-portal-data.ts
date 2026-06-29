export type PortalDocument = {
  id: string;
  name: string;
  owner: "Web X" | "Client";
  detail: string;
  status: string;
  size?: number;
  storagePath?: string;
  type?: string;
};

export type PortalMessage = {
  id: string;
  author: "Web X" | "Client";
  message: string;
  time: string;
};

export type PortalNote = {
  id: string;
  title: string;
  body: string;
  createdAt?: string;
  createdBy?: string;
};

export type PortalLink = {
  label: string;
  href: string;
  detail: string;
};

export type PortalProcessStep = {
  name: string;
  description: string;
};

export type PortalProject = {
  clientId: string;
  projectName: string;
  clientName: string;
  signedInLabel: string;
  phase: string;
  progress: number;
  statusSummary: string;
  source: "supabase" | "fallback";
  processSteps: PortalProcessStep[];
  documents: PortalDocument[];
  messages: PortalMessage[];
  notes: PortalNote[];
  links: PortalLink[];
  nextActions: string[];
};

type PortalProjectRow = {
  client_id: string;
  project_name: string;
  client_name: string;
  signed_in_label: string | null;
  phase: string;
  progress: number;
  status_summary: string;
  process_steps: PortalProcessStep[] | null;
  documents: PortalDocument[] | null;
  messages: PortalMessage[] | null;
  notes: PortalNote[] | null;
  links: PortalLink[] | null;
  next_actions: string[] | null;
};

export const fallbackProject: PortalProject = {
  clientId: "WEBX-DEMO",
  projectName: "Northline Studio Website",
  clientName: "Northline Studio",
  signedInLabel: "WEBX-DEMO",
  phase: "Design",
  progress: 58,
  statusSummary:
    "Design is active. The next handoff moves approved screens into responsive development.",
  source: "fallback",
  processSteps: [
    {
      name: "Discover",
      description: "Goals, audience, and project vision clarified.",
    },
    {
      name: "Plan",
      description: "Website structure, sitemap, and roadmap aligned.",
    },
    {
      name: "Design",
      description: "Core screens and visual direction in progress.",
    },
    {
      name: "Develop",
      description: "Approved designs move into responsive build.",
    },
    {
      name: "Launch",
      description: "Testing, hosting, domain, and deployment.",
    },
    {
      name: "Support",
      description: "Updates, monitoring, and technical care.",
    },
  ],
  documents: [
    {
      id: "brand-summary",
      name: "Brand discovery summary.pdf",
      owner: "Web X",
      detail: "Added Jun 18",
      status: "Shared",
    },
    {
      id: "homepage-copy",
      name: "Homepage content draft.docx",
      owner: "Client",
      detail: "Uploaded Jun 17",
      status: "Needs review",
    },
    {
      id: "visual-direction",
      name: "Visual direction board.fig",
      owner: "Web X",
      detail: "Added Jun 16",
      status: "Current",
    },
  ],
  messages: [
    {
      id: "design-pass",
      author: "Web X",
      message:
        "The first design pass is moving well. We are refining the hero and services flow today.",
      time: "9:12 AM",
    },
    {
      id: "content-uploaded",
      author: "Client",
      message:
        "Great. We uploaded the updated service descriptions in the documents area.",
      time: "9:28 AM",
    },
  ],
  notes: [
    {
      createdAt: "2026-06-18T09:00:00.000Z",
      createdBy: "Web X",
      id: "positioning",
      title: "Positioning",
      body: "Lead with credibility, clarity, and a fast path to consultation.",
    },
    {
      createdAt: "2026-06-18T10:30:00.000Z",
      createdBy: "Web X",
      id: "content-needed",
      title: "Content needed",
      body: "Final testimonials and preferred launch date.",
    },
  ],
  links: [
    {
      label: "Staging Website",
      href: "https://preview.webx.example",
      detail: "Current private preview",
    },
    {
      label: "Figma Workspace",
      href: "https://figma.com",
      detail: "Design review file",
    },
    {
      label: "Calendly Discovery Call",
      href: "https://calendly.com/buildonwebx/30min",
      detail: "Schedule a working session",
    },
  ],
  nextActions: [
    "Review design direction notes",
    "Upload final service copy",
    "Confirm preferred launch window",
  ],
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseReadKey =
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_PUBLISHABLE_KEY;
const supabaseWriteKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SECRET_KEY ??
  supabaseReadKey;

type PortalField = "documents" | "messages" | "notes";

function getRestUrl() {
  if (process.env.SUPABASE_REST_URL) {
    return process.env.SUPABASE_REST_URL.replace(/\/$/, "");
  }

  if (!supabaseUrl) {
    return null;
  }

  return `${supabaseUrl.replace(/\/$/, "")}/rest/v1`;
}

function getSupabaseHeaders(write = false) {
  const key = write ? supabaseWriteKey : supabaseReadKey;

  if (!key) {
    return null;
  }

  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export function hasPortalSupabaseConfig(write = false) {
  return Boolean(getRestUrl() && getSupabaseHeaders(write));
}

function normalizeProject(row: PortalProjectRow): PortalProject {
  return {
    clientId: row.client_id,
    projectName: row.project_name,
    clientName: row.client_name,
    signedInLabel: row.signed_in_label ?? row.client_id,
    phase: row.phase,
    progress: row.progress,
    statusSummary: row.status_summary,
    source: "supabase",
    processSteps: row.process_steps?.length
      ? row.process_steps
      : fallbackProject.processSteps,
    documents: row.documents?.length ? row.documents : fallbackProject.documents,
    messages: row.messages?.length ? row.messages : fallbackProject.messages,
    notes: row.notes?.length ? row.notes : fallbackProject.notes,
    links: row.links?.length ? row.links : fallbackProject.links,
    nextActions: row.next_actions?.length
      ? row.next_actions
      : fallbackProject.nextActions,
  };
}

export async function findClientPortalProject(
  clientId: string,
  options: { allowFallback?: boolean; noStore?: boolean } = {},
): Promise<PortalProject | null> {
  const restUrl = getRestUrl();
  const headers = getSupabaseHeaders(false);
  const normalizedClientId = clientId.trim().toUpperCase();
  const allowFallback = options.allowFallback ?? true;

  if (!restUrl || !headers) {
    return allowFallback && normalizedClientId === fallbackProject.clientId
      ? fallbackProject
      : null;
  }

  try {
    const response = await fetch(
      `${restUrl}/client_portal_projects?select=*&client_id=eq.${encodeURIComponent(
        normalizedClientId,
      )}&is_active=eq.true&limit=1`,
      {
        cache: options.noStore ? "no-store" : undefined,
        headers,
        next: options.noStore ? undefined : { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return allowFallback && normalizedClientId === fallbackProject.clientId
        ? fallbackProject
        : null;
    }

    const rows = (await response.json()) as PortalProjectRow[];
    const row = rows[0];

    if (row) {
      return normalizeProject(row);
    }

    return allowFallback && normalizedClientId === fallbackProject.clientId
      ? fallbackProject
      : null;
  } catch {
    return allowFallback && normalizedClientId === fallbackProject.clientId
      ? fallbackProject
      : null;
  }
}

export async function getClientPortalProject(
  clientId: string,
): Promise<PortalProject> {
  return (
    (await findClientPortalProject(clientId, { allowFallback: true })) ??
    fallbackProject
  );
}

export async function updateClientPortalProjectField<T>(
  clientId: string,
  field: PortalField,
  value: T[],
): Promise<PortalProject | null> {
  const restUrl = getRestUrl();
  const headers = getSupabaseHeaders(true);
  const normalizedClientId = clientId.trim().toUpperCase();

  if (!restUrl || !headers) {
    return null;
  }

  const response = await fetch(
    `${restUrl}/client_portal_projects?client_id=eq.${encodeURIComponent(
      normalizedClientId,
    )}&is_active=eq.true&select=*`,
    {
      body: JSON.stringify({
        [field]: value,
        updated_at: new Date().toISOString(),
      }),
      cache: "no-store",
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
      method: "PATCH",
    },
  );

  if (!response.ok) {
    return null;
  }

  const rows = (await response.json()) as PortalProjectRow[];
  const row = rows[0];

  return row ? normalizeProject(row) : null;
}
