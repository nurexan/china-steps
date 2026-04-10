"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { type LangType, translations } from "../lib/translations";

// --- Theme Context ---
type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({ theme: 'light', toggleTheme: () => {} });

// --- Language Context ---
interface LangContextType {
  lang: LangType;
  setLang: (l: LangType) => void;
  t: typeof translations.uz;
}
const LangContext = createContext<LangContextType>({
  lang: 'uz',
  setLang: () => {},
  t: translations.uz
});

export function ContextProviders({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<LangType>('uz');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) setTheme(savedTheme);
    const savedLang = localStorage.getItem('lang') as LangType | null;
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  if (!mounted) {
    // Prevent SSR hydration mismatch by rendering invisible wrapper until mounted
    return <div className="invisible">{children}</div>;
  }

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
        {children}
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export const useLang = () => useContext(LangContext);
