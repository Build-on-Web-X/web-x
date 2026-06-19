"use client";

import { useEffect } from "react";

const processSteps = [
  {
    title: "Discover",
    description: "We clarify your goals, audience, and project vision.",
    icon: (
      <path
        d="M16 5.5L26.5 10.5L21.5 21L11 26.5L5.5 21L10.5 10.5L16 5.5ZM16 5.5L11 21L26.5 10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
  },
  {
    title: "Plan",
    description: "We map the structure, features, and launch roadmap.",
    icon: (
      <path
        d="M8 9H24M8 16H20M8 23H17M22 20L25 23L30 17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
  },
  {
    title: "Design",
    description: "We craft a brand-led interface built for users.",
    icon: (
      <path
        d="M10 22H6V10H18V14M14 26H26V14H14V26ZM18 18H22M18 22H21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
  },
  {
    title: "Develop",
    description: "We build a fast, responsive website with modern tools.",
    icon: (
      <path
        d="M12 11L7 16L12 21M20 11L25 16L20 21M18 8L14 24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
  },
  {
    title: "Launch",
    description: "We deploy, connect domains, test, and launch smoothly.",
    icon: (
      <path
        d="M6 23L13 16L18 21L26 13M20 13H26V19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
  },
  {
    title: "Support",
    description: "We keep your website updated, secure, and performing.",
    icon: (
      <path
        d="M16 5.5C10.2 5.5 6 9.8 6 15.5V20C6 21.7 7.3 23 9 23H11V16H8V15.5C8 10.9 11.3 7.5 16 7.5C20.7 7.5 24 10.9 24 15.5V16H21V23H24C22.9 25.1 20.8 26.5 18 26.5H16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
  },
];

export function ProcessSection() {
  useEffect(() => {
    const syncPointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty(
        "--process-glow-x",
        event.clientX.toFixed(2),
      );
      document.documentElement.style.setProperty(
        "--process-glow-y",
        event.clientY.toFixed(2),
      );
      document.documentElement.style.setProperty(
        "--process-glow-xp",
        (event.clientX / window.innerWidth).toFixed(2),
      );
    };

    document.addEventListener("pointermove", syncPointer);

    return () => {
      document.removeEventListener("pointermove", syncPointer);
    };
  }, []);

  return (
    <section
      id="process"
      className="bg-[#07062C] px-4 py-20 text-[#F3F3F3] sm:px-[1.5%] lg:px-[1%]"
    >
      <div className="mx-auto max-w-[1480px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-normal uppercase tracking-tight">
              <span className="text-[#F3F3F3]/50">[</span>
              <span>Process</span>
              <span className="text-[#F3F3F3]/50">]</span>
            </p>

            <h2 className="mt-7 max-w-4xl text-balance text-5xl font-normal leading-[1.06] tracking-tighter sm:text-6xl lg:text-7xl">
              A clear path from idea to launch
            </h2>
          </div>

          <p className="max-w-md text-lg leading-8 tracking-tight text-[#F3F3F3]/62">
            Every project moves through a focused process built to reduce guesswork,
            keep momentum high, and turn your vision into a polished website.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {processSteps.map((step, index) => (
            <article
              className={`process-glow-card group rounded-lg ${
                index === 0
                  ? "process-glow-card-active shadow-[0_24px_80px_rgba(143,134,220,0.22)]"
                  : "process-glow-card-muted"
              }`}
              key={step.title}
            >
              <div
                className={`process-card-inner flex min-h-[276px] flex-col p-6 ${
                  index === 0
                    ? "bg-[var(--accent-violet)] text-[#F3F3F3]"
                    : "bg-[#121037] text-[#F3F3F3]"
                }`}
              >
                <span
                  className={`inline-flex w-fit rounded-full border px-4 py-2 text-sm font-normal tracking-tight ${
                    index === 0
                      ? "border-[#F3F3F3]/70 bg-[#F3F3F3] text-[#07062C]"
                      : "border-[#F3F3F3]/22 bg-[#07062C]/70 text-[#F3F3F3]"
                  }`}
                >
                  Step {String(index + 1).padStart(2, "0")}
                </span>

                <span className="mt-10 flex flex-1 flex-col">
                  <svg
                    aria-hidden="true"
                    className="mb-5 size-9 shrink-0"
                    fill="none"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {step.icon}
                  </svg>

                  <h3 className="text-2xl font-normal tracking-tight">
                    {step.title}
                  </h3>

                  <p
                    className={`mt-4 min-h-[72px] text-sm leading-6 tracking-tight ${
                      index === 0 ? "text-[#F3F3F3]/76" : "text-[#F3F3F3]/58"
                    }`}
                  >
                    {step.description}
                  </p>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
