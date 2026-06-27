import { Navbar } from "@/components/navbar";
import { FooterSection } from "@/components/sections/footer-section";

type LegalSection = {
  title: string;
  body: string[];
};

export function LegalPage({
  intro,
  sections,
  title,
}: {
  intro: string;
  sections: LegalSection[];
  title: string;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-[#07062C] px-4 pb-20 pt-32 text-[#F3F3F3] sm:px-[1.5%] lg:px-[1%]">
        <article className="mx-auto max-w-[980px]">
          <p className="text-sm font-normal tracking-tight text-[#F3F3F3]/50">
            Last updated: January 2026
          </p>
          <h1 className="mt-5 text-5xl font-normal leading-[1.04] tracking-tighter sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-normal leading-8 tracking-tight text-[#F3F3F3]/68">
            {intro}
          </p>

          <div className="mt-14 grid gap-10 border-t border-[#F3F3F3]/12 pt-10">
            {sections.map((section) => (
              <section
                className="grid gap-4 md:grid-cols-[0.32fr_0.68fr]"
                key={section.title}
              >
                <h2 className="text-xl font-normal tracking-tight">
                  {section.title}
                </h2>
                <div className="grid gap-4 text-base font-normal leading-7 tracking-tight text-[#F3F3F3]/64">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  );
}
