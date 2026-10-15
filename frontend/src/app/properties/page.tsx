
"use client";

import Image from "next/image";
import Link from "next/link";
import PropertyActions from "@/components/PropertyActions";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpDown,
  ArrowUpRight,
  Bath,
  BedDouble,
  LayoutGrid,
  List,
  MapPin,
  RotateCcw,
  Ruler,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { properties } from "@/data/properties";
type CategoryFilter = "all" | "residential" | "apartment";
type ViewMode = "grid" | "list";
type SortOption =
  | "featured"
  | "area-asc"
  | "area-desc"
  | "price-asc"
  | "price-desc";

const categoryFilters: {
  label: string;
  value: CategoryFilter;
}[] = [
  { label: "All Properties", value: "all" },
  { label: "Residences", value: "residential" },
  { label: "Apartments", value: "apartment" },
];

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Featured first", value: "featured" },
  { label: "Area: Low to high", value: "area-asc" },
  { label: "Area: High to low", value: "area-desc" },
  { label: "Price: Low to high", value: "price-asc" },
  { label: "Price: High to low", value: "price-desc" },
];

function getArea(property: (typeof properties)[number]) {
  if (typeof property.areaSqFt === "number") {
    return property.areaSqFt;
  }

  const parsedArea = Number(property.area.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsedArea) ? parsedArea : null;
}


export default function PropertiesPage() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [bedrooms, setBedrooms] = useState("any");
  const [bathrooms, setBathrooms] = useState("any");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const filteredProperties = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const minimumArea = minArea === "" ? null : Number(minArea);
    const maximumArea = maxArea === "" ? null : Number(maxArea);
    const minimumPrice = minPrice === "" ? null : Number(minPrice);
    const maximumPrice = maxPrice === "" ? null : Number(maxPrice);

    const result = properties.filter((property) => {
      const matchesCategory =
        category === "all" || property.category === category;

      const searchableText = [
        property.name,
        property.location,
        property.type,
        property.description,
        property.area,
        property.category,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        query === "" || searchableText.includes(query);

      const matchesBedrooms =
        bedrooms === "any" || property.bedrooms >= Number(bedrooms);

      const matchesBathrooms =
        bathrooms === "any" || property.bathrooms >= Number(bathrooms);

      const area = getArea(property);

      const matchesMinimumArea =
        minimumArea === null ||
        (area !== null && area >= minimumArea);

      const matchesMaximumArea =
        maximumArea === null ||
        (area !== null && area <= maximumArea);

      // Properties without a numeric price do not match price filters.
      const price =
        typeof property.priceAmount === "number"
          ? property.priceAmount
          : null;

      const matchesMinimumPrice =
        minimumPrice === null ||
        (price !== null && price >= minimumPrice);

      const matchesMaximumPrice =
        maximumPrice === null ||
        (price !== null && price <= maximumPrice);

      return (
        matchesCategory &&
        matchesSearch &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesMinimumArea &&
        matchesMaximumArea &&
        matchesMinimumPrice &&
        matchesMaximumPrice
      );
    });

    return result.sort((a, b) => {
      switch (sortBy) {
        case "area-asc":
          return (getArea(a) ?? Number.MAX_SAFE_INTEGER) -
            (getArea(b) ?? Number.MAX_SAFE_INTEGER);

        case "area-desc":
          return (getArea(b) ?? -1) - (getArea(a) ?? -1);

        case "price-asc": {
          const priceA = a.priceAmount ?? Number.MAX_SAFE_INTEGER;
          const priceB = b.priceAmount ?? Number.MAX_SAFE_INTEGER;
          return priceA - priceB;
        }

        case "price-desc": {
          const priceA = a.priceAmount ?? -1;
          const priceB = b.priceAmount ?? -1;
          return priceB - priceA;
        }

        case "featured":
        default:
          return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      }
    });
  }, [
    category,
    searchQuery,
    bedrooms,
    bathrooms,
    minArea,
    maxArea,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const hasActiveFilters =
    category !== "all" ||
    searchQuery.trim() !== "" ||
    bedrooms !== "any" ||
    bathrooms !== "any" ||
    minArea !== "" ||
    maxArea !== "" ||
    minPrice !== "" ||
    maxPrice !== "";

  function clearFilters() {
    setCategory("all");
    setSearchQuery("");
    setBedrooms("any");
    setBathrooms("any");
    setMinArea("");
    setMaxArea("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("featured");
  }

  const fieldClassName =
    "min-h-11 w-full border border-[#292724]/15 bg-[#F5F1EA] px-3 text-xs text-[#292724] outline-none transition-colors focus:border-[#8C8174]";

  const labelClassName =
    "mb-2 block text-[9px] tracking-[0.15em] text-[#8C8174]";

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F1EA] text-[#292724]">
      <SiteHeader />

      {/* Page introduction */}
      <section className="relative overflow-hidden pb-12 pt-16 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-12 size-72 rounded-full bg-[#E8E0D4]/70 blur-3xl sm:size-96"
        />

        <div className="container-shell relative">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#8C8174]" />
              <span className="eyebrow">THE COLLECTION</span>
            </div>

            <h1 className="display-font mt-7 text-[clamp(3.3rem,9vw,8rem)] leading-[0.91] tracking-[-0.045em]">
              Find a place
              <br />
              <span className="italic text-[#8C8174]">to belong.</span>
            </h1>

            <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <p className="max-w-md text-sm leading-7 text-[#71685E]">
                Thoughtfully considered residences and distinctive
                apartments, selected for the way you want to live.
              </p>

              <div className="flex items-center gap-3 text-[#8C8174]">
                <span className="display-font text-4xl">
                  {String(properties.length).padStart(2, "0")}
                </span>
                <span className="max-w-20 text-[9px] leading-4 tracking-[0.16em]">
                  CURATED
                  <br />
                  CONCEPTS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and category filters */}
      <section className="container-shell pb-8">
        <div className="border-y border-[#292724]/15 py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <label htmlFor="property-search" className={labelClassName}>
                FIND YOUR PROPERTY
              </label>

              <div className="relative">
                <Search
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#8C8174]"
                />

                <input
                  id="property-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search name, location or property type..."
                  autoComplete="off"
                  className="w-full border-b border-[#292724]/25 bg-transparent py-3 pl-7 pr-9 text-sm outline-none transition-colors placeholder:text-[#8C8174]/80 focus:border-[#292724]"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#8C8174] transition-colors hover:text-[#292724]"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            <div>
              <span className={labelClassName}>EXPLORE BY CATEGORY</span>

              <div className="flex flex-wrap gap-2" aria-label="Property category filters">
                {categoryFilters.map((item) => {
                  const isActive = category === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setCategory(item.value)}
                      aria-pressed={isActive}
                      className={`border px-4 py-3 text-[10px] tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C8174] ${
                        isActive
                          ? "border-[#292724] bg-[#292724] text-[#F5F1EA]"
                          : "border-[#292724]/20 bg-transparent text-[#71685E] hover:border-[#292724] hover:text-[#292724]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Advanced filter toggle */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowAdvancedFilters((current) => !current)}
              aria-expanded={showAdvancedFilters}
              aria-controls="advanced-property-filters"
              className="inline-flex min-h-10 items-center gap-2 border border-[#292724]/20 px-4 text-[10px] tracking-[0.1em] transition-colors hover:border-[#292724]"
            >
              <SlidersHorizontal size={14} />
              {showAdvancedFilters ? "HIDE FILTERS" : "ADVANCED FILTERS"}
            </button>

            <div className="flex items-center gap-2">
              <label htmlFor="property-sort" className="sr-only">
                Sort properties
              </label>
              <ArrowUpDown size={14} className="text-[#8C8174]" />
              <select
                id="property-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="min-h-10 max-w-[190px] border border-[#292724]/20 bg-transparent px-2 text-[10px] text-[#292724] outline-none focus:border-[#8C8174] sm:max-w-none sm:px-3"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {showAdvancedFilters && (
            <div
              id="advanced-property-filters"
              className="mt-5 grid gap-5 border-t border-[#292724]/15 pt-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div>
                <label htmlFor="bedrooms-filter" className={labelClassName}>
                  MINIMUM BEDROOMS
                </label>
                <select
                  id="bedrooms-filter"
                  value={bedrooms}
                  onChange={(event) => setBedrooms(event.target.value)}
                  className={fieldClassName}
                >
                  <option value="any">Any bedrooms</option>
                  <option value="1">1+ bedroom</option>
                  <option value="2">2+ bedrooms</option>
                  <option value="3">3+ bedrooms</option>
                  <option value="4">4+ bedrooms</option>
                  <option value="5">5+ bedrooms</option>
                </select>
              </div>

              <div>
                <label htmlFor="bathrooms-filter" className={labelClassName}>
                  MINIMUM BATHROOMS
                </label>
                <select
                  id="bathrooms-filter"
                  value={bathrooms}
                  onChange={(event) => setBathrooms(event.target.value)}
                  className={fieldClassName}
                >
                  <option value="any">Any bathrooms</option>
                  <option value="1">1+ bathroom</option>
                  <option value="2">2+ bathrooms</option>
                  <option value="3">3+ bathrooms</option>
                  <option value="4">4+ bathrooms</option>
                  <option value="5">5+ bathrooms</option>
                </select>
              </div>

              <div>
                <label htmlFor="min-area" className={labelClassName}>
                  MINIMUM AREA (SQ FT)
                </label>
                <input
                  id="min-area"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={minArea}
                  onChange={(event) => setMinArea(event.target.value)}
                  placeholder="e.g. 2000"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label htmlFor="max-area" className={labelClassName}>
                  MAXIMUM AREA (SQ FT)
                </label>
                <input
                  id="max-area"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={maxArea}
                  onChange={(event) => setMaxArea(event.target.value)}
                  placeholder="e.g. 5000"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label htmlFor="min-price" className={labelClassName}>
                  MINIMUM PRICE (BDT)
                </label>
                <input
                  id="min-price"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  placeholder="Numeric prices only"
                  className={fieldClassName}
                />
              </div>

              <div>
                <label htmlFor="max-price" className={labelClassName}>
                  MAXIMUM PRICE (BDT)
                </label>
                <input
                  id="max-price"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder="Numeric prices only"
                  className={fieldClassName}
                />
              </div>

              <p className="text-[10px] leading-5 text-[#8C8174] sm:col-span-2 lg:col-span-3">
                Price filters include only properties with a verified numeric
                price. Listings marked “Price on request” will not match a
                price range.
              </p>
            </div>
          )}

          {/* Results toolbar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#292724]/15 pt-5">
            <p
              aria-live="polite"
              className="text-[10px] tracking-[0.13em] text-[#8C8174]"
            >
              SHOWING{" "}
              <span className="text-[#292724]">
                {String(filteredProperties.length).padStart(2, "0")}
              </span>{" "}
              OF{" "}
              <span className="text-[#292724]">
                {String(properties.length).padStart(2, "0")}
              </span>{" "}
              PROPERTIES
            </p>

            <div className="flex items-center gap-1" aria-label="Property view">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
                className={`flex size-10 items-center justify-center border transition-colors ${
                  viewMode === "grid"
                    ? "border-[#292724] bg-[#292724] text-[#F5F1EA]"
                    : "border-[#292724]/20 text-[#71685E] hover:border-[#292724]"
                }`}
              >
                <LayoutGrid size={16} />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
                className={`flex size-10 items-center justify-center border transition-colors ${
                  viewMode === "list"
                    ? "border-[#292724] bg-[#292724] text-[#F5F1EA]"
                    : "border-[#292724]/20 text-[#71685E] hover:border-[#292724]"
                }`}
              >
                <List size={17} />
              </button>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4">
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 border-b border-[#292724]/30 pb-1 text-[10px] tracking-wide text-[#71685E] transition-colors hover:text-[#292724]"
              >
                <RotateCcw size={12} />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Property collection */}
      <section className="container-shell pb-20 pt-5 sm:pb-28">
        {filteredProperties.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16"
                : "flex flex-col gap-8"
            }
          >
            {filteredProperties.map((property, index) => (
              <article
                key={property.slug}
                className={`group min-w-0 ${
                  viewMode === "list"
                    ? "grid gap-5 border-b border-[#292724]/15 pb-8 sm:grid-cols-[minmax(220px,0.8fr)_1.2fr] sm:gap-8"
                    : index % 3 === 1
                      ? "lg:mt-10"
                      : ""
                }`}
              >
                <Link
                  href={`/properties/${property.slug}`}
                  aria-label={`View details for ${property.name}`}
                  className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C8174]"
                >
                  <div
                    className={`property-image relative overflow-hidden bg-[#E8E0D4] ${
                      viewMode === "grid"
                        ? "aspect-[4/5]"
                        : "aspect-[4/3] sm:aspect-[5/4]"
                    }`}
                  >
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      unoptimized
                      sizes={
                        viewMode === "list"
                          ? "(max-width: 639px) 100vw, 40vw"
                          : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transition-none"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                    <span className="absolute left-4 top-4 bg-[#F5F1EA] px-3 py-2 text-[9px] tracking-[0.13em] text-[#292724]">
                      {property.type.toUpperCase()}
                    </span>

                    <span className="absolute bottom-4 left-4 text-[10px] tracking-wide text-white">
                      <span className="flex items-center gap-2">
                        <MapPin size={13} />
                        {property.location}
                      </span>
                    </span>

                    <span className="absolute bottom-4 right-4 flex size-11 translate-y-2 items-center justify-center rounded-full bg-[#F5F1EA] text-[#292724] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>
                </Link>

                <div className={viewMode === "list" ? "flex flex-col justify-center" : "pt-5"}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="display-font text-2xl leading-tight transition-colors duration-300 group-hover:text-[#8C8174] sm:text-[1.7rem]">
                        <Link
                          href={`/properties/${property.slug}`}
                          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C8174]"
                        >
                          {property.name}
                        </Link>
                      </h2>

                      <p className="mt-2 flex items-center gap-1.5 text-xs text-[#8C8174]">
                        <MapPin size={12} />
                        {property.location}
                      </p>
                    </div>

                    <Link
                      href={`/properties/${property.slug}`}
                      aria-label={`Explore ${property.name}`}
                      className="flex size-9 shrink-0 items-center justify-center border border-[#292724]/20 transition-colors duration-300 hover:border-[#292724] hover:bg-[#292724] hover:text-[#F5F1EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C8174]"
                    >
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>

                  <p className="mt-4 text-xs leading-6 text-[#71685E]">
                    {property.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#292724]/15 pt-4">
                    <span className="flex items-center gap-2 text-[10px] tracking-wide text-[#71685E]">
                      <BedDouble size={15} className="text-[#8C8174]" />
                      {property.bedrooms} BED
                    </span>

                    <span className="flex items-center gap-2 text-[10px] tracking-wide text-[#71685E]">
                      <Bath size={15} className="text-[#8C8174]" />
                      {property.bathrooms} BATH
                    </span>

                    
<span className="flex items-center gap-2 text-[10px] tracking-wide text-[#71685E]">
  <Ruler size={14} className="text-[#8C8174]" />
  {property.area}
</span>
</div>

<div className="mt-5">
  <PropertyActions property={property} />
</div>

<div className="mt-5 flex items-center justify-between gap-3">

                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-xs text-[#292724]">{property.price}</p>

                    <Link
                      href={`/properties/${property.slug}`}
                      className="inline-flex items-center gap-2 text-[9px] tracking-[0.12em] text-[#8C8174] transition-colors hover:text-[#292724]"
                    >
                      EXPLORE
                      <ArrowDownRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center border-y border-[#292724]/15 px-5 py-16 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-[#E8E0D4] text-[#71685E]">
              <Search size={21} />
            </div>

            <h2 className="display-font mt-6 text-3xl">Nothing found.</h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#71685E]">
              No properties match your current search and filters. Try
              changing your criteria or clear the filters to see all listings.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="solid-button mt-7"
            >
              View All Properties
              <ArrowUpRight size={15} />
            </button>
          </div>
        )}

        <p className="mt-12 border-t border-[#292724]/15 pt-5 text-[10px] leading-5 text-[#8C8174]">
          Listings are illustrative demo content. Property details, pricing
          and availability have not been independently verified.
        </p>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#E8E0D4] py-16 sm:py-20">
        <div className="container-shell flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">A MORE PERSONAL APPROACH</span>

            <h2 className="display-font mt-5 max-w-2xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
              The right place
              <br />
              <span className="italic text-[#8C8174]">
                starts with a conversation.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#71685E]">
              Tell us what matters to you. We&apos;ll help you explore
              the possibilities.
            </p>
          </div>

          <Link href="/contact" className="solid-button group w-fit">
            Speak With Us
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
