"use client";

import { useEffect, useState } from "react";

type LoaderPhase = "prepare" | "enter" | "hold" | "reveal" | "done";

const FORCE_LOADER = process.env.NEXT_PUBLIC_FORCE_LOADER === "true";
const LOADER_SESSION_KEY = "webx-loader-seen";

const STANDARD_TIMINGS = {
  hold: 720,
  reveal: 1800,
  done: 3900,
};

const REDUCED_MOTION_TIMINGS = {
  hold: 60,
  reveal: 140,
  done: 360,
};

export function SiteLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("prepare");

  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let shouldPlay = FORCE_LOADER;

    try {
      shouldPlay ||= !window.sessionStorage.getItem(LOADER_SESSION_KEY);

      if (shouldPlay && !FORCE_LOADER) {
        window.sessionStorage.setItem(LOADER_SESSION_KEY, "true");
      }
    } catch {
      // Keep the intro available when session storage is blocked.
      shouldPlay = true;
    }

    if (!shouldPlay) {
      root.classList.remove("webx-intro-pending");
      body.classList.remove("webx-page-loading");
      body.classList.add("webx-page-revealed");
      setPhase("done");
      return;
    }

    const timings = reducedMotion
      ? REDUCED_MOTION_TIMINGS
      : STANDARD_TIMINGS;
    const timers: number[] = [];
    let startFrame = 0;

    root.classList.add("webx-intro-pending");
    body.classList.remove("webx-page-revealed");
    body.classList.add("webx-page-loading");
    setPhase("prepare");

    startFrame = window.requestAnimationFrame(() => {
      setPhase("enter");
      timers.push(
        window.setTimeout(() => setPhase("hold"), timings.hold),
        window.setTimeout(() => {
          setPhase("reveal");
          body.classList.remove("webx-page-loading");
          body.classList.add("webx-page-revealed");
        }, timings.reveal),
        window.setTimeout(() => {
          root.classList.remove("webx-intro-pending");
          setPhase("done");
        }, timings.done),
      );
    });

    return () => {
      window.cancelAnimationFrame(startFrame);
      timers.forEach((timer) => window.clearTimeout(timer));
      root.classList.remove("webx-intro-pending");
      body.classList.remove("webx-page-loading");
      body.classList.add("webx-page-revealed");
    };
  }, []);

  if (phase === "done") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`webx-loader webx-loader--${phase}`}
      data-phase={phase}
    >
      <div className="webx-loader-curtain webx-loader-curtain-secondary" />
      <div className="webx-loader-curtain webx-loader-curtain-primary">
        <div className="webx-loader-bg" />
        <div className="webx-loader-glow" />

        <div className="webx-loader-logo-stage">
          <span className="webx-loader-logo-halo" />
          <div className="webx-loader-logo-frame">
            <div className="webx-loader-logo-art">
              <img
                alt=""
                className="webx-loader-logo"
                src="/webx%20logo/webx.svg"
              />
              <img
                alt=""
                className="webx-loader-logo-shine"
                src="/webx%20logo/webx.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
