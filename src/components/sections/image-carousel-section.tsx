const carouselImages = [
  {
    alt: "Modern office workspace with warm light",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    size: "h-64 w-[360px] sm:h-80 sm:w-[520px]",
  },
  {
    alt: "Abstract architectural detail with sharp lines",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
    size: "h-80 w-[260px] sm:h-[420px] sm:w-[340px]",
  },
  {
    alt: "Team collaborating around a laptop",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1100&q=80",
    size: "h-56 w-[320px] sm:h-72 sm:w-[460px]",
  },
  {
    alt: "Developer screen with interface code",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
    size: "h-72 w-[300px] sm:h-96 sm:w-[400px]",
  },
  {
    alt: "Creative team in a planning meeting",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1100&q=80",
    size: "h-60 w-[340px] sm:h-80 sm:w-[500px]",
  },
];

export function ImageCarouselSection() {
  return (
    <section
      aria-label="Web X creative work imagery"
      className="overflow-hidden bg-[#07062C] py-4"
    >
      <div className="carousel-track flex w-max items-end gap-5">
        {[...carouselImages, ...carouselImages].map((item, index) => (
          <div
            aria-label={item.alt}
            className={`${item.size} shrink-0 overflow-hidden border border-[#F3F3F3]/14 bg-[#F3F3F3]/8 bg-cover bg-center shadow-[0_28px_80px_rgba(0,0,0,0.3)]`}
            key={`${item.alt}-${index}`}
            role="img"
            style={{ backgroundImage: `url(${item.image})` }}
          />
        ))}
      </div>
    </section>
  );
}
