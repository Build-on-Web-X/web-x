import { GradientBarsBackground } from "@/components/ui/gradient-bars-background";
import { SampleWorkPreview } from "@/components/sample-work-preview";
import { ArrowUpRightIcon, Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

const technologies = ["Figma", "Next.js", "Supabase", "Vercel", "OpenAI", "Anthropic"];

export default function Home() {
  return (
    <>
      <GradientBarsBackground>
        <Navbar />

        <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-10 pt-6 sm:px-8 lg:px-10">
          <section className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase text-[#F3F3F3]">
              <span className="text-[#F3F3F3]/50">[</span>
              <span>Website Development Agency</span>
              <span className="text-[#F3F3F3]/50">]</span>
            </p>

            <h1 className="max-w-5xl text-balance text-4xl font-semibold leading-[1.02] text-[#F3F3F3] sm:text-6xl lg:text-7xl">
              Where Ideas Become Experiences
            </h1>

            <p className="mt-7 max-w-3xl text-pretty text-base leading-8 text-[#F3F3F3]/72 sm:text-lg">
              We transform ideas into modern digital experiences that help
              businesses connect with their audience, build credibility, and
              create lasting impact online.
            </p>

            <Button
              asChild
              className="mt-10 h-12 gap-3 rounded-full bg-[#F3F3F3] px-6 text-sm font-semibold text-[#07062C] shadow-[0_18px_60px_rgba(243,243,243,0.18)] hover:bg-white focus-visible:outline-[#F3F3F3]"
            >
              <a href="#work">
                View Our Work
                <span
                  aria-hidden="true"
                  className="grid size-7 place-items-center rounded-full bg-[#07062C] text-[#F3F3F3]"
                >
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </a>
            </Button>

            <SampleWorkPreview />
          </section>
        </main>
      </GradientBarsBackground>

      <section className="bg-[#07062C] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 text-center">
          <h2 className="text-balance text-2xl font-semibold text-[#F3F3F3] sm:text-3xl">
            Built with industry-leading technologies
          </h2>

          <div className="grid w-full grid-cols-2 items-center gap-x-8 gap-y-8 text-[#F3F3F3]/76 sm:grid-cols-3 lg:grid-cols-6">
            {technologies.map((technology) => (
              <div
                className="flex items-center justify-center gap-3 text-xl font-semibold sm:text-2xl"
                key={technology}
              >
                <span className="grid size-8 place-items-center rounded-lg border border-[#F3F3F3]/14 bg-[#F3F3F3]/6 text-sm text-[#F3F3F3]">
                  {technology.slice(0, 1)}
                </span>
                <span>{technology}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#07062C] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-[#F3F3F3]/10 pt-20 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase text-[#F3F3F3]">
              <span className="text-[#F3F3F3]/50">[</span>
              <span>About Us</span>
              <span className="text-[#F3F3F3]/50">]</span>
            </p>
            <h2 className="max-w-xl text-balance text-4xl font-semibold leading-tight text-[#F3F3F3] sm:text-5xl">
              Strategy, design, and development for brands ready to grow.
            </h2>
          </div>

          <p className="max-w-3xl text-pretty text-xl leading-9 text-[#F3F3F3]/74 sm:text-2xl sm:leading-10">
            Web X transforms ideas into modern digital experiences through
            strategic design and development. We build websites that help
            businesses establish credibility, connect with customers, and grow
            online.
          </p>
        </div>
      </section>
    </>
  );
}
