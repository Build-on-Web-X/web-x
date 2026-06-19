const services = [
  {
    title: "Website Development",
    description:
      "Custom websites built for businesses, startups, and organizations.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Landing Pages",
    description:
      "High-converting landing pages for campaigns, products, events, and lead generation.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "E-Commerce Websites",
    description:
      "Online stores designed to showcase products and streamline purchases.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Website Redesigns",
    description:
      "Modernizing outdated websites to improve user experience, performance, and credibility.",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Website Maintenance",
    description:
      "Ongoing updates, security monitoring, backups, and technical support.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Website Hosting & Deployment",
    description:
      "Domain connection, hosting setup, SSL configuration, and website launch management.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-8"
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

export function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-[#07062C] px-4 py-20 text-[#F3F3F3] sm:px-[1.5%] sm:py-24 lg:px-[1%]"
    >
      <div className="mx-auto max-w-[1480px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="inline-flex items-center gap-3 text-xs font-normal uppercase tracking-tight">
            <span className="text-[#F3F3F3]/50">[</span>
            <span>What We Build</span>
            <span className="text-[#F3F3F3]/50">]</span>
          </p>

          <h2 className="mt-8 text-balance text-5xl font-normal leading-[1.08] tracking-tighter sm:text-6xl lg:text-7xl">
            Website services for ideas ready to grow
          </h2>

          <p className="mt-6 text-lg leading-8 tracking-tight text-[#F3F3F3]/64 sm:text-xl">
            From first impression to long-term support, we build the digital
            foundation businesses need to look credible, move faster, and win
            online.
          </p>
        </div>

        <div className="relative mt-16">
          {services.map((service, index) => (
            <article
              className="webx-service-row group border-t border-[#F3F3F3]/16 outline-none last:border-b"
              key={service.title}
            >
              <a
                className="grid gap-5 px-4 py-6 text-left outline-none sm:px-8 lg:min-h-32 lg:grid-cols-[0.12fr_0.68fr_280px_0.9fr_auto] lg:items-center lg:gap-8 xl:grid-cols-[0.14fr_0.78fr_320px_1fr_auto]"
                href="#contact"
              >
                <span className="text-base tracking-tight text-[#F3F3F3]/55">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-3xl font-normal tracking-tight text-[#F3F3F3]/68 transition-colors group-hover:text-[#F3F3F3] group-focus-within:text-[#F3F3F3] lg:text-4xl">
                  {service.title}
                </h3>

                <span
                  aria-hidden="true"
                  className="relative z-10 hidden h-full min-h-24 lg:block"
                >
                  <span
                    className="sample-main-card webx-media-clean absolute left-1/2 top-1/2 block aspect-[1.32] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-[1.15rem] bg-cover bg-center opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100 xl:w-[300px]"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                </span>

                <p className="max-w-md text-lg leading-7 tracking-tight text-[#F3F3F3]/58 transition-colors group-hover:text-[#F3F3F3]/88 group-focus-within:text-[#F3F3F3]/88 lg:max-w-none">
                  {service.description}
                </p>

                <span className="text-[#F3F3F3]/50 transition group-hover:translate-x-2 group-hover:text-[#F3F3F3] group-focus-within:translate-x-2 group-focus-within:text-[#F3F3F3]">
                  <ArrowIcon />
                </span>

                <span
                  aria-hidden="true"
                  className="sample-main-card webx-media-clean mt-2 block aspect-[1.35] w-full max-w-sm rounded-[1.15rem] bg-cover bg-center lg:hidden"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
