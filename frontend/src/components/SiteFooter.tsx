
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-[#292724] text-[#F5F1EA]">
      <div className="container-shell py-12 md:py-16">
        <div className="flex flex-col justify-between gap-10 border-b border-white/20 pb-10 md:flex-row md:items-end">
          <div>
            <Link href="/" className="font-serif text-3xl tracking-[0.08em]">
              ASHU ESTATES
            </Link>
            <p className="mt-3 text-[9px] tracking-[0.3em] text-white/55">
              SPACES BEYOND ORDINARY
            </p>
            <p className="mt-5 max-w-[320px] text-xs leading-6 text-white/55">
              A considered approach to contemporary living and architectural
              spaces in Bangladesh.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-4 text-[10px] tracking-wider text-white/70">
            <Link href="/">HOME</Link>
            <Link href="/properties">PROPERTIES</Link>
            <Link href="/about">ABOUT</Link>
            <Link href="/services">SERVICES</Link>
            <Link href="/contact">CONTACT</Link>
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-6 text-[9px] tracking-wider text-white/45 sm:flex-row">
          <p>© 2026 ASHU ESTATES. ALL RIGHTS RESERVED.</p>
          <Link href="/contact" className="flex items-center gap-2">
            START A CONVERSATION <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
