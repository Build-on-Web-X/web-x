import { StoryItem, StoryReveal, StoryStagger } from "@/components/story-motion";

const footerColumns = [
  {
    title: "Quick links",
    links: [
      { label: "Home", href: "#" },
      { label: "About us", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Works", href: "/works" },
      { label: "Client portal", href: "/client-portal" },
      { label: "Start a project", href: "/start-a-project" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Websites", href: "#services" },
      { label: "Landing pages", href: "#services" },
      { label: "E-commerce", href: "#services" },
      { label: "Maintenance", href: "#services" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms and conditions", href: "/terms-and-conditions" },
      { label: "Email us", href: "mailto:buildonwebx@gmail.com" },
      { label: "Client access", href: "/client-portal" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <path
        d="M13.5 8.5H16V5H13.5C10.8 5 9 6.8 9 9.5V12H6V15.5H9V23H12.8V15.5H15.6L16.2 12H12.8V9.7C12.8 8.9 13.1 8.5 13.5 8.5Z"
        fill="currentColor"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <>
        <path d="M7.4 9.4H4V23H7.4V9.4Z" fill="currentColor" />
        <path
          d="M5.7 7.7C6.8 7.7 7.6 6.9 7.6 5.9C7.6 4.8 6.8 4 5.7 4C4.6 4 3.8 4.8 3.8 5.9C3.8 6.9 4.6 7.7 5.7 7.7Z"
          fill="currentColor"
        />
        <path
          d="M13.2 15.5C13.2 13.6 14.1 12.7 15.5 12.7C16.8 12.7 17.4 13.6 17.4 15.3V23H20.8V14.8C20.8 11.2 18.9 9.1 16 9.1C14 9.1 12.8 10.2 12.3 11.1V9.4H9V23H12.4V15.5H13.2Z"
          fill="currentColor"
        />
      </>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <>
        <rect
          height="15"
          rx="4"
          stroke="currentColor"
          strokeWidth="2"
          width="15"
          x="4.5"
          y="4.5"
        />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="16.6" cy="7.4" fill="currentColor" r="1" />
      </>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <path
        d="M5 5H9.4L12.6 9.3L16.4 5H19L13.8 10.9L20 19H15.6L12.1 14.3L8 19H5.3L10.9 12.6L5 5ZM8.1 6.7L16.4 17.3H17L8.7 6.7H8.1Z"
        fill="currentColor"
      />
    ),
  },
];

export function FooterSection() {
  return (
    <footer className="webx-footer overflow-hidden bg-[#07062C] px-4 pb-4 pt-12 text-[#F3F3F3] sm:px-[1.5%] lg:px-[1%]">
      <div className="mx-auto max-w-[1480px]">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1.85fr]">
          <StoryReveal direction="right">
            <a href="#" aria-label="Web X home" className="inline-flex">
              <img
                alt="Web X"
                className="webx-logo h-11 w-auto object-contain"
                src="/webx%20logo/webx.svg"
              />
            </a>

            <p className="mt-5 max-w-sm text-sm font-normal leading-6 tracking-tight text-[#F3F3F3]/62">
              Modern website design and development for businesses that need
              clarity, credibility, and a stronger digital presence.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  aria-label={social.label}
                  className="grid size-9 place-items-center rounded-full border border-[#F3F3F3]/14 text-[#F3F3F3]/66 transition hover:border-[#F3F3F3]/34 hover:text-[#F3F3F3]"
                  href={social.href}
                  key={social.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    aria-hidden="true"
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </StoryReveal>

          <StoryStagger className="grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <StoryItem key={column.title}>
                <p className="text-sm font-normal tracking-tight text-[#F3F3F3]">
                  {column.title}
                </p>
                <nav className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <a
                      className="text-xs font-normal tracking-tight text-[#F3F3F3]/50 transition hover:text-[#F3F3F3]"
                      href={link.href}
                      key={link.label}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </StoryItem>
            ))}
          </StoryStagger>
        </div>

        <StoryReveal className="mt-12 flex flex-col gap-4 text-xs font-normal tracking-tight text-[#F3F3F3]/46 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Web X. All rights reserved.</p>
          <p>Design and development by Web X.</p>
        </StoryReveal>
      </div>
    </footer>
  );
}
