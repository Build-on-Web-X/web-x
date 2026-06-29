import {
  findClientPortalProject,
  updateClientPortalProjectField,
  type PortalDocument,
  type PortalMessage,
  type PortalNote,
} from "@/lib/client-portal-data";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 64 * 1024;

type PortalAction =
  | {
      action: "message";
      clientId?: string;
      message?: string;
    }
  | {
      action: "note";
      clientId?: string;
      body?: string;
      title?: string;
    }
  | {
      action: "document";
      clientId?: string;
      files?: { name?: string; size?: number; type?: string }[];
    };

function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

function normalizeClientId(value: string | null | undefined) {
  return value?.trim().toUpperCase() ?? "";
}

function formatPortalTime() {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

function formatPortalDateTime() {
  return new Date().toISOString();
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const clientId = normalizeClientId(url.searchParams.get("clientId"));

  if (!clientId) {
    return jsonError("Enter a client ID.");
  }

  const project = await findClientPortalProject(clientId, {
    allowFallback: true,
    noStore: true,
  });

  if (!project) {
    return jsonError("We could not find a portal for that client ID.", 404);
  }

  return Response.json({ project });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > MAX_BODY_BYTES) {
    return jsonError("Portal request is too large.", 413);
  }

  let body: PortalAction;

  try {
    body = (await request.json()) as PortalAction;
  } catch {
    return jsonError("Invalid portal request.");
  }

  const clientId = normalizeClientId(body.clientId);

  if (!clientId) {
    return jsonError("Client ID is required.");
  }

  const project = await findClientPortalProject(clientId, {
    allowFallback: true,
    noStore: true,
  });

  if (!project) {
    return jsonError("We could not find a portal for that client ID.", 404);
  }

  if (project.source !== "supabase") {
    return jsonError(
      "Portal data is in preview mode. Connect Supabase and run the schema to save changes.",
      503,
    );
  }

  if (body.action === "message") {
    const message = body.message?.trim();

    if (!message) {
      return jsonError("Write a message before sending.");
    }

    if (message.length > 1200) {
      return jsonError("Messages must be 1,200 characters or fewer.");
    }

    const nextMessage: PortalMessage = {
      author: "Client",
      id: makeId("message"),
      message,
      time: formatPortalTime(),
    };
    const updated = await updateClientPortalProjectField(clientId, "messages", [
      ...project.messages,
      nextMessage,
    ]);

    if (!updated) {
      return jsonError("Message could not be saved.", 502);
    }

    return Response.json({ message: nextMessage, project: updated });
  }

  if (body.action === "note") {
    const noteBody = body.body?.trim();
    const noteTitle = body.title?.trim() || "Client note";

    if (!noteBody) {
      return jsonError("Write a note before saving.");
    }

    if (noteTitle.length > 120) {
      return jsonError("Note headers must be 120 characters or fewer.");
    }

    if (noteBody.length > 1000) {
      return jsonError("Notes must be 1,000 characters or fewer.");
    }

    const nextNote: PortalNote = {
      body: noteBody,
      createdAt: formatPortalDateTime(),
      createdBy: "Client",
      id: makeId("note"),
      title: noteTitle,
    };
    const updated = await updateClientPortalProjectField(clientId, "notes", [
      nextNote,
      ...project.notes,
    ]);

    if (!updated) {
      return jsonError("Note could not be saved.", 502);
    }

    return Response.json({ note: nextNote, project: updated });
  }

  if (body.action === "document") {
    const files = body.files ?? [];

    if (!files.length) {
      return jsonError("Choose at least one file.");
    }

    if (files.length > 5) {
      return jsonError("Upload up to five files at a time.");
    }

    const nextDocuments: PortalDocument[] = files.map((file) => {
      const name = file.name?.trim() || "Untitled file";

      return {
        detail: "Uploaded just now",
        id: makeId("document"),
        name: name.slice(0, 160),
        owner: "Client",
        status: "Received",
      };
    });
    const updated = await updateClientPortalProjectField(clientId, "documents", [
      ...nextDocuments,
      ...project.documents,
    ]);

    if (!updated) {
      return jsonError("Document records could not be saved.", 502);
    }

    return Response.json({ documents: nextDocuments, project: updated });
  }

  return jsonError("Unsupported portal action.");
}
