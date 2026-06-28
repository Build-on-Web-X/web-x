"use client";

import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 13.25A3.25 3.25 0 1 0 10 6.75A3.25 3.25 0 0 0 10 13.25ZM10 2.5V4M10 16V17.5M4.7 4.7L5.75 5.75M14.25 14.25L15.3 15.3M2.5 10H4M16 10H17.5M4.7 15.3L5.75 14.25M14.25 5.75L15.3 4.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 12.4A6.1 6.1 0 0 1 7.6 4.25A6.85 6.85 0 1 0 15.75 12.4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [isPortalRoute, setIsPortalRoute] = useState(false);

  useEffect(() => {
    setIsPortalRoute(
      window.location.pathname.startsWith("/client-portal") ||
        window.location.pathname.startsWith("/webx-admin"),
    );

    const storedTheme = window.localStorage.getItem("webx-theme") as
      | ThemeMode
      | null;
    const nextTheme = storedTheme ?? "dark";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle(
      "theme-light",
      nextTheme === "light",
    );
    document.documentElement.classList.toggle(
      "theme-dark",
      nextTheme !== "light",
    );
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle(
      "theme-light",
      nextTheme === "light",
    );
    document.documentElement.classList.toggle(
      "theme-dark",
      nextTheme !== "light",
    );
    window.localStorage.setItem("webx-theme", nextTheme);
  }

  if (isPortalRoute) {
    return null;
  }

  return (
    <button
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "light"}
      className="webx-theme-toggle fixed bottom-5 left-5 z-[2147483647] grid size-12 place-items-center rounded-full border border-[#F3F3F3]/16 bg-[#07062C]/86 text-[#F3F3F3] shadow-[0_16px_44px_rgba(0,0,0,0.32)] backdrop-blur-md transition hover:border-[#F3F3F3]/34"
      onClick={toggleTheme}
      type="button"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
