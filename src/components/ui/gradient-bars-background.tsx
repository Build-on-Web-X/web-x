import type { ReactNode } from "react";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

interface GradientBarsBackgroundProps {
  children?: ReactNode;
  className?: string;
}

export function GradientBarsBackground({
  children,
  className = "",
}: GradientBarsBackgroundProps) {
  return (
    <section
      className={`relative flex min-h-screen w-full flex-col overflow-hidden bg-[#07062C] ${className}`}
    >
      <AnimatedGradientBackground
        Breathing
        animationSpeed={0.018}
        breathingRange={5}
        containerClassName="z-0"
        gradientColors={[
          "#07062C",
          "#2979FF",
          "#FF80AB",
          "#FF6D00",
          "#FFD600",
          "#00E676",
          "#3D5AFE",
        ]}
        gradientStops={[35, 50, 60, 70, 80, 90, 100]}
        startingGap={118}
        topOffset={0}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(7,6,44,0.06)_0%,rgba(7,6,44,0)_42%,rgba(7,6,44,0.42)_78%,#07062C_100%)]" />
      {children && (
        <div className="relative z-20 flex min-h-screen flex-col">{children}</div>
      )}
    </section>
  );
}
