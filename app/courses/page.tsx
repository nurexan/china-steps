"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { LockKeyhole, LockOpen, ArrowRight, Download, Play, BookOpen, Loader2, MessageCircle } from "lucide-react";

const VALID_CODES = ["CS-001", "CS-002", "CS-123", "CHINA2026", "DEMO"];

export default function CoursesPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "unlocked" | "error">("idle");
  const [activeLesson, setActiveLesson] = useState<number | null>(null);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "course_access", courseCode: code.toUpperCase() }),
      });
    } catch { /* silence */ }

    setTimeout(() => {
      const valid = VALID_CODES.includes(code.toUpperCase().trim());
      setStatus(valid ? "unlocked" : "error");
    }, 1000);
  };

  const lessons = [
    { id: 1, title: "Dars 1: Xitoy Tilining Asoslari (Pinyin)", duration: "18 daqiqa", level: "Boshlang'ich", type: "video" },
    { id: 2, title: "Dars 2: Tonlar va Talaffuz Sirlari", duration: "22 daqiqa", level: "Boshlang'ich", type: "video" },
    { id: 3, title: "Dars 3: 100 ta Zaruriy So'z (HSK 1)", duration: "35 daqiqa", level: "Boshlang'ich", type: "video" },
    { id: 4, title: "HSK 1 Test to'plami (PDF)", duration: "50 savol", level: "Test", type: "pdf" },
    { id: 5, title: "Dars 4: Muloqot Iboralari (Restoran, Metro)", duration: "28 daqiqa", level: "A1", type: "video" },
    { id: 6, title: "Dars 5: Xitoyda Hayot — Talaba Ko'zi Bilan", duration: "45 daqiqa", level: "A1", type: "video" },
    { id: 7, title: "HSK 2 Lug'at Ro'yxati (PDF)", duration: "300 so'z", level: "Test", type: "pdf" },
    { id: 8, title: "Jonli Online Darsga Yozilish", duration: "Haftada 2 marta", level: "Premium", type: "live" },
  ];

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        className="relative py-40 px-4 text-white text-center"
        style={{ background: "linear-gradient(135deg, #050f1a, #0a1f35, #0f2a4a)" }}
      >
        <div className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2560&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex gap-2 bg-blue-500/20 border border-blue-400/40 text-blue-300 px-5 py-2 rounded-full text-sm font-bold tracking-widest mb-6 uppercase items-center">
            📚 Xitoy Tili Kurslari
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Maxsus Kurslar</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Video darslar, PDF qo'llanmalar va jonli mashg'ulotlar — faqat maxsus kod egalariga.
          </p>
        </div>
      </section>

      {/* Lock Section */}
      <section className="py-24 px-4 bg-white flex flex-col items-center">
        {status !== "unlocked" ? (
          <>
            {/* What's inside preview */}
            <div className="max-w-5xl w-full mb-16">
              <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-10">Ichida Nima Bor?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: <Play size={24} />, title: "8+ Video Dars", desc: "Boshlang'ichdan A2 darajagacha qisqa va amaliy darslar", color: "bg-blue-50 text-blue-600" },
                  { icon: <Download size={24} />, title: "PDF Testlar", desc: "HSK 1-3 uchun test to'plamlari va lug'atlar", color: "bg-green-50 text-green-600" },
                  { icon: <MessageCircle size={24} />, title: "Jonli Darslar", desc: "Haftada 2 marta o'qituvchi bilan to'g'ridan video mashg'ulot", color: "bg-purple-50 text-purple-600" },
                ].map((item) => (
                  <div key={item.title} className="border border-gray-100 rounded-2xl p-7 text-center">
                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lock Form */}
            <div className="max-w-md w-full bg-gray-50 border border-gray-200 rounded-3xl p-10 text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C39F57] via-amber-400 to-[#C39F57]" />

              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-200">
                <LockKeyhole size={32} className="text-[#C39F57]" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">Kirish Kodi Kerak</h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Kurslar faqat maxsus yashirin kodli foydalanuvchilarga ochiq. Kodni telegram botimiz orqali oling.
              </p>

              <form onSubmit={handleUnlock} className="space-y-4">
                <input
                  value={code}
                  onChange={(e) => { setCode(e.target.value); if (status === "error") setStatus("idle"); }}
                  placeholder="KIRISH KODINI YOZING..."
                  required
                  className={`w-full bg-white border-2 rounded-xl px-5 py-4 text-center font-mono text-sm tracking-widest uppercase focus:outline-none transition-all ${
                    status === "error" ? "border-red-400 text-red-600" : "border-gray-200 focus:border-[#C39F57] text-gray-900"
                  }`}
                />
                {status === "error" && (
                  <p className="text-red-500 text-sm font-bold">❌ Noto'g'ri yoki eskirgan kod!</p>
                )}
                <button
                  type="submit" disabled={status === "loading"}
                  className="w-full bg-gray-900 hover:bg-[#C39F57] text-white font-bold py-4 rounded-xl transition-colors text-sm tracking-widest disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? <><Loader2 size={18} className="animate-spin" /> Tekshirilmoqda...</> : "KIRISH →"}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-4">Kodingiz yo'qmi?</p>
                <a
                  href="https://t.me/Consultng_bot?start=getcode"
                  target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-4 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle size={18} /> Telegram Bot orqali Kodni Olish <ArrowRight size={16} />
                </a>
              </div>

              <p className="mt-4 text-xs text-gray-400">Demo uchun DEMO kodini kiriting</p>
            </div>
          </>
        ) : (
          /* UNLOCKED CONTENT */
          <div className="max-w-5xl w-full">
            <div className="bg-green-50 border border-green-200 rounded-3xl p-8 flex items-center gap-6 mb-10">
              <div className="bg-green-100 p-4 rounded-2xl">
                <LockOpen size={32} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Xush Kelibsiz! 🎉</h2>
                <p className="text-gray-500">Premium kurs materiallariga to'liq kirishingiz ochiq.</p>
              </div>
              <button onClick={() => { setStatus("idle"); setCode(""); }} className="text-sm text-gray-400 hover:text-gray-600 underline">Chiqish</button>
            </div>

            <div className="space-y-4">
              {lessons.map((lesson, i) => (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(activeLesson === i ? null : i)}
                  className="bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      lesson.type === "video" ? "bg-blue-100 text-blue-600" :
                      lesson.type === "pdf" ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"
                    }`}>
                      {lesson.type === "video" ? <Play size={20} /> : lesson.type === "pdf" ? <BookOpen size={20} /> : <MessageCircle size={20} />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{lesson.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{lesson.duration} · {lesson.level}</p>
                    </div>
                    <button className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                      lesson.type === "live" ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-[#C39F57] hover:bg-[#a08044] text-white"
                    }`}>
                      {lesson.type === "video" ? "▶ Ko'rish" : lesson.type === "pdf" ? "⬇ Yuklab olish" : "📅 Yozilish"}
                    </button>
                  </div>
                  {activeLesson === i && (
                    <div className="mt-5 pt-5 border-t border-gray-100 bg-gray-50 rounded-xl p-5 text-center text-gray-500 text-sm">
                      🚀 Kurs kontenti yaqin orada qo'shiladi. Jonli darslar hozirdan mavjud — Telegram botga yozing!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer className="bg-black py-8 text-center text-white/30 text-sm">
        © 2026 China Steps. Barcha huquqlar himoyalangan.
      </footer>
    </div>
  );
}
