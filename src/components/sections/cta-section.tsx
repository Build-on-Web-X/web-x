import { BookCallTrigger } from "@/components/book-call-modal";
import { ArrowUpRightIcon } from "@/components/navbar";
import { StoryItem, StoryReveal, StoryStagger } from "@/components/story-motion";

const portalFeatures = [
  "Project status in one place",
  "Messages routed by email",
  "Documents, notes, and links organized",
];

export function CtaSection() {
  return (
    <section
      id="contact"
      className="webx-cta relative flex min-h-screen overflow-hidden bg-[#07062C] px-4 py-20 text-[#F3F3F3] sm:px-[1.5%] lg:px-[1%]"
    >
      <div className="absolute inset-0 z-0 bg-[#07062C]" />
      <div className="cta-gradient absolute inset-0 z-0 bg-[radial-gradient(70%_52%_at_78%_54%,rgb(45_91_255/0.62),transparent_60%),radial-gradient(68%_46%_at_76%_76%,rgb(143_134_220/0.34),transparent_64%)]" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgb(7_6_44/0.94)_0%,rgb(7_6_44/0.68)_45%,rgb(7_6_44/0.18)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-0 h-40 bg-[linear-gradient(180deg,rgb(7_6_44),rgb(7_6_44/0.88)_42%,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-[linear-gradient(180deg,transparent,rgb(7_6_44))]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1480px] gap-12 self-center lg:grid-cols-[1fr_0.82fr] lg:items-end">
        <StoryReveal direction="right" className="max-w-3xl py-8 lg:py-16">
          <p className="inline-flex items-center gap-3 text-xs font-normal uppercase tracking-tight">
            <span className="text-[#F3F3F3]/50">[</span>
            <span>Lets Work Together</span>
            <span className="text-[#F3F3F3]/50">]</span>
          </p>

          <h2 className="mt-7 max-w-4xl text-balance text-5xl font-normal leading-[1.04] tracking-tighter sm:text-6xl lg:text-7xl">
            Ready to build with total clarity?
          </h2>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 tracking-tight text-[#F3F3F3]/72">
            Web X gives every client access to a private portal where project
            progress, messages, documents, notes, and important links stay
            organized from kickoff to launch.
          </p>

          <BookCallTrigger className="webx-primary-button mt-10 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#F3F3F3] px-6 text-sm font-normal tracking-tight text-[#07062C] shadow-[0_18px_60px_rgba(243,243,243,0.18)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F3F3F3]">
            Start a Project
            <span
              aria-hidden="true"
              className="grid size-7 place-items-center rounded-full bg-[#07062C] text-[#F3F3F3]"
            >
              <ArrowUpRightIcon className="size-4" />
            </span>
          </BookCallTrigger>
        </StoryReveal>

        <StoryReveal direction="left" delay={0.12} className="cta-portal-card liquid-glass rounded-lg p-5 lg:mb-16">
          <p className="cta-portal-eyebrow text-sm font-normal uppercase tracking-tight text-[#F3F3F3]/58">
            Client Portal Advantage
          </p>

          <StoryStagger className="mt-6 space-y-3">
            {portalFeatures.map((feature, index) => (
              <StoryItem
                className="cta-portal-feature flex items-center gap-4 rounded-md border border-[#F3F3F3]/14 bg-[#07062C]/42 px-4 py-4"
                key={feature}
              >
                <span className="cta-portal-index grid size-9 shrink-0 place-items-center rounded-full bg-[#F3F3F3] text-sm font-normal tracking-tight text-[#07062C]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="cta-portal-feature-text text-base font-normal tracking-tight text-[#F3F3F3]">
                  {feature}
                </span>
              </StoryItem>
            ))}
          </StoryStagger>

          <p className="cta-portal-copy mt-6 text-pretty text-base leading-7 tracking-tight text-[#F3F3F3]/68">
            No guessing where the project stands. No scattered assets. Just one
            clear place to follow the work and keep momentum moving.
          </p>
        </StoryReveal>
      </div>
    </section>
  );
}
