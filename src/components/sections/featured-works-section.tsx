import { ArrowUpRightIcon } from "@/components/navbar";
import { Button } from "@/components/ui/button";

const featuredWorks = [
  {
    category: "Website Development",
    title: "Northline Studio",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Landing Page",
    title: "NovaLaunch Campaign",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "E-Commerce",
    title: "Luma Goods",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Website Redesign",
    title: "Atlas Finance",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-7"
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 16H25M18 9L25 16L18 23"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function FeaturedWorksSection() {
  return (
    <section
      id="work"
      className="bg-[#07062C] px-4 py-20 text-[#F3F3F3] sm:px-[1.5%] lg:px-[1%]"
    >
      <div className="mx-auto max-w-[1480px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-normal uppercase tracking-tight">
              <span className="text-[#F3F3F3]/50">[</span>
              <span>Featured Works</span>
              <span className="text-[#F3F3F3]/50">]</span>
            </p>

            <h2 className="mt-7 max-w-3xl text-balance text-5xl font-normal leading-[1.06] tracking-tighter sm:text-6xl lg:text-7xl">
              Recent digital experiences built to convert
            </h2>
          </div>

          <p className="max-w-md text-lg leading-8 tracking-tight text-[#F3F3F3]/62">
            A snapshot of brand systems, launch pages, and commerce experiences
            shaped for clarity, speed, and trust.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredWorks.map((work, index) => (
            <a
              className="featured-work-card webx-media-clean group relative flex aspect-square overflow-hidden rounded-lg border border-[#F3F3F3]/14 bg-[#F3F3F3]/6 outline-none transition hover:border-[#F3F3F3]/34 focus-visible:border-[#F3F3F3]/50 focus-visible:ring-2 focus-visible:ring-[#F3F3F3]/70"
              href="#contact"
              key={work.title}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${work.image})` }}
              />
              <span
                aria-hidden="true"
                className="media-overlay absolute inset-0 bg-[linear-gradient(180deg,rgb(7_6_44/0.18)_0%,rgb(7_6_44/0.36)_42%,rgb(7_6_44/0.92)_100%)]"
              />
              <span
                aria-hidden="true"
                className="media-overlay absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgb(143_134_220/0.24),transparent_36%)]"
              />

              <span className="relative z-10 flex w-full flex-col justify-between p-5">
                <span className="featured-work-pill liquid-glass inline-flex w-fit rounded-full px-4 py-2 text-xs font-normal tracking-tight text-[#F3F3F3] shadow-[inset_0_1px_0_rgba(255,255,255,0.34)] xl:text-sm">
                  {work.category}
                </span>

                <span className="flex items-end justify-between gap-6">
                  <span className="featured-work-copy text-xl font-normal leading-tight tracking-tight text-[#F3F3F3] xl:text-2xl">
                    {work.title}
                  </span>

                  <span className="liquid-glass flex size-10 shrink-0 items-center justify-center rounded-full text-[#F3F3F3] transition group-hover:translate-x-1 xl:size-11">
                    <ArrowIcon />
                  </span>
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            className="webx-primary-button h-12 gap-3 rounded-full bg-[#F3F3F3] px-6 text-sm font-normal tracking-tight text-[#07062C] shadow-[0_18px_60px_rgba(243,243,243,0.18)] hover:bg-white focus-visible:outline-[#F3F3F3]"
          >
            <a href="/works">
              View More
              <span
                aria-hidden="true"
                className="grid size-7 place-items-center rounded-full bg-[#07062C] text-[#F3F3F3]"
              >
                <ArrowUpRightIcon className="size-4" />
              </span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
