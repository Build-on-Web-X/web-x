import { GradientBarsBackground } from "@/components/ui/gradient-bars-background";
import { SampleWorkPreview } from "@/components/sample-work-preview";
import { ArrowUpRightIcon, Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <GradientBarsBackground>
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-10 pt-6 sm:px-8 lg:px-10">
        <section className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="mb-6 rounded-full border border-[#F3F3F3]/12 bg-[#F3F3F3]/7 px-4 py-2 text-xs font-medium uppercase text-[#F3F3F3]/70">
            Website Development Agency
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
  );
}
