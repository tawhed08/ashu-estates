
"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Heart, Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Our Story", href: "/about" },
  { label: "Services", href: "/services" },
];

export default function SiteHeader({
  overlay = false,
}: {
  overlay?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const headerClass = overlay
    ? "absolute inset-x-0 top-0 text-[#F5F1EA]"
    : "relative bg-[#292724] text-[#F5F1EA]";

  const linkClass =
    "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[10px] tracking-[0.08em] text-white/80 transition-colors duration-300 hover:text-[#C5B8A5]";

  return (
    <header className={`z-50 ${headerClass}`}>
      <div className="container-shell flex min-h-[82px] items-center justify-between gap-4 border-b border-white/20">
        {/* Brand */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 flex-col"
        >
          <span className="whitespace-nowrap font-serif text-[20px] tracking-[0.06em] sm:text-[23px]">
            ASHU ESTATES
          </span>

          <span className="mt-1 whitespace-nowrap text-[8px] tracking-[0.2em] text-white/55">
            SPACES BEYOND ORDINARY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 xl:flex 2xl:gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass}
            >
              {link.label}
            </Link>
          ))}

          {/* Wishlist — Desktop */}
          <Link
            href="/wishlist"
            className={linkClass}
            aria-label="Open Wishlist"
          >
            <Heart size={15} strokeWidth={1.7} />
            <span>Wishlist</span>
          </Link>
        </nav>

        {/* Desktop Contact */}
        <Link
          href="/contact"
          className="hidden shrink-0 items-center gap-2 whitespace-nowrap border border-white/45 px-4 py-3 text-[9px] tracking-[0.1em] transition-colors duration-300 hover:bg-[#F5F1EA] hover:text-[#292724] xl:inline-flex"
        >
          LET&apos;S TALK
          <ArrowUpRight size={14} />
        </Link>

        {/* Mobile / Tablet Menu Button */}
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex size-10 shrink-0 items-center justify-center border border-white/30 transition-colors hover:border-[#C5B8A5] xl:hidden"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* Mobile / Tablet Navigation */}
      {open && (
        <nav className="absolute inset-x-0 top-full z-50 border-b border-white/15 bg-[#292724] px-6 py-7 shadow-xl xl:hidden">
          <div className="flex flex-col gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-sm text-[#F5F1EA] transition-colors duration-300 hover:text-[#C5B8A5]"
              >
                {link.label}
              </Link>
            ))}

            {/* Wishlist — Mobile */}
            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm text-[#F5F1EA] transition-colors duration-300 hover:text-[#C5B8A5]"
            >
              <Heart size={16} strokeWidth={1.7} />
              Wishlist
            </Link>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 border-t border-white/20 pt-5 text-xs tracking-widest transition-colors hover:text-[#C5B8A5]"
            >
              CONTACT ASHU ESTATES
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
