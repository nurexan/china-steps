"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import {
  ArrowRight, GraduationCap, MapPin, Star, CheckCircle,
  Phone, MessageCircle, ChevronDown, Users, Award, Globe, BookOpen, Loader2
} from "lucide-react";

export default function HomePage() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

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
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* ===================== HERO ===================== */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #0f0c06 0%, #1a1200 30%, #2d1f00 60%, #1a0f00 100%)",
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508804185872-d7bad18d4076?q=80&w=2560&auto=format&fit=crop')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 bg-[#C39F57]/20 border border-[#C39F57]/40 text-[#C39F57] px-5 py-2 rounded-full text-sm font-bold tracking-widest mb-8 uppercase">
            🌸 China Steps
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] mb-6">
            Kelajakni
            <span className="block" style={{ color: "#C39F57" }}>Xitoyda Quring</span>
          </h1>

          <p className="text-lg md:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed mb-12">
            Xitoyning eng nufuzli universitetlarida <strong className="text-white">to'liq grant</strong> asosida ta'lim olish imkoniyati.
            Biz bilan orzularingizga ishonchli qadam tashlang — birinchi maslahat <strong className="text-[#C39F57]">bepul</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link href="/grants">
              <button className="bg-[#C39F57] hover:bg-[#a08044] text-black font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105 shadow-xl shadow-[#C39F57]/30 flex items-center gap-2">
                Grantlarni Ko'rish <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/about">
              <button className="border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-white/10">
                Biz Haqimizda
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 text-white">
            {[
              { n: "200+", label: "Muvaffaqiyatli Talaba" },
              { n: "50+", label: "Hamkor Universitet" },
              { n: "100%", label: "Bepul Maslahat" },
              { n: "5+", label: "Yillik Tajriba" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-black mb-1" style={{ color: "#C39F57" }}>{s.n}</div>
                <div className="text-sm text-white/60 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* ===================== NIMA UCHUN XITOY ===================== */}
      <section className="py-28 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C39F57] font-bold tracking-widest text-sm uppercase block mb-3">Nima uchun Xitoy?</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">4 ta Asosiy Sabab</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <GraduationCap size={32} />, title: "To'liq Grant", desc: "Bakalavr, Magistratura va til kurslari uchun 100% gacha hukumat grantlari mavjud. Yotoqxona va stipendiya ham kiradi." },
              { icon: <Globe size={32} />, title: "Xalqaro Diplom", desc: "Xitoy universiteti diplomi butun dunyo bo'yicha tan olinadi. Karyerangizni global darajaga olib chiqadi." },
              { icon: <Award size={32} />, title: "Zamonaviy Ta'lim", desc: "Dunyoning top 100 universitetlari soni bo'yicha Xitoy AQShdan keyingi ikkinchi o'rinda turadi." },
              { icon: <Users size={32} />, title: "Xavfsiz Muhit", desc: "Xitoy xalqaro talabalar uchun dunyodagi eng xavfsiz davlatlardan biri. Kameralar va qattiq qonunlar." },
            ].map((item, i) => (
              <div key={i} className="group bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-[#C39F57]/10 rounded-2xl flex items-center justify-center text-[#C39F57] mb-6 group-hover:bg-[#C39F57] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== UNIVERSITETLAR Preview ===================== */}
      <section className="py-28 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-[#C39F57] font-bold tracking-widest text-sm uppercase block mb-3">Hamkor Universitetlar</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Nufuzli Dargohlar</h2>
            </div>
            <Link href="/universities">
              <button className="flex items-center gap-2 text-[#C39F57] font-bold border-b border-[#C39F57] pb-1 hover:text-[#a08044] transition-colors">
                Barchasini ko'rish <ArrowRight size={16} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Peking University", city: "Pekin, Xitoy", rank: "Rank #1 Xitoy", badge: "To'liq Grant",
                img: "https://images.unsplash.com/photo-1583507923701-d703770420bc?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Shanghai Jiao Tong", city: "Shanxay, Xitoy", rank: "QS Top 50", badge: "Qisman Grant",
                img: "https://images.unsplash.com/photo-1506059612708-99d6c258160e?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Zhejiang Universiteti", city: "Xangzhou, Xitoy", rank: "QS Top 100", badge: "Til Kurslari",
                img: "https://images.unsplash.com/photo-1548053676-e8b832b35a78?q=80&w=800&auto=format&fit=crop",
              },
            ].map((uni) => (
              <div key={uni.name} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={uni.img}
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#C39F57] text-black text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {uni.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-white/80 text-xs">
                      <Star size={12} className="fill-[#C39F57] text-[#C39F57]" />
                      {uni.rank}
                    </div>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{uni.name}</h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1.5 mb-5">
                    <MapPin size={14} className="text-[#C39F57]" /> {uni.city}
                  </p>
                  <Link href="/universities">
                    <button className="w-full bg-gray-50 hover:bg-[#C39F57] hover:text-white text-gray-700 font-bold py-3 rounded-xl transition-colors text-sm">
                      Batafsil Ma'lumot
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== JARAYON ===================== */}
      <section className="py-28 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C39F57] font-bold tracking-widest text-sm uppercase block mb-3">Qanday Ishlaydi?</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">4 Oddiy Qadam</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Murojaat Qiling", desc: "Forma to'ldiring yoki Telegram botimizga yozing. Bepul maslahat oling." },
              { step: "02", title: "Hujjat Tayyorlang", desc: "Mutaxassislarimiz kerakli hujjatlar ro'yxatini batafsil taqdim etadi." },
              { step: "03", title: "Ariza Yuboring", desc: "Universitetga rasmiy ariza yuborishda to'liq yordam ko'rsatamiz." },
              { step: "04", title: "Xitoyga Boring!", desc: "Qabul xatini olasiz va visa jarayonida ham qo'llab-quvvatlaymiz." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-[#C39F57]/10 border border-[#C39F57]/20 rounded-3xl p-8 h-full">
                  <div className="text-5xl font-black text-[#C39F57]/20 mb-4">{item.step}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SHARHLAR ===================== */}
      <section className="py-28 px-4" style={{ background: "linear-gradient(135deg, #0f0c06, #1a1500)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C39F57] font-bold tracking-widest text-sm uppercase block mb-3">Talabalarimiz So'zlari</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Haqiqiy Hikoyalar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Azizbek R.", uni: "Zhejiang University", text: "China Steps orqali to'liq grant yutib oldim. Hozir Xitoydaman, hammasi ajoyib! Tavsiya qilaman!", year: "2023" },
              { name: "Madina S.", uni: "Tsinghua University", text: "Hujjatlar juda tez va oson hal bo'ldi. Har bir qadamda yordam berishdi. Rahmat China Steps!", year: "2023" },
              { name: "Jasur X.", uni: "Fudan University", text: "Xitoyda o'qish — hayotimning eng to'g'ri qarori bo'ldi. Bu imkon uchun China Steps ga minnatdorman.", year: "2024" },
            ].map((r) => (
              <div key={r.name} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#C39F57] text-[#C39F57]" />
                  ))}
                </div>
                <p className="text-white/80 text-base leading-relaxed mb-8 italic">"{r.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#C39F57] rounded-full flex items-center justify-center text-black font-black text-lg">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold">{r.name}</p>
                    <p className="text-[#C39F57] text-sm">{r.uni} · {r.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="py-28 bg-white px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C39F57] font-bold tracking-widest text-sm uppercase block mb-3">Ko'p So'raladigan</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Savollar (FAQ)</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Grant yutib olsam yotoqxona ham bepulmi?", a: "Ha, to'liq grant yutkan talabalar uchun yotoqxona bepul. Oziq-ovqat va shaxsiy xarajatlar uchun oyiga o'rtacha 150-250$ yetarli bo'ladi." },
              { q: "Xitoy tilini bilmasam ham boshlasa bo'ladimi?", a: "Ha! Ko'pgina universitetlar ingliz tilida o'qitadi. Bundan tashqari, til o'rganish uchun 1 yillik Foundation kurslari ham grant asosida taqdim etiladi." },
              { q: "Xitoy qanchalik xavfsiz?", a: "Xitoy dunyodagi eng xavfsiz davlatlardan biri. Keng tarmoqli kameralar tizimi va qattiq qonunlar tufayli ko'chalarda tunda ham bemalol yurishingiz mumkin." },
              { q: "Hujjatlar tayyorlash qancha vaqt oladi?", a: "Odatda 2-4 hafta. Biz butun jarayonda sizga yordam beramiz: tarjimadan apostil tasdiqlashgacha." },
              { q: "Maslahat puli to'lanadimi?", a: "Birinchi maslahat 100% bepul. Biz faqat grant yutib olganingizdan keyin to'lovni muhokama qilamiz. Natija bo'lmasa — to'lov yo'q." },
            ].map((item, i) => (
              <details key={i} className="group border border-gray-100 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-gray-900 hover:bg-gray-50 transition-colors list-none">
                  {item.q}
                  <ChevronDown size={20} className="text-[#C39F57] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CONTACT FORM ===================== */}
      <section className="py-28 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[#C39F57] font-bold tracking-widest text-sm uppercase block mb-3">Bepul Maslahat</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Bugun Boshlang</h2>
          <p className="text-gray-500 mb-12 text-lg">Raqamingizni qoldiring. Operatorimiz 30 daqiqa ichida qo'ng'iroq qiladi.</p>

          {status === "done" ? (
            <div className="bg-green-50 border border-green-200 rounded-3xl p-12">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Qabul qilindi!</h3>
              <p className="text-gray-500">Tez orada siz bilan bog'lanamiz. Telegram: @Consultng_bot</p>
              <button onClick={() => setStatus("idle")} className="mt-6 text-sm underline text-gray-400 hover:text-gray-600">Yana yuborish</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-3xl p-10 shadow-xl text-left space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ismingiz *</label>
                <input
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  className="w-full border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-[#C39F57] focus:ring-2 focus:ring-[#C39F57]/20 transition-all"
                  placeholder="Asadbek Yusupov"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Telefon raqam *</label>
                <input
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required type="tel"
                  className="w-full border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-[#C39F57] focus:ring-2 focus:ring-[#C39F57]/20 transition-all"
                  placeholder="+998 90 000 00 00"
                />
              </div>
              <button
                type="submit" disabled={status === "loading"}
                className="w-full bg-[#C39F57] hover:bg-[#a08044] text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:shadow-xl disabled:opacity-60 flex items-center justify-center gap-2 text-base"
              >
                {status === "loading" ? <><Loader2 size={20} className="animate-spin" /> Yuborilmoqda...</> : "Bepul Maslahat Olish →"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer style={{ background: "linear-gradient(135deg, #0f0c06, #1a1200)" }} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <h3 className="font-serif text-2xl font-bold text-white mb-4">China Steps</h3>
              <p className="text-white/50 max-w-sm leading-relaxed mb-6">
                Xitoyning eng nufuzli oliygohlarida ta'lim olish imkoniyati. Professional maslahat va to'liq qo'llab-quvvatlash.
              </p>
              <div className="flex gap-3">
                <a href="tel:+998900001340" className="bg-white/10 hover:bg-[#C39F57] text-white p-3 rounded-xl transition-colors">
                  <Phone size={18} />
                </a>
                <a href="https://t.me/Consultng_bot" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-blue-500 text-white p-3 rounded-xl transition-colors">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Sahifalar</h4>
              <div className="space-y-2">
                {[["Grantlar", "/grants"], ["Universitetlar", "/universities"], ["Kurslar", "/courses"], ["Sayohat", "/travel"]].map(([label, href]) => (
                  <Link key={href} href={href} className="block text-white/50 hover:text-[#C39F57] transition-colors text-sm">{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Aloqa</h4>
              <div className="space-y-2 text-white/50 text-sm">
                <p>📞 +998 90 000 13 40</p>
                <p>✉️ info@chinasteps.uz</p>
                <p>📱 @Consultng_bot</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">© 2026 China Steps. Barcha huquqlar himoyalangan.</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-green-400 text-sm font-medium">Telegram Bot Ulangan</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-6 z-50 flex flex-col gap-3">
        <a href="https://t.me/Consultng_bot" target="_blank" rel="noreferrer"
          className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all">
          <MessageCircle size={24} />
        </a>
        <a href="tel:+998900001340"
          className="w-14 h-14 bg-[#C39F57] hover:bg-[#a08044] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all animate-bounce">
          <Phone size={24} />
        </a>
      </div>
    </div>
  );
}
