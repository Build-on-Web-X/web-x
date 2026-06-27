"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { StoryReveal } from "@/components/story-motion";
import type { Testimonial } from "@/lib/site-data";

const testimonialPageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
  }),
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={direction === "left" ? "M19 12H5M11 6L5 12L11 18" : "M5 12H19M13 6L19 12L13 18"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const pageSize = 2;
  const pageCount = Math.ceil(testimonials.length / pageSize);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const visibleTestimonials = useMemo(() => {
    const start = page * pageSize;

    return testimonials.slice(start, start + pageSize);
  }, [page]);

  const goToPreviousPage = () => {
    setDirection(-1);
    setPage((currentPage) =>
      currentPage === 0 ? pageCount - 1 : currentPage - 1,
    );
  };

  const goToNextPage = () => {
    setDirection(1);
    setPage((currentPage) =>
      currentPage === pageCount - 1 ? 0 : currentPage + 1,
    );
  };

  const goToPage = (nextPage: number) => {
    if (nextPage === page) {
      return;
    }

    setDirection(nextPage > page ? 1 : -1);
    setPage(nextPage);
  };

  return (
    <section
      id="testimonials"
      className="bg-[#07062C] px-4 py-20 text-[#F3F3F3] sm:px-[1.5%] lg:px-[1%]"
    >
      <div className="mx-auto max-w-[1480px]">
        <StoryReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-normal uppercase tracking-tight">
              <span className="text-[#F3F3F3]/50">[</span>
              <span>Testimonials</span>
              <span className="text-[#F3F3F3]/50">]</span>
            </p>

            <h2 className="mt-7 max-w-4xl text-balance text-5xl font-normal leading-[1.06] tracking-tighter sm:text-6xl lg:text-7xl">
              What clients say after launch
            </h2>
          </div>

          <p className="max-w-md text-lg leading-8 tracking-tight text-[#F3F3F3]/62">
            Real feedback from teams that trusted Web X to shape their ideas
            into stronger digital experiences.
          </p>
        </StoryReveal>

        <StoryReveal className="mt-14 overflow-hidden" delay={0.08}>
          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.div
              animate="center"
              className="grid gap-5 lg:grid-cols-2"
              custom={direction}
              exit="exit"
              initial="enter"
              key={page}
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              variants={testimonialPageVariants}
            >
              {visibleTestimonials.map((testimonial) => (
                <article
                  className="testimonial-card grid gap-6 rounded-lg border border-[#F3F3F3]/14 bg-[#F3F3F3]/7 p-3 shadow-none sm:grid-cols-[0.88fr_1fr]"
                  key={testimonial.name}
                >
                  <div
                    aria-label={testimonial.name}
                    className="min-h-[280px] rounded-md bg-cover bg-center sm:min-h-[330px]"
                    role="img"
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  />

                  <div className="flex flex-col justify-between px-1 pb-2 pt-1 sm:px-0 sm:py-2">
                    <blockquote className="text-pretty text-xl leading-8 tracking-tight text-[#F3F3F3]">
                      "{testimonial.quote}"
                    </blockquote>

                    <footer className="mt-10">
                      <p className="text-2xl font-normal tracking-tight text-[#F3F3F3]">
                        {testimonial.name}
                      </p>
                      <p className="mt-1 text-sm font-normal tracking-tight text-[#F3F3F3]/56">
                        {testimonial.role}
                      </p>
                    </footer>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </StoryReveal>

        <div className="mt-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                aria-label={`Show testimonial page ${index + 1}`}
                aria-pressed={page === index}
                className={`h-2.5 rounded-full transition ${
                  page === index
                    ? "testimonial-dot-active w-8 bg-[#F3F3F3]"
                    : "testimonial-dot w-2.5 bg-[#F3F3F3]/28"
                }`}
                key={index}
                onClick={() => goToPage(index)}
                type="button"
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Show previous testimonials"
              className="grid size-11 place-items-center rounded-full border border-[#F3F3F3]/28 bg-[#07062C] text-[#F3F3F3] transition hover:border-[#F3F3F3]/60"
              onClick={goToPreviousPage}
              type="button"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              aria-label="Show next testimonials"
              className="testimonial-arrow-primary grid size-11 place-items-center rounded-full bg-[#F3F3F3] text-[#07062C] transition hover:bg-white"
              onClick={goToNextPage}
              type="button"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
