"use client";

import { StoryReveal } from "@/components/story-motion";
import type { Work } from "@/lib/site-data";

const imageSizes = [
  "h-64 w-[360px] sm:h-80 sm:w-[520px]",
  "h-80 w-[260px] sm:h-[420px] sm:w-[340px]",
  "h-56 w-[320px] sm:h-72 sm:w-[460px]",
  "h-72 w-[300px] sm:h-96 sm:w-[400px]",
  "h-60 w-[340px] sm:h-80 sm:w-[500px]",
];

export function ImageCarouselSection({ works }: { works: Work[] }) {
  const carouselImages = works
    .filter((work) => work.image)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((work, index) => ({
      alt: work.title,
      image: work.image,
      size: imageSizes[index % imageSizes.length] ?? imageSizes[0],
    }));

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
          {[...carouselImages, ...carouselImages].map((item, index) => (
            <div
              aria-label={item.alt}
              className={`carousel-image ${item.size} shrink-0 overflow-hidden border border-[#F3F3F3]/14 bg-cover bg-center shadow-[0_28px_80px_rgba(0,0,0,0.3)]`}
              key={`${item.alt}-${index}`}
              role="img"
              style={{ backgroundImage: `url(${item.image})` }}
            />
          ))}
        </div>
      </StoryReveal>
    </section>
  );
}