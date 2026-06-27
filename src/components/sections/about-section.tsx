import { StoryReveal } from "@/components/story-motion";

export function AboutSection() {
  return (
    <section
      id="about"
      className="webx-about bg-[#07062C] px-4 py-24 sm:px-[1.5%] lg:px-[1%]"
    >
      <div className="mx-auto grid w-full max-w-[1480px] gap-10 lg:grid-cols-[0.15fr_0.85fr] lg:gap-16">
        <StoryReveal direction="right" className="lg:pt-2">
          <p className="inline-flex items-start gap-3 whitespace-nowrap text-xs font-normal uppercase tracking-tight text-[#F3F3F3]">
            <span className="text-[#F3F3F3]/50">[</span>
            <span>About Us</span>
            <span className="text-[#F3F3F3]/50">]</span>
          </p>
        </StoryReveal>

        <StoryReveal direction="up" delay={0.08}>
          <p className="text-balance text-4xl font-normal tracking-tighter leading-[1.34] text-[#F3F3F3] sm:text-5xl sm:leading-[1.34] lg:text-[56px] lg:leading-[1.28]">
            Web X transforms ideas into meaningful digital experiences that help
            businesses grow online.{" "}
            <span className="text-[#F3F3F3]/42">
              We combine strategy, design, and technology to build credibility,
              attract customers, and create lasting impact.
            </span>
          </p>
        </StoryReveal>
      </div>
    </section>
  );
}
