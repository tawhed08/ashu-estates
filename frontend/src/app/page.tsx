
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HomeHeroMotion from "@/components/HomeHeroMotion";
import HeroSlideshow from "@/components/HeroSlideshow";
import { properties } from "@/data/properties";

export default function HomePage() {
  const heroSlides = properties.map((property) => ({
    image: property.image,
    alt: property.name,
  }));

  return (
    <HomeHeroMotion>
      <section className="relative flex min-h-[720px] h-[92svh] max-h-[1050px] flex-col justify-between overflow-hidden bg-[#292724] text-[#F5F1EA]">
        {/* Cinematic Hero Slideshow */}
        <HeroSlideshow slides={heroSlides} />

        {/* Background overlays */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-black/35" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#292724] via-black/15 to-black/35" />

        <SiteHeader overlay />

        {/* Hero Content */}
        <div className="container-shell relative z-10 pb-12 pt-28 md:pb-20">
          <p className="hero-reveal eyebrow mb-7 text-[#E8E0D4]">
            A NEW PERSPECTIVE ON LIVING
          </p>

          <h1 className="hero-reveal display-font text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.9]">
            Spaces Beyond
            <br />
            <span className="italic text-[#C5B8A5]">
              Ordinary.
            </span>
          </h1>

          <div className="mt-8 flex max-w-xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="hero-reveal max-w-sm text-sm leading-7 text-white/75">
              Thoughtfully considered properties for a more meaningful way
              of living in Bangladesh.
            </p>

            <Link
              href="/properties"
              className="hero-reveal outline-button w-fit"
            >
              Explore Properties
              <ArrowDownRight size={15} />
            </Link>
          </div>

          <div className="hero-reveal mt-16 flex justify-between border-t border-white/30 pt-5">
            <span className="text-[10px] tracking-widest text-white/65">
              DHAKA, BANGLADESH
            </span>

            <Link
              href="/about"
              className="flex items-center gap-2 text-[10px] tracking-widest text-white/75"
            >
              DISCOVER OUR STORY
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-space bg-[#F5F1EA]">
        <div className="container-shell grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <div>
            <span className="eyebrow">THE ASHU PERSPECTIVE</span>

            <p className="mt-7 max-w-xs text-sm leading-7 text-[#8C8174]">
              A more thoughtful approach to property, architecture and the
              everyday experience of coming home.
            </p>
          </div>

          <div>
            <h2 className="display-font text-[clamp(2.7rem,5.5vw,5.4rem)] leading-[1.03]">
              Not simply a place to live.
              <span className="text-[#8C8174]">
                {" "}A place to belong.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-[#71685E]">
              We believe exceptional living begins with considered choices.
              Every space should feel intentional, personal and connected to
              the way people want to live.
            </p>

            <Link href="/about" className="solid-button mt-7">
              About ASHU ESTATES
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

     
      {/* Featured Properties */}
      <section className="section-space bg-[#E8E0D4]">
        <div className="container-shell">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">
                A CONSIDERED COLLECTION
              </span>

              <h2 className="display-font mt-5 text-[clamp(2.8rem,6vw,5.8rem)] leading-none">
                Exceptional{" "}
                <span className="italic">by design.</span>
              </h2>
            </div>

            <Link
              href="/properties"
              className="solid-button group w-fit"
            >
              View All Properties
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, index) => (
              <Link
                key={property.slug}
                href={`/properties/${property.slug}`}
                className={`property-card group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C8174] ${
                  index === 1 ? "lg:mt-12" : ""
                }`}
              >
                {/* Property image */}
                <div className="property-image relative aspect-[4/5] overflow-hidden bg-[#D5C9B9]">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      unoptimized
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Subtle image overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                  {/* Property type */}
                  <span className="absolute left-4 top-4 bg-[#F5F1EA] px-3 py-2 text-[9px] tracking-widest text-[#292724] transition-colors duration-300 group-hover:bg-[#292724] group-hover:text-[#F5F1EA]">
                    {property.type}
                  </span>

                  {/* View indicator */}
                  <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-[#F5F1EA] text-[#292724] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                {/* Property details */}
                <div className="flex items-start justify-between gap-3 pt-5">
                  <div>
                    <h3 className="display-font text-2xl transition-colors duration-300 group-hover:text-[#8C8174]">
                      {property.name}
                    </h3>

                    <p className="mt-2 text-xs text-[#8C8174]">
                      {property.location} · {property.area}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="mt-2 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-[10px] leading-5 text-[#8C8174]">
            Demo listings for design purposes. Property details and
            availability are illustrative and have not been verified.
          </p>
        </div>
      </section>


      {/* Contact CTA */}
      <section className="section-space bg-[#292724] text-[#F5F1EA]">
        <div className="container-shell grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <span className="eyebrow text-[#C5B8A5]">
              YOUR NEXT CHAPTER
            </span>

            <h2 className="display-font mt-6 text-[clamp(3rem,7vw,6.5rem)] leading-none">
              Find your
              <br />
              <span className="italic text-[#C5B8A5]">
                place.
              </span>
            </h2>
          </div>

          <div>
            <p className="mb-7 max-w-sm text-sm leading-7 text-white/60">
              Tell us what you are looking for and start a conversation
              about your next property opportunity.
            </p>

            <Link href="/contact" className="outline-button">
              Talk to Our Team
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </HomeHeroMotion>
  );
}
