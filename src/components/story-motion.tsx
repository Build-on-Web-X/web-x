"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import type { ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

const directionOffset: Record<RevealDirection, { x: number; y: number }> = {
  down: { x: 0, y: -28 },
  left: { x: 34, y: 0 },
  none: { x: 0, y: 0 },
  right: { x: -34, y: 0 },
  up: { x: 0, y: 34 },
};

type StoryRevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
};

export function StoryReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  ...props
}: StoryRevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = directionOffset[direction];

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{ delay, duration: 1.14, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ amount: 0.28, once: true }}
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: 1, x: 0, y: 0 }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StoryStagger({
  children,
  className,
  delay = 0,
  ...props
}: StoryRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.12,
          },
        },
      }}
      viewport={{ amount: 0.24, once: true }}
      whileInView={reduceMotion ? undefined : "show"}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StoryItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div"> & { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
        show: {
          opacity: 1,
          transition: { duration: 0.94, ease: [0.16, 1, 0.3, 1] },
          y: 0,
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
