import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SakuraWrapper from "../components/SakuraWrapper";
import { ContextProviders } from "../components/ContextProviders";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "China Steps – Xitoy Ta'lim va Sayohat Portali",
  description: "Xitoyning eng nufuzli universitetlariga grant asosida qabul, til kurslari, tekin sayohat tajribalari va professional maslahat.",
  keywords: "xitoy granti, xitoy universiteti, hsk, xitoyda o'qish, china steps",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ContextProviders>
          <SakuraWrapper />
          {children}
        </ContextProviders>
      </body>
    </html>
  );
}
