"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { StoryItem, StoryReveal, StoryStagger } from "@/components/story-motion";

const faqs = [
  {
    question: "How long does a typical website project take?",
    answer:
      "Most focused websites take two to six weeks, depending on scope, content readiness, feedback speed, and integrations.",
  },
  {
    question: "Can you help if I only have a rough idea?",
    answer:
      "Yes. We start by clarifying goals, audience, content, and the simplest path to a polished first launch.",
  },
  {
    question: "Do you build landing pages and e-commerce sites?",
    answer:
      "Yes. Web X handles business websites, landing pages, e-commerce builds, redesigns, maintenance, and deployment.",
  },
  {
    question: "What happens after I submit the project form?",
    answer:
      "We review your answers and reply with the best next step, usually a focused project-fit conversation.",
  },
];

function ChevronIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
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

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="webx-faq px-4 py-20 text-[#F3F3F3] sm:px-[1.5%] lg:px-[1%]"
      id="faq"
    >
      <div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
        <StoryReveal>
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-normal uppercase tracking-tight">
              <span className="text-[#F3F3F3]/50">[</span>
              <span>FAQ</span>
              <span className="text-[#F3F3F3]/50">]</span>
            </p>
            <h2 className="mt-7 max-w-xl text-balance text-5xl font-normal leading-[1.06] tracking-tighter sm:text-6xl">
              Questions before we build
            </h2>
          </div>
          <p className="webx-faq-copy mt-6 max-w-md text-base leading-7 tracking-tight text-[#F3F3F3]/62">
            A few direct answers about timelines, scope, and how the first
            conversation works.
          </p>
        </StoryReveal>

        <StoryStagger className="webx-faq-list border-y border-[#F3F3F3]/12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
            <StoryItem key={faq.question}>
              <div className="webx-faq-row group border-b border-[#F3F3F3]/12 last:border-b-0">
                <button
                  aria-controls={answerId}
                  aria-expanded={isOpen}
                  className="webx-faq-question flex w-full list-none items-center justify-between gap-8 py-6 text-left text-lg font-normal tracking-tight text-[#F3F3F3] transition hover:text-[#8f86dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8f86dc] sm:text-xl"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  type="button"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`webx-faq-icon grid size-8 shrink-0 place-items-center rounded-full border border-[#F3F3F3]/14 text-[#F3F3F3]/72 transition duration-500 group-hover:border-[#8f86dc]/44 group-hover:text-[#8f86dc] ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronIcon />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      className="webx-faq-answer overflow-hidden"
                      exit={{ height: 0, opacity: 0, y: -6 }}
                      id={answerId}
                      initial={{ height: 0, opacity: 0, y: -6 }}
                      transition={{
                        duration: 0.62,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <p className="max-w-2xl pb-6 pr-14 text-sm leading-6 tracking-tight text-[#F3F3F3]/62 sm:text-base sm:leading-7">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </StoryItem>
            );
          })}
        </StoryStagger>
      </div>
    </section>
  );
}
