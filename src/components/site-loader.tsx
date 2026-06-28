"use client";

import { useEffect, useState } from "react";

const loaderSessionKey = "webx-loader-seen";
const leaveDelay = 1120;
const hideDelay = 1920;

export function SiteLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const body = document.body;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    try {
      if (window.sessionStorage.getItem(loaderSessionKey)) {
        body.classList.add("webx-loaded");
        setIsVisible(false);
        return;
      }

      window.sessionStorage.setItem(loaderSessionKey, "true");
    } catch {
      // The intro can still run when storage is unavailable.
    }

    body.classList.remove("webx-loaded");
    body.classList.add("webx-loading");

    const startExit = () => {
      setIsLeaving(true);
      body.classList.remove("webx-loading");
      body.classList.add("webx-loaded");
    };

    const leaveTimer = window.setTimeout(
      startExit,
      prefersReducedMotion ? 80 : leaveDelay,
    );
    const hideTimer = window.setTimeout(
      () => setIsVisible(false),
      prefersReducedMotion ? 220 : hideDelay,
    );

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      body.classList.remove("webx-loading");
      body.classList.add("webx-loaded");
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`webx-site-loader ${isLeaving ? "webx-site-loader-leave" : ""}`}
    >
      <div className="webx-site-loader-glow" />
      <div className="webx-site-loader-mark">
        <img
          alt=""
          className="webx-site-loader-logo"
          src="/webx%20logo/webx.svg"
        />
        <span className="webx-site-loader-shine" />
      </div>
    </div>
  );
}
