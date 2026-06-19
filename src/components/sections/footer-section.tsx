const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
];

const footerServices = [
  "Website Development",
  "Landing Pages",
  "E-Commerce Websites",
  "Maintenance",
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 14L14 6M8 6H14V12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-[#07062C] px-4 pb-8 pt-24 text-[#F3F3F3] sm:px-[1.5%] lg:px-[1%]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(243_243_243/0.32),transparent)]" />
      <div className="absolute left-1/2 top-0 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-[var(--accent-violet)]/12 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1480px]">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <a href="#" aria-label="Web X home" className="inline-flex">
              <img
                alt="Web X"
                className="h-12 w-auto object-contain"
                src="/webx%20logo/webx.svg"
              />
            </a>

            <p className="mt-8 max-w-2xl text-pretty text-4xl font-normal leading-[1.12] tracking-tighter text-[#F3F3F3] sm:text-5xl lg:text-6xl">
              Ideas stay clearer when the whole build has one place to live.
            </p>

            <a
              className="mt-9 inline-flex h-12 items-center gap-3 rounded-full bg-[#F3F3F3] px-6 text-sm font-normal tracking-tight text-[#07062C] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F3F3F3]"
              href="mailto:hello@webx.studio"
            >
              Start a Project
              <span className="grid size-7 place-items-center rounded-full bg-[#07062C] text-[#F3F3F3]">
                <ArrowIcon />
              </span>
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-normal uppercase tracking-tight text-[#F3F3F3]/48">
                Explore
              </p>
              <nav className="mt-5 flex flex-col gap-3">
                {footerLinks.map((link) => (
                  <a
                    className="text-base font-normal tracking-tight text-[#F3F3F3]/72 transition hover:text-[#F3F3F3]"
                    href={link.href}
                    key={link.label}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-xs font-normal uppercase tracking-tight text-[#F3F3F3]/48">
                Services
              </p>
              <div className="mt-5 flex flex-col gap-3">
                {footerServices.map((service) => (
                  <span
                    className="text-base font-normal tracking-tight text-[#F3F3F3]/72"
                    key={service}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-normal uppercase tracking-tight text-[#F3F3F3]/48">
                Contact
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  className="text-base font-normal tracking-tight text-[#F3F3F3]/72 transition hover:text-[#F3F3F3]"
                  href="mailto:hello@webx.studio"
                >
                  hello@webx.studio
                </a>
                <span className="text-base font-normal tracking-tight text-[#F3F3F3]/72">
                  Client portal included
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-[#F3F3F3]/12 pt-6 text-sm font-normal tracking-tight text-[#F3F3F3]/46 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Web X. Modern website experiences.</p>
          <p>Built for clarity, credibility, and growth.</p>
        </div>
      </div>
    </footer>
  );
}
