"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRightIcon, Navbar } from "@/components/navbar";
import { SampleWorkPreview } from "@/components/sample-work-preview";
import { Button } from "@/components/ui/button";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

type ThemeMode = "dark" | "light";

const heroReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const readTheme = () => {
      const nextTheme =
        document.documentElement.dataset.theme === "light" ? "light" : "dark";

      setTheme(nextTheme);
    };

    readTheme();

    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    window.addEventListener("storage", readTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", readTheme);
    };
  }, []);

  return theme;
}

export function HeroSection() {
  const theme = useThemeMode();
  const isLight = theme === "light";

  return (
    <section
      className={`webx-hero-shell relative flex min-h-screen w-full flex-col overflow-hidden ${
        isLight ? "bg-[#F3F3F3]" : "bg-[#07062C]"
      }`}
    >
      <AnimatedGradientBackground
        Breathing
        animationSpeed={0.018}
        breathingRange={5}
        containerClassName="webx-animated-gradient z-0"
        gradientColors={
          isLight
            ? [
                "#F3F3F3",
                "#BFD8FF",
                "#F7B7D5",
                "#FDBA74",
                "#F3D95E",
                "#BCEFD6",
                "#AEBBFF",
              ]
            : [
                "#07062C",
                "#2979FF",
                "#FF80AB",
                "#FF6D00",
                "#FFD600",
                "#00E676",
                "#3D5AFE",
              ]
        }
        gradientStops={[35, 50, 60, 70, 80, 90, 100]}
        startingGap={118}
        topOffset={0}
      />
      <div className="webx-hero-light-wash pointer-events-none absolute inset-0 z-[1]" />
      <div
        className={`pointer-events-none absolute inset-0 z-[1] ${
          isLight
            ? "bg-[linear-gradient(180deg,rgba(243,243,243,0.82)_0%,rgba(243,243,243,0.4)_42%,rgba(243,243,243,0.02)_72%,rgba(243,243,243,0)_100%)]"
            : "bg-[linear-gradient(180deg,rgba(7,6,44,0.06)_0%,rgba(7,6,44,0)_42%,rgba(7,6,44,0.42)_78%,#07062C_100%)]"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-72 ${
          isLight
            ? "bg-[linear-gradient(180deg,rgba(243,243,243,0)_0%,rgba(243,243,243,0.22)_38%,rgba(243,243,243,0.72)_74%,#F3F3F3_100%)]"
            : "bg-[linear-gradient(180deg,rgba(7,6,44,0)_0%,rgba(7,6,44,0.24)_36%,rgba(7,6,44,0.78)_76%,#07062C_100%)]"
        }`}
      />

      <div className="relative z-20 flex min-h-screen flex-col">
        <Navbar />

        <main className="mx-auto flex w-full max-w-[1480px] flex-1 items-center px-4 pb-10 pt-24 sm:px-[1.5%] lg:px-[1%]">
          <section className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <motion.p
              animate="show"
              className={`mb-6 inline-flex items-center gap-3 text-xs font-normal uppercase tracking-tight ${
                isLight ? "text-[#07062C]" : "text-[#F3F3F3]"
              }`}
              initial="hidden"
              variants={heroReveal}
            >
              <span
                className={
                  isLight ? "text-[#07062C]/45" : "text-[#F3F3F3]/50"
                }
              >
                [
              </span>
              <span>Modern Website Experiences</span>
              <span
                className={
                  isLight ? "text-[#07062C]/45" : "text-[#F3F3F3]/50"
                }
              >
                ]
              </span>
            </motion.p>

            <motion.h1
              animate="show"
              className={`max-w-5xl text-balance text-4xl font-medium leading-[1.02] tracking-tighter sm:text-6xl lg:text-7xl ${
                isLight ? "text-[#07062C]" : "text-[#F3F3F3]"
              }`}
              initial="hidden"
              transition={{ delay: 0.08 }}
              variants={heroReveal}
            >
              Where Ideas Become Experiences
            </motion.h1>

            <motion.p
              animate="show"
              className={`mt-7 max-w-3xl text-pretty text-base leading-8 tracking-tight sm:text-lg ${
                isLight ? "text-[#07062C]/68" : "text-[#F3F3F3]/72"
              }`}
              initial="hidden"
              transition={{ delay: 0.16 }}
              variants={heroReveal}
            >
              We transform ideas into modern digital experiences that help
              businesses connect with their audience, build credibility, and
              create lasting impact online.
            </motion.p>

            <motion.div
              animate="show"
              initial="hidden"
              transition={{ delay: 0.24 }}
              variants={heroReveal}
            >
              <Button
                asChild
                className="webx-primary-button mt-10 h-11 gap-3 rounded-full bg-[#F3F3F3] px-5 text-sm font-normal tracking-tight text-[#07062C] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8f86dc]"
              >
                <a href="/works">
                  View Our Work
                  <span
                    aria-hidden="true"
                    className="hero-cta-icon grid size-7 place-items-center rounded-full bg-[#07062C] text-[#F3F3F3]"
                  >
                    <ArrowUpRightIcon className="size-4" />
                  </span>
                </a>
              </Button>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full"
              initial={{ opacity: 0, scale: 0.96, y: 40 }}
              transition={{ delay: 0.34, duration: 1.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <SampleWorkPreview />
            </motion.div>
          </section>
        </main>
      </div>
    </section>
  );
}
