"use client";

import { FormEvent, useMemo, useRef, useState } from "react";

type PortalDocument = {
  id: number;
  name: string;
  owner: "Web X" | "Client";
  detail: string;
};

type ChatMessage = {
  id: number;
  author: "Web X" | "Client";
  message: string;
  time: string;
};

type Note = {
  id: number;
  title: string;
  body: string;
};

type PortalView = "dashboard" | "messaging" | "notes" | "documents" | "links";

const validClientIds = ["WEBX-DEMO", "NORTHLINE-2026", "CLIENT-001"];

const portalNavItems: { id: PortalView; label: string; helper: string }[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    helper: "Project snapshot",
  },
  {
    id: "messaging",
    label: "Messaging",
    helper: "Chat and email",
  },
  {
    id: "notes",
    label: "Notes",
    helper: "Decisions and reminders",
  },
  {
    id: "documents",
    label: "Documents",
    helper: "Shared uploads",
  },
  {
    id: "links",
    label: "Links",
    helper: "Important resources",
  },
];

const processSteps = [
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
];

const starterDocuments: PortalDocument[] = [
  {
    id: 1,
    name: "Brand discovery summary.pdf",
    owner: "Web X",
    detail: "Added Jun 18",
  },
  {
    id: 2,
    name: "Homepage content draft.docx",
    owner: "Client",
    detail: "Uploaded Jun 17",
  },
  {
    id: 3,
    name: "Visual direction board.fig",
    owner: "Web X",
    detail: "Added Jun 16",
  },
];

const starterMessages: ChatMessage[] = [
  {
    id: 1,
    author: "Web X",
    message:
      "The first design pass is moving well. We are refining the hero and services flow today.",
    time: "9:12 AM",
  },
  {
    id: 2,
    author: "Client",
    message:
      "Great. We uploaded the updated service descriptions in the documents area.",
    time: "9:28 AM",
  },
];

const starterNotes: Note[] = [
  {
    id: 1,
    title: "Positioning",
    body: "Lead with credibility, clarity, and fast path to consultation.",
  },
  {
    id: 2,
    title: "Content needed",
    body: "Final testimonials and preferred launch date.",
  },
];

const projectLinks = [
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

function SendIcon() {
  return (
    <Icon className="size-4">
      <path
        d="m4 12 16-8-5 16-3-7-8-1Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
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

function PortalLogo() {
  return (
    <div className="flex items-center gap-3">
      <img
        alt="Web X"
        className="webx-portal-logo h-10 w-auto object-contain"
        src="/webx%20logo/webx.svg"
      />
      <div>
        <p className="text-xs text-[#F3F3F3]/52">Client Portal</p>
      </div>
    </div>
  );
}

function PortalLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-tight text-[#F3F3F3]/62">
      [ {children} ]
    </p>
  );
}

export default function ClientPortalPage() {
  const [clientId, setClientId] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [messageDraft, setMessageDraft] = useState("");
  const [emailSubject, setEmailSubject] = useState("Project update question");
  const [emailBody, setEmailBody] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [notes, setNotes] = useState(starterNotes);
  const [noteDraft, setNoteDraft] = useState("");
  const [documents, setDocuments] = useState(starterDocuments);
  const [activeView, setActiveView] = useState<PortalView>("dashboard");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentStepIndex = 2;
  const progress = 58;

  const completedSteps = useMemo(
    () => processSteps.slice(0, currentStepIndex),
    [currentStepIndex],
  );

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validClientIds.includes(clientId.trim().toUpperCase())) {
      setLoginError("Use a valid mock client ID. Try WEBX-DEMO.");
      return;
    }

    setLoginError("");
    setIsLoggedIn(true);
  }

  function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!messageDraft.trim()) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        author: "Client",
        message: messageDraft.trim(),
        time: "Just now",
      },
    ]);
    setMessageDraft("");
  }

  function handleEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(emailSubject || "Project question");
    const body = encodeURIComponent(emailBody || "Hi Web X team,");
    window.location.href = `mailto:buildonwebx@gmail.com?subject=${subject}&body=${body}`;
    setEmailStatus("Email draft opened in your mail app.");
  }

  function handleAddNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!noteDraft.trim()) {
      return;
    }

    setNotes((current) => [
      {
        id: Date.now(),
        title: "Client note",
        body: noteDraft.trim(),
      },
      ...current,
    ]);
    setNoteDraft("");
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    setDocuments((current) => [
      ...files.map((file) => ({
        id: Date.now() + Math.random(),
        name: file.name,
        owner: "Client" as const,
        detail: "Uploaded just now",
      })),
      ...current,
    ]);

    event.target.value = "";
  }

  if (!isLoggedIn) {
    return (
      <main className="webx-portal min-h-screen bg-[#07062C] text-[#F3F3F3]">
        <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
          <section className="relative hidden overflow-hidden border-r border-[#F3F3F3]/10 bg-[#0D0B36] p-10 lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,113,210,0.34),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(243,243,243,0.12),transparent_30%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <PortalLogo />
              <div className="max-w-xl">
                <PortalLabel>Private Workspace</PortalLabel>
                <h1 className="mt-6 text-6xl font-semibold leading-[0.95] tracking-tighter text-[#F3F3F3]">
                  One clear place for the whole build.
                </h1>
                <p className="mt-6 max-w-lg text-lg leading-8 text-[#F3F3F3]/64">
                  Track progress, send messages, share files, and keep the
                  important links organized from discovery to launch.
                </p>
              </div>
              <div />
            </div>
          </section>

          <section className="flex min-h-screen items-center justify-center px-6 py-10">
            <div className="w-full max-w-md">
              <div className="mb-12 lg:hidden">
                <PortalLogo />
              </div>
              <PortalLabel>Client Login</PortalLabel>
              <h2 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-tighter">
                Enter your client ID.
              </h2>
              <p className="mt-5 leading-7 text-[#F3F3F3]/62">
                This portal is private and shared directly with active Web X
                clients. Use the mock ID below for this preview.
              </p>

              <form className="mt-10 space-y-5" onSubmit={handleLogin}>
                <label className="block">
                  <span className="text-sm text-[#F3F3F3]/70">Client ID</span>
                  <input
                    className="mt-2 h-14 w-full rounded-2xl border border-[#F3F3F3]/12 bg-[#F3F3F3]/8 px-4 text-[#F3F3F3] outline-none transition placeholder:text-[#F3F3F3]/32 focus:border-[#F3F3F3]/42"
                    onChange={(event) => setClientId(event.target.value)}
                    placeholder="WEBX-DEMO"
                    type="text"
                    value={clientId}
                  />
                </label>
                {loginError ? (
                  <p className="text-sm text-[#F8B4B4]">{loginError}</p>
                ) : (
                  <p className="text-sm text-[#F3F3F3]/42">
                    Preview client ID: WEBX-DEMO
                  </p>
                )}
                <button
                  className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#F3F3F3] px-6 text-sm font-semibold text-[#07062C] transition hover:bg-white"
                  type="submit"
                >
                  Open Dashboard
                  <span className="grid size-8 place-items-center rounded-full bg-[#07062C] text-[#F3F3F3]">
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
    <main className="webx-portal min-h-screen bg-[#07062C] text-[#F3F3F3]">
      <div className="grid min-h-screen lg:grid-cols-[300px_1fr]">
        <aside className="flex border-b border-[#F3F3F3]/10 bg-[#0D0B36] p-5 lg:min-h-screen lg:flex-col lg:border-b-0 lg:border-r">
          <div className="flex w-full flex-col">
            <PortalLogo />

            <div className="mt-8 rounded-[28px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/6 p-5">
              <PortalLabel>Project</PortalLabel>
              <h1 className="mt-4 text-3xl font-semibold leading-[1.02] tracking-tighter">
                Northline Studio Website
              </h1>
              <p className="mt-4 text-sm leading-6 text-[#F3F3F3]/58">
                Client workspace for project status, messages, files, and
                launch resources.
              </p>
            </div>

            <nav className="mt-5 grid gap-2" aria-label="Client portal pages">
              {portalNavItems.map((item) => {
                const isActive = item.id === activeView;

                return (
                  <button
                    className={`cursor-pointer rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-[#F3F3F3]/28 bg-[#F3F3F3] text-[#07062C]"
                        : "border-transparent bg-transparent text-[#F3F3F3]/68 hover:border-[#F3F3F3]/12 hover:bg-[#F3F3F3]/7 hover:text-[#F3F3F3]"
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
                        isActive ? "text-[#07062C]/56" : "text-[#F3F3F3]/42"
                      }`}
                    >
                      {item.helper}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto hidden pt-8 lg:block">
              <div className="rounded-3xl border border-[#F3F3F3]/10 bg-[#F3F3F3]/6 p-4">
                <p className="text-xs uppercase tracking-tight text-[#F3F3F3]/46">
                  Signed in as
                </p>
                <p className="mt-2 text-sm font-semibold">WEBX-DEMO</p>
              </div>
              <button
                className="mt-3 h-11 w-full cursor-pointer rounded-full border border-[#F3F3F3]/12 px-5 text-sm text-[#F3F3F3]/72 transition hover:border-[#F3F3F3]/34 hover:text-[#F3F3F3]"
                onClick={() => setIsLoggedIn(false)}
                type="button"
              >
                Log out
              </button>
            </div>
          </div>
        </aside>

        <section className="min-w-0 px-5 py-5 lg:px-7">
          <div className="rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <PortalLabel>Project Process</PortalLabel>
                <div className="mt-4 flex flex-wrap items-end gap-4">
                  <p className="text-6xl font-semibold leading-none tracking-tighter">
                    {progress}%
                  </p>
                  <div>
                    <p className="text-sm text-[#F3F3F3]/52">Current phase</p>
                    <p className="text-2xl font-semibold tracking-tight">
                      {processSteps[currentStepIndex].name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-xl">
                <div className="h-2 rounded-full bg-[#F3F3F3]/10">
                  <div
                    className="h-full rounded-full bg-[#F3F3F3]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-[#F3F3F3]/56">
                  Design is active. The next handoff moves approved screens
                  into responsive development.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {processSteps.map((step, index) => {
                const isComplete = completedSteps.includes(step);
                const isCurrent = index === currentStepIndex;

                return (
                  <div
                    className={`rounded-2xl border p-3 ${
                      isCurrent
                        ? "border-[#F3F3F3]/34 bg-[#F3F3F3] text-[#07062C]"
                        : isComplete
                          ? "border-[#F3F3F3]/16 bg-[#F3F3F3]/10"
                          : "border-[#F3F3F3]/10 bg-[#F3F3F3]/4"
                    }`}
                    key={step.name}
                  >
                    <p
                      className={`text-xs ${
                        isCurrent ? "text-[#07062C]/52" : "text-[#F3F3F3]/42"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-sm font-semibold tracking-tight">
                      {step.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {activeView === "dashboard" ? (
            <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
                <PortalLabel>Dashboard</PortalLabel>
                <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                  Latest project snapshot
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Unread messages", "2"],
                    ["Shared files", String(documents.length)],
                    ["Open notes", String(notes.length)],
                  ].map(([label, value]) => (
                    <div
                      className="rounded-3xl border border-[#F3F3F3]/10 bg-[#12103B] p-5"
                      key={label}
                    >
                      <p className="text-sm text-[#F3F3F3]/52">{label}</p>
                      <p className="mt-3 text-4xl font-semibold tracking-tighter">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-3xl border border-[#F3F3F3]/10 bg-[#12103B] p-5">
                  <p className="text-sm font-semibold tracking-tight">
                    Most recent message
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#F3F3F3]/60">
                    {messages[messages.length - 1]?.message}
                  </p>
                  <button
                    className="mt-4 inline-flex h-11 cursor-pointer items-center gap-3 rounded-full bg-[#F3F3F3] px-5 text-sm font-semibold text-[#07062C]"
                    onClick={() => setActiveView("messaging")}
                    type="button"
                  >
                    Open Messaging
                    <ArrowIcon />
                  </button>
                </div>
              </section>

              <section className="rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
                <PortalLabel>Next Actions</PortalLabel>
                <div className="mt-5 space-y-3">
                  {[
                    "Review design direction notes",
                    "Upload final service copy",
                    "Confirm preferred launch window",
                  ].map((action, index) => (
                    <div
                      className="flex items-center gap-4 rounded-2xl border border-[#F3F3F3]/10 bg-[#12103B] p-4"
                      key={action}
                    >
                      <span className="grid size-9 place-items-center rounded-full bg-[#F3F3F3] text-xs font-semibold text-[#07062C]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm font-semibold tracking-tight">
                        {action}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : null}

          {activeView === "messaging" ? (
            <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <section className="rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
                <PortalLabel>Chat</PortalLabel>
                <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                  Project conversation
                </h2>
                <div
                  className="mt-6 max-h-[540px] space-y-3 overflow-y-auto pr-2"
                  data-lenis-prevent
                >
                  {messages.map((message) => (
                    <div
                      className={`rounded-3xl border p-4 ${
                        message.author === "Client"
                          ? "ml-8 border-[#F3F3F3]/12 bg-[#F3F3F3]/10"
                          : "mr-8 border-[#F3F3F3]/10 bg-[#12103B]"
                      }`}
                      key={message.id}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold">
                          {message.author}
                        </p>
                        <p className="text-xs text-[#F3F3F3]/42">
                          {message.time}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#F3F3F3]/66">
                        {message.message}
                      </p>
                    </div>
                  ))}
                </div>
                <form
                  className="mt-5 flex gap-3"
                  onSubmit={handleSendMessage}
                >
                  <input
                    className="h-12 min-w-0 flex-1 rounded-full border border-[#F3F3F3]/12 bg-[#F3F3F3]/7 px-4 text-sm outline-none placeholder:text-[#F3F3F3]/32 focus:border-[#F3F3F3]/34"
                    onChange={(event) => setMessageDraft(event.target.value)}
                    placeholder="Send a quick update..."
                    value={messageDraft}
                  />
                  <button
                    aria-label="Send message"
                    className="grid size-12 cursor-pointer place-items-center rounded-full bg-[#F3F3F3] text-[#07062C] transition hover:bg-white"
                    type="submit"
                  >
                    <SendIcon />
                  </button>
                </form>
              </section>

              <section className="rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
                <PortalLabel>Email</PortalLabel>
                <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                  Structured email
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#F3F3F3]/54">
                  Use email for approvals, longer feedback, or anything that
                  needs a clear paper trail.
                </p>
                <form className="mt-6 space-y-3" onSubmit={handleEmail}>
                  <input
                    className="h-12 w-full rounded-2xl border border-[#F3F3F3]/12 bg-[#F3F3F3]/7 px-4 text-sm outline-none placeholder:text-[#F3F3F3]/32 focus:border-[#F3F3F3]/34"
                    onChange={(event) => setEmailSubject(event.target.value)}
                    placeholder="Subject"
                    value={emailSubject}
                  />
                  <textarea
                    className="min-h-56 w-full resize-none rounded-2xl border border-[#F3F3F3]/12 bg-[#F3F3F3]/7 p-4 text-sm leading-6 outline-none placeholder:text-[#F3F3F3]/32 focus:border-[#F3F3F3]/34"
                    onChange={(event) => setEmailBody(event.target.value)}
                    placeholder="Write your message..."
                    value={emailBody}
                  />
                  <button
                    className="inline-flex h-12 cursor-pointer items-center gap-3 rounded-full bg-[#F3F3F3] px-5 text-sm font-semibold text-[#07062C] transition hover:bg-white"
                    type="submit"
                  >
                    <MailIcon />
                    Open Email Draft
                  </button>
                </form>
                {emailStatus ? (
                  <p className="mt-3 text-sm text-[#F3F3F3]/54">
                    {emailStatus}
                  </p>
                ) : null}
              </section>
            </div>
          ) : null}

          {activeView === "notes" ? (
            <section className="mt-5 rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
              <PortalLabel>Notes</PortalLabel>
              <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                Decisions and reminders
              </h2>
              <form
                className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto]"
                onSubmit={handleAddNote}
              >
                <input
                  className="h-12 min-w-0 rounded-full border border-[#F3F3F3]/12 bg-[#F3F3F3]/7 px-4 text-sm outline-none placeholder:text-[#F3F3F3]/32 focus:border-[#F3F3F3]/34"
                  onChange={(event) => setNoteDraft(event.target.value)}
                  placeholder="Add a note for this project..."
                  value={noteDraft}
                />
                <button
                  className="h-12 cursor-pointer rounded-full bg-[#F3F3F3] px-6 text-sm font-semibold text-[#07062C] transition hover:bg-white"
                  type="submit"
                >
                  Add Note
                </button>
              </form>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {notes.map((note) => (
                  <article
                    className="min-h-40 rounded-3xl border border-[#F3F3F3]/10 bg-[#12103B] p-5"
                    key={note.id}
                  >
                    <p className="font-semibold tracking-tight">{note.title}</p>
                    <p className="mt-3 text-sm leading-6 text-[#F3F3F3]/58">
                      {note.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeView === "documents" ? (
            <section className="mt-5 rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <PortalLabel>Documents</PortalLabel>
                  <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                    Shared files
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F3F3F3]/54">
                    Upload content, references, brand files, and approvals.
                    Web X files appear in the same list.
                  </p>
                </div>
                <button
                  className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-[#F3F3F3] px-5 text-sm font-semibold text-[#07062C] transition hover:bg-white"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  <UploadIcon />
                  Upload File
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
                    className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#F3F3F3]/10 bg-[#12103B] p-5"
                    key={document.id}
                  >
                    <div>
                      <p className="font-semibold tracking-tight">
                        {document.name}
                      </p>
                      <p className="mt-1 text-sm text-[#F3F3F3]/46">
                        {document.owner} - {document.detail}
                      </p>
                    </div>
                    <span className="rounded-full border border-[#F3F3F3]/10 px-3 py-1 text-xs text-[#F3F3F3]/54">
                      {document.owner}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeView === "links" ? (
            <section className="mt-5 rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
              <PortalLabel>Links</PortalLabel>
              <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                Important resources
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {projectLinks.map((link) => (
                  <a
                    className="group rounded-3xl border border-[#F3F3F3]/10 bg-[#12103B] p-5 transition hover:border-[#F3F3F3]/34 hover:bg-[#F3F3F3]/8"
                    href={link.href}
                    key={link.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold tracking-tight">
                        {link.label}
                      </p>
                      <span className="grid size-9 place-items-center rounded-full bg-[#F3F3F3] text-[#07062C] transition group-hover:scale-105">
                        <ArrowIcon />
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#F3F3F3]/50">
                      {link.detail}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </section>
      </div>
    </main>
  );
}
