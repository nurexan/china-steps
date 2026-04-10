import Navbar from "../../components/Navbar";
import { supabase, type Translator } from "../../lib/supabase";
import Link from "next/link";
import { MapPin, Globe, MessageCircle, ArrowRight, UserRound } from "lucide-react";

export const metadata = {
  title: "Tarjimonlar – China Steps",
  description: "Xitoyning turli shaharlarida joylashgan ishonchli o'zbek tarjimonlari.",
};

export const revalidate = 60;

async function getTranslators(): Promise<Translator[]> {
  const { data, error } = await supabase
    .from('translators')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

export default async function TranslatorsPage() {
  const translators = await getTranslators();

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        className="relative py-40 px-4 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a0f1a, #0f1a2a, #0a1525)" }}
      >
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2560&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 px-5 py-2 rounded-full text-sm font-bold tracking-widest mb-6 uppercase">
            🗣️ Tarjimonlar
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Ishonchli Tarjimonlar</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Xitoyning turli shaharlarida joylashgan, tajribali o'zbek tarjimonlarimiz — siz uchun doim tayyor.
          </p>
        </div>
      </section>

      {/* Xizmat turlari */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#C39F57] font-bold tracking-widest text-sm uppercase block mb-3">Xizmat Turlari</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Nimalar Qilinadi?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { icon: "📄", title: "Hujjat Tarjimasi", desc: "Diplom, transkript, pasport va rasmiy hujjatlarni tarjima qilish" },
              { icon: "🏥", title: "Tibbiy Tarjima", desc: "Shifokor qabulida, kasalxonada hamrohlik va tarjima" },
              { icon: "🏛️", title: "Hamrohlik", desc: "Universitetga borish, yotoqxona olishda yordam" },
              { icon: "📱", title: "Onlayn Maslahat", desc: "Telegram/Zoom orqali masofaviy tarjima xizmati" },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-7 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Translators list */}
          <div className="text-center mb-12">
            <span className="text-[#C39F57] font-bold tracking-widest text-sm uppercase block mb-3">Jamoamiz</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900">Tarjimonlar</h2>
          </div>

          {translators.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <UserRound size={56} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-bold text-gray-500 mb-2">Tarjimonlar Tez Qo'shiladi</h3>
              <p className="text-gray-400 text-sm">Admin panel orqali yangi tarjimonlarni qo'shing.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {translators.map((t) => (
                <div key={t.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all group">
                  <div className="flex items-start gap-6 p-8">
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-md bg-gray-100">
                        {t.img_url ? (
                          <img src={t.img_url} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <UserRound size={36} className="text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${t.status === "Online" ? "bg-green-500" : "bg-gray-300"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{t.name}</h3>
                        <span className={`text-xs font-black px-3 py-1 rounded-full ${t.status === "Online" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {t.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mb-5">
                        <span className="flex items-center gap-1.5"><MapPin size={13} className="text-[#C39F57]" /> {t.location}</span>
                        <span className="flex items-center gap-1.5"><Globe size={13} className="text-[#C39F57]" /> O'zbek, Xitoy</span>
                      </div>
                      <a href="https://t.me/Consultng_bot" target="_blank" rel="noreferrer">
                        <button className="flex items-center gap-2 text-sm font-bold text-white bg-[#C39F57] hover:bg-[#a08044] px-4 py-2 rounded-xl transition-colors">
                          <MessageCircle size={15} /> Bog'lanish
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
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Tarjimon Kerakmi?</h2>
          <p className="text-gray-500 mb-8">To'g'ridan-to'g'ri @nurexan ga yozing yoki quyidagi tugma orqali bog'laning.</p>
          <a href="https://t.me/Consultng_bot" target="_blank" rel="noreferrer">
            <button className="bg-[#C39F57] hover:bg-[#a08044] text-white font-bold px-8 py-4 rounded-full shadow-xl transition-all hover:scale-105 flex items-center gap-2 mx-auto">
              Tarjimon Bilan Bog'lanish <ArrowRight size={18} />
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
