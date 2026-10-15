
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type HeroSlide = {
  image: string;
  alt: string;
};

type HeroSlideshowProps = {
  slides: HeroSlide[];
};

const SLIDE_DURATION = 6000;
const TRANSITION_DURATION = 1.5;

export default function HeroSlideshow({
  slides,
}: HeroSlideshowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const previousIndexRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Automatically advance and restart the timer after manual selection.
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeIndex, slides.length]);

  // Cinematic crossfade and zoom transitions.
  useGSAP(
    () => {
      const slideElements =
        gsap.utils.toArray<HTMLElement>(".hero-slide");

      if (!slideElements.length) return;

      const currentSlide = slideElements[activeIndex];

      if (!currentSlide) return;

      const previousIndex = previousIndexRef.current;

      // Set up the initial slide only once.
      if (previousIndex === null) {
        gsap.set(slideElements, {
          autoAlpha: 0,
          scale: 1.08,
        });

        gsap.set(currentSlide, {
          autoAlpha: 1,
          scale: 1,
        });

        previousIndexRef.current = activeIndex;
      } else if (previousIndex !== activeIndex) {
        const previousSlide = slideElements[previousIndex];

        // Prevent overlapping transitions when users click quickly.
        gsap.killTweensOf(slideElements);

        gsap.set(currentSlide, {
          autoAlpha: 1,
          scale: 1.08,
        });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
        });

        timeline
          .to(
            currentSlide,
            {
              scale: 1,
              duration: TRANSITION_DURATION,
            },
            0,
          )
          .to(
            currentSlide,
            {
              autoAlpha: 1,
              duration: 0.9,
            },
            0,
          );

        if (previousSlide) {
          timeline.to(
            previousSlide,
            {
              autoAlpha: 0,
              scale: 1.04,
              duration: TRANSITION_DURATION,
            },
            0,
          );
        }

        previousIndexRef.current = activeIndex;
      }

      // Restart the progress bar for every slide.
      if (progressRef.current) {
        gsap.killTweensOf(progressRef.current);

        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: SLIDE_DURATION / 1000,
            ease: "none",
          },
        );
      }
    },
    {
      scope: containerRef,
      dependencies: [activeIndex, slides.length],
      revertOnUpdate: false,
    },
  );

  if (slides.length === 0) {
    return (
      <div className="absolute inset-0 bg-[#292724]" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      aria-label="Featured properties slideshow"
      aria-roledescription="carousel"
    >
      {slides.map((slide, index) => (
        <div
          key={`${slide.image}-${index}`}
          className="hero-slide absolute inset-0"
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            unoptimized
            sizes="100vw"
            className="hero-image object-cover"
          />
        </div>
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-7 right-6 z-20 flex items-center gap-4 md:bottom-10 md:right-12">
          <span
            className="min-w-[44px] font-serif text-sm text-white"
            aria-live="polite"
            aria-atomic="true"
          >
            {String(activeIndex + 1).padStart(2, "0")}
            <span className="mx-1 text-white/45">/</span>
            <span className="text-white/60">
              {String(slides.length).padStart(2, "0")}
            </span>
          </span>

          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={`${slide.image}-dot-${index}`}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                aria-current={
                  index === activeIndex ? "true" : undefined
                }
                onClick={() => setActiveIndex(index)}
                className="group flex h-6 items-center justify-center"
              >
                <span
                  className={`block h-[3px] overflow-hidden transition-[width,background-color] duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-white/35"
                      : "w-3 bg-white/55 group-hover:bg-white"
                  }`}
                >
                  {index === activeIndex && (
                    <span
                      ref={progressRef}
                      className="block h-full origin-left bg-[#C5B8A5]"
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
