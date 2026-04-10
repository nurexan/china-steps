"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Check, Globe, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme, useLang } from "./ContextProviders";
import { type LangType } from "../lib/translations";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();

  const links = [
    { label: t.nav.grants, href: '/grants' },
    { label: t.nav.universities, href: '/universities' },
    { label: t.nav.courses, href: '/courses' },
    { label: t.nav.translators, href: '/translators' },
    { label: t.nav.about, href: '/about' },
  ];

  const langs: { code: LangType; label: string }[] = [
    { code: 'uz', label: "O'zbekcha" },
    { code: 'ru', label: "Русский" },
    { code: 'en', label: "English" },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-glass dark:shadow-glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#C39F57] rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all">
              <span className="text-white font-black text-xl font-serif">C</span>
            </div>
            <span className="font-serif text-2xl font-bold text-gray-900 dark:text-white tracking-widest uppercase">
              China Steps
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold tracking-wide transition-all ${
                  pathname === link.href 
                    ? "text-[#C39F57] border-b-2 border-[#C39F57] pb-1" 
                    : "text-gray-600 dark:text-gray-300 hover:text-[#C39F57] dark:hover:text-[#C39F57]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-gray-800">
              {/* Language Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#C39F57] transition-colors"
                >
                  <Globe size={16} />
                  {lang.toUpperCase()}
                  <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <div className="absolute top-full right-0 mt-3 w-40 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl z-50 overflow-hidden py-2">
                      {langs.map(l => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangOpen(false); }}
                          className="w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200"
                        >
                          <span className={lang === l.code ? "font-bold text-[#C39F57]" : "font-medium"}>
                            {l.label}
                          </span>
                          {lang === l.code && <Check size={14} className="text-[#C39F57]" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 bg-gray-100 dark:bg-[#1a1a1a] rounded-full text-gray-600 dark:text-gray-300 hover:text-[#C39F57] dark:hover:text-[#C39F57] transition-all"
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              <Link href="/grants">
                <button className="bg-[#C39F57] hover:bg-[#a08044] text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-[#C39F57]/30 transform hover:-translate-y-0.5">
                  {t.hero.btn1}
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 dark:text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-xl"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 mt-2 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-400">Til:</span>
              <div className="flex gap-2">
                {langs.map(l => (
                  <button 
                    key={l.code} 
                    onClick={() => { setLang(l.code); setIsOpen(false); }}
                    className={`px-3 py-1 text-xs font-bold rounded-lg border ${lang === l.code ? "bg-[#C39F57] border-[#C39F57] text-white" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"}`}
                  >
                    {l.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
