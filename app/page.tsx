"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import {
  ArrowRight, GraduationCap, MapPin, Star, CheckCircle,
  Phone, MessageCircle, ChevronDown, Users, Award, Globe, Loader2
} from "lucide-react";
import { useLang } from "../components/ContextProviders";
import { supabase, type University } from "../lib/supabase";

export default function HomePage() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [unis, setUnis] = useState<University[]>([]);
  const [loadingUnis, setLoadingUnis] = useState(true);

  useEffect(() => {
    async function loadUnis() {
      const { data } = await supabase
        .from('universities')
        .select('*')
        .limit(3)
        .order('created_at', { ascending: false });
      
      if (data && data.length > 0) {
        setUnis(data);
      } else {
        // Fallback gorgeous static data if DB is empty
        setUnis([
          { id: '1', name: "Peking University", city: "Beijing", grant_type: "To'liq Grant", img_url: "https://images.unsplash.com/photo-1583507923701-d703770420bc?q=80&w=1200&auto=format&fit=crop", created_at: "" },
          { id: '2', name: "Shanghai Jiao Tong", city: "Shanghai", grant_type: "Qisman Grant", img_url: "https://images.unsplash.com/photo-1506059612708-99d6c258160e?q=80&w=1200&auto=format&fit=crop", created_at: "" },
          { id: '3', name: "Zhejiang University", city: "Hangzhou", grant_type: "Kontrakt", img_url: "https://images.unsplash.com/photo-1548053676-e8b832b35a78?q=80&w=1200&auto=format&fit=crop", created_at: "" },
        ]);
      }
      setLoadingUnis(false);
    }
    loadUnis();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name: form.name, phone: form.phone }),
      });
      setStatus("done");
      setForm({ name: "", phone: "" });
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div className="overflow-x-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <Navbar />

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Background Video or Image fallback */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510168341103-6cb28dcaeaa7?q=80&w=2560&auto=format&fit=crop')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-white dark:to-[#0a0a0a]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-32 pb-20">
          <div className="inline-flex items-center gap-2 bg-[#C39F57]/20 border border-[#C39F57]/40 text-[#C39F57] backdrop-blur-md px-6 py-2 rounded-full text-sm font-bold tracking-widest mb-8 uppercase shadow-xl animate-fade-in-up">
            {t.hero.tag}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] mb-6 text-white drop-shadow-2xl">
            {t.hero.title1}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C39F57] to-[#F2D795]">
              {t.hero.title2}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-12 drop-shadow-md">
            {t.hero.desc}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <Link href="/grants">
              <button className="bg-gradient-to-r from-[#C39F57] to-[#a08044] text-white font-bold px-10 py-5 rounded-full text-base transition-all hover:scale-105 shadow-xl shadow-[#C39F57]/30 flex items-center gap-2">
                {t.hero.btn1} <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/about">
              <button className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-10 py-5 rounded-full text-base transition-all">
                {t.hero.btn2}
              </button>
            </Link>
          </div>

          {/* Stats Box */}
          <div className="bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-10 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { n: "200+", label: t.hero.stats.s1 },
                { n: "50+", label: t.hero.stats.s2 },
                { n: "100%", label: t.hero.stats.s3 },
                { n: "5+", label: t.hero.stats.s4 },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
                    {s.n}
                  </div>
                  <div className="text-sm font-bold text-[#C39F57] uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* ===================== NIMA UCHUN XITOY ===================== */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 relative z-10">
            <span className="text-[#C39F57] font-black tracking-widest text-sm uppercase block mb-3">{t.why.tag}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white">
              {t.why.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <GraduationCap size={40} />, title: t.why.t1, desc: t.why.d1 },
              { icon: <Globe size={40} />, title: t.why.t2, desc: t.why.d2 },
              { icon: <Award size={40} />, title: t.why.t3, desc: t.why.d3 },
              { icon: <Users size={40} />, title: t.why.t4, desc: t.why.d4 },
            ].map((item, i) => (
              <div key={i} className="group bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[2rem] p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-20 h-20 bg-white dark:bg-[#1a1a1a] shadow-lg rounded-2xl flex items-center justify-center text-[#C39F57] mb-8 group-hover:bg-[#C39F57] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== UNIVERSITETLAR (Dynamic/Fallback Fix) ===================== */}
      <section className="py-32 px-4 bg-gray-50 dark:bg-[#111] relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#C39F57]/5 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#C39F57] font-black tracking-widest text-sm uppercase block mb-3">{t.universities.tag}</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white">
                {t.universities.title}
              </h2>
            </div>
            <Link href="/universities">
              <button className="flex items-center gap-2 lg:text-lg text-[#C39F57] font-bold hover:text-[#a08044] transition-colors bg-white dark:bg-[#1a1a1a] px-6 py-3 rounded-full shadow-sm">
                {t.universities.viewAll} <ArrowRight size={20} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {loadingUnis ? (
              <div className="col-span-3 py-20 flex justify-center text-[#C39F57]">
                <Loader2 size={48} className="animate-spin" />
              </div>
            ) : (
              unis.map((uni, i) => (
                <div key={i} className="group bg-white dark:bg-[#1a1a1a] rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl dark:hover:shadow-[#C39F57]/10 transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={uni.img_url}
                      alt={uni.name}
                      onError={(e) => {
                        // Fallback image if broken
                        e.currentTarget.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop";
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-5 left-5">
                      <span className={`text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider backdrop-blur-md ${
                        uni.grant_type === "To'liq Grant" ? "bg-green-500/90" :
                        uni.grant_type === "Kontrakt" ? "bg-red-500/90" : "bg-[#C39F57]/90"
                      }`}>
                        {uni.grant_type}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1">{uni.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-8 text-lg">
                      <MapPin size={18} className="text-[#C39F57]" /> {uni.city}
                    </p>
                    <Link href="/universities">
                      <button className="w-full bg-gray-50 dark:bg-[#111] hover:bg-[#C39F57] dark:hover:bg-[#C39F57] hover:text-white text-gray-700 dark:text-gray-300 font-bold py-4 rounded-xl transition-all text-base border border-gray-100 dark:border-gray-800 hover:border-transparent">
                        {t.universities.detail}
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===================== JARAYON ===================== */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 relative z-10">
            <span className="text-[#C39F57] font-black tracking-widest text-sm uppercase block mb-3">{t.process.tag}</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white">
              {t.process.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: t.process.s1, desc: t.process.d1 },
              { step: "02", title: t.process.s2, desc: t.process.d2 },
              { step: "03", title: t.process.s3, desc: t.process.d3 },
              { step: "04", title: t.process.s4, desc: t.process.d4 },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-[#C39F57]/5 dark:bg-[#C39F57]/10 border border-[#C39F57]/20 rounded-[2rem] p-10 h-full hover:bg-[#C39F57] group transition-colors duration-500">
                  <div className="text-6xl font-black text-[#C39F57]/30 dark:text-[#C39F57]/40 mb-6 group-hover:text-white/40 transition-colors">{item.step}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg group-hover:text-white/90 transition-colors">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CONTACT FORM ===================== */}
      <section className="py-32 px-4 bg-gray-50 dark:bg-[#111]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C39F57]/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />

            <div className="text-center mb-12 relative z-10">
              <span className="text-[#C39F57] font-black tracking-widest text-sm uppercase block mb-3">{t.contact.tag}</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">{t.contact.title}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">{t.contact.desc}</p>
            </div>

            {status === "done" ? (
              <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-3xl p-12 text-center relative z-10">
                <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{t.contact.success}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">Telegram: @Consultng_bot</p>
                <button onClick={() => setStatus("idle")} className="text-[#C39F57] hover:text-[#a08044] font-bold underline underline-offset-4">
                  {t.contact.resend}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 pl-2">{t.contact.name}</label>
                  <input
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                    className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-2xl px-6 py-5 focus:outline-none focus:border-[#C39F57] focus:ring-4 focus:ring-[#C39F57]/10 transition-all text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 pl-2">{t.contact.phone}</label>
                  <input
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required type="tel"
                    className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-2xl px-6 py-5 focus:outline-none focus:border-[#C39F57] focus:ring-4 focus:ring-[#C39F57]/10 transition-all text-lg"
                    placeholder="+998"
                  />
                </div>
                <button
                  type="submit" disabled={status === "loading"}
                  className="w-full bg-gradient-to-r from-[#C39F57] to-[#a08044] text-white font-bold py-5 rounded-2xl shadow-xl shadow-[#C39F57]/20 transition-all hover:shadow-[#C39F57]/40 hover:scale-[1.02] disabled:opacity-60 flex items-center justify-center gap-3 text-lg mt-4"
                >
                  {status === "loading" ? <><Loader2 size={24} className="animate-spin" /></> : t.contact.btn}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-gray-900 border-t border-gray-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#C39F57] rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-xl font-serif">C</span>
                </div>
                <span className="font-serif text-3xl font-bold tracking-widest uppercase">China Steps</span>
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed mb-8 text-lg">
                {t.footer.desc}
              </p>
              <div className="flex gap-4">
                <a href="tel:+998900001340" className="w-12 h-12 bg-white/5 hover:bg-[#C39F57] border border-white/10 flex items-center justify-center rounded-xl transition-all hover:-translate-y-1">
                  <Phone size={20} />
                </a>
                <a href="https://t.me/Consultng_bot" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 hover:bg-blue-500 border border-white/10 flex items-center justify-center rounded-xl transition-all hover:-translate-y-1">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-xl mb-6">{t.footer.pages}</h4>
              <div className="space-y-4">
                {[['/grants', t.nav.grants], ['/universities', t.nav.universities], ['/courses', t.nav.courses]].map(([href, label]) => (
                  <Link key={href} href={href} className="block text-gray-400 hover:text-[#C39F57] transition-colors text-lg">{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-xl mb-6">{t.footer.contact}</h4>
              <div className="space-y-4 text-gray-400 text-lg">
                <p className="flex items-center gap-3"><Phone size={18} className="text-[#C39F57]" /> +998 90 000 13 40</p>
                <p className="flex items-center gap-3"><MessageCircle size={18} className="text-blue-500" /> @Consultng_bot</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 font-medium">{t.footer.rights}</p>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              <p className="text-green-500 text-sm font-bold tracking-wide">SYSTEM ONLINE</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-6 z-50 flex flex-col gap-4">
        <a href="tel:+998900001340" className="group flex items-center">
          <div className="absolute right-full mr-4 bg-black text-white text-sm font-bold px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
            Qo'ng'iroq Qilish
          </div>
          <div className="w-14 h-14 bg-[#C39F57] hover:bg-[#a08044] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all border-2 border-white/20">
            <Phone size={24} />
          </div>
        </a>
      </div>
    </div>
  );
}
