
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MapPin, Trash2 } from "lucide-react";
import { properties } from "@/data/properties";
import { useFavorites } from "@/context/FavoritesContext";

export default function WishlistPage() {
  const {
    favoriteSlugs,
    hydrated,
    removeFavorite,
    clearFavorites,
  } = useFavorites();

  const savedProperties = favoriteSlugs
    .map((slug) => properties.find((property) => property.slug === slug))
    .filter((property) => property !== undefined);

  return (
    <main className="min-h-screen bg-[#F5F1EA] px-5 py-16 text-[#292724] sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 border-b border-[#292724]/15 pb-8 md:mb-16 md:flex md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-[#8C8174]">
              Your Personal Collection
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl">
              Your Wishlist<span className="text-[#8C8174]">.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#71685E]">
              A collection of spaces that have caught your eye. Keep your
              favorite properties close while you find your next home.
            </p>
          </div>

          {hydrated && savedProperties.length > 0 && (
            <div className="mt-7 flex items-center justify-between gap-5 md:mt-0 md:flex-col md:items-end">
              <p className="text-xs tracking-widest text-[#71685E]">
                {savedProperties.length} SAVED{" "}
                {savedProperties.length === 1 ? "PROPERTY" : "PROPERTIES"}
              </p>

              <button
                type="button"
                onClick={clearFavorites}
                className="text-xs text-[#71685E] underline underline-offset-4 transition hover:text-[#292724]"
              >
                Clear wishlist
              </button>
            </div>
          )}
        </div>

        {!hydrated ? (
          <div className="py-24 text-center text-sm text-[#71685E]">
            Loading your collection...
          </div>
        ) : savedProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-[#292724]/10 px-6 py-20 text-center sm:py-28">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#292724]/15">
              <Heart size={25} strokeWidth={1.2} />
            </div>

            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#8C8174]">
              Nothing saved yet
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl">
              Find a place to call yours.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#71685E]">
              Explore our curated properties and save the spaces you love.
              They will appear here for you to revisit.
            </p>

            <Link
              href="/properties"
              className="mt-8 inline-flex items-center gap-3 bg-[#292724] px-7 py-4 text-[10px] uppercase tracking-[0.2em] text-[#F5F1EA] transition hover:bg-[#71685E]"
            >
              Explore Properties
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {savedProperties.map((property) => (
              <article
                key={property.slug}
                className="group min-w-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E0D4]">
                  <Link
                    href={`/properties/${property.slug}`}
                    aria-label={`View ${property.name}`}
                    className="absolute inset-0"
                  >
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </Link>

                  <span className="absolute left-4 top-4 bg-[#F5F1EA] px-3 py-2 text-[9px] uppercase tracking-[0.2em]">
                    {property.category}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeFavorite(property.slug)}
                    aria-label={`Remove ${property.name} from wishlist`}
                    title="Remove from wishlist"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-[#F5F1EA] text-[#292724] transition hover:bg-[#292724] hover:text-[#F5F1EA]"
                  >
                    <Trash2 size={16} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="border-b border-[#292724]/15 py-5">
                  <div className="mb-3 flex items-center gap-2 text-xs text-[#71685E]">
                    <MapPin size={13} strokeWidth={1.5} />
                    {property.location}
                  </div>

                  <Link
                    href={`/properties/${property.slug}`}
                    className="inline-block font-serif text-2xl transition hover:text-[#8C8174]"
                  >
                    {property.name}
                  </Link>

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-wider text-[#71685E]">
                    <span>{property.area}</span>
                    <span>{property.bedrooms} Bedrooms</span>
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">
                      {property.price}
                    </p>

                    <Link
                      href={`/properties/${property.slug}`}
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] transition hover:text-[#8C8174]"
                    >
                      View Details
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-20 border-t border-[#292724]/15 pt-8">
          <Link
            href="/properties"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#71685E] transition hover:text-[#292724]"
          >
            <ArrowRight size={15} className="rotate-180" />
            Continue Exploring
          </Link>
        </div>
      </div>
    </main>
  );
}
