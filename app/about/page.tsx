import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Users, Award, Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Biz Haqimizda – China Steps",
  description: "China Steps jamoasi haqida. Xitoyda o'z tajribamizdan o'tgan mutaxassislar guruhi.",
};

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        className="relative py-40 px-4 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0f0814, #1a1025, #0a0a1a)" }}
      >
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2560&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-400/40 text-pink-300 px-5 py-2 rounded-full text-sm font-bold tracking-widest mb-6 uppercase">
            🌸 Biz Haqimizda
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Bizning Hikoya</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Biz agentlik emasmiz. Biz Xitoyda o'qib, ta'lim sirlarini o'rganib qaytgan va endi ulashmoqchi bo'lgan yigitlar jamoasimiz.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <span className="text-[#C39F57] font-bold tracking-widest text-sm uppercase block mb-4">Biz Kim?</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-8 leading-snug">
              Xitoydan Qaytgan, <br /> Tajriba Ulashmoqchi Yigitlar
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
              <p>
                <strong className="text-gray-900">China Steps</strong> 2023-yilda Xitoyda o'qiyotgan bir guruh o'zbek talabalari tomonidan tuzilgan bo'lib, dastlab faqat do'stlar uchun Telegram kanal bo'lgan.
              </p>
              <p>
                Biz grant qanday topilishini, hujjatlar qanday tayyorlanishini, Xitoyda qanday arzon yashashni o'z boshimizdan o'tgan holda bilamiz. Shuning uchun maslahatlarimiz real va amaliy.
              </p>
              <p>
                Bugun <strong className="text-gray-900">100+ talabaga</strong> Xitoyga yo'l ochib berishimizdan faxrlanamiz. Va asosiy motto shundaylicha qoladi:
              </p>
              <blockquote className="border-l-4 border-[#C39F57] pl-6 py-4 bg-gray-50 rounded-r-xl italic text-gray-700">
                "Birinchi maslahat — doim bepul. Siz grant olmasangiz — biz xizmat haqini olmaymiz."
              </blockquote>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -top-6 -right-6 w-full h-full bg-[#C39F57]/10 rounded-3xl hidden lg:block" />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop"
              alt="China Steps Jamoasi"
              className="relative rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: "200+", label: "Muvaffaqiyatli Talaba", icon: <Users size={24} /> },
            { n: "50+", label: "Hamkor Universitetlar", icon: <Award size={24} /> },
            { n: "5", label: "Yillik Tajriba", icon: <Heart size={24} /> },
            { n: "100%", label: "Bepul Dastlabki Maslahat", icon: <Heart size={24} /> },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="text-[#C39F57] flex justify-center mb-3">{s.icon}</div>
              <div className="text-4xl font-black text-gray-900 mb-2">{s.n}</div>
              <div className="text-gray-500 text-sm font-medium leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900">Jamoa</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Nurexan",
                role: "Asoschisi va Bosh Maslahatchi",
                uni: "Peking University mezuni",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
              },
              {
                name: "Aziza",
                role: "Grant bo'yicha Mutaxassis",
                uni: "Zhejiang University mezuni",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
              },
              {
                name: "Jasur",
                role: "Til va Kurs Koordinatori",
                uni: "Shanghai Jiao Tong mezuni",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
              },
            ].map((member) => (
              <div key={member.name} className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all group">
                <div className="h-72 overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-[#C39F57] font-semibold text-sm mt-1">{member.role}</p>
                  <p className="text-gray-400 text-xs mt-2">{member.uni}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4" style={{ background: "linear-gradient(135deg, #0f0c06, #1a1400)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Bir Qadam Oldin Bo'ling</h2>
          <p className="text-white/60 text-lg mb-10">Biz siz bilan birga Xitoyga borishipga tayyormiz. Siz ham tayyormisiz?</p>
          <Link href="/">
            <button className="bg-[#C39F57] hover:bg-[#a08044] text-black font-bold px-10 py-5 rounded-full text-lg shadow-xl transition-all hover:scale-105 flex items-center gap-2 mx-auto">
              Bog'lanish <ArrowRight size={20} />
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
