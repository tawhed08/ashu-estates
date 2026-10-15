
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function AboutPage() {
  return (
    <main className="bg-[#F5F1EA]">
      <SiteHeader />

      <section className="section-space">
        <div className="container-shell">
          <span className="eyebrow">WHO WE ARE</span>

          <h1 className="display-font mt-6 max-w-5xl text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.95]">
            A different way
            <br />
            to think about
            <br />
            <span className="italic text-[#8C8174]">living.</span>
          </h1>

          <div className="mt-14 grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-center md:gap-20">
            <div className="property-image relative aspect-[5/4]">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85"
                alt="Contemporary architectural residence"
                fill
                unoptimized
                sizes="(max-width: 767px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <div>
              <span className="eyebrow">OUR PHILOSOPHY</span>
              <h2 className="display-font mt-5 text-3xl leading-tight md:text-4xl">
                The best spaces feel right, not just look right.
              </h2>
              <p className="mt-6 text-sm leading-8 text-[#71685E]">
                ASHU ESTATES is a real-estate brand concept focused on
                presenting properties through thoughtful design, clear
                information and a more considered customer experience.
              </p>
              <p className="mt-4 text-sm leading-8 text-[#71685E]">
                Our design philosophy values simplicity, material quality and
                the relationship between architecture and everyday life.
              </p>
              <Link href="/properties" className="solid-button mt-8">
                Explore Properties <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#292724] py-20 text-[#F5F1EA] md:py-28">
        <div className="container-shell grid gap-10 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Intentional Design",
              text: "We value spaces where every detail has a reason to exist.",
            },
            {
              number: "02",
              title: "Thoughtful Guidance",
              text: "We aim to make exploring property feel clearer and more personal.",
            },
            {
              number: "03",
              title: "Lasting Perspective",
              text: "We look beyond trends to the everyday experience of a space.",
            },
          ].map((item) => (
            <article key={item.number} className="border-t border-white/25 pt-5">
              <span className="text-xs text-[#C5B8A5]">{item.number}</span>
              <h3 className="display-font mt-6 text-2xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/60">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
