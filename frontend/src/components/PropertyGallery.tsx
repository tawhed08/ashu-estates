
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Expand,
  X,
} from "lucide-react";

import { properties } from "@/data/properties";

type Property = (typeof properties)[number];

type PropertyGalleryProps = {
  property: Property;
};

const galleryImages: Record<string, string[]> = {
  "the-obsidian-house": [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
  ],
  "the-limestone": [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
  ],
  "the-stillwater": [
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  ],
};

export default function PropertyGallery({
  property,
}: PropertyGalleryProps) {
  const images = (
    galleryImages[property.slug] ?? [
      property.image,
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    ]
  ).map((url, index) =>
    index === 0
      ? property.image
      : `${url}?auto=format&fit=crop&w=1800&q=85`,
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFullscreen(false);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
    // Gallery navigation uses the current image list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen, images.length]);

  return (
    <>
      <section className="container-shell">
        <div className="grid gap-3 md:grid-cols-[1.6fr_0.8fr]">
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="property-image group relative aspect-[4/3] overflow-hidden bg-[#E8E0D4] text-left md:aspect-[16/10]"
            aria-label={`Open ${property.name} photo gallery`}
          >
            <Image
              src={images[activeIndex]}
              alt={`${property.name} — photo ${activeIndex + 1}`}
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 65vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white md:bottom-7 md:left-7 md:right-7">
              <div>
                <p className="text-[9px] tracking-[0.2em] text-white/80">
                  ASHU ESTATES · PROPERTY GALLERY
                </p>
                <p className="display-font mt-2 text-2xl md:text-4xl">
                  Spaces Beyond Ordinary.
                </p>
              </div>

              <span className="inline-flex shrink-0 items-center gap-2 border border-white/60 px-3 py-3 text-[9px] tracking-widest">
                <Expand size={14} />
                <span className="hidden sm:inline">VIEW FULLSCREEN</span>
              </span>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3 md:grid-rows-3">
            {images.slice(1, 5).map((image, index) => {
              const imageIndex = index + 1;

              return (
                <button
                  key={`${property.slug}-${imageIndex}`}
                  type="button"
                  onClick={() => setActiveIndex(imageIndex)}
                  aria-label={`View photo ${imageIndex + 1}`}
                  aria-pressed={activeIndex === imageIndex}
                  className={`property-image relative min-h-28 overflow-hidden bg-[#E8E0D4] ${
                    activeIndex === imageIndex
                      ? "ring-2 ring-inset ring-[#8C8174]"
                      : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${property.name} — photo ${imageIndex + 1}`}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => {
                setActiveIndex(5);
                setIsFullscreen(true);
              }}
              className="relative flex min-h-28 items-center justify-center overflow-hidden bg-[#292724] text-white transition-colors hover:bg-[#484239]"
            >
              <Image
                src={images[5]}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover opacity-35"
              />
              <span className="relative text-center">
                <span className="block text-2xl">+1</span>
                <span className="mt-1 block text-[9px] tracking-widest">
                  VIEW GALLERY
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-b border-[#292724]/15 pb-4">
          <p className="text-xs text-[#8C8174]">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")} PHOTOGRAPHS
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous photo"
              className="flex h-10 w-10 items-center justify-center border border-[#292724]/20 transition-colors hover:bg-[#E8E0D4]"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="flex h-10 w-10 items-center justify-center border border-[#292724]/20 transition-colors hover:bg-[#E8E0D4]"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${property.name} photo gallery`}
          className="fixed inset-0 z-[100] flex flex-col bg-[#171614] text-white"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
            <div>
              <p className="display-font text-xl">{property.name}</p>
              <p className="mt-1 text-[10px] tracking-widest text-white/60">
                {property.location}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              aria-label="Close gallery"
              className="flex h-11 w-11 items-center justify-center border border-white/25 transition-colors hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-4 md:px-16">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous photo"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center border border-white/30 bg-black/30 transition-colors hover:bg-white/15 md:left-6"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="relative h-full max-h-[75vh] w-full">
              <Image
                src={images[activeIndex]}
                alt={`${property.name} — photo ${activeIndex + 1}`}
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center border border-white/30 bg-black/30 transition-colors hover:bg-white/15 md:right-6"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 overflow-x-auto px-4 pb-5">
            {images.map((image, index) => (
              <button
                key={`${property.slug}-fullscreen-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to photo ${index + 1}`}
                aria-pressed={activeIndex === index}
                className={`relative h-14 w-20 shrink-0 overflow-hidden border-2 transition-opacity ${
                  activeIndex === index
                    ? "border-[#C5B8A5] opacity-100"
                    : "border-transparent opacity-50 hover:opacity-90"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  unoptimized
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <p className="pb-4 text-center text-[10px] tracking-widest text-white/60">
            {activeIndex + 1} OF {images.length} · USE ← → TO NAVIGATE · ESC TO CLOSE
          </p>
        </div>
      )}
    </>
  );
}
