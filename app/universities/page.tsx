"use client";

import Navbar from "../../components/Navbar";
import { supabase, type University } from "../../lib/supabase";
import Link from "next/link";
import { MapPin, Star, ArrowRight, GraduationCap, Loader2 } from "lucide-react";
import { useLang } from "../../components/ContextProviders";

export default function UniversitiesPage() {
  const { t } = useLang();
  const [universities, setUniversities] = React.useState<University[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('universities')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setUniversities(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <section
        className="relative py-48 px-4 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a0f1a, #1a1a1a)" }}
      >
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583507923701-d703770420bc?q=80&w=2560&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#C39F57]/20 border border-[#C39F57]/40 text-[#C39F57] px-6 py-2 rounded-full text-sm font-black tracking-widest mb-6 uppercase backdrop-blur-md">
            {t.uni.tag}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-2xl">
            {t.uni.title}
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            {t.uni.desc}
          </p>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#111]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20 text-[#C39F57]">
              <Loader2 size={48} className="animate-spin mx-auto" />
            </div>
          ) : universities.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <GraduationCap size={64} className="mx-auto mb-6 opacity-20" />
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">{t.uni.empty}</h3>
              <p className="text-gray-400">{t.uni.emptyDesc}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {universities.map((uni) => (
                <div key={uni.id} className="group bg-white dark:bg-[#1a1a1a] rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative w-full aspect-video overflow-hidden">
                    <img
                      src={uni.img_url}
                      alt={uni.name}
                      onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider backdrop-blur-md ${
                        uni.grant_type === "To'liq Grant" ? "bg-green-500/90" :
                        uni.grant_type === "Kontrakt" ? "bg-red-500/90" : "bg-[#C39F57]/90"
                      }`}>
                        {uni.grant_type}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{uni.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-8">
                      <MapPin size={18} className="text-[#C39F57]" /> {uni.city}
                    </p>

                    <Link href="/">
                      <button className="w-full bg-gray-50 dark:bg-[#0a0a0a] hover:bg-[#C39F57] hover:text-white text-gray-700 dark:text-gray-300 font-bold py-4 rounded-xl transition-all text-base border border-gray-100 dark:border-gray-800 flex items-center justify-center gap-2">
                        {t.uni.apply} <ArrowRight size={18} />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-black py-12 text-center text-white/20 text-sm">
        {t.footer.rights}
      </footer>
    </div>
  );
}

import React from "react";
