"use client";

import { FormEvent, useMemo, useState } from "react";

type AdminView = "overview" | "clients" | "pipeline" | "tasks" | "messages";

type ClientProject = {
  id: string;
  name: string;
  company: string;
  service: string;
  phase: string;
  progress: number;
  status: "On Track" | "Needs Review" | "At Risk";
  nextAction: string;
  contact: string;
};

const adminIds = ["WEBX-TEAM", "ADMIN-DEMO"];

const adminNav: { id: AdminView; label: string; helper: string }[] = [
  { id: "overview", label: "Overview", helper: "Today snapshot" },
  { id: "clients", label: "Clients", helper: "Active accounts" },
  { id: "pipeline", label: "Pipeline", helper: "Project stages" },
  { id: "tasks", label: "Tasks", helper: "Internal work" },
  { id: "messages", label: "Messages", helper: "Client updates" },
];

const clients: ClientProject[] = [
  {
    id: "WX-1042",
    name: "Northline Studio",
    company: "Northline Studio",
    service: "Business Website",
    phase: "Design",
    progress: 58,
    status: "On Track",
    nextAction: "Send homepage concept for review",
    contact: "olivia@northline.example",
  },
  {
    id: "WX-1043",
    name: "Luma Goods",
    company: "Luma Goods",
    service: "E-Commerce",
    phase: "Plan",
    progress: 32,
    status: "Needs Review",
    nextAction: "Collect product categories and shipping rules",
    contact: "marco@lumagoods.example",
  },
  {
    id: "WX-1044",
    name: "Atlas Finance",
    company: "Atlas Finance",
    service: "Website Redesign",
    phase: "Develop",
    progress: 74,
    status: "On Track",
    nextAction: "QA responsive dashboard pages",
    contact: "sophia@atlas.example",
  },
  {
    id: "WX-1045",
    name: "NovaLaunch Campaign",
    company: "NovaLaunch",
    service: "Landing Page",
    phase: "Launch",
    progress: 88,
    status: "At Risk",
    nextAction: "Confirm domain access before launch",
    contact: "liam@novalaunch.example",
  },
];

const pipelineStages = ["Discover", "Plan", "Design", "Develop", "Launch"];

function AdminLogo() {
  return (
    <div className="flex items-center gap-3">
      <img
        alt="Web X"
        className="h-10 w-auto object-contain"
        src="/webx%20logo/webx.svg"
      />
      <div>
        <p className="text-xs text-[#F3F3F3]/54">Team Console</p>
      </div>
    </div>
  );
}

function AdminLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-tight text-[#F3F3F3]/58">
      [ {children} ]
    </p>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17L17 7M9 7h8v8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function WebXAdminPage() {
  const [teamId, setTeamId] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<AdminView>("overview");
  const [selectedClientId, setSelectedClientId] = useState(clients[0].id);
  const [internalNote, setInternalNote] = useState("");

  const selectedClient = useMemo(
    () => clients.find((client) => client.id === selectedClientId) ?? clients[0],
    [selectedClientId],
  );

  const averageProgress = Math.round(
    clients.reduce((total, client) => total + client.progress, 0) /
      clients.length,
  );

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!adminIds.includes(teamId.trim().toUpperCase())) {
      setLoginError("Use a valid mock team ID. Try WEBX-TEAM.");
      return;
    }

    setLoginError("");
    setIsLoggedIn(true);
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#07062C] text-[#F3F3F3]">
        <div className="mx-auto grid min-h-screen w-full max-w-[1440px] items-center gap-12 px-6 py-10 lg:grid-cols-[0.9fr_0.7fr]">
          <section>
            <AdminLogo />
            <AdminLabel>Internal Access</AdminLabel>
            <h1 className="mt-6 max-w-3xl text-6xl font-semibold leading-[0.94] tracking-tighter lg:text-7xl">
              Manage every Web X client from one focused console.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#F3F3F3]/62">
              Review project health, track client phases, capture internal
              notes, and keep the next action visible before anything slips.
            </p>
          </section>

          <section className="rounded-[32px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/6 p-6">
            <AdminLabel>Team Login</AdminLabel>
            <h2 className="mt-4 text-4xl font-semibold tracking-tighter">
              Enter your team ID.
            </h2>
            <form className="mt-8 space-y-5" onSubmit={handleLogin}>
              <label className="block">
                <span className="text-sm text-[#F3F3F3]/68">Team ID</span>
                <input
                  className="mt-2 h-14 w-full rounded-2xl border border-[#F3F3F3]/12 bg-[#F3F3F3]/8 px-4 text-[#F3F3F3] outline-none transition placeholder:text-[#F3F3F3]/34 focus:border-[#F3F3F3]/40"
                  onChange={(event) => setTeamId(event.target.value)}
                  placeholder="WEBX-TEAM"
                  value={teamId}
                />
              </label>
              {loginError ? (
                <p className="text-sm text-[#F8B4B4]">{loginError}</p>
              ) : (
                <p className="text-sm text-[#F3F3F3]/44">
                  Preview team ID: WEBX-TEAM
                </p>
              )}
              <button
                className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#F3F3F3] px-6 text-sm font-semibold text-[#07062C] transition hover:bg-white"
                type="submit"
              >
                Open Team Console
                <span className="grid size-8 place-items-center rounded-full bg-[#07062C] text-[#F3F3F3]">
                  <ArrowIcon />
                </span>
              </button>
            </form>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07062C] text-[#F3F3F3]">
      <div className="grid min-h-screen lg:grid-cols-[300px_1fr]">
        <aside className="border-b border-[#F3F3F3]/10 bg-[#0D0B36] p-5 lg:min-h-screen lg:border-b-0 lg:border-r">
          <AdminLogo />

          <div className="mt-8 rounded-[28px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/6 p-5">
            <AdminLabel>Workspace</AdminLabel>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.02] tracking-tighter">
              Client Operations
            </h1>
            <p className="mt-4 text-sm leading-6 text-[#F3F3F3]/58">
              Mock internal dashboard for active Web X clients and projects.
            </p>
          </div>

          <nav className="mt-5 grid gap-2" aria-label="Web X admin pages">
            {adminNav.map((item) => {
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

          <button
            className="mt-8 h-11 w-full cursor-pointer rounded-full border border-[#F3F3F3]/12 px-5 text-sm text-[#F3F3F3]/72 transition hover:border-[#F3F3F3]/34 hover:text-[#F3F3F3]"
            onClick={() => setIsLoggedIn(false)}
            type="button"
          >
            Log out
          </button>
        </aside>

        <section className="min-w-0 px-5 py-5 lg:px-7">
          <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
            <section className="rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
              <AdminLabel>Today</AdminLabel>
              <div className="mt-4 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <h2 className="text-5xl font-semibold leading-none tracking-tighter">
                    {clients.length} active clients
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-[#F3F3F3]/58">
                    Average project progress is {averageProgress}%. Prioritize
                    reviews, launch blockers, and client follow-ups.
                  </p>
                </div>
                <div className="rounded-3xl bg-[#F3F3F3] p-5 text-[#07062C]">
                  <p className="text-sm text-[#07062C]/60">Average progress</p>
                  <p className="mt-2 text-5xl font-semibold tracking-tighter">
                    {averageProgress}%
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
              <AdminLabel>Priority</AdminLabel>
              <p className="mt-4 text-2xl font-semibold tracking-tight">
                {clients.find((client) => client.status === "At Risk")?.name}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#F3F3F3]/58">
                Domain access is blocking launch. Send a reminder before end of
                day.
              </p>
            </section>
          </div>

          {activeView === "overview" ? (
            <div className="mt-5 grid gap-5 xl:grid-cols-4">
              {[
                ["On Track", clients.filter((c) => c.status === "On Track").length],
                [
                  "Needs Review",
                  clients.filter((c) => c.status === "Needs Review").length,
                ],
                ["At Risk", clients.filter((c) => c.status === "At Risk").length],
                ["Launch Week", clients.filter((c) => c.phase === "Launch").length],
              ].map(([label, value]) => (
                <div
                  className="rounded-[28px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5"
                  key={label}
                >
                  <p className="text-sm text-[#F3F3F3]/52">{label}</p>
                  <p className="mt-4 text-5xl font-semibold tracking-tighter">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {activeView === "clients" ? (
            <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <section className="rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
                <AdminLabel>Clients</AdminLabel>
                <div className="mt-5 space-y-3">
                  {clients.map((client) => (
                    <button
                      className={`w-full cursor-pointer rounded-3xl border p-4 text-left transition ${
                        selectedClientId === client.id
                          ? "border-[#F3F3F3]/34 bg-[#F3F3F3] text-[#07062C]"
                          : "border-[#F3F3F3]/10 bg-[#12103B] hover:border-[#F3F3F3]/26"
                      }`}
                      key={client.id}
                      onClick={() => setSelectedClientId(client.id)}
                      type="button"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold tracking-tight">
                          {client.name}
                        </p>
                        <span className="text-xs">{client.id}</span>
                      </div>
                      <p
                        className={`mt-2 text-sm ${
                          selectedClientId === client.id
                            ? "text-[#07062C]/58"
                            : "text-[#F3F3F3]/50"
                        }`}
                      >
                        {client.service} - {client.phase}
                      </p>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
                <AdminLabel>Client Detail</AdminLabel>
                <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                  {selectedClient.name}
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Service", selectedClient.service],
                    ["Phase", selectedClient.phase],
                    ["Status", selectedClient.status],
                    ["Contact", selectedClient.contact],
                  ].map(([label, value]) => (
                    <div
                      className="rounded-2xl border border-[#F3F3F3]/10 bg-[#12103B] p-4"
                      key={label}
                    >
                      <p className="text-xs uppercase text-[#F3F3F3]/42">
                        {label}
                      </p>
                      <p className="mt-2 text-sm font-semibold tracking-tight">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-3xl border border-[#F3F3F3]/10 bg-[#12103B] p-5">
                  <p className="text-sm text-[#F3F3F3]/52">Next action</p>
                  <p className="mt-2 text-lg font-semibold tracking-tight">
                    {selectedClient.nextAction}
                  </p>
                </div>
              </section>
            </div>
          ) : null}

          {activeView === "pipeline" ? (
            <section className="mt-5 rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
              <AdminLabel>Pipeline</AdminLabel>
              <div className="mt-5 grid gap-4 xl:grid-cols-5">
                {pipelineStages.map((stage) => (
                  <div
                    className="min-h-72 rounded-3xl border border-[#F3F3F3]/10 bg-[#12103B] p-4"
                    key={stage}
                  >
                    <p className="font-semibold tracking-tight">{stage}</p>
                    <div className="mt-4 space-y-3">
                      {clients
                        .filter((client) => client.phase === stage)
                        .map((client) => (
                          <div
                            className="rounded-2xl border border-[#F3F3F3]/10 bg-[#F3F3F3]/7 p-3"
                            key={client.id}
                          >
                            <p className="text-sm font-semibold">
                              {client.name}
                            </p>
                            <p className="mt-1 text-xs text-[#F3F3F3]/50">
                              {client.progress}% complete
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeView === "tasks" ? (
            <section className="mt-5 rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
              <AdminLabel>Tasks</AdminLabel>
              <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                Internal next actions
              </h2>
              <div className="mt-6 space-y-3">
                {clients.map((client, index) => (
                  <div
                    className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#F3F3F3]/10 bg-[#12103B] p-5"
                    key={client.id}
                  >
                    <div className="flex items-center gap-4">
                      <span className="grid size-10 place-items-center rounded-full bg-[#F3F3F3] text-xs font-semibold text-[#07062C]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-semibold tracking-tight">
                          {client.nextAction}
                        </p>
                        <p className="mt-1 text-sm text-[#F3F3F3]/48">
                          {client.name}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-[#F3F3F3]/12 px-3 py-1 text-xs text-[#F3F3F3]/56">
                      {client.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeView === "messages" ? (
            <section className="mt-5 rounded-[30px] border border-[#F3F3F3]/10 bg-[#F3F3F3]/5 p-5">
              <AdminLabel>Messages</AdminLabel>
              <h2 className="mt-3 text-4xl font-semibold tracking-tighter">
                Team note for {selectedClient.name}
              </h2>
              <textarea
                className="mt-6 min-h-52 w-full resize-none rounded-3xl border border-[#F3F3F3]/12 bg-[#F3F3F3]/7 p-4 text-sm leading-6 text-[#F3F3F3] outline-none placeholder:text-[#F3F3F3]/34"
                onChange={(event) => setInternalNote(event.target.value)}
                placeholder="Write an internal note or client follow-up..."
                value={internalNote}
              />
              <button
                className="mt-4 inline-flex h-12 cursor-pointer items-center gap-3 rounded-full bg-[#F3F3F3] px-5 text-sm font-semibold text-[#07062C] transition hover:bg-white"
                type="button"
              >
                Save Mock Note
                <ArrowIcon />
              </button>
            </section>
          ) : null}
        </section>
      </div>
    </main>
  );
}
