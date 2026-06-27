"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Work } from "@/lib/site-data";

const allServicesLabel = "All projects";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10H15M11 6L15 10L11 14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10A6 6 0 0 1 14.7 6.3M15 3.5V6.8H11.7M16 10A6 6 0 0 1 5.3 13.7M5 16.5V13.2H8.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function WorksGallery({ works }: { works: Work[] }) {
  const searchParams = useSearchParams();
  const filterRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(allServicesLabel);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);

  const services = useMemo(
    () => [
      allServicesLabel,
      ...Array.from(new Set(works.map((work) => work.service))),
    ],
    [works],
  );

  const serviceCounts = useMemo(() => {
    const counts: Record<string, number> = {
      [allServicesLabel]: works.length,
    };

    works.forEach((work) => {
      counts[work.service] = (counts[work.service] ?? 0) + 1;
    });

    return counts;
  }, [works]);

  const filteredWorks = useMemo(() => {
    if (activeService === allServicesLabel) {
      return works;
    }

    return works.filter((work) => work.service === activeService);
  }, [activeService, works]);

  const activeServiceCount = serviceCounts[activeService] ?? filteredWorks.length;

  useEffect(() => {
    const requestedWork = searchParams.get("work");

    if (!requestedWork) {
      return;
    }

    const matchingWork = works.find((work) => work.slug === requestedWork);

    if (!matchingWork) {
      return;
    }

    setActiveService(matchingWork.service);

    window.requestAnimationFrame(() => {
      document
        .getElementById(`work-${matchingWork.slug}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [searchParams, works]);

  useEffect(() => {
    function syncTheme() {
      setIsLightTheme(document.documentElement.dataset.theme === "light");
    }

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributeFilter: ["data-theme", "class"],
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function closeFilter(event: MouseEvent) {
      if (!filterRef.current?.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", closeFilter);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeFilter);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function selectService(service: string) {
    setActiveService(service);
    setIsFilterOpen(false);
  }

  return (
    <main
      className="webx-works-page min-h-screen pt-24"
      style={{
        backgroundColor: isLightTheme ? "#f3f3f3" : "#07062c",
        backgroundImage: isLightTheme
          ? "linear-gradient(180deg, #f3f3f3 0%, #f7f7fb 42%, #f3f3f3 100%)"
          : "none",
        color: isLightTheme ? "#07062c" : "#f3f3f3",
      }}
    >
      <section className="mx-auto w-full max-w-[1480px] px-4 pb-14 sm:px-[1.5%] lg:px-[1%]">
        <div className="works-page-hero mb-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-normal uppercase tracking-tight text-[#F3F3F3]/58">
              <span>[</span>
              <span>Works</span>
              <span>]</span>
            </p>

            <h1 className="mt-4 max-w-4xl text-balance text-5xl font-normal leading-[1.02] tracking-tighter sm:text-6xl lg:text-7xl">
              Project index
            </h1>
          </div>

          <p className="max-w-md text-base font-normal leading-7 tracking-tight text-[#F3F3F3]/62">
            A visual pass through recent Web X builds, grouped by the type of
            digital experience each business needed.
          </p>
        </div>

        <div className="works-filter-panel relative z-[90] mb-7 flex flex-wrap items-center gap-3 border-y border-[#F3F3F3]/10 py-3">
          <div className="relative" ref={filterRef}>
            <button
              aria-expanded={isFilterOpen}
              aria-haspopup="listbox"
              className="works-filter-trigger inline-flex h-11 min-w-[190px] items-center justify-between gap-4 rounded-full border px-4 text-sm font-normal tracking-tight outline-none transition hover:border-[#8f86dc]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8f86dc]"
              onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
              style={{
                backgroundColor: isLightTheme ? "#07062c" : "#f3f3f314",
                borderColor: isLightTheme ? "#07062c" : "#f3f3f324",
                color: "#f3f3f3",
              }}
              type="button"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate">{activeService}</span>
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#8f86dc] px-2 text-xs text-[#07062C]">
                  {activeServiceCount}
                </span>
              </span>

              <span
                className={`works-filter-chevron shrink-0 transition ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              >
                <ChevronDownIcon />
              </span>
            </button>

            {isFilterOpen ? (
              <div
                aria-label="Filter projects by service"
                className="works-filter-menu absolute left-0 top-[calc(100%+0.5rem)] z-[120] w-[min(300px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-[#F3F3F3]/12 bg-[#121037] p-1.5 shadow-[0_22px_70px_rgba(0,0,0,0.34)]"
                role="listbox"
              >
                {services.map((service) => {
                  const isSelected = activeService === service;
                  const serviceCount = serviceCounts[service] ?? 0;

                  return (
                    <button
                      aria-selected={isSelected}
                      className={`works-filter-option flex w-full items-center rounded-md px-3 py-2.5 text-left text-sm font-normal tracking-tight transition ${
                        isSelected
                          ? "works-filter-option-active bg-[#8f86dc] text-[#07062C]"
                          : "text-[#F3F3F3]/78 hover:bg-[#F3F3F3]/8 hover:text-[#F3F3F3]"
                      }`}
                      key={service}
                      onClick={() => selectService(service)}
                      role="option"
                      type="button"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="truncate">{service}</span>
                        <span
                          className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs ${
                            isSelected
                              ? "bg-[#07062C]/12 text-[#07062C]/70"
                              : "bg-[#F3F3F3]/10 text-[#F3F3F3]/58"
                          }`}
                        >
                          {serviceCount}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <button
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border px-4 text-sm font-normal tracking-tight transition hover:border-[#8f86dc]/60 hover:text-[#F3F3F3] disabled:cursor-not-allowed disabled:opacity-45"
            disabled={activeService === allServicesLabel}
            onClick={() => selectService(allServicesLabel)}
            style={{
              backgroundColor: isLightTheme ? "#07062c" : "#f3f3f30d",
              borderColor: isLightTheme ? "#07062c" : "#f3f3f324",
              color: "#f3f3f3",
            }}
            type="button"
          >
            Reset
            <ResetIcon />
          </button>
        </div>

        <div className="works-project-grid relative z-0 grid gap-x-5 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredWorks.map((work, index) => (
            <article
              className="works-project-card group"
              id={`work-${work.slug}`}
              key={work.slug}
              style={{ animationDelay: `${Math.min(index * 70, 560)}ms` }}
            >
              <a
                aria-label={`View ${work.title}`}
                className="block"
                href={`/works?work=${work.slug}`}
              >
                <div className="works-project-thumb relative overflow-hidden rounded-[4px] bg-[#121037]">
                  <div
                    className="aspect-[4/3] bg-cover bg-center transition duration-700 group-hover:scale-[1.04]"
                    style={{ backgroundImage: `url(${work.image})` }}
                  />
                  <div className="works-project-scrim absolute inset-0 bg-[linear-gradient(180deg,rgba(7,6,44,0)_42%,rgba(7,6,44,0.88)_100%)]" />

                  <div className="works-project-meta absolute inset-x-0 bottom-0 p-4">
                    <div className="flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="works-project-title truncate text-xl font-normal leading-tight tracking-tighter">
                          {work.title}
                        </h2>
                        <p className="works-project-service mt-1 truncate text-xs font-normal uppercase tracking-tight">
                          {work.service}
                        </p>
                      </div>

                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#F3F3F3] text-[#07062C] transition group-hover:bg-[#8f86dc]">
                        <ArrowIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}