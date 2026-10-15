
"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check, MapPin } from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { properties } from "@/data/properties";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const propertySlug = searchParams.get("property") ?? "";

  const selectedProperty = properties.find(
    (property) => property.slug === propertySlug,
  );

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="overflow-hidden bg-[#F5F1EA] text-[#292724]">
      <SiteHeader />

      <section className="section-space">
        <div className="container-shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <span className="eyebrow">GET IN TOUCH</span>

            <h1 className="display-font mt-6 text-[clamp(3.2rem,7vw,6.8rem)] leading-[0.95]">
              Let&apos;s find
              <br />
              <span className="italic text-[#8C8174]">
                your place.
              </span>
            </h1>

            <p className="mt-7 max-w-sm text-sm leading-7 text-[#71685E]">
              Tell us what you are looking for and begin a conversation
              about your next property opportunity.
            </p>

            {selectedProperty && (
              <div className="mt-10 border-l-2 border-[#C5B8A5] bg-[#E8E0D4]/70 p-5">
                <span className="text-[9px] tracking-[0.18em] text-[#8C8174]">
                  YOUR SELECTED PROPERTY
                </span>

                <h2 className="display-font mt-3 text-2xl">
                  {selectedProperty.name}
                </h2>

                <p className="mt-2 flex items-center gap-2 text-xs text-[#71685E]">
                  <MapPin size={13} />
                  {selectedProperty.location}
                </p>

                <p className="mt-3 text-xs text-[#71685E]">
                  {selectedProperty.type} · {selectedProperty.area}
                </p>
              </div>
            )}

            <div className="mt-12 border-t border-[#292724]/20 pt-5">
              <p className="text-[10px] tracking-widest text-[#8C8174]">
                LOCATION
              </p>

              <p className="mt-3 text-sm">Dhaka, Bangladesh</p>

              <p className="mt-3 text-xs leading-6 text-[#8C8174]">
                Official phone number, email and office address can be
                added here when confirmed.
              </p>
            </div>
          </div>

          <div>
            {submitted ? (
              <div
                role="status"
                className="border-y border-[#292724]/20 py-12"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-[#E8E0D4]">
                  <Check size={22} />
                </div>

                <h2 className="display-font mt-7 text-3xl">
                  Thank you for your interest.
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#71685E]">
                  This demo form does not send or store your information.
                  Connect a backend or form service to receive real enquiries.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 border-b border-[#292724]/30 pb-2 text-xs transition-colors hover:border-[#8C8174]"
                >
                  SEND ANOTHER ENQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-x-8 sm:grid-cols-2">
                  <label className="mb-7 block text-[10px] tracking-widest text-[#71685E]">
                    YOUR NAME
                    <input
                      className="form-field"
                      name="name"
                      placeholder="Full name"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="mb-7 block text-[10px] tracking-widest text-[#71685E]">
                    EMAIL ADDRESS
                    <input
                      className="form-field"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                <label className="mb-7 block text-[10px] tracking-widest text-[#71685E]">
                  PHONE NUMBER
                  <input
                    className="form-field"
                    type="tel"
                    name="phone"
                    placeholder="+880 1XXX-XXXXXX"
                    autoComplete="tel"
                  />
                </label>

                <label className="mb-7 block text-[10px] tracking-widest text-[#71685E]">
                  YOUR INTEREST
                  <select
                    className="form-field"
                    name="interest"
                    defaultValue={
                      selectedProperty?.category === "apartment"
                        ? "apartment"
                        : selectedProperty
                          ? "residential"
                          : ""
                    }
                    required
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="residential">Private residence</option>
                    <option value="apartment">Apartment</option>
                    <option value="investment">
                      Investment consultation
                    </option>
                    <option value="other">Other enquiry</option>
                  </select>
                </label>

                <label className="mb-8 block text-[10px] tracking-widest text-[#71685E]">
                  MESSAGE
                  <textarea
                    className="form-field resize-y"
                    name="message"
                    rows={4}
                    defaultValue={
                      selectedProperty
                        ? `I would like to enquire about ${selectedProperty.name} in ${selectedProperty.location}.`
                        : ""
                    }
                    placeholder="Tell us about your plans..."
                    required
                  />
                </label>

                <button type="submit" className="solid-button group">
                  Submit Enquiry
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </button>

                <p className="mt-5 text-[10px] leading-5 text-[#8C8174]">
                  Demo form only. Your information is not transmitted or saved.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F5F1EA]">
          <SiteHeader />
          <section className="section-space container-shell">
            <p className="text-sm text-[#71685E]">
              Preparing your enquiry form...
            </p>
          </section>
          <SiteFooter />
        </main>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}
