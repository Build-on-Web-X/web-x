"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";

const visibilityThreshold = 500;
const animationDuration = 1050;

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function ArrowUpIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 16V4M5.5 8.5 10 4l4.5 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const animationFrame = useRef<number | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > visibilityThreshold);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);

      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  function setScrollPosition(top: number) {
    if (lenis) {
      lenis.scrollTo(top, { force: true, immediate: true });
      return;
    }

    window.scrollTo(0, top);
  }

  function scrollToTop() {
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScrollPosition(0);
      return;
    }

    const startY = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / animationDuration,
        1,
      );
      const easedProgress = easeInOutCubic(progress);

      setScrollPosition(startY * (1 - easedProgress));

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animateScroll);
      } else {
        animationFrame.current = null;
        setScrollPosition(0);
      }
    };

    animationFrame.current = requestAnimationFrame(animateScroll);
  }

  return (
    <button
      aria-hidden={!isVisible}
      aria-label="Scroll to top"
      className={`webx-scroll-top-button fixed bottom-5 right-5 z-[60] grid size-12 place-items-center rounded-full border border-[#F3F3F3]/16 bg-[#121037]/92 text-[#F3F3F3] shadow-[0_16px_44px_rgba(0,0,0,0.32)] backdrop-blur-md ${
        isVisible ? "is-visible" : ""
      }`}
      onClick={scrollToTop}
      tabIndex={isVisible ? 0 : -1}
      type="button"
    >
      <ArrowUpIcon />
    </button>
  );
}
