
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PropertyGallery from "@/components/PropertyGallery";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
} from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { properties } from "@/data/properties";

export function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

type PropertyDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F5F1EA] text-[#292724]">
          <SiteHeader />
          <section className="container-shell py-24">
            <p className="text-sm text-[#8C8174]">
              Loading property details...
            </p>
          </section>
          <SiteFooter />
        </main>
      }
    >
      <PropertyDetails params={params} />
    </Suspense>
  );
}

async function PropertyDetails({
  params,
}: PropertyDetailsPageProps) {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);

  if (!property) notFound();

  const relatedProperties = properties.filter(
    (item) => item.slug !== property.slug,
  );

  const details = [
    { label: "PROPERTY TYPE", value: property.type },
    { label: "LOCATION", value: property.location },
    { label: "TOTAL AREA", value: property.area },
    { label: "BEDROOMS", value: String(property.bedrooms) },
    { label: "BATHROOMS", value: String(property.bathrooms) },
    { label: "PRICE", value: property.price },
  ];

  return (
    <main className="overflow-hidden bg-[#F5F1EA] text-[#292724]">
      <SiteHeader />

      {/* Property introduction */}
      <section className="container-shell pb-10 pt-10 md:pb-14 md:pt-16">
        <Link
          href="/properties"
          className="group mb-12 inline-flex items-center gap-2 text-xs text-[#71685E] transition-colors hover:text-[#292724] md:mb-16"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          All Properties
        </Link>

        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="eyebrow block">{property.type}</span>

            <h1 className="display-font mt-5 max-w-5xl text-[clamp(3rem,8vw,7.8rem)] leading-[0.91] tracking-[-0.04em]">
              {property.name}
            </h1>

            <p className="mt-6 flex items-center gap-2 text-sm text-[#8C8174]">
              <MapPin size={15} />
              {property.location}
            </p>
          </div>

          <a
            href="#property-overview"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#292724]/30 pb-2 text-[10px] tracking-[0.16em] transition-colors hover:border-[#292724]"
          >
            EXPLORE DETAILS
            <ArrowDown
              size={14}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </a>
        </div>
      </section>

     {/* Property Gallery */}
<PropertyGallery property={property} />

      {/* Property overview */}
      <section
        id="property-overview"
        className="container-shell grid gap-12 py-16 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20"
      >
        <div>
          <span className="eyebrow">ABOUT THIS PROPERTY</span>

          <h2 className="display-font mt-6 max-w-2xl text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.05]">
            Considered living,
            <span className="italic text-[#8C8174]">
              {" "}thoughtfully imagined.
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-sm leading-8 text-[#71685E]">
            {property.description}
          </p>

          <div className="mt-10 space-y-5 border-t border-[#292724]/15 pt-7">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#292724]/20">
                <Check size={14} />
              </span>
              <div>
                <h3 className="text-sm">Thoughtful spatial planning</h3>
                <p className="mt-2 text-xs leading-6 text-[#8C8174]">
                  A considered design concept focused on practical,
                  comfortable everyday living.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#292724]/20">
                <Check size={14} />
              </span>
              <div>
                <h3 className="text-sm">Contemporary design approach</h3>
                <p className="mt-2 text-xs leading-6 text-[#8C8174]">
                  An architectural concept that balances natural light,
                  materials and a sense of space.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overview card */}
        <aside className="h-fit bg-[#E8E0D4] p-6 md:p-9">
          <span className="eyebrow">PROPERTY OVERVIEW</span>

          <div className="mt-5 border-b border-[#292724]/15 pb-6">
            <p className="text-[9px] tracking-[0.17em] text-[#8C8174]">
              INDICATIVE PRICE
            </p>
            <p className="display-font mt-3 text-2xl md:text-3xl">
              {property.price}
            </p>
          </div>

          <div className="mt-2 divide-y divide-[#292724]/15">
            {details.map((item) => (
              <div
                key={item.label}
                className="flex justify-between gap-5 py-4"
              >
                <span className="text-[9px] tracking-[0.13em] text-[#8C8174]">
                  {item.label}
                </span>
                <span className="max-w-[60%] text-right text-xs">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <Link
            href={`/contact?property=${encodeURIComponent(property.slug)}`}
            className="solid-button mt-7 w-full justify-between"
          >
            Enquire About This Property
            <ArrowUpRight size={15} />
          </Link>

          <p className="mt-4 text-[10px] leading-5 text-[#8C8174]">
            Contact our team to discuss this property concept and request
            further information.
          </p>
        </aside>
      </section>

      {/* Related properties */}
      {relatedProperties.length > 0 && (
        <section className="bg-[#E8E0D4] py-16 md:py-24">
          <div className="container-shell">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="eyebrow">CONTINUE EXPLORING</span>
                <h2 className="display-font mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-none">
                  More to discover.
                </h2>
              </div>

              <Link
                href="/properties"
                className="group inline-flex w-fit items-center gap-2 border-b border-[#292724]/30 pb-2 text-xs"
              >
                View All Properties
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {relatedProperties.map((item) => (
                <Link
                  key={item.slug}
                  href={`/properties/${item.slug}`}
                  className="group"
                >
                  <div className="property-image relative aspect-[16/10] overflow-hidden bg-[#D5C9B9]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                    />
                    <span className="absolute left-4 top-4 bg-[#F5F1EA] px-3 py-2 text-[9px] tracking-widest">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-5">
                    <div>
                      <h3 className="display-font text-2xl transition-colors duration-300 group-hover:text-[#8C8174]">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-xs text-[#8C8174]">
                        {item.location} · {item.area}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content disclaimer */}
      <section className="container-shell py-8">
        <p className="text-[10px] leading-5 text-[#8C8174]">
          This is illustrative demonstration content. Property availability,
          specifications and prices must be confirmed before publication.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
