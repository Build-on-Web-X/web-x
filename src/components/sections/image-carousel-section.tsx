"use client";

import { useMemo, useState } from "react";
import { StoryReveal } from "@/components/story-motion";
import type { Work } from "@/lib/site-data";

type ImageOrientation = "landscape" | "portrait" | "square";

const orientationSizes: Record<ImageOrientation, string> = {
  landscape: "h-56 w-[360px] sm:h-72 sm:w-[520px]",
  portrait: "h-72 w-[240px] sm:h-[420px] sm:w-[320px]",
  square: "h-64 w-[300px] sm:h-80 sm:w-[380px]",
};

function getImageOrientation(image: HTMLImageElement): ImageOrientation {
  const { naturalWidth, naturalHeight } = image;

  if (!naturalWidth || !naturalHeight) {
    return "landscape";
  }

  const ratio = naturalWidth / naturalHeight;

  if (ratio > 1.15) {
    return "landscape";
  }

  if (ratio < 0.85) {
    return "portrait";
  }

  return "square";
}

export function ImageCarouselSection({ works }: { works: Work[] }) {
  const [orientations, setOrientations] = useState<
    Record<string, ImageOrientation>
  >({});

  const carouselImages = useMemo(
    () =>
      works
        .filter((work) => Boolean(work.image))
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((work) => ({
          id: work.slug,
          alt: work.title,
          image: work.image,
        })),
    [works],
  );

  if (!carouselImages.length) {
    return null;
  }

  return (
    <section
      aria-label="Web X project imagery"
      className="overflow-hidden bg-[#07062C] py-4"
    >
      <StoryReveal direction="left">
        <div className="carousel-track flex w-max items-end gap-5">
          {[...carouselImages, ...carouselImages].map((item, index) => {
            const orientation = orientations[item.id] ?? "landscape";

            return (
              <div
                className={`carousel-image ${orientationSizes[orientation]} shrink-0 overflow-hidden border border-[#F3F3F3]/14 bg-[#121037] shadow-[0_28px_80px_rgba(0,0,0,0.3)]`}
                key={`${item.id}-${index}`}
              >
                <img
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                  onLoad={(event) => {
                    const image = event.currentTarget;
                    const detectedOrientation = getImageOrientation(image);

                    setOrientations((currentOrientations) => {
                      if (currentOrientations[item.id] === detectedOrientation) {
                        return currentOrientations;
                      }

                      return {
                        ...currentOrientations,
                        [item.id]: detectedOrientation,
                      };
                    });
                  }}
                  src={item.image}
                />
              </div>
            );
          })}
        </div>
      </StoryReveal>
    </section>
  );
}