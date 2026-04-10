import Navbar from "../../components/Navbar";
import Link from "next/link";
import { CheckCircle, ArrowRight, FileText, GraduationCap, Languages, Plane, MessageCircle, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Xizmatlarimiz – China Steps",
  description: "China Steps konsalting xizmatlari: Grant maslahat, Hujjat tayyorlash, Til kursi va boshqalar.",
};

const services = [
  {
    icon: <GraduationCap size={32} />,
    title: "Grant Konsultatsiyasi",
    price: "Bepul",
    priceNote: "(Dastlabki maslahat)",
    color: "from-[#C39F57] to-amber-600",
    features: [
      "Profil tahlili va grant mosligi",
      "To'g'ri yo'nalish tanlash",
      "Ariza strategiyasi",
      "Motivatsion xat tayyorlash",
      "Ikki tomonlama tekshirish",
    ],
  },
  {
    icon: <FileText size={32} />,
    title: "Hujjat Tayyorlash",
    price: "Professional",
    priceNote: "(To'liq paket)",
    color: "from-blue-600 to-indigo-700",
    features: [
      "Barcha hujjatlar ro'yxati",
      "Tarjima va apostil yordam",
      "Online ariza to'ldirish",
      "Universitetga email yozish",
      "Jarayon nazorati",
    ],
  },
  {
    icon: <Languages size={32} />,
    title: "Xitoy Tili Kursi",
    price: "Online",
    priceNote: "(Maxsus kod kerak)",
    color: "from-green-600 to-teal-700",
    features: [
      "HSK 1-4 tayyorgarlik",
      "Qisqa metrajli video darslar",
      "PDF darsliklar va testlar",
      "Jonli mashg'ulot linki",
      "Telegram bot orqali kod olish",
    ],
  },
  {
    icon: <Plane size={32} />,
    title: "Visa Yordam",
    price: "Qo'shimcha",
    priceNote: "(Ariza bergan talabalar uchun)",
    color: "from-purple-600 to-violet-700",
    features: [
      "X1 Talaba vizasi hujjatlari",
      "Elchixona uchun tayyorlov",
      "Intervyu mashqlari",
      "Yotoqxona joylashuvi maslahat",
      "Xitoyga chiqish yo'riqnomasi",
    ],
  },
  {
    icon: <MessageCircle size={32} />,
    title: "Telegram Bot Xizmati",
    price: "Bepul",
    priceNote: "(Hamma uchun)",
    color: "from-cyan-600 to-blue-600",
    features: [
      "Kurs kirishdagi unikal kod",
      "Joriy savollarga javob",
      "Grant yangiliklari bildirishnomasi",
      "Admin bilan to'g'ridan muloqot",
      "Ariza holati so'rovi",
    ],
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Karyera Yo'nalishi",
    price: "Tez Kunda",
    priceNote: "(Coming Soon)",
    color: "from-rose-600 to-pink-700",
    features: [
      "Xitoy kompaniyalari bilan staj",
      "LinkedIn profil optimizatsiya",
      "Xitoy bozorida ish axtarish",
      "Resume va cover letter",
      "Intervyu tayyorgarligi",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        className="relative py-40 px-4 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0f0a0a, #1a0f0f, #250f0f)" }}
      >
        <div className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2560&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/40 text-rose-300 px-5 py-2 rounded-full text-sm font-bold tracking-widest mb-6 uppercase">
            ⚡ Xizmatlar
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Xizmatlarimiz</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Grantdan Xitoyga etib borishgacha — barchasida yoningizda bo'lamiz.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className={`bg-gradient-to-br ${s.color} p-8 text-white`}>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
                    {s.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{s.title}</h3>
                  <div>
                    <span className="text-white font-black text-lg">{s.price}</span>
                    <span className="text-white/60 text-sm ml-2">{s.priceNote}</span>
                  </div>
                </div>
                <div className="bg-white p-8">
                  <ul className="space-y-3 mb-8">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-gray-600 text-sm">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/#contactform">
                    <button className="w-full bg-gray-900 hover:bg-[#C39F57] text-white font-bold py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 group-hover:bg-[#C39F57]">
                      Boshlash <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Qaysi Xizmat Kerak?</h2>
          <p className="text-gray-500 mb-10 text-lg">Bepul dastlabki maslahatda qaysi xizmat sizga eng mos ekanligini birgalikda aniqlaymiz.</p>
          <Link href="/">
            <button className="bg-[#C39F57] hover:bg-[#a08044] text-white font-bold px-10 py-5 rounded-full text-lg shadow-xl transition-all hover:scale-105">
              Bepul Maslahat →
            </button>
          </Link>
        </div>
      </section>

      <footer className="bg-black py-8 text-center text-white/30 text-sm">
        © 2026 China Steps. Barcha huquqlar himoyalangan.
      </footer>
    </div>
  );
}
