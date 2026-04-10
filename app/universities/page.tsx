import Navbar from "../../components/Navbar";
import { supabase, type University } from "../../lib/supabase";
import Link from "next/link";
import { MapPin, Star, ArrowRight, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Universitetlar – China Steps",
  description: "Xitoyning top universitetlari — grant, qisman grant va kontrakt asosida qabul.",
};

export const revalidate = 60; // 60 soniyada bir yangilanadi

async function getUniversities(): Promise<University[]> {
  const { data, error } = await supabase
    .from('universities')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

export default async function UniversitiesPage() {
  const universities = await getUniversities();

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        className="relative py-40 px-4 text-white text-center"
        style={{ background: "linear-gradient(135deg, #0a0f1a, #0f1a30, #0a1220)" }}
      >
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583507923701-d703770420bc?q=80&w=2560&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/40 text-blue-300 px-5 py-2 rounded-full text-sm font-bold tracking-widest mb-6 uppercase">
            🏛️ Universitetlar
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Hamkor Universitetlar</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Xitoyning eng nufuzli universitetlari — to'liq grant, qisman grant yoki kontrakt asosida.
          </p>
        </div>
      </section>

      {/* Grant filter info */}
      <section className="py-12 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          {[
            { label: "To'liq Grant", color: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" },
            { label: "Qisman Grant", color: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-[#C39F57]" },
            { label: "Kontrakt", color: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-2 px-5 py-2.5 rounded-full border font-bold text-sm ${item.color}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
              {item.label}
            </div>
          ))}
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {universities.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <GraduationCap size={56} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">Universitetlar Tez Qo'shiladi</h3>
              <p className="text-gray-400">Admin panel orqali yangi universitetlarni qo'shing.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {universities.map((uni) => (
                <div key={uni.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  {/* Image — fixed 16:9 */}
                  <div className="relative w-full aspect-video overflow-hidden">
                    {uni.img_url ? (
                      <img
                        src={uni.img_url}
                        alt={uni.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <GraduationCap size={48} className="text-gray-200" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider ${
                        uni.grant_type === "To'liq Grant" ? "bg-green-500" :
                        uni.grant_type === "Kontrakt" ? "bg-red-500" : "bg-[#C39F57]"
                      }`}>
                        {uni.grant_type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Star size={14} className="fill-[#C39F57] text-[#C39F57]" />
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{uni.name}</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1.5 mb-6">
                      <MapPin size={14} className="text-[#C39F57]" /> {uni.city}, Xitoy
                    </p>

                    {/* Sub-sections */}
                    <div className="border-t border-gray-100 pt-5 space-y-2 mb-6">
                      {["Bakalavr", "Magistratura", "Til kursi"].map((level) => (
                        <div key={level} className="flex items-center justify-between text-sm py-1.5">
                          <span className="font-medium text-gray-700">{level}</span>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            uni.grant_type === "To'liq Grant" ? "bg-green-100 text-green-700" :
                            uni.grant_type === "Kontrakt" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {uni.grant_type}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link href="/">
                      <button className="w-full bg-gray-50 hover:bg-[#C39F57] hover:text-white text-gray-700 font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2 group-hover:bg-[#C39F57] group-hover:text-white">
                        Ariza Berish <ArrowRight size={15} />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-black py-8 text-center text-white/30 text-sm">
        © 2026 China Steps. Barcha huquqlar himoyalangan.
      </footer>
    </div>
  );
}
