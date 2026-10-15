
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Compass,
  Handshake,
  TrendingUp,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const services = [
  {
    number: "01",
    title: "Property Sales",
    description:
      "Explore residential property concepts and get guidance on identifying a property that fits your needs.",
    icon: Building2,
  },
  {
    number: "02",
    title: "Buying Assistance",
    description:
      "A considered approach to shortlisting options, comparing features and planning your next steps.",
    icon: Handshake,
  },
  {
    number: "03",
    title: "Investment Advisory",
    description:
      "Discuss property objectives, location preferences and factors to consider before making an investment.",
    icon: TrendingUp,
  },
  {
    number: "04",
    title: "Property Consultation",
    description:
      "Start with a conversation about your requirements, budget and preferred property type.",
    icon: Compass,
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#F5F1EA]">
      <SiteHeader />

      <section className="section-space">
        <div className="container-shell">
          <span className="eyebrow">WHAT WE OFFER</span>
          <h1 className="display-font mt-6 max-w-5xl text-[clamp(3.2rem,8vw,7rem)] leading-[0.95]">
            Property, with
            <br />
            <span className="italic text-[#8C8174]">a clearer purpose.</span>
          </h1>

          <p className="mt-7 max-w-lg text-sm leading-7 text-[#71685E]">
            Explore our service concepts, designed around a more thoughtful
            property search and customer experience.
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className="border border-[#292724]/20 p-7 transition-colors hover:bg-[#E8E0D4] md:p-9"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#8C8174]">
                      {service.number}
                    </span>
                    <Icon size={22} strokeWidth={1.2} />
                  </div>

                  <h2 className="display-font mt-9 text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-[#71685E]">
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-7 inline-flex items-center gap-3 text-[10px] tracking-widest"
                  >
                    DISCUSS THIS SERVICE <ArrowUpRight size={14} />
                  </Link>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-[10px] leading-5 text-[#8C8174]">
            Services shown describe the proposed brand offering and should be
            confirmed before being represented as active commercial services.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
