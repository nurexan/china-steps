"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/universities", label: "Universitetlar" },
  { href: "/courses", label: "Xitoy tili kurslari" },
  { href: "/travel", label: "Tekin sayohat" },
  { href: "/translators", label: "Tarjimonlar" },
  { href: "/news", label: "Yangiliklar" },
  { href: "/services", label: "Xizmatlarimiz" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On home page: transparent on top, white on scroll
  // On other pages: always white
  const isHome = pathname === "/";
  const solidBg = !isHome || scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        solidBg
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold tracking-wider"
          style={{ color: solidBg ? "#1a1a1a" : "#ffffff" }}>
          China Steps
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-6 text-[14px] font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 relative group ${
                  isActive
                    ? "text-[#C39F57] font-bold"
                    : solidBg
                    ? "text-gray-700 hover:text-[#C39F57]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C39F57] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile btn */}
        <button
          onClick={() => setOpen(!open)}
          className={`xl:hidden ${solidBg ? "text-gray-800" : "text-white"}`}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="xl:hidden bg-white border-t border-gray-100 shadow-xl px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-lg font-medium ${
                pathname === link.href ? "text-[#C39F57] font-bold" : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
