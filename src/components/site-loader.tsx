"use client";

import { useEffect, useState } from "react";

export function SiteLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const hasSeenLoader = window.sessionStorage.getItem("webx-loader-seen");

    if (hasSeenLoader) {
      setIsVisible(false);
      return;
    }

    window.sessionStorage.setItem("webx-loader-seen", "true");

    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, 2100);

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, 2700);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-label="Loading Web X"
      aria-live="polite"
      className={`webx-site-loader ${isLeaving ? "webx-site-loader-leave" : ""}`}
      role="status"
    >
      <img
        alt="Web X"
        className="webx-site-loader-logo"
        src="/webx%20logo/webx.svg"
      />
    </div>
  );
}
