"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Work } from "@/lib/site-data";

const allServicesLabel = "All services";

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

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12.5L9.5 17L19 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function WorksGallery({ works }: { works: Work[] }) {
  const searchParams = useSearchParams();
  const filterRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(allServicesLabel);
  const [activeTitle, setActiveTitle] = useState(works[0].title);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const requestedWork = searchParams.get("work");

    if (!requestedWork) {
      return;
    }

    const matchingWork = works.find((work) => work.slug === requestedWork);

    if (!matchingWork) {
      return;
    }

    setActiveService(allServicesLabel);
    setActiveTitle(matchingWork.title);
  }, [searchParams]);

  const services = useMemo(
    () => [
      allServicesLabel,
      ...Array.from(new Set(works.map((work) => work.service))),
    ],
    [works],
  );

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

  const filteredWorks = useMemo(() => {
    if (activeService === allServicesLabel) {
      return works;
    }

    return works.filter((work) => work.service === activeService);
  }, [activeService]);

  const activeWork =
    filteredWorks.find((work) => work.title === activeTitle) ?? filteredWorks[0];

  function selectService(service: string) {
    const nextWorks =
      service === allServicesLabel
        ? works
        : works.filter((work) => work.service === service);

    setActiveService(service);
    setActiveTitle(nextWorks[0].title);
    setIsFilterOpen(false);
  }

  return (
    <main className="h-screen overflow-hidden bg-[#07062C] pt-20 text-[#F3F3F3]">
      <section className="mx-auto flex h-full w-full max-w-[1480px] flex-col overflow-hidden px-4 pb-5 sm:px-8 lg:px-10">
        <div className="shrink-0 py-4">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-balance text-4xl font-normal leading-[1.04] tracking-tighter sm:text-5xl lg:text-6xl">
                Project selection
              </h1>
            </div>

            <div
              className="works-filter relative grid gap-2 text-sm font-normal tracking-tight text-[#F3F3F3]/58 lg:w-[320px]"
              ref={filterRef}
            >
              <span>Filter by service</span>
              <button
                aria-expanded={isFilterOpen}
                aria-haspopup="listbox"
                className="works-filter-trigger flex h-11 w-full items-center justify-between gap-4 rounded-full border border-[#F3F3F3]/14 bg-[#F3F3F3]/7 px-5 text-left text-sm font-normal tracking-tight text-[#F3F3F3] outline-none transition hover:border-[#F3F3F3]/28 focus-visible:border-[#8f86dc] focus-visible:ring-2 focus-visible:ring-[#8f86dc]/30"
                onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
                type="button"
              >
                <span>{activeService}</span>
                <span
                  className={`works-filter-chevron text-[#F3F3F3]/58 transition ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDownIcon />
                </span>
              </button>

              {isFilterOpen ? (
                <div
                  aria-label="Filter works by service"
                  className="works-filter-menu absolute right-0 top-[calc(100%+0.5rem)] z-30 w-full overflow-hidden rounded-lg border border-[#F3F3F3]/14 bg-[#0d0b32] p-1.5 text-[#F3F3F3] shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
                  role="listbox"
                >
                  {services.map((service) => {
                    const isSelected = activeService === service;

                    return (
                      <button
                        aria-selected={isSelected}
                        className={`works-filter-option flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm font-normal tracking-tight transition ${
                          isSelected
                            ? "works-filter-option-active bg-[#8f86dc] text-[#07062C]"
                            : "text-[#F3F3F3]/72 hover:bg-[#F3F3F3]/8 hover:text-[#F3F3F3]"
                        }`}
                        key={service}
                        onClick={() => selectService(service)}
                        role="option"
                        type="button"
                      >
                        <span>{service}</span>
                        {isSelected ? <CheckIcon /> : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
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
