"use client";

import { useMemo, useState } from "react";

const services = [
  "All Works",
  "Website Development",
  "Landing Pages",
  "E-Commerce Websites",
  "Website Redesigns",
  "Website Maintenance",
  "Hosting & Deployment",
];

const works = [
  {
    service: "Website Development",
    title: "Northline Studio",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1300&q=80",
    description:
      "A polished business website built to clarify positioning, guide prospects, and make the brand feel established from the first visit.",
    outcome: "Credibility-first company presence",
  },
  {
    service: "Website Development",
    title: "Cedar Legal",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1300&q=80",
    description:
      "A structured service website that makes expertise easy to understand, with clear pathways for consultation requests.",
    outcome: "Authority-led service site",
  },
  {
    service: "Landing Pages",
    title: "NovaLaunch Campaign",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1300&q=80",
    description:
      "A focused campaign page designed around one offer, fast comprehension, and a clean path from interest to inquiry.",
    outcome: "Lead-focused launch flow",
  },
  {
    service: "Landing Pages",
    title: "Pulse Webinar",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1300&q=80",
    description:
      "A conversion-focused event page with crisp messaging, proof points, and a frictionless registration path.",
    outcome: "Campaign sign-up experience",
  },
  {
    service: "E-Commerce Websites",
    title: "Luma Goods",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1300&q=80",
    description:
      "A commerce experience that brings product storytelling, trust signals, and checkout readiness into one streamlined storefront.",
    outcome: "Product discovery to purchase",
  },
  {
    service: "E-Commerce Websites",
    title: "Verde Market",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1300&q=80",
    description:
      "A clean storefront system designed to help customers browse categories, compare products, and buy with confidence.",
    outcome: "Retail-ready shopping flow",
  },
  {
    service: "Website Redesigns",
    title: "Atlas Finance",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1300&q=80",
    description:
      "A modernized web presence rebuilt for better hierarchy, stronger trust, and clearer conversion paths across key pages.",
    outcome: "Sharper UX and stronger trust",
  },
  {
    service: "Website Redesigns",
    title: "Maven Health",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1300&q=80",
    description:
      "A refreshed website architecture that turns scattered service content into a calmer, more credible client journey.",
    outcome: "Clearer information architecture",
  },
  {
    service: "Website Maintenance",
    title: "Harbor Care",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1300&q=80",
    description:
      "Ongoing improvements, content updates, and performance checks that keep the website current after launch.",
    outcome: "Reliable post-launch support",
  },
  {
    service: "Website Maintenance",
    title: "Metric Loop",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1300&q=80",
    description:
      "A maintenance partnership covering content changes, quality checks, and site improvements after launch.",
    outcome: "Steady website operations",
  },
  {
    service: "Hosting & Deployment",
    title: "BrightPath Launch",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1300&q=80",
    description:
      "A clean deployment setup with domain connection, SSL, hosting configuration, and launch checks handled end to end.",
    outcome: "Smooth launch operations",
  },
  {
    service: "Hosting & Deployment",
    title: "Summit Deploy",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1300&q=80",
    description:
      "A deployment setup built around stable hosting, domain readiness, SSL configuration, and final launch QA.",
    outcome: "Prepared production release",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function WorksGallery() {
  const [activeService, setActiveService] = useState("All Works");
  const [activeTitle, setActiveTitle] = useState(works[0].title);

  const filteredWorks = useMemo(() => {
    if (activeService === "All Works") {
      return works;
    }

    return works.filter((work) => work.service === activeService);
  }, [activeService]);

  const activeWork =
    filteredWorks.find((work) => work.title === activeTitle) ?? filteredWorks[0];

  function selectService(service: string) {
    const nextWorks =
      service === "All Works"
        ? works
        : works.filter((work) => work.service === service);

    setActiveService(service);
    setActiveTitle(nextWorks[0].title);
  }

  return (
    <main className="h-screen overflow-hidden bg-[#07062C] pt-20 text-[#F3F3F3]">
      <section className="mx-auto flex h-full w-full max-w-[1480px] flex-col overflow-hidden">
        <div className="shrink-0 px-4 py-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-3 text-xs font-normal uppercase tracking-tight text-[#F3F3F3]">
                <span className="text-[#F3F3F3]/42">[</span>
                <span>Works</span>
                <span className="text-[#F3F3F3]/42">]</span>
              </p>
              <h1 className="mt-3 text-4xl font-normal uppercase leading-none tracking-tighter sm:text-5xl lg:text-6xl">
                Gallery
              </h1>
            </div>

            <p className="max-w-md text-sm font-normal leading-6 tracking-tight text-[#F3F3F3]/58 lg:text-right">
              Service-led case studies for brands that need credibility, better
              UX, and clearer conversion paths.
            </p>
          </div>

          <div
            aria-label="Filter works by service"
            className="mt-5 flex gap-2 overflow-x-auto pb-1"
            role="tablist"
          >
            {services.map((service) => {
              const isActive = activeService === service;
              const count =
                service === "All Works"
                  ? works.length
                  : works.filter((work) => work.service === service).length;

              return (
                <button
                  aria-selected={isActive}
                  className={`inline-flex h-11 shrink-0 items-center gap-3 rounded-full border px-4 text-sm font-normal tracking-tight transition ${
                    isActive
                      ? "border-[#8f86dc] bg-[#8f86dc] text-[#F3F3F3]"
                      : "border-[#F3F3F3]/12 bg-[#F3F3F3]/5 text-[#F3F3F3]/64 hover:border-[#F3F3F3]/30 hover:text-[#F3F3F3]"
                  }`}
                  key={service}
                  onClick={() => selectService(service)}
                  role="tab"
                  type="button"
                >
                  {service}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      isActive
                        ? "bg-[#F3F3F3] text-[#07062C]"
                        : "bg-[#F3F3F3]/8 text-[#F3F3F3]/50"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-8 overflow-hidden px-4 pb-8 sm:px-8 lg:grid-cols-[0.35fr_0.65fr] lg:px-10">
          <aside className="relative min-h-0 overflow-hidden">
            <div className="flex h-full min-h-0">
              <div className="flex min-h-0 flex-1 flex-col py-4">
                <p className="text-xs font-normal uppercase tracking-tight text-[#F3F3F3]/48">
                  {activeService}
                </p>

                <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-2">
                  {filteredWorks.map((work, index) => {
                    const isActive = activeWork.title === work.title;

                    return (
                      <button
                        className={`group flex w-full items-center justify-between gap-5 rounded-lg px-3 py-4 text-left transition ${
                          isActive
                            ? "bg-[#F3F3F3]/7 text-[#F3F3F3]"
                            : "text-[#F3F3F3]/34 hover:bg-[#F3F3F3]/4 hover:text-[#F3F3F3]/78"
                        }`}
                        key={work.title}
                        onClick={() => setActiveTitle(work.title)}
                        type="button"
                      >
                        <span className="text-xs font-normal tabular-nums tracking-tight text-[#F3F3F3]/38">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-3xl font-normal leading-none tracking-tighter sm:text-4xl lg:text-[2.7rem]">
                          {work.title}
                        </span>
                        <span
                          className={`grid size-9 shrink-0 place-items-center rounded-full border transition ${
                            isActive
                              ? "border-[#8f86dc] bg-[#8f86dc] text-[#F3F3F3]"
                              : "border-[#F3F3F3]/12 text-[#F3F3F3]/34 group-hover:border-[#F3F3F3]/28"
                          }`}
                        >
                          <ArrowIcon />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          <section className="relative flex min-h-0 flex-col overflow-hidden py-4">
            <article className="grid min-h-0 flex-1 content-center gap-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-center">
              <div className="webx-media-clean overflow-hidden rounded-lg border border-[#F3F3F3]/14 bg-[#F3F3F3]/6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
                <div
                  aria-label={activeWork.title}
                  className="aspect-square bg-cover bg-center"
                  style={{ backgroundImage: `url(${activeWork.image})` }}
                />
              </div>

              <div>
                <div>
                  <p className="liquid-glass inline-flex rounded-full px-4 py-2 text-xs font-normal tracking-tight">
                    {activeWork.service}
                  </p>
                  <h2 className="mt-5 text-4xl font-normal leading-none tracking-tighter sm:text-5xl lg:text-6xl">
                    {activeWork.title}
                  </h2>
                </div>

                <div className="mt-7">
                  <p className="text-base font-normal leading-7 tracking-tight text-[#F3F3F3]/70">
                    {activeWork.description}
                  </p>
                  <p className="mt-4 text-sm font-normal uppercase tracking-tight text-[#8f86dc]">
                    {activeWork.outcome}
                  </p>
                </div>
              </div>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}
