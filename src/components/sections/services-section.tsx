const services = [
  {
    title: "Website Development",
    description:
      "Custom websites built for businesses, startups, and organizations.",
    icon: (
      <path
        d="M5.5 9.5H26.5M8.5 6.5H23.5C25.2 6.5 26.5 7.8 26.5 9.5V22.5C26.5 24.2 25.2 25.5 23.5 25.5H8.5C6.8 25.5 5.5 24.2 5.5 22.5V9.5C5.5 7.8 6.8 6.5 8.5 6.5ZM10 14H16M10 18H22M10 22H18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Landing Pages",
    description:
      "High-converting landing pages for campaigns, products, events, and lead generation.",
    icon: (
      <path
        d="M16 5.5V26.5M8.5 9.5H23.5M8.5 15.5H19.5M8.5 21.5H15.5M23.5 9.5L20.5 6.5M23.5 9.5L20.5 12.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "E-Commerce Websites",
    description:
      "Online stores designed to showcase products and streamline purchases.",
    icon: (
      <path
        d="M7 9.5H25L23 20.5H10L7 9.5ZM7 9.5L6 6.5H3.5M11 25.5C11.8 25.5 12.5 24.8 12.5 24C12.5 23.2 11.8 22.5 11 22.5C10.2 22.5 9.5 23.2 9.5 24C9.5 24.8 10.2 25.5 11 25.5ZM22 25.5C22.8 25.5 23.5 24.8 23.5 24C23.5 23.2 22.8 22.5 22 22.5C21.2 22.5 20.5 23.2 20.5 24C20.5 24.8 21.2 25.5 22 25.5ZM12.5 14.5H20.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Website Redesigns",
    description:
      "Modernizing outdated websites to improve user experience, performance, and credibility.",
    icon: (
      <path
        d="M7.5 16C7.5 11.3 11.3 7.5 16 7.5C18.6 7.5 20.9 8.7 22.5 10.5M24.5 7.5V12.5H19.5M24.5 16C24.5 20.7 20.7 24.5 16 24.5C13.4 24.5 11.1 23.3 9.5 21.5M7.5 24.5V19.5H12.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Website Maintenance",
    description:
      "Ongoing updates, security monitoring, backups, and technical support.",
    icon: (
      <path
        d="M16 5.5L24.5 9V15.5C24.5 20.4 21.1 24.8 16 26.5C10.9 24.8 7.5 20.4 7.5 15.5V9L16 5.5ZM12.5 16.2L15 18.7L20 13.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Website Hosting & Deployment",
    description:
      "Domain connection, hosting setup, SSL configuration, and website launch management.",
    icon: (
      <path
        d="M16 6.5C20.9 6.5 24.8 10.3 24.8 15.1C24.8 19.9 20.9 23.7 16 23.7M16 6.5C11.1 6.5 7.2 10.3 7.2 15.1C7.2 19.9 11.1 23.7 16 23.7M16 6.5C18.1 8.7 19.2 11.5 19.2 15.1C19.2 18.7 18.1 21.5 16 23.7M16 6.5C13.9 8.7 12.8 11.5 12.8 15.1C12.8 18.7 13.9 21.5 16 23.7M8 15.1H24M10 10.5H22M10 19.7H22"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    ),
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
                <span className="grid size-12 place-items-center rounded-full border border-[#F3F3F3]/14 bg-[#F3F3F3]/6 text-[#F3F3F3]/68 transition group-hover:border-[#F3F3F3]/30 group-hover:text-[#F3F3F3] group-focus-within:border-[#F3F3F3]/30 group-focus-within:text-[#F3F3F3]">
                  <svg
                    aria-hidden="true"
                    className="size-7"
                    fill="none"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {service.icon}
                  </svg>
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
