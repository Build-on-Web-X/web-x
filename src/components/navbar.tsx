import { Button } from "@/components/ui/button";

function ArrowUpRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 20 20"
      fill="none"
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

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
      <a
        href="#"
        className="group flex items-center gap-3"
        aria-label="Web X home"
      >
        <span className="grid size-10 place-items-center rounded-full bg-[#F3F3F3] text-sm font-bold text-[#07062C] shadow-[0_0_30px_rgba(143,134,220,0.28)]">
          WX
        </span>
        <span className="text-lg font-semibold text-[#F3F3F3]">Web X</span>
      </a>

      <nav className="hidden items-center gap-9 text-base font-normal text-[#F3F3F3] lg:flex">
        {navItems.map((item) => (
          <a
            className="transition hover:text-[#F3F3F3]/72"
            href={item.href}
            key={item.label}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <Button
        asChild
        className="h-11 gap-3 rounded-full bg-[#F3F3F3] px-5 text-sm font-semibold text-[#07062C] shadow-none hover:bg-white focus-visible:outline-[#8f86dc]"
      >
        <a href="#contact">
          Book a Call
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-full bg-[#07062C] text-[#F3F3F3]"
          >
            <ArrowUpRightIcon className="size-4" />
          </span>
        </a>
      </Button>
    </header>
  );
}

export { ArrowUpRightIcon };
