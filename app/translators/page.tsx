"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import { supabase, type Translator } from "../../lib/supabase";
import { MapPin, Globe, MessageCircle, ArrowRight, UserRound, Loader2 } from "lucide-react";
import { useLang } from "../../components/ContextProviders";

export default function TranslatorsPage() {
  const { t } = useLang();
  const [translators, setTranslators] = React.useState<Translator[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('translators')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setTranslators(data);
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
        style={{ background: "linear-gradient(135deg, #0f172a, #111)" }}
      >
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2560&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 px-6 py-2 rounded-full text-sm font-black tracking-widest mb-6 uppercase backdrop-blur-md">
            {t.trans.tag}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-2xl">
            {t.trans.title}
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            {t.trans.desc}
          </p>
        </div>
      </section>

      {/* Xizmat turlari */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#C39F57] font-black tracking-widest text-sm uppercase block mb-3">{t.trans.types}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white">{t.trans.typesTitle}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
            {[
              { icon: "📄", title: "Hujjat Tarjimasi", desc: "Diplom, transkript, pasport va rasmiy hujjatlar" },
              { icon: "🏥", title: "Tibbiy Tarjima", desc: "Shifokor qabulida va kasalxonada hamrohlik" },
              { icon: "🏛️", title: "Hamrohlik", desc: "Universitetga borish va yotoqxona olishda yordam" },
              { icon: "📱", title: "Onlayn Maslahat", desc: "Telegram/Zoom orqali masofaviy yordam" },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-3xl p-8 text-center hover:shadow-2xl hover:-translate-y-1 transition-all">
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Translators list */}
          <div className="text-center mb-16">
            <span className="text-[#C39F57] font-black tracking-widest text-sm uppercase block mb-3">{t.trans.team}</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">{t.nav.translators}</h2>
          </div>

          {loading ? (
            <div className="text-center py-20 text-[#C39F57]">
              <Loader2 size={48} className="animate-spin mx-auto" />
            </div>
          ) : translators.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <UserRound size={64} className="mx-auto mb-6 opacity-20" />
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">{t.trans.title}</h3>
              <p className="text-gray-400">Tez orada qo'shiladi...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {translators.map((t_item) => (
                <div key={t_item.id} className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-10">
                    <div className="relative flex-shrink-0">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 dark:border-gray-800 shadow-xl bg-gray-100">
                        {t_item.img_url ? (
                          <img src={t_item.img_url} alt={t_item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <UserRound size={48} className="text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white dark:border-[#1a1a1a] ${t_item.status === "Online" ? "bg-green-500" : "bg-gray-300"}`} />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row items-center justify-between mb-3 gap-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t_item.name}</h3>
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${t_item.status === "Online" ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800"}`}>
                          {t_item.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-400 mb-6">
                        <span className="flex items-center gap-1.5"><MapPin size={16} className="text-[#C39F57]" /> {t_item.location}</span>
                        <span className="flex items-center gap-1.5"><Globe size={16} className="text-[#C39F57]" /> UZ, RU, ZH</span>
                      </div>
                      <a href="https://t.me/Consultng_bot" target="_blank" rel="noreferrer">
                        <button className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#C39F57] hover:bg-[#a08044] px-6 py-3 rounded-2xl transition-all shadow-lg shadow-[#C39F57]/20">
                          <MessageCircle size={18} /> {t.trans.contact}
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 bg-gray-50 dark:bg-[#111]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight">{t.trans.need}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 text-xl leading-relaxed">{t.trans.needDesc}</p>
          <a href="https://t.me/Consultng_bot" target="_blank" rel="noreferrer">
            <button className="bg-[#C39F57] hover:bg-[#a08044] text-white font-black px-12 py-6 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center gap-3 mx-auto text-lg uppercase tracking-widest">
              {t.trans.btn} <ArrowRight size={24} />
            </button>
          </a>
        </div>
      </section>

      <footer className="bg-black py-12 text-center text-white/20 text-sm">
        {t.footer.rights}
      </footer>
    </div>
  );
}
