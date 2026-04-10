import Navbar from "../../components/Navbar";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Yangiliklar – China Steps",
  description: "Xitoy ta'limi bo'yicha eng so'nggi yangiliklar, grant e'lonlari va imkoniyatlar.",
};

const news = [
  {
    category: "Grant",
    date: "2026-yil, 5-Aprel",
    title: "2026 Xitoy Hukumati Granti (CSC) Arizalari Ochildi!",
    excerpt: "Xitoy hukumatining CSC granti bo'yicha 2026-2027 o'quv yili uchun ariza qabul qilish boshlandi. O'zbekiston kvotasi 150 ta o'rin. Oxirgi muddat — 1 May 2026.",
    views: 1240,
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
    hot: true,
  },
  {
    category: "Yangilik",
    date: "2026-yil, 1-Aprel",
    title: "Xitoy Zhejiang Universiteti O'zbekiston Bilan Hamkorlikni Kengaytirdi",
    excerpt: "Zhejiang University O'zbekiston OTMlari bilan 5 ta yangi ikki tomonlama bitim imzoladi. Endi ko'proq Uzbek talabalari uchun maxsus kvotalar ajratildi.",
    views: 780,
    img: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=600&auto=format&fit=crop",
    hot: false,
  },
  {
    category: "Maslahat",
    date: "2026-yil, 28-Mart",
    title: "HSK Imtihoni: To'liq Tayyorlanish Yo'lli (Boshlang'ichdan Ergashib)",
    excerpt: "HSK 1-4 darajaligacha qanday tayyorlanish kerak? Qaysi kitoblar, qaysi ilovalar va haftalik mashq rejasi. Batafsil ko'rsatmali maqola.",
    views: 2100,
    img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop",
    hot: false,
  },
  {
    category: "Tajriba",
    date: "2026-yil, 20-Mart",
    title: "Tsinghua Universitetida Birinchi Semestr: Real Hayot Qaydlari",
    excerpt: "Asadbek Qodirov Tsinghua'da birinchi semestrini yakunladi. Qanday darslar, qanday imtihonlar, qancha xarajat va eng muhim tajribalar yozildi.",
    views: 3450,
    img: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=600&auto=format&fit=crop",
    hot: false,
  },
  {
    category: "E'lon",
    date: "2026-yil, 15-Mart",
    title: "Konfutsiy Instituti 2026 Yilgi Til Granti E'loni",
    excerpt: "Xitoy tilini noldan o'rganmoqchi bo'lganlar uchun Konfutsiy Instituti granti. To'liq xarajatlar qoplanadi. Ariza topshirish oson.",
    views: 920,
    img: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=600&auto=format&fit=crop",
    hot: false,
  },
  {
    category: "Maslahat",
    date: "2026-yil, 10-Mart",
    title: "Xitoyga Visa Olish Jarayoni: Qadam-Qadam Ko'rsatma (2026)",
    excerpt: "X1 Talaba Vizasi uchun kerakli hujjatlar ro'yxati, O'zbekiston Xitoy Elchixonasiga borish bo'yicha amaliy maslahatlar va kutish muddatlari.",
    views: 1680,
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
    hot: false,
  },
];

export default function NewsPage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        className="relative py-40 px-4 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0f0a14, #1a1025, #0f0a1a)" }}
      >
        <div className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2560&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-400/40 text-violet-300 px-5 py-2 rounded-full text-sm font-bold tracking-widest mb-6 uppercase">
            📰 Yangiliklar
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">So'nggi Xabarlar</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Xitoy ta'limi bo'yicha eng yangi ma'lumotlar, grant e'lonlari va talabalarimizning tajribalari.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Featured */}
          {news[0] && (
            <div className="mb-12 group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 h-72 lg:h-auto overflow-hidden flex-shrink-0">
                <img src={news[0].img} alt={news[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-1 p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-red-100 text-red-600 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wide">🔥 Tezkor</span>
                  <span className="bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full">{news[0].category}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">{news[0].title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{news[0].excerpt}</p>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {news[0].date}</span>
                  <span className="flex items-center gap-1.5"><Eye size={14} /> {news[0].views.toLocaleString()} ko'rish</span>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice(1).map((item) => (
              <div key={item.title} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all">
                <div className="h-52 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full">{item.category}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 leading-snug hover:text-[#C39F57] transition-colors cursor-pointer">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{item.excerpt}</p>
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {item.date}</span>
                    <span className="flex items-center gap-1.5"><Eye size={12} /> {item.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Yangiliklar Obunasi</h2>
          <p className="text-gray-500 mb-8">Grant e'lonlarini birinchi bo'lib bilmoqchimisiz? Telegramdagi kanalimizga qo'shiling.</p>
          <a href="https://t.me/Consultng_bot" target="_blank" rel="noreferrer">
            <button className="bg-[#C39F57] hover:bg-[#a08044] text-white font-bold px-8 py-4 rounded-full shadow-xl transition-all hover:scale-105 flex items-center gap-2 mx-auto">
              Telegram Kanalga Qo'shilish <ArrowRight size={18} />
            </button>
          </a>
        </div>
      </section>

      <footer className="bg-black py-8 text-center text-white/30 text-sm">
        © 2026 China Steps. Barcha huquqlar himoyalangan.
      </footer>
    </div>
  );
}
