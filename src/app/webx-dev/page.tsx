"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";

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

function WebXDevStyles() {
    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `
          .webx-dev-page {
            --dev-bg: #07062c;
            --dev-sidebar: #0d0b36;
            --dev-card: rgb(243 243 243 / 0.06);
            --dev-card-strong: #12103b;
            --dev-border: rgb(243 243 243 / 0.1);
            --dev-border-strong: rgb(243 243 243 / 0.28);
            --dev-text: #f3f3f3;
            --dev-muted: rgb(243 243 243 / 0.58);
            --dev-soft: rgb(243 243 243 / 0.42);
            --dev-inverted: #07062c;
            --dev-input-bg: rgb(243 243 243 / 0.08);
            --dev-input-border: rgb(243 243 243 / 0.12);
            --dev-placeholder: rgb(243 243 243 / 0.42);
            --dev-logo-color: #f3f3f3;

            min-height: 100vh;
            background: var(--dev-bg);
            color: var(--dev-text);
          }

          html.theme-light .webx-dev-page,
          html[data-theme="light"] .webx-dev-page {
            --dev-bg: #f3f3f3;
            --dev-sidebar: #e9e8f0;
            --dev-card: rgb(7 6 44 / 0.035);
            --dev-card-strong: #ffffff;
            --dev-border: rgb(7 6 44 / 0.12);
            --dev-border-strong: rgb(7 6 44 / 0.24);
            --dev-text: #07062c;
            --dev-muted: rgb(7 6 44 / 0.62);
            --dev-soft: rgb(7 6 44 / 0.46);
            --dev-inverted: #f3f3f3;
            --dev-input-bg: rgb(7 6 44 / 0.03);
            --dev-input-border: rgb(7 6 44 / 0.14);
            --dev-placeholder: rgb(7 6 44 / 0.42);
            --dev-logo-color: #07062c;
          }

          .webx-dev-logo-mark {
            display: block;
            width: 104px;
            height: 32px;
            background: var(--dev-logo-color) !important;
            opacity: 1 !important;
            mask: url("/webx%20logo/webx.svg") center / contain no-repeat;
            -webkit-mask: url("/webx%20logo/webx.svg") center / contain no-repeat;
          }

          .webx-dev-input {
            color: var(--dev-text) !important;
            -webkit-text-fill-color: var(--dev-text) !important;
            caret-color: var(--dev-text) !important;
            background: var(--dev-input-bg) !important;
            border: 1px solid var(--dev-input-border) !important;
            outline: none !important;
            box-shadow: none !important;
          }

          .webx-dev-input::placeholder {
            color: var(--dev-placeholder) !important;
            -webkit-text-fill-color: var(--dev-placeholder) !important;
            opacity: 1 !important;
          }

          .webx-dev-input:focus {
            border-color: #8f86dc !important;
            box-shadow: 0 0 0 4px rgb(143 134 220 / 0.18) !important;
            outline: none !important;
          }

          .webx-dev-input:-webkit-autofill,
          .webx-dev-input:-webkit-autofill:hover,
          .webx-dev-input:-webkit-autofill:focus {
            -webkit-text-fill-color: var(--dev-text) !important;
            caret-color: var(--dev-text) !important;
            box-shadow: 0 0 0 1000px var(--dev-card-strong) inset !important;
            border-color: var(--dev-input-border) !important;
          }
        `,
            }}
        />
    );
}

function DevLogo() {
    return (
        <div className="flex items-center gap-3">
            <span aria-label="Web X" className="webx-dev-logo-mark" role="img" />
            <p style={{ color: "var(--dev-muted)" }} className="text-xs">
                Team Console
            </p>
        </div>
    );
}

function AdminLabel({ children }: { children: ReactNode }) {
    return (
        <p
            style={{ color: "var(--dev-muted)" }}
            className="text-xs font-semibold uppercase tracking-tight"
        >
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

export default function WebXDevPage() {
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
            <main className="webx-dev-page">
                <WebXDevStyles />

                <div className="mx-auto grid min-h-screen w-full max-w-[1440px] items-center gap-12 px-6 py-10 lg:grid-cols-[0.9fr_0.7fr]">
                    <section>
                        <DevLogo />

                        <div className="mt-3">
                            <AdminLabel>Internal Access</AdminLabel>
                        </div>

                        <h1
                            style={{ color: "var(--dev-text)" }}
                            className="mt-6 max-w-3xl text-6xl font-semibold leading-[0.94] tracking-tighter lg:text-7xl"
                        >
                            Manage every Web X client from one focused console.
                        </h1>

                        <p
                            style={{ color: "var(--dev-muted)" }}
                            className="mt-6 max-w-xl text-lg leading-8"
                        >
                            Review project health, track client phases, capture internal
                            notes, and keep the next action visible before anything slips.
                        </p>
                    </section>

                    <section
                        style={{
                            backgroundColor: "var(--dev-card)",
                            borderColor: "var(--dev-border)",
                        }}
                        className="rounded-[32px] border p-6"
                    >
                        <AdminLabel>Team Login</AdminLabel>

                        <h2
                            style={{ color: "var(--dev-text)" }}
                            className="mt-4 text-4xl font-semibold tracking-tighter"
                        >
                            Enter your team ID.
                        </h2>

                        <form className="mt-8 space-y-5" onSubmit={handleLogin}>
                            <label className="block">
                                <span
                                    style={{ color: "var(--dev-muted)" }}
                                    className="text-sm"
                                >
                                    Team ID
                                </span>

                                <input
                                    className="webx-dev-input mt-2 h-14 w-full rounded-2xl px-4 text-sm"
                                    onChange={(event) => setTeamId(event.target.value)}
                                    placeholder="WEBX-TEAM"
                                    type="text"
                                    value={teamId}
                                />
                            </label>

                            {loginError ? (
                                <p className="text-sm text-[#F8B4B4]">{loginError}</p>
                            ) : (
                                <p style={{ color: "var(--dev-soft)" }} className="text-sm">
                                    Preview team ID: WEBX-TEAM
                                </p>
                            )}

                            <button
                                style={{
                                    backgroundColor: "var(--dev-text)",
                                    color: "var(--dev-inverted)",
                                }}
                                className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold transition"
                                type="submit"
                            >
                                Open Team Console

                                <span
                                    style={{
                                        backgroundColor: "var(--dev-inverted)",
                                        color: "var(--dev-text)",
                                    }}
                                    className="grid size-8 place-items-center rounded-full"
                                >
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
        <main className="webx-dev-page">
            <WebXDevStyles />

            <div className="grid min-h-screen lg:grid-cols-[300px_1fr]">
                <aside
                    style={{
                        backgroundColor: "var(--dev-sidebar)",
                        borderColor: "var(--dev-border)",
                    }}
                    className="border-b p-5 lg:min-h-screen lg:border-b-0 lg:border-r"
                >
                    <DevLogo />

                    <div
                        style={{
                            backgroundColor: "var(--dev-card)",
                            borderColor: "var(--dev-border)",
                        }}
                        className="mt-8 rounded-[28px] border p-5"
                    >
                        <AdminLabel>Workspace</AdminLabel>

                        <h1
                            style={{ color: "var(--dev-text)" }}
                            className="mt-4 text-3xl font-semibold leading-[1.02] tracking-tighter"
                        >
                            Client Operations
                        </h1>

                        <p
                            style={{ color: "var(--dev-muted)" }}
                            className="mt-4 text-sm leading-6"
                        >
                            Mock internal dashboard for active Web X clients and projects.
                        </p>
                    </div>

                    <nav className="mt-5 grid gap-2" aria-label="Web X dev console pages">
                        {adminNav.map((item) => {
                            const isActive = item.id === activeView;

                            return (
                                <button
                                    className="cursor-pointer rounded-2xl border px-4 py-3 text-left transition"
                                    key={item.id}
                                    onClick={() => setActiveView(item.id)}
                                    style={{
                                        backgroundColor: isActive
                                            ? "var(--dev-text)"
                                            : "transparent",
                                        borderColor: isActive
                                            ? "var(--dev-border-strong)"
                                            : "transparent",
                                        color: isActive ? "var(--dev-inverted)" : "var(--dev-muted)",
                                    }}
                                    type="button"
                                >
                                    <span className="block text-sm font-semibold tracking-tight">
                                        {item.label}
                                    </span>
                                    <span
                                        className="mt-1 block text-xs"
                                        style={{
                                            color: isActive
                                                ? "color-mix(in srgb, var(--dev-inverted) 62%, transparent)"
                                                : "var(--dev-soft)",
                                        }}
                                    >
                                        {item.helper}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>

                    <button
                        className="mt-8 h-11 w-full cursor-pointer rounded-full border px-5 text-sm transition"
                        onClick={() => setIsLoggedIn(false)}
                        style={{
                            borderColor: "var(--dev-border)",
                            color: "var(--dev-muted)",
                        }}
                        type="button"
                    >
                        Log out
                    </button>
                </aside>

                <section className="min-w-0 px-5 py-5 lg:px-7">
                    <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
                        <section
                            style={{
                                backgroundColor: "var(--dev-card)",
                                borderColor: "var(--dev-border)",
                            }}
                            className="rounded-[30px] border p-5"
                        >
                            <AdminLabel>Today</AdminLabel>

                            <div className="mt-4 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                                <div>
                                    <h2
                                        style={{ color: "var(--dev-text)" }}
                                        className="text-5xl font-semibold leading-none tracking-tighter"
                                    >
                                        {clients.length} active clients
                                    </h2>

                                    <p
                                        style={{ color: "var(--dev-muted)" }}
                                        className="mt-4 max-w-2xl text-sm leading-6"
                                    >
                                        Average project progress is {averageProgress}%. Prioritize
                                        reviews, launch blockers, and client follow-ups.
                                    </p>
                                </div>

                                <div
                                    style={{
                                        backgroundColor: "var(--dev-text)",
                                        color: "var(--dev-inverted)",
                                    }}
                                    className="rounded-3xl p-5"
                                >
                                    <p className="text-sm opacity-60">Average progress</p>

                                    <p className="mt-2 text-5xl font-semibold tracking-tighter">
                                        {averageProgress}%
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section
                            style={{
                                backgroundColor: "var(--dev-card)",
                                borderColor: "var(--dev-border)",
                            }}
                            className="rounded-[30px] border p-5"
                        >
                            <AdminLabel>Priority</AdminLabel>

                            <p
                                style={{ color: "var(--dev-text)" }}
                                className="mt-4 text-2xl font-semibold tracking-tight"
                            >
                                {clients.find((client) => client.status === "At Risk")?.name}
                            </p>

                            <p
                                style={{ color: "var(--dev-muted)" }}
                                className="mt-3 text-sm leading-6"
                            >
                                Domain access is blocking launch. Send a reminder before end of
                                day.
                            </p>
                        </section>
                    </div>

                    {activeView === "overview" ? (
                        <div className="mt-5 grid gap-5 xl:grid-cols-4">
                            {[
                                [
                                    "On Track",
                                    clients.filter((client) => client.status === "On Track")
                                        .length,
                                ],
                                [
                                    "Needs Review",
                                    clients.filter((client) => client.status === "Needs Review")
                                        .length,
                                ],
                                [
                                    "At Risk",
                                    clients.filter((client) => client.status === "At Risk")
                                        .length,
                                ],
                                [
                                    "Launch Week",
                                    clients.filter((client) => client.phase === "Launch").length,
                                ],
                            ].map(([label, value]) => (
                                <div
                                    style={{
                                        backgroundColor: "var(--dev-card)",
                                        borderColor: "var(--dev-border)",
                                    }}
                                    className="rounded-[28px] border p-5"
                                    key={label}
                                >
                                    <p style={{ color: "var(--dev-muted)" }} className="text-sm">
                                        {label}
                                    </p>

                                    <p
                                        style={{ color: "var(--dev-text)" }}
                                        className="mt-4 text-5xl font-semibold tracking-tighter"
                                    >
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : null}

                    {activeView === "clients" ? (
                        <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                            <section
                                style={{
                                    backgroundColor: "var(--dev-card)",
                                    borderColor: "var(--dev-border)",
                                }}
                                className="rounded-[30px] border p-5"
                            >
                                <AdminLabel>Clients</AdminLabel>

                                <div className="mt-5 space-y-3">
                                    {clients.map((client) => {
                                        const isSelected = selectedClientId === client.id;

                                        return (
                                            <button
                                                className="w-full cursor-pointer rounded-3xl border p-4 text-left transition"
                                                key={client.id}
                                                onClick={() => setSelectedClientId(client.id)}
                                                style={{
                                                    backgroundColor: isSelected
                                                        ? "var(--dev-text)"
                                                        : "var(--dev-card-strong)",
                                                    borderColor: isSelected
                                                        ? "var(--dev-border-strong)"
                                                        : "var(--dev-border)",
                                                    color: isSelected
                                                        ? "var(--dev-inverted)"
                                                        : "var(--dev-text)",
                                                }}
                                                type="button"
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    <p className="font-semibold tracking-tight">
                                                        {client.name}
                                                    </p>

                                                    <span className="text-xs">{client.id}</span>
                                                </div>

                                                <p
                                                    className="mt-2 text-sm"
                                                    style={{
                                                        color: isSelected
                                                            ? "color-mix(in srgb, var(--dev-inverted) 62%, transparent)"
                                                            : "var(--dev-soft)",
                                                    }}
                                                >
                                                    {client.service} - {client.phase}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            <section
                                style={{
                                    backgroundColor: "var(--dev-card)",
                                    borderColor: "var(--dev-border)",
                                }}
                                className="rounded-[30px] border p-5"
                            >
                                <AdminLabel>Client Detail</AdminLabel>

                                <h2
                                    style={{ color: "var(--dev-text)" }}
                                    className="mt-3 text-4xl font-semibold tracking-tighter"
                                >
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
                                            style={{
                                                backgroundColor: "var(--dev-card-strong)",
                                                borderColor: "var(--dev-border)",
                                            }}
                                            className="rounded-2xl border p-4"
                                            key={label}
                                        >
                                            <p
                                                style={{ color: "var(--dev-soft)" }}
                                                className="text-xs uppercase"
                                            >
                                                {label}
                                            </p>
                                            <p
                                                style={{ color: "var(--dev-text)" }}
                                                className="mt-2 text-sm font-semibold tracking-tight"
                                            >
                                                {value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    style={{
                                        backgroundColor: "var(--dev-card-strong)",
                                        borderColor: "var(--dev-border)",
                                    }}
                                    className="mt-5 rounded-3xl border p-5"
                                >
                                    <p style={{ color: "var(--dev-muted)" }} className="text-sm">
                                        Next action
                                    </p>

                                    <p
                                        style={{ color: "var(--dev-text)" }}
                                        className="mt-2 text-lg font-semibold tracking-tight"
                                    >
                                        {selectedClient.nextAction}
                                    </p>
                                </div>
                            </section>
                        </div>
                    ) : null}

                    {activeView === "pipeline" ? (
                        <section
                            style={{
                                backgroundColor: "var(--dev-card)",
                                borderColor: "var(--dev-border)",
                            }}
                            className="mt-5 rounded-[30px] border p-5"
                        >
                            <AdminLabel>Pipeline</AdminLabel>

                            <div className="mt-5 grid gap-4 xl:grid-cols-5">
                                {pipelineStages.map((stage) => (
                                    <div
                                        style={{
                                            backgroundColor: "var(--dev-card-strong)",
                                            borderColor: "var(--dev-border)",
                                        }}
                                        className="min-h-72 rounded-3xl border p-4"
                                        key={stage}
                                    >
                                        <p
                                            style={{ color: "var(--dev-text)" }}
                                            className="font-semibold tracking-tight"
                                        >
                                            {stage}
                                        </p>

                                        <div className="mt-4 space-y-3">
                                            {clients
                                                .filter((client) => client.phase === stage)
                                                .map((client) => (
                                                    <div
                                                        style={{
                                                            backgroundColor: "var(--dev-card)",
                                                            borderColor: "var(--dev-border)",
                                                        }}
                                                        className="rounded-2xl border p-3"
                                                        key={client.id}
                                                    >
                                                        <p
                                                            style={{ color: "var(--dev-text)" }}
                                                            className="text-sm font-semibold"
                                                        >
                                                            {client.name}
                                                        </p>

                                                        <p
                                                            style={{ color: "var(--dev-soft)" }}
                                                            className="mt-1 text-xs"
                                                        >
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
                        <section
                            style={{
                                backgroundColor: "var(--dev-card)",
                                borderColor: "var(--dev-border)",
                            }}
                            className="mt-5 rounded-[30px] border p-5"
                        >
                            <AdminLabel>Tasks</AdminLabel>

                            <h2
                                style={{ color: "var(--dev-text)" }}
                                className="mt-3 text-4xl font-semibold tracking-tighter"
                            >
                                Internal next actions
                            </h2>

                            <div className="mt-6 space-y-3">
                                {clients.map((client, index) => (
                                    <div
                                        style={{
                                            backgroundColor: "var(--dev-card-strong)",
                                            borderColor: "var(--dev-border)",
                                        }}
                                        className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border p-5"
                                        key={client.id}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span
                                                style={{
                                                    backgroundColor: "var(--dev-text)",
                                                    color: "var(--dev-inverted)",
                                                }}
                                                className="grid size-10 place-items-center rounded-full text-xs font-semibold"
                                            >
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            <div>
                                                <p
                                                    style={{ color: "var(--dev-text)" }}
                                                    className="font-semibold tracking-tight"
                                                >
                                                    {client.nextAction}
                                                </p>

                                                <p
                                                    style={{ color: "var(--dev-soft)" }}
                                                    className="mt-1 text-sm"
                                                >
                                                    {client.name}
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            style={{
                                                borderColor: "var(--dev-border)",
                                                color: "var(--dev-muted)",
                                            }}
                                            className="rounded-full border px-3 py-1 text-xs"
                                        >
                                            {client.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : null}

                    {activeView === "messages" ? (
                        <section
                            style={{
                                backgroundColor: "var(--dev-card)",
                                borderColor: "var(--dev-border)",
                            }}
                            className="mt-5 rounded-[30px] border p-5"
                        >
                            <AdminLabel>Messages</AdminLabel>

                            <h2
                                style={{ color: "var(--dev-text)" }}
                                className="mt-3 text-4xl font-semibold tracking-tighter"
                            >
                                Team note for {selectedClient.name}
                            </h2>

                            <textarea
                                className="webx-dev-input mt-6 min-h-52 w-full resize-none rounded-3xl p-4 text-sm leading-6"
                                onChange={(event) => setInternalNote(event.target.value)}
                                placeholder="Write an internal note or client follow-up..."
                                value={internalNote}
                            />

                            <button
                                style={{
                                    backgroundColor: "var(--dev-text)",
                                    color: "var(--dev-inverted)",
                                }}
                                className="mt-4 inline-flex h-12 cursor-pointer items-center gap-3 rounded-full px-5 text-sm font-semibold transition"
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