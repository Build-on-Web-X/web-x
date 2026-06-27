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

export function FaqSection() {
  return (
    <section
      className="bg-[#07062C] px-4 py-20 text-[#F3F3F3] sm:px-[1.5%] lg:px-[1%]"
      id="faq"
    >
      <div className="mx-auto max-w-[1480px]">
        <StoryReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-normal uppercase tracking-tight">
              <span className="text-[#F3F3F3]/50">[</span>
              <span>FAQ</span>
              <span className="text-[#F3F3F3]/50">]</span>
            </p>
            <h2 className="mt-7 max-w-4xl text-balance text-5xl font-normal leading-[1.06] tracking-tighter sm:text-6xl lg:text-7xl">
              Questions before we build
            </h2>
          </div>
          <p className="max-w-md text-lg leading-8 tracking-tight text-[#F3F3F3]/62">
            A few direct answers about timelines, scope, and how the first
            conversation works.
          </p>
        </StoryReveal>

        <StoryStagger className="mt-14 grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <StoryItem key={faq.question}>
              <article className="rounded-lg border border-[#F3F3F3]/12 bg-[#121037] p-6">
                <h3 className="text-xl font-normal tracking-tight">
                  {faq.question}
                </h3>
                <p className="mt-4 text-sm leading-6 tracking-tight text-[#F3F3F3]/62">
                  {faq.answer}
                </p>
              </article>
            </StoryItem>
          ))}
        </StoryStagger>
      </div>
    </section>
  );
}
