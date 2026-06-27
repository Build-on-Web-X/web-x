"use client";

import { useEffect, useState } from "react";
import { BookCallTrigger } from "@/components/book-call-modal";

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
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Works", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateNavbarSurface = () => {
      const currentScrollY = window.scrollY;

      setHasScrolled(currentScrollY > 12);
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 96);
      lastScrollY = currentScrollY;
    };

    updateNavbarSurface();
    window.addEventListener("scroll", updateNavbarSurface, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateNavbarSurface);
    };
  }, []);

  return (
    <header
      className={`webx-navbar fixed inset-x-0 top-0 z-50 transition duration-300 ${
        isHidden ? "webx-navbar-hidden" : ""
      } ${
        hasScrolled
          ? "webx-navbar-scrolled bg-[#07062C] shadow-[0_12px_40px_rgba(0,0,0,0.26)]"
          : "webx-navbar-top bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between px-4 py-5 sm:px-[1.5%] lg:px-[1%]">
        <a
          href="/"
          className="group flex items-center"
          aria-label="Web X home"
        >
          <img
            alt="Web X"
            className="webx-logo h-10 w-auto object-contain"
            src="/webx%20logo/webx.svg"
          />
        </a>

        <nav className="hidden items-center gap-9 text-base font-normal tracking-tight text-[#F3F3F3] lg:flex">
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

        <BookCallTrigger className="webx-primary-button inline-flex h-11 items-center justify-center gap-3 rounded-full bg-[#F3F3F3] px-5 text-sm font-normal tracking-tight text-[#07062C] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8f86dc]">
          Start a Project
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-full bg-[#07062C] text-[#F3F3F3]"
          >
            <ArrowUpRightIcon className="size-4" />
          </span>
        </BookCallTrigger>
      </div>
    </header>
  );
}

export { ArrowUpRightIcon };
