"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import type {
  PortalDocument,
  PortalNote,
  PortalProject,
} from "@/lib/client-portal-data";

type PortalView = "dashboard" | "messaging" | "notes" | "documents" | "links";

type ClientPortalDashboardProps = {
  initialProject: PortalProject;
};

type PortalApiResponse = {
  documents?: PortalDocument[];
  error?: string;
  note?: PortalNote;
  project?: PortalProject;
};

type EmailDraft = {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
  createdBy: string;
};

const portalNavItems: { id: PortalView; label: string; helper: string }[] = [
  { id: "dashboard", label: "Overview", helper: "Project health" },
  { id: "messaging", label: "Email", helper: "Send updates" },
  { id: "notes", label: "Notes", helper: "Decisions" },
  { id: "documents", label: "Documents", helper: "Shared files" },
  { id: "links", label: "Links", helper: "Resources" },
];

const clientProjectDetails = [
  ["Project type", "Website redesign"],
  ["Target launch", "Jul 12, 2026"],
  ["Current sprint", "Design approval"],
  ["Primary goal", "Increase qualified inquiries"],
];

const clientContacts = [
  {
    name: "Web X Project Lead",
    detail: "Build coordination and weekly updates",
    email: "buildonwebx@gmail.com",
  },
  {
    name: "Client Decision Maker",
    detail: "Approvals, final copy, and launch timing",
    email: "Northline Studio",
  },
];

const launchReadiness = [
  { label: "Content", status: "Waiting on final testimonials" },
  { label: "Design", status: "Homepage direction in review" },
  { label: "Development", status: "Starts after design approval" },
  { label: "Domain", status: "DNS access needed before launch" },
];

const activeDeliverables = [
  "Homepage visual direction",
  "Services page content structure",
  "Mobile responsive layout plan",
  "Launch checklist and hosting setup",
];

function Icon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <Icon className={className}>
      <path
        d="M7 17L17 7M9 7h8v8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Icon>
  );
}

function UploadIcon() {
  return (
    <Icon className="size-4">
      <path
        d="M12 16V4m0 0 4 4m-4-4-4 4M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </Icon>
  );
}

function MailIcon() {
  return (
    <Icon className="size-4">
      <path
        d="M4 6h16v12H4V6Zm0 1 8 6 8-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </Icon>
  );
}

function CheckIcon() {
  return (
    <Icon className="size-4">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Icon>
  );
}

function PortalLogo() {
  return (
    <div className="flex items-center gap-3">
      <img
        alt="Web X"
        className="h-9 w-auto object-contain [filter:brightness(0)_saturate(100%)_invert(7%)_sepia(57%)_saturate(1731%)_hue-rotate(231deg)_brightness(78%)_contrast(112%)]"
        src="/webx%20logo/webx.svg"
      />
      <div className="border-l border-[#07062C]/16 pl-3">
        <p className="text-xs font-semibold text-[#07062C]/58">
          Client Portal
        </p>
      </div>
    </div>
  );
}

function PortalLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-[#5F58A8]">
      {children}
    </p>
  );
}

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-[#07062C]/10 bg-white p-5 shadow-[0_18px_50px_rgb(7_6_44/0.06)] ${className}`}
    >
      {children}
    </section>
  );
}

export default function ClientPortalDashboard({
  initialProject,
}: ClientPortalDashboardProps) {
  const [project, setProject] = useState(initialProject);
  const [clientId, setClientId] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const [portalNotice, setPortalNotice] = useState("");
  const [emailSubject, setEmailSubject] = useState("Project update question");
  const [emailBody, setEmailBody] = useState("");
  const [emailDrafts, setEmailDrafts] = useState<EmailDraft[]>([]);
  const [emailModalError, setEmailModalError] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [notes, setNotes] = useState<PortalNote[]>(project.notes);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteTitleDraft, setNoteTitleDraft] = useState("");
  const [noteBodyDraft, setNoteBodyDraft] = useState("");
  const [noteModalError, setNoteModalError] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [documents, setDocuments] = useState<PortalDocument[]>(project.documents);
  const [isUploadingDocument, setIsUploadingDocument] = useState(false);
  const [activeView, setActiveView] = useState<PortalView>("dashboard");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentStepIndex = Math.max(
    project.processSteps.findIndex(
      (step) => step.name === project.phase,
    ),
    0,
  );

  const completedSteps = useMemo(
    () => project.processSteps.slice(0, currentStepIndex),
    [currentStepIndex, project.processSteps],
  );

  function syncProject(nextProject: PortalProject) {
    setProject(nextProject);
    setNotes(nextProject.notes);
    setDocuments(nextProject.documents);
  }

  function getLocalProjectKey(projectClientId: string) {
    return `webx-client-portal:${projectClientId}`;
  }

  function loadLocalProject(nextProject: PortalProject) {
    if (typeof window === "undefined") {
      return nextProject;
    }

    const saved = window.localStorage.getItem(
      getLocalProjectKey(nextProject.clientId),
    );

    if (!saved) {
      return nextProject;
    }

    try {
      return JSON.parse(saved) as PortalProject;
    } catch {
      return nextProject;
    }
  }

  function saveLocalProject(nextProject: PortalProject) {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      getLocalProjectKey(nextProject.clientId),
      JSON.stringify(nextProject),
    );
  }

  async function readPortalResponse(response: Response) {
    const payload = (await response.json().catch(() => ({}))) as PortalApiResponse;

    if (!response.ok) {
      throw new Error(payload.error || "Portal request failed.");
    }

    return payload;
  }

  function formatNoteDate(value?: string) {
    if (!value) {
      return "No timestamp";
    }

    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedClientId = clientId.trim().toUpperCase();

    if (!normalizedClientId) {
      setLoginError("Enter your client ID.");
      return;
    }

    setIsLoadingPortal(true);
    setLoginError("");
    setPortalNotice("");

    try {
      const response = await fetch(
        `/api/client-portal?clientId=${encodeURIComponent(normalizedClientId)}`,
      );
      const payload = await readPortalResponse(response);

      if (!payload.project) {
        throw new Error("Portal data was not returned.");
      }

      const nextProject =
        payload.project.source === "fallback"
          ? loadLocalProject(payload.project)
          : payload.project;

      syncProject(nextProject);
      setClientId(nextProject.clientId);
      setIsLoggedIn(true);

      if (nextProject.source !== "supabase") {
        setPortalNotice(
          "Preview data is loaded. Changes are saved in this browser until Supabase is connected.",
        );
      }
    } catch (error) {
      setLoginError(
        error instanceof Error
          ? error.message
          : "We could not open that portal.",
      );
    } finally {
      setIsLoadingPortal(false);
    }
  }

  function handleEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subjectText = emailSubject.trim();
    const bodyText = emailBody.trim();

    if (!subjectText || !bodyText) {
      setEmailModalError("Add an email subject and message before sending.");
      return;
    }

    const nextEmailDraft: EmailDraft = {
      body: bodyText,
      createdAt: new Date().toISOString(),
      createdBy: "Client",
      id: `email-${Date.now()}`,
      subject: subjectText,
    };
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(bodyText);

    window.location.href = `mailto:buildonwebx@gmail.com?subject=${subject}&body=${body}`;
    setEmailDrafts((current) => [nextEmailDraft, ...current]);
    setEmailModalError("");
    setEmailStatus("Email draft opened in your mail app.");
    setIsEmailModalOpen(false);
  }

  async function handleAddNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = noteTitleDraft.trim();
    const body = noteBodyDraft.trim();

    if (!title || !body) {
      setNoteModalError("Add a note header and details before saving.");
      return;
    }

    setIsSavingNote(true);
    setNoteModalError("");
    setPortalNotice("");

    if (project.source !== "supabase") {
      const nextNote: PortalNote = {
        body,
        createdAt: new Date().toISOString(),
        createdBy: "Client",
        id: `local-note-${Date.now()}`,
        title,
      };
      const nextProject = {
        ...project,
        notes: [nextNote, ...notes],
      };

      syncProject(nextProject);
      saveLocalProject(nextProject);
      setNoteTitleDraft("");
      setNoteBodyDraft("");
      setNoteModalError("");
      setIsNoteModalOpen(false);
      setPortalNotice("Note saved in this browser.");
      setIsSavingNote(false);
      return;
    }

    try {
      const response = await fetch("/api/client-portal", {
        body: JSON.stringify({
          action: "note",
          body,
          clientId: project.clientId,
          title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const payload = await readPortalResponse(response);

      if (payload.project) {
        syncProject(payload.project);
      } else if (payload.note) {
        setNotes((current) => [payload.note as PortalNote, ...current]);
      }

      setNoteTitleDraft("");
      setNoteBodyDraft("");
      setNoteModalError("");
      setIsNoteModalOpen(false);
      setPortalNotice("Note saved.");
    } catch (error) {
      setNoteModalError(
        error instanceof Error ? error.message : "Note could not be saved.",
      );
    } finally {
      setIsSavingNote(false);
    }
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    setIsUploadingDocument(true);
    setPortalNotice("");

    if (project.source !== "supabase") {
      const nextDocuments: PortalDocument[] = files.map((file) => ({
        detail: "Uploaded just now",
        id: `local-document-${Date.now()}-${file.name}`,
        name: file.name,
        owner: "Client",
        size: file.size,
        status: "Saved locally",
        type: file.type,
      }));
      const nextProject = {
        ...project,
        documents: [...nextDocuments, ...documents],
      };

      syncProject(nextProject);
      saveLocalProject(nextProject);
      setPortalNotice(
        files.length === 1
          ? "Document saved in this browser."
          : "Documents saved in this browser.",
      );
      setIsUploadingDocument(false);
      event.target.value = "";
      return;
    }

    try {
      const response = await fetch("/api/client-portal", {
        body: JSON.stringify({
          action: "document",
          clientId: project.clientId,
          files: files.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
          })),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const payload = await readPortalResponse(response);

      if (payload.project) {
        syncProject(payload.project);
      } else if (payload.documents?.length) {
        setDocuments((current) => [
          ...(payload.documents as PortalDocument[]),
          ...current,
        ]);
      }

      setPortalNotice(
        files.length === 1 ? "Document saved." : "Documents saved.",
      );
    } catch (error) {
      setPortalNotice(
        error instanceof Error
          ? error.message
          : "Document records could not be saved.",
      );
    } finally {
      setIsUploadingDocument(false);
      event.target.value = "";
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#F6F5F0] text-[#07062C]">
        <div className="grid min-h-screen lg:grid-cols-[1fr_0.9fr]">
          <section className="relative hidden overflow-hidden border-r border-[#07062C]/10 bg-[#EFEDE4] px-10 py-8 lg:block">
            <div className="relative flex h-full flex-col">
              <PortalLogo />
              <div className="my-auto max-w-[940px] rounded-xl border border-[#07062C]/10 bg-white/72 px-8 py-10 shadow-[0_18px_50px_rgb(7_6_44/0.05)]">
                <div className="max-w-2xl">
                  <PortalLabel>Private Workspace</PortalLabel>
                  <h1 className="mt-5 max-w-xl text-6xl font-semibold leading-[0.95] tracking-tighter">
                    A calmer command center for the whole build.
                  </h1>
                  <p className="mt-5 max-w-lg text-lg leading-8 text-[#07062C]/64">
                    Track the project phase, review next actions, send feedback,
                    and keep every shared file in one client-ready workspace.
                  </p>
                </div>
                <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
                  {["Project health", "Shared files", "Launch actions"].map(
                    (item) => (
                      <div
                        className="rounded-lg border border-[#07062C]/10 bg-white p-4 text-sm font-semibold"
                        key={item}
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="flex min-h-screen items-center justify-center px-6 py-10 lg:px-12">
            <div className="w-full max-w-md">
              <div className="mb-12 lg:hidden">
                <PortalLogo />
              </div>
              <PortalLabel>Client Login</PortalLabel>
              <h2 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-tighter">
                Enter your client ID.
              </h2>
              <p className="mt-5 leading-7 text-[#07062C]/62">
                This preview uses a mock client ID while portal data is loaded
                from Supabase when environment keys are configured.
              </p>

              <form className="mt-10 space-y-5" onSubmit={handleLogin}>
                <label className="block">
                  <span className="text-sm font-semibold text-[#07062C]/70">
                    Client ID
                  </span>
                  <input
                    className="mt-2 h-14 w-full rounded-lg border border-[#07062C]/12 bg-white px-4 text-[#07062C] outline-none transition placeholder:text-[#07062C]/34 focus:border-[#5F58A8] disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isLoadingPortal}
                    onChange={(event) => setClientId(event.target.value)}
                    placeholder="WEBX-DEMO"
                    type="text"
                    value={clientId}
                  />
                </label>
                {loginError ? (
                  <p className="rounded-lg border border-[#B42318]/20 bg-[#FFF1F0] px-4 py-3 text-sm text-[#B42318]">
                    {loginError}
                  </p>
                ) : (
                  <p className="text-sm text-[#07062C]/46">
                    Preview client ID: WEBX-DEMO
                  </p>
                )}
                <button
                  className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#07062C] px-6 text-sm font-semibold text-white transition hover:bg-[#17135E] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isLoadingPortal}
                  type="submit"
                >
                  {isLoadingPortal ? "Opening..." : "Open Dashboard"}
                  <span className="grid size-8 place-items-center rounded-full bg-white text-[#07062C]">
                    <ArrowIcon />
                  </span>
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F5F0] text-[#07062C]">
      <div className="grid min-h-screen lg:grid-cols-[292px_1fr]">
        <aside className="sticky top-0 z-20 max-h-screen border-b border-[#07062C]/10 bg-[#EFEDE4] p-3 lg:h-screen lg:border-b-0 lg:border-r lg:p-4">
          <div className="flex min-h-0 flex-col gap-3 lg:h-full">
            <div className="shrink-0">
              <PortalLogo />
            </div>

            <div className="hidden shrink-0 rounded-lg border border-[#07062C]/10 bg-white p-4 shadow-[0_16px_42px_rgb(7_6_44/0.06)] lg:block">
              <PortalLabel>Project</PortalLabel>
              <h1 className="mt-3 text-xl font-semibold leading-[1.08] tracking-tighter">
                {project.projectName}
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#07062C]/58">
                Workspace for project status, messages, documents, and launch
                resources.
              </p>
            </div>

            <nav
              className="-mx-1 flex min-w-0 gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:px-0 lg:pb-0"
              aria-label="Client portal pages"
              data-lenis-prevent
            >
              {portalNavItems.map((item) => {
                const isActive = item.id === activeView;

                return (
                  <button
                    className={`min-w-[132px] rounded-lg border px-4 py-3 text-left transition lg:min-w-0 ${
                      isActive
                        ? "border-[#07062C] bg-[#07062C] text-white shadow-[0_12px_30px_rgb(7_6_44/0.16)]"
                        : "border-transparent bg-transparent text-[#07062C]/66 hover:border-[#07062C]/12 hover:bg-white hover:text-[#07062C]"
                    }`}
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    type="button"
                  >
                    <span className="block text-sm font-semibold tracking-tight">
                      {item.label}
                    </span>
                    <span
                      className={`mt-1 block text-xs ${
                        isActive ? "text-white/62" : "text-[#07062C]/42"
                      }`}
                    >
                      {item.helper}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden shrink-0 lg:block">
              <div className="rounded-lg border border-[#07062C]/10 bg-white p-4">
                <p className="text-xs font-semibold text-[#07062C]/44">
                  Signed in as
                </p>
                <p className="mt-2 text-sm font-semibold">
                  {project.signedInLabel}
                </p>
              </div>
              <button
                className="mt-3 h-11 w-full rounded-lg border border-[#07062C]/14 bg-white px-5 text-sm font-semibold text-[#07062C]/72 transition hover:border-[#07062C]/34 hover:text-[#07062C]"
                onClick={() => setIsLoggedIn(false)}
                type="button"
              >
                Log out
              </button>
            </div>
          </div>
        </aside>

        <section className="min-w-0 px-4 py-4 lg:px-7 lg:py-5">
          <div className="rounded-lg border border-[#07062C]/10 bg-white p-5 shadow-[0_18px_50px_rgb(7_6_44/0.06)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <PortalLabel>Project Process</PortalLabel>
                <div className="mt-4 flex flex-wrap items-end gap-4">
                  <p className="text-6xl font-semibold leading-none tracking-tighter">
                    {project.progress}%
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-[#07062C]/52">
                      Current phase
                    </p>
                    <p className="text-2xl font-semibold tracking-tight">
                      {project.phase}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-xl">
                <div className="h-2 rounded-full bg-[#07062C]/10">
                  <div
                    className="h-full rounded-full bg-[#5F58A8]"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-[#07062C]/56">
                  {project.statusSummary}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {project.processSteps.map((step, index) => {
                const isComplete = completedSteps.includes(step);
                const isCurrent = index === currentStepIndex;

                return (
                  <div
                    className={`min-h-24 rounded-lg border p-3 ${
                      isCurrent
                        ? "border-[#5F58A8] bg-[#F0EEFF] text-[#07062C]"
                        : isComplete
                          ? "border-[#3B8067]/28 bg-[#EEF8F3]"
                          : "border-[#07062C]/10 bg-[#F8F7F2]"
                    }`}
                    key={step.name}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-[#07062C]/46">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      {isComplete ? (
                        <span className="grid size-6 place-items-center rounded-full bg-[#3B8067] text-white">
                          <CheckIcon />
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm font-semibold tracking-tight">
                      {step.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#07062C]/52">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {portalNotice ? (
            <div className="mt-5 rounded-lg border border-[#5F58A8]/18 bg-[#F0EEFF] px-4 py-3 text-sm font-semibold text-[#4F4898]">
              {portalNotice}
            </div>
          ) : null}

          {activeView === "dashboard" ? (
            <>
              <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                <SectionCard>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <PortalLabel>Dashboard</PortalLabel>
                      <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                        Latest project snapshot
                      </h2>
                    </div>
                    <span className="rounded-md border border-[#5F58A8]/18 bg-[#F0EEFF] px-3 py-1 text-xs font-semibold text-[#5F58A8]">
                      {project.source === "supabase"
                        ? "Synced with Supabase"
                        : "Fallback preview data"}
                    </span>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Email drafts", String(emailDrafts.length)],
                      ["Shared files", String(documents.length)],
                      ["Open notes", String(notes.length)],
                    ].map(([label, value]) => (
                      <div
                        className="rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-5"
                        key={label}
                      >
                        <p className="text-sm font-semibold text-[#07062C]/52">
                          {label}
                        </p>
                        <p className="mt-3 text-4xl font-semibold tracking-tighter">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-5">
                    <p className="text-sm font-semibold tracking-tight">
                      Preferred contact
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#07062C]/60">
                      Send approvals, longer feedback, and project questions by
                      email so there is a clear paper trail.
                    </p>
                    <button
                      className="mt-4 inline-flex h-11 items-center gap-3 rounded-lg bg-[#07062C] px-5 text-sm font-semibold text-white"
                      onClick={() => setActiveView("messaging")}
                      type="button"
                    >
                      Send Email
                      <ArrowIcon />
                    </button>
                  </div>
                </SectionCard>

                <SectionCard>
                  <PortalLabel>Next Actions</PortalLabel>
                  <div className="mt-5 space-y-3">
                    {project.nextActions.map((action, index) => (
                      <div
                        className="flex items-center gap-4 rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-4"
                        key={action}
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#07062C] text-xs font-semibold text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm font-semibold tracking-tight">
                          {action}
                        </p>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                <SectionCard>
                  <PortalLabel>Project Brief</PortalLabel>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {clientProjectDetails.map(([label, value]) => (
                      <div
                        className="rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-4"
                        key={label}
                      >
                        <p className="text-xs font-semibold text-[#07062C]/44">
                          {label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-[#07062C]">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard>
                  <PortalLabel>Launch Readiness</PortalLabel>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {launchReadiness.map((item) => (
                      <div
                        className="rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-4"
                        key={item.label}
                      >
                        <div className="flex items-center gap-3">
                          <span className="grid size-7 place-items-center rounded-full bg-[#07062C] text-white">
                            <CheckIcon />
                          </span>
                          <p className="text-sm font-semibold">{item.label}</p>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-[#07062C]/58">
                          {item.status}
                        </p>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-3">
                <SectionCard>
                  <PortalLabel>Key Contacts</PortalLabel>
                  <div className="mt-5 space-y-3">
                    {clientContacts.map((contact) => (
                      <div
                        className="rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-4"
                        key={contact.name}
                      >
                        <p className="text-sm font-semibold">{contact.name}</p>
                        <p className="mt-2 text-sm leading-6 text-[#07062C]/58">
                          {contact.detail}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-[#5F58A8]">
                          {contact.email}
                        </p>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard>
                  <PortalLabel>Active Deliverables</PortalLabel>
                  <div className="mt-5 space-y-3">
                    {activeDeliverables.map((deliverable) => (
                      <div
                        className="flex items-center gap-3 rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-4"
                        key={deliverable}
                      >
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#EEF8F3] text-[#3B8067]">
                          <CheckIcon />
                        </span>
                        <p className="text-sm font-semibold">{deliverable}</p>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard>
                  <PortalLabel>Client Checklist</PortalLabel>
                  <div className="mt-5 space-y-3">
                    {[
                      "Approve homepage direction",
                      "Send final testimonials",
                      "Confirm launch date",
                      "Share domain/DNS access",
                    ].map((item) => (
                      <div
                        className="rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-4"
                        key={item}
                      >
                        <p className="text-sm font-semibold">{item}</p>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            </>
          ) : null}

          {activeView === "messaging" ? (
            <div className="mt-5 max-w-3xl">
              <SectionCard>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <PortalLabel>Email</PortalLabel>
                    <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                      Send an email update
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[#07062C]/54">
                      Compose approvals, feedback, or project questions in a
                      focused popup. Your mail app handles the actual send.
                    </p>
                  </div>
                  <button
                    className="inline-flex h-12 items-center gap-3 rounded-lg bg-[#07062C] px-5 text-sm font-semibold text-white transition hover:bg-[#17135E]"
                    onClick={() => {
                      setEmailModalError("");
                      setEmailStatus("");
                      setIsEmailModalOpen(true);
                    }}
                    type="button"
                  >
                    <MailIcon />
                    Compose Email
                  </button>
                </div>
                {emailStatus ? (
                  <p className="mt-3 text-sm text-[#07062C]/54">
                    {emailStatus}
                  </p>
                ) : null}
                <div className="mt-6 grid gap-3">
                  {emailDrafts.length ? (
                    emailDrafts.map((draft) => (
                      <article
                        className="rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-5"
                        key={draft.id}
                      >
                        <p className="font-semibold tracking-tight">
                          {draft.subject}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#07062C]/42">
                          {draft.createdBy} - {formatNoteDate(draft.createdAt)}
                        </p>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#07062C]/58">
                          {draft.body}
                        </p>
                      </article>
                    ))
                  ) : (
                    <div className="rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-5">
                      <p className="text-sm font-semibold text-[#07062C]/60">
                        No email drafts opened yet.
                      </p>
                    </div>
                  )}
                </div>
              </SectionCard>
            </div>
          ) : null}

          {activeView === "notes" ? (
            <SectionCard className="mt-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <PortalLabel>Notes</PortalLabel>
                  <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                    Decisions and reminders
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#07062C]/54">
                    Add clear project notes with a header, author, and timestamp
                    so decisions are easy to scan later.
                  </p>
                </div>
                <button
                  className="h-12 rounded-lg bg-[#07062C] px-6 text-sm font-semibold text-white transition hover:bg-[#17135E]"
                  onClick={() => {
                    setPortalNotice("");
                    setNoteModalError("");
                    setIsNoteModalOpen(true);
                  }}
                  type="button"
                >
                  Add Note
                </button>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {notes.map((note) => (
                  <article
                    className="min-h-40 rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-5"
                    key={note.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold tracking-tight">
                          {note.title}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#07062C]/42">
                          {note.createdBy ?? "Client"} -{" "}
                          {formatNoteDate(note.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#07062C]/58">
                      {note.body}
                    </p>
                  </article>
                ))}
              </div>
            </SectionCard>
          ) : null}

          {activeView === "documents" ? (
            <SectionCard className="mt-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <PortalLabel>Documents</PortalLabel>
                  <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                    Shared files
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#07062C]/54">
                    Upload content, references, brand files, and approvals. Web
                    X files appear in the same list.
                  </p>
                </div>
                <button
                  className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#07062C] px-5 text-sm font-semibold text-white transition hover:bg-[#17135E] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isUploadingDocument}
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  <UploadIcon />
                  {isUploadingDocument ? "Saving..." : "Upload File"}
                </button>
                <input
                  className="hidden"
                  multiple
                  onChange={handleUpload}
                  ref={fileInputRef}
                  type="file"
                />
              </div>
              <div className="mt-6 grid gap-3">
                {documents.map((document) => (
                  <div
                    className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-5"
                    key={document.id}
                  >
                    <div>
                      <p className="font-semibold tracking-tight">
                        {document.name}
                      </p>
                      <p className="mt-1 text-sm text-[#07062C]/46">
                        {document.owner} - {document.detail}
                      </p>
                    </div>
                    <span className="rounded-md border border-[#07062C]/10 bg-white px-3 py-1 text-xs font-semibold text-[#07062C]/58">
                      {document.status}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>
          ) : null}

          {activeView === "links" ? (
            <SectionCard className="mt-5">
              <PortalLabel>Links</PortalLabel>
              <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                Important resources
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {project.links.map((link) => (
                  <a
                    className="group rounded-lg border border-[#07062C]/10 bg-[#F8F7F2] p-5 transition hover:border-[#5F58A8]/42 hover:bg-[#F0EEFF]"
                    href={link.href}
                    key={link.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold tracking-tight">
                        {link.label}
                      </p>
                      <span className="grid size-9 place-items-center rounded-full bg-[#07062C] text-white transition group-hover:scale-105">
                        <ArrowIcon />
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#07062C]/50">
                      {link.detail}
                    </p>
                  </a>
                ))}
              </div>
            </SectionCard>
          ) : null}
        </section>
      </div>

      {isEmailModalOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-[#07062C]/42 px-4 py-6"
          role="dialog"
        >
          <div className="w-full max-w-xl rounded-lg border border-[#07062C]/10 bg-white p-5 shadow-[0_24px_80px_rgb(7_6_44/0.22)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <PortalLabel>New Email</PortalLabel>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Compose an email update
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#07062C]/58">
                  Add a clear subject and message. Your mail app will open the
                  final draft for sending.
                </p>
              </div>
              <button
                aria-label="Close email dialog"
                className="grid size-9 place-items-center rounded-lg border border-[#07062C]/12 text-sm font-semibold text-[#07062C]/58 transition hover:border-[#07062C]/28 hover:text-[#07062C]"
                onClick={() => {
                  setEmailModalError("");
                  setIsEmailModalOpen(false);
                }}
                type="button"
              >
                X
              </button>
            </div>

            <form className="mt-5 space-y-3" onSubmit={handleEmail}>
              <label className="block">
                <span className="text-sm font-semibold text-[#07062C]/70">
                  Email subject
                </span>
                <input
                  className="mt-2 h-12 w-full rounded-lg border border-[#07062C]/12 bg-white px-4 text-sm outline-none placeholder:text-[#07062C]/34 focus:border-[#5F58A8]"
                  maxLength={140}
                  onChange={(event) => setEmailSubject(event.target.value)}
                  placeholder="Example: Design approval feedback"
                  value={emailSubject}
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-[#07062C]/70">
                  Email message
                </span>
                <textarea
                  className="mt-2 min-h-44 w-full resize-none rounded-lg border border-[#07062C]/12 bg-white p-4 text-sm leading-6 outline-none placeholder:text-[#07062C]/34 focus:border-[#5F58A8]"
                  maxLength={1800}
                  onChange={(event) => setEmailBody(event.target.value)}
                  placeholder="Write your update..."
                  value={emailBody}
                />
              </label>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                {emailModalError ? (
                  <p className="mr-auto text-sm font-semibold text-[#B42318]">
                    {emailModalError}
                  </p>
                ) : null}
                <button
                  className="h-11 rounded-lg border border-[#07062C]/14 bg-white px-5 text-sm font-semibold text-[#07062C]/72 transition hover:border-[#07062C]/34 hover:text-[#07062C]"
                  onClick={() => {
                    setEmailModalError("");
                    setIsEmailModalOpen(false);
                  }}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#07062C] px-5 text-sm font-semibold text-white transition hover:bg-[#17135E]"
                  type="submit"
                >
                  <MailIcon />
                  Open Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isNoteModalOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-[#07062C]/42 px-4 py-6"
          role="dialog"
        >
          <div className="w-full max-w-xl rounded-lg border border-[#07062C]/10 bg-white p-5 shadow-[0_24px_80px_rgb(7_6_44/0.22)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <PortalLabel>New Note</PortalLabel>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Add a project note
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#07062C]/58">
                  Give the note a clear header, then add the detail the team
                  should remember.
                </p>
              </div>
              <button
                aria-label="Close note dialog"
                className="grid size-9 place-items-center rounded-lg border border-[#07062C]/12 text-sm font-semibold text-[#07062C]/58 transition hover:border-[#07062C]/28 hover:text-[#07062C]"
                onClick={() => {
                  setNoteModalError("");
                  setIsNoteModalOpen(false);
                }}
                type="button"
              >
                X
              </button>
            </div>

            <form className="mt-5 space-y-3" onSubmit={handleAddNote}>
              <label className="block">
                <span className="text-sm font-semibold text-[#07062C]/70">
                  Note header
                </span>
                <input
                  className="mt-2 h-12 w-full rounded-lg border border-[#07062C]/12 bg-white px-4 text-sm outline-none placeholder:text-[#07062C]/34 focus:border-[#5F58A8]"
                  maxLength={120}
                  onChange={(event) => setNoteTitleDraft(event.target.value)}
                  placeholder="Example: Final content approval"
                  value={noteTitleDraft}
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-[#07062C]/70">
                  Note details
                </span>
                <textarea
                  className="mt-2 min-h-40 w-full resize-none rounded-lg border border-[#07062C]/12 bg-white p-4 text-sm leading-6 outline-none placeholder:text-[#07062C]/34 focus:border-[#5F58A8]"
                  maxLength={1000}
                  onChange={(event) => setNoteBodyDraft(event.target.value)}
                  placeholder="Write the decision, reminder, or project context..."
                  value={noteBodyDraft}
                />
              </label>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                {noteModalError ? (
                  <p className="mr-auto text-sm font-semibold text-[#B42318]">
                    {noteModalError}
                  </p>
                ) : null}
                <button
                  className="h-11 rounded-lg border border-[#07062C]/14 bg-white px-5 text-sm font-semibold text-[#07062C]/72 transition hover:border-[#07062C]/34 hover:text-[#07062C]"
                  onClick={() => {
                    setNoteModalError("");
                    setIsNoteModalOpen(false);
                  }}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="h-11 rounded-lg bg-[#07062C] px-5 text-sm font-semibold text-white transition hover:bg-[#17135E] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSavingNote}
                  type="submit"
                >
                  {isSavingNote ? "Saving..." : "Save Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
