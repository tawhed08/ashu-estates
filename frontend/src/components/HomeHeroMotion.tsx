
"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HomeHeroMotion({
  children,
}: {
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          // 1. Hero text entrance.
          // The slideshow handles image transitions separately.
          const heroTimeline = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          heroTimeline.fromTo(
            ".hero-reveal",
            {
              y: 30,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              stagger: 0.14,
              clearProps: "transform",
            },
          );

          // 2. Reveal homepage section content on scroll.
          gsap
            .utils
            .toArray<HTMLElement>(".section-space")
            .forEach((section) => {
              const content = section.querySelectorAll(
                ".container-shell > div",
              );

              if (!content.length) return;

              gsap.fromTo(
                content,
                {
                  y: 32,
                  autoAlpha: 0,
                },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.85,
                  stagger: 0.13,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    once: true,
                  },
                },
              );
            });

          // 3. Staggered property card entrance.
          gsap
            .utils
            .toArray<HTMLElement>(".property-card")
            .forEach((card, index) => {
              gsap.fromTo(
                card,
                {
                  y: 38,
                  autoAlpha: 0,
                },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.8,
                  delay: (index % 3) * 0.1,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    once: true,
                  },
                },
              );
            });

          // 4. Property image mask reveal.
          gsap
            .utils
            .toArray<HTMLElement>(".property-image")
            .forEach((image) => {
              gsap.fromTo(
                image,
                {
                  clipPath: "inset(0 0 100% 0)",
                },
                {
                  clipPath: "inset(0 0 0% 0)",
                  duration: 1.05,
                  ease: "power3.inOut",
                  scrollTrigger: {
                    trigger: image,
                    start: "top 88%",
                    once: true,
                  },
                },
              );
            });

          // 5. Gentle property image parallax.
          gsap
            .utils
            .toArray<HTMLElement>(".property-image img")
            .forEach((image) => {
              gsap.fromTo(
                image,
                {
                  yPercent: -3,
                  scale: 1.06,
                },
                {
                  yPercent: 3,
                  scale: 1.06,
                  ease: "none",
                  scrollTrigger: {
                    trigger: image,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.6,
                  },
                },
              );
            });

          // Recalculate scroll positions after layout and images settle.
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
        containerRef,
      );

      return () => media.revert();
    },
    { scope: containerRef },
  );

  return <main ref={containerRef}>{children}</main>;
}
