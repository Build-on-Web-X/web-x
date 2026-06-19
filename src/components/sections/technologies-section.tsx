const technologies = [
  {
    name: "Vercel",
    logo: "/technologies/vercel.svg",
    className: "h-8 max-w-40",
  },
  {
    name: "Supabase",
    logo: "/technologies/supabase.svg",
    className: "h-10 max-w-10",
    wordmark: true,
  },
  {
    name: "Anthropic",
    logo: "/technologies/anthropic.svg",
    className: "h-7 max-w-44",
  },
  {
    name: "OpenAI",
    logo: "/technologies/openai.svg",
    className: "h-8 max-w-40",
  },
  {
    name: "Figma",
    logo: "/technologies/figma-wordmark.svg",
    className: "h-12 max-w-48",
  },
];

export function TechnologiesSection() {
  return (
    <section id="technologies" className="bg-[#07062C] px-4 py-16 sm:px-[1.5%] lg:px-[1%]">
      <div className="mx-auto flex max-w-[1480px] flex-col items-center gap-10 text-center">
        <h2 className="text-balance text-xl font-normal tracking-tight text-[#F3F3F3] sm:text-3xl">
          Built with industry-leading technologies
        </h2>

        <div className="grid w-full grid-cols-2 items-center gap-x-28 gap-y-10 text-[#F3F3F3]/76 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-20 xl:gap-x-24">
          {technologies.map((technology) => (
            <div
              className="flex items-center justify-center gap-3"
              key={technology.name}
            >
              <img
                alt={technology.name}
                className={`${technology.className} technology-logo-muted object-contain brightness-0 invert opacity-78`}
                src={technology.logo}
              />
              {technology.wordmark ? (
                <span className="text-3xl font-normal tracking-tight text-[#F3F3F3]/78">
                  Supabase
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
