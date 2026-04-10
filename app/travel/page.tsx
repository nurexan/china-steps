import Navbar from "../../components/Navbar";
import Link from "next/link";
import { MapPin, DollarSign, Plane, Smartphone, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Tekin Sayohat – China Steps",
  description: "Xitoyda arzon va tekin sayohat qilish sirlari. Shaxsiy tajribalar va foydali ilovalar.",
};

const experiences = [
  {
    title: "Pekin – 3 Kunlik Sayohat",
    budget: "~$40",
    places: ["Buyuk Xitoy Devori", "Yashriq Shahar", "Tian'anmen Maydoni", "Summer Palace"],
    img: "https://images.unsplash.com/photo-1444778485397-8e24b168778d?q=80&w=800&auto=format&fit=crop",
    tip: "Talaba ID kartası bilan kirishni 50% chegirma olasiz!",
  },
  {
    title: "Shanxay – Zamonaviy Megalopolis",
    budget: "~$50",
    places: ["The Bund yoqalama", "Yuyuan bog'i", "Lujiazui ko'tarilish", "1000 yillik Shahar"],
    img: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=800&auto=format&fit=crop",
    tip: "Metro kartasi arzon va qulay — bir haftalik o'ylab sotib oling.",
  },
  {
    title: "Chengdu – Panda Shahri",
    budget: "~$30",
    places: ["Giant Panda Markaziy", "Jinli ko'chasi", "Leshan Buddha haykali", "Sichuan oshxonasi"],
    img: "https://images.unsplash.com/photo-1517554558809-9b4971b38f39?q=80&w=800&auto=format&fit=crop",
    tip: "Panda markaziga ertalab boring — 8:00da pandalar faol bo'ladi!",
  },
];

const apps = [
  { name: "Ctrip (携程)", desc: "Xitoy ichida arzon poyezd va aviabilet izlash uchun eng yaxshi ilova", icon: "✈️" },
  { name: "DiDi (滴滴)", desc: "Xitoyda taksi chaqirish. Uber'ning Xitoy analogi, 2-3x arzonroq", icon: "🚕" },
  { name: "Alipay (支付宝)", desc: "Xitoyda naqd pulsiz to'lov. Hamma yerda qabul qilinadi", icon: "💳" },
  { name: "Meituan (美团)", desc: "Arzon ovqat yetkazib berish. Student chegirmalari ko'p", icon: "🍜" },
  { name: "WeChat (微信)", desc: "Xitoyda hamma narsani shu orqali qilish mumkin — to'lov, chat, xabar", icon: "💬" },
  { name: "12306", desc: "Rasmiy poyezd chipta ilovasi. Eng arzon narxlar faqat shu yerda", icon: "🚄" },
];

export default function TravelPage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        className="relative py-40 px-4 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a1a0f, #0f2a15, #1a3d1a)" }}
      >
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=2560&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/40 text-green-300 px-5 py-2 rounded-full text-sm font-bold tracking-widest mb-6 uppercase">
            🌏 Tekin Sayohat
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Arzon Sayohat Sirlari</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Men sayohat sotmayman — <strong className="text-white">arzon va tekin sayohat qilishni o'rgataman.</strong> Shaxsiy tajribalarim va sinoqdan o'tgan maslahatlar.
          </p>
        </div>
      </section>

      {/* My Experiences */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C39F57] font-bold tracking-widest text-sm uppercase block mb-3">Shaxsiy Tajribalarim</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Mening Sayohatlarim</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Har bir sayohatni qancha xarajatda qilganimni ochiq yozib beraman.</p>
          </div>
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={exp.title} className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center bg-gray-50 rounded-3xl overflow-hidden border border-gray-100`}>
                <div className="w-full lg:w-1/2 h-72 lg:h-[400px] overflow-hidden flex-shrink-0">
                  <img src={exp.img} alt={exp.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex-1 p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-green-100 text-green-700 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <DollarSign size={12} /> {exp.budget} / kishi
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{exp.title}</h3>
                  <ul className="space-y-2 mb-6">
                    {exp.places.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin size={14} className="text-[#C39F57]" /> {p}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-[#C39F57]/10 border border-[#C39F57]/30 rounded-xl p-4">
                    <p className="text-sm font-bold text-[#C39F57] mb-1">💡 Maxfiy Maslahat:</p>
                    <p className="text-gray-700 text-sm">{exp.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Useful Apps */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C39F57] font-bold tracking-widest text-sm uppercase block mb-3">Ilovalar</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Xitoydagi Zaruriy 6 Ilova</h2>
            <p className="text-gray-500 mt-4">Men o'zim ishlatadigan va hammalarga tavsiya qiladigan ilovalar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <div key={app.name} className="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="text-4xl mb-4">{app.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone size={16} className="text-[#C39F57]" />
                  <h3 className="font-bold text-gray-900">{app.name}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Programs */}
      <section className="py-24 px-4" style={{ background: "linear-gradient(135deg, #0a1a0f, #0f2a15)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <Plane size={48} className="text-[#C39F57] mx-auto mb-6" />
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Talabalar Uchun Tekin Tourlar</h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Xitoy universitetlari har yili yozgi sayohat dasturlari o'tkazadi. Ular orqali Xitoyning boshqa shaharlarini ham tekin ko'rib chiqasiz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {["Pekin–Shanxay Yozgi Lager", "Xi'an Madaniy Sayohat", "Yunnan Tabiat Ekskursiyasi"].map((tour) => (
              <div key={tour} className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white font-medium">
                {tour}
              </div>
            ))}
          </div>
          <Link href="/">
            <button className="bg-[#C39F57] hover:bg-[#a08044] text-black font-bold px-10 py-4 rounded-full text-base transition-all hover:scale-105 shadow-xl flex items-center gap-2 mx-auto">
              Batafsil Ma'lumot <ArrowRight size={18} />
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
