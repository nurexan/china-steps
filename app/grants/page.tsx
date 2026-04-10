import Navbar from "../../components/Navbar";
import Link from "next/link";
import { CheckCircle, ArrowRight, Star } from "lucide-react";

export const metadata = {
  title: "Grantlar – China Steps",
  description: "Xitoy hukumati va universitetlarining to'liq va qisman grantlari haqida to'liq ma'lumot.",
};

const grants = [
  {
    name: "Xitoy Hukumati Granti (CSC)",
    type: "To'liq Grant",
    cover: true,
    items: ["O'qish to'lovi — bepul", "Yotoqxona — bepul", "Oylik stipendiya (1500–3500 yuan)", "Sug'urta — bepul", "Bakalavr, Magistr, Doktorantura"],
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Konfutsiy Instituti Granti",
    type: "Til Granti",
    cover: false,
    items: ["Xitoy tilini noldan o'rganish", "6–12 oylik kurs", "Stipendiya va yotoqxona", "Ehtiyojchilar uchun prioritet", "Sertifikat beriladi"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Provinsiya va Universitet Grantlari",
    type: "Qisman Grant",
    cover: false,
    items: ["O'qish to'lovi qoplash (50–100%)", "Reyting asosida tanlov", "Har yili yangilanish", "Ko'proq imkoniyat", "Ariza topshirish osonroq"],
    color: "from-[#C39F57] to-amber-600",
  },
];

export default function GrantsPage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        className="relative py-40 px-4 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0f0c06, #1a1400, #2a1f00)" }}
      >
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2560&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#C39F57]/20 border border-[#C39F57]/40 text-[#C39F57] px-5 py-2 rounded-full text-sm font-bold tracking-widest mb-6 uppercase">
            🎓 Grantlar
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Bepul Ta'lim Imkoniyati</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Xitoy hukumati va universitetlarining rasmiy grantlari. Bitta ariza bilan hayotingizni o'zgartiring.
          </p>
        </div>
      </section>

      {/* Grants Cards */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900">Grant Turlari</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {grants.map((g) => (
              <div key={g.name} className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group">
                <div className={`bg-gradient-to-br ${g.color} p-8 text-white`}>
                  <div className="text-xs font-black uppercase tracking-widest mb-3 opacity-80">{g.type}</div>
                  <h3 className="text-2xl font-bold leading-tight">{g.name}</h3>
                </div>
                <div className="p-8 bg-white">
                  <ul className="space-y-3 mb-8">
                    {g.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/#contactform">
                    <button className="w-full bg-gray-900 hover:bg-[#C39F57] text-white font-bold py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                      Ariza Berish <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-24 bg-gray-50 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: "2025", label: "Grant Yili" },
            { n: "100%", label: "Bepul Maslahat" },
            { n: "45+", label: "Talaba Grant Oldi" },
            { n: "3 oy", label: "O'rtacha Jarayon" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <div className="text-4xl font-black text-[#C39F57] mb-2">{s.n}</div>
              <div className="text-gray-500 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4" style={{ background: "linear-gradient(135deg, #0f0c06, #1a1400)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <Star size={40} className="text-[#C39F57] mx-auto mb-6 fill-[#C39F57]" />
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Hozir Boshlash Vaqti</h2>
          <p className="text-white/60 text-lg mb-10">Har yil grant kvotasi qisqarib boradi. Bugun murojaat qiling!</p>
          <Link href="/">
            <button className="bg-[#C39F57] hover:bg-[#a08044] text-black font-bold px-10 py-5 rounded-full text-lg shadow-xl transition-all hover:scale-105">
              Bepul Maslahat Olish →
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 text-center text-white/30 text-sm">
        © 2026 China Steps. Barcha huquqlar himoyalangan.
      </footer>
    </div>
  );
}
