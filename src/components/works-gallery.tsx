"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const services = [
  "All works",
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

function getWorkSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function WorksGallery() {
  const searchParams = useSearchParams();
  const [activeService, setActiveService] = useState("All works");
  const [activeTitle, setActiveTitle] = useState(works[0].title);

  useEffect(() => {
    const requestedWork = searchParams.get("work");

    if (!requestedWork) {
      return;
    }

    const matchingWork = works.find(
      (work) => getWorkSlug(work.title) === requestedWork,
    );

    if (!matchingWork) {
      return;
    }

    setActiveService("All works");
    setActiveTitle(matchingWork.title);
  }, [searchParams]);

  const filteredWorks = useMemo(() => {
    if (activeService === "All works") {
      return works;
    }

    return works.filter((work) => work.service === activeService);
  }, [activeService]);

  const activeWork =
    filteredWorks.find((work) => work.title === activeTitle) ?? filteredWorks[0];

  function selectService(service: string) {
    const nextWorks =
      service === "All works"
        ? works
        : works.filter((work) => work.service === service);

    setActiveService(service);
    setActiveTitle(nextWorks[0].title);
  }

  return (
    <main className="h-screen overflow-hidden bg-[#07062C] pt-20 text-[#F3F3F3]">
      <section className="mx-auto flex h-full w-full max-w-[1480px] flex-col overflow-hidden px-4 pb-5 sm:px-8 lg:px-10">
        <div className="shrink-0 py-4">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-3 text-xs font-normal tracking-tight text-[#F3F3F3]">
                <span className="text-[#F3F3F3]/42">[</span>
                <span>Works</span>
                <span className="text-[#F3F3F3]/42">]</span>
              </p>
              <h1 className="mt-2 max-w-3xl text-balance text-4xl font-normal leading-[1.04] tracking-tighter sm:text-5xl lg:text-6xl">
                Project gallery
              </h1>
            </div>

            <label className="grid gap-2 text-sm font-normal tracking-tight text-[#F3F3F3]/58 lg:w-[320px]">
              <span>Filter by service</span>
              <span className="relative">
                <select
                  aria-label="Filter works by service"
                  className="h-11 w-full appearance-none rounded-full border border-[#F3F3F3]/14 bg-[#F3F3F3]/7 px-5 pr-11 text-sm font-normal tracking-tight text-[#F3F3F3] outline-none transition hover:border-[#F3F3F3]/28 focus:border-[#8f86dc]"
                  onChange={(event) => selectService(event.target.value)}
                  value={activeService}
                >
                  {services.map((service) => (
                    <option
                      className="bg-[#07062C] text-[#F3F3F3]"
                      key={service}
                      value={service}
                    >
                      {service}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#F3F3F3]/58"
                >
                  v
                </span>
              </span>
            </label>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-6 overflow-hidden lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="relative min-h-0 overflow-hidden">
            <div className="flex h-full min-h-0">
              <div className="flex min-h-0 flex-1 flex-col">
                <div
                  className="min-h-0 flex-1 overflow-y-auto pr-2"
                  data-lenis-prevent
                >
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
                        <span className="flex-1 text-xl font-normal leading-tight tracking-tighter sm:text-2xl lg:text-3xl">
                          {work.title}
                        </span>
                        <span
                          className={`grid size-8 shrink-0 place-items-center rounded-full border transition ${
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

          <section className="relative flex min-h-0 flex-col overflow-hidden">
            <article className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[0.54fr_0.46fr] lg:items-center">
              <div className="works-gallery-media webx-media-clean overflow-hidden rounded-lg border border-[#F3F3F3]/14 bg-[#F3F3F3]/6">
                <div
                  aria-label={activeWork.title}
                  className="aspect-[1.1] max-h-[560px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${activeWork.image})` }}
                />
              </div>

              <div>
                <div>
                  <p className="liquid-glass inline-flex rounded-full px-4 py-2 text-xs font-normal tracking-tight">
                    {activeWork.service}
                  </p>
                  <h2 className="mt-4 text-4xl font-normal leading-[1.04] tracking-tighter sm:text-5xl lg:text-[3.4rem]">
                    {activeWork.title}
                  </h2>
                </div>

                <div className="mt-5">
                  <p className="text-base font-normal leading-7 tracking-tight text-[#F3F3F3]/70">
                    {activeWork.description}
                  </p>
                  <p className="mt-4 text-sm font-normal tracking-tight text-[#8f86dc]">
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
