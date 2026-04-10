"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Users, BookOpen, Settings, LayoutDashboard, Search, Bell,
  UserRound, GraduationCap, PlusCircle, Globe, Trash2, Upload, X, Loader2, RefreshCcw
} from "lucide-react";
import Link from 'next/link';
import { supabase, uploadImage, type University, type Translator, type Submission } from '../../lib/supabase';

// ===== IMAGE UPLOAD COMPONENT =====
function ImageUpload({
  value, onChange, label, round = false
}: { value: string; onChange: (v: string) => void; label: string; round?: boolean }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    // Avval preview uchun base64
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);

    // Supabase Storage ga yuklash
    const publicUrl = await uploadImage(file, round ? 'translators' : 'universities');
    if (publicUrl) onChange(publicUrl);
    setUploading(false);
  };

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <div
        onClick={() => !uploading && fileRef.current?.click()}
        className={`relative cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#C39F57] transition-colors bg-gray-50 flex items-center justify-center overflow-hidden ${round ? "w-24 h-24 rounded-full mx-auto" : "h-40 rounded-xl w-full"}`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-[#C39F57]">
            <Loader2 size={24} className="animate-spin" />
            <span className="text-xs font-medium">Yuklanmoqda...</span>
          </div>
        ) : value ? (
          <>
            <img src={value} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-xs font-bold text-center">O'zgartirish</p>
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-400 font-medium">Bosib rasm tanlang</p>
            <p className="text-[10px] text-gray-300 mt-1">JPG, PNG, WEBP</p>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {value && !uploading && (
        <button onClick={() => onChange("")} className="text-xs text-red-400 hover:text-red-600 mt-2 flex items-center gap-1 mx-auto">
          <X size={12} /> Rasmni olib tashlash
        </button>
      )}
    </div>
  );
}

// Status Badge
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "KUTILMOQDA": "bg-yellow-50 text-yellow-700 border-yellow-200",
    "GAPLASHILDI": "bg-green-50 text-green-700 border-green-200",
    "KOD BERILDI": "bg-blue-50 text-blue-700 border-blue-200",
  };
  return (
    <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider border ${map[status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const [isAuth, setIsAuth] = useState(false);
  const [pwd, setPwd] = useState("");
  const [activeTab, setActiveTab] = useState("submissions");

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative blur elements for premium look */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C39F57]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-12 rounded-[2rem] shadow-2xl max-w-md w-full text-center relative z-10 transition-all">
          <div className="w-20 h-20 bg-gradient-to-br from-[#C39F57] to-[#8a6b32] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#C39F57]/20 border border-white/20">
            <span className="text-white font-serif text-4xl font-black">C</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Sayt Boshqaruvi</h1>
          <p className="text-sm text-gray-400 mb-10">Tizimga kirish uchun maxfiy parolni kiritish talab etiladi.</p>
          
          <input 
            type="password" 
            value={pwd} 
            onChange={e => setPwd(e.target.value)}
            onKeyDown={e => { if(e.key === 'Enter') { if(pwd === "Asdffdsa_0") setIsAuth(true); else alert("Noto'g'ri parol!"); } }}
            className="w-full bg-black/50 border border-white/10 text-white rounded-2xl px-5 py-4 mb-6 text-center tracking-widest focus:outline-none focus:border-[#C39F57] focus:ring-2 focus:ring-[#C39F57]/20 font-mono text-lg transition-all"
            placeholder="••••••••••"
          />
          <button 
            onClick={() => { if(pwd === "Asdffdsa_0") setIsAuth(true); else alert("Huxlat!"); }}
            className="w-full bg-gradient-to-r from-[#C39F57] to-[#a08044] text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-[#C39F57]/20 hover:scale-[1.02] active:scale-[0.98] outline-none text-lg"
          >
            Tizimga Kirish
          </button>
        </div>
      </div>
    );
  }
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== SUBMISSIONS =====
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const fetchSubmissions = async () => {
    setLoading(true);
    const { data } = await supabase.from('submissions').select('*').order('created_at', { ascending: false });
    if (data) setSubmissions(data);
    setLoading(false);
  };
  const deleteSubmission = async (id: string) => {
    await supabase.from('submissions').delete().eq('id', id);
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };
  const updateStatus = async (id: string, status: string) => {
    await supabase.from('submissions').update({ status }).eq('id', id);
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  // ===== TRANSLATORS =====
  const [translators, setTranslators] = useState<Translator[]>([]);
  const [newTrans, setNewTrans] = useState({ name: "", location: "", status: "Online", img_url: "" });
  const [addingTrans, setAddingTrans] = useState(false);
  const fetchTranslators = async () => {
    const { data } = await supabase.from('translators').select('*').order('created_at', { ascending: false });
    if (data) setTranslators(data);
  };
  const handleAddTrans = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrans.name) return;
    setAddingTrans(true);
    const { data } = await supabase.from('translators').insert([{ ...newTrans }]).select();
    if (data) setTranslators(prev => [data[0], ...prev]);
    setNewTrans({ name: "", location: "", status: "Online", img_url: "" });
    setAddingTrans(false);
  };
  const deleteTranslator = async (id: string) => {
    await supabase.from('translators').delete().eq('id', id);
    setTranslators(prev => prev.filter(t => t.id !== id));
  };

  // ===== UNIVERSITIES =====
  const [unis, setUnis] = useState<University[]>([]);
  const [newUni, setNewUni] = useState({ name: "", city: "", img_url: "", grant_type: "To'liq Grant" });
  const [addingUni, setAddingUni] = useState(false);
  const fetchUnis = async () => {
    const { data } = await supabase.from('universities').select('*').order('created_at', { ascending: false });
    if (data) setUnis(data);
  };
  const handleAddUni = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUni.name) return;
    setAddingUni(true);
    const { data } = await supabase.from('universities').insert([{ ...newUni }]).select();
    if (data) setUnis(prev => [data[0], ...prev]);
    setNewUni({ name: "", city: "", img_url: "", grant_type: "To'liq Grant" });
    setAddingUni(false);
  };
  const deleteUni = async (id: string) => {
    await supabase.from('universities').delete().eq('id', id);
    setUnis(prev => prev.filter(u => u.id !== id));
  };

  // On tab change, fetch data
  useEffect(() => {
    if (activeTab === "submissions") fetchSubmissions();
    if (activeTab === "translators") fetchTranslators();
    if (activeTab === "universities") fetchUnis();
  }, [activeTab]);

  const navItems = [
    { key: "submissions", icon: <Users size={18} />, label: "Arizalar (CRM)" },
    { key: "translators", icon: <UserRound size={18} />, label: "Tarjimonlar" },
    { key: "universities", icon: <GraduationCap size={18} />, label: "Universitetlar" },
    { key: "courses", icon: <BookOpen size={18} />, label: "Darsliklar" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex font-sans">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between hidden lg:flex shadow-sm flex-shrink-0">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <LayoutDashboard size={22} className="text-[#C39F57]" />
            <span className="font-serif text-2xl font-bold text-gray-900 tracking-wider">CRM</span>
          </Link>
          <nav className="space-y-1">
            {navItems.map(item => (
              <button key={item.key} onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === item.key ? "bg-[#C39F57] text-white shadow-md" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}>
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-gray-100">
          <button className="flex items-center gap-3 text-gray-400 hover:text-gray-700 transition-colors text-sm font-bold">
            <Settings size={16} /> Sozlamalar
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 px-8 border-b border-gray-100 flex justify-between items-center bg-white flex-shrink-0">
          <div className="relative w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Tezkor qidirish..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#C39F57] transition-all" />
          </div>
          <div className="flex items-center gap-5">
            <button className="relative p-2 rounded-full hover:bg-gray-50">
              <Bell size={20} className="text-gray-600" />
              {submissions.filter(s => s.status === 'KUTILMOQDA').length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              )}
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-gray-100">
              <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-[#C39F57] font-black text-sm">N</div>
              <div>
                <p className="text-sm font-bold text-gray-900">Nurexan Admin</p>
                <p className="text-xs text-gray-400">Boshqaruvchi</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">

          {/* ====== ARIZALAR ====== */}
          {activeTab === "submissions" && (
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-gray-900">Arizalar Bazasi</h1>
                  <p className="text-gray-500 mt-1">Sayt va bot orqali kelgan murojaatlar — Supabase ✓</p>
                </div>
                <button onClick={fetchSubmissions} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:border-[#C39F57] transition-colors shadow-sm">
                  <RefreshCcw size={15} className={loading ? "animate-spin" : ""} /> Yangilash
                </button>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {["Mijoz", "Telefon", "Manba", "Sana", "Status", ""].map(h => (
                        <th key={h} className="p-5 text-xs font-black uppercase tracking-widest text-gray-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr><td colSpan={6} className="p-10 text-center text-gray-400"><Loader2 size={24} className="animate-spin mx-auto mb-2" /><p className="text-sm">Yuklanmoqda...</p></td></tr>
                    ) : submissions
                      .filter(s => !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.phone.includes(query))
                      .map(s => (
                        <tr key={s.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="p-5 font-bold text-gray-900">{s.name}</td>
                          <td className="p-5 text-gray-600">{s.phone}</td>
                          <td className="p-5 text-gray-400 text-sm">{s.source}</td>
                          <td className="p-5 text-gray-400 text-sm">{new Date(s.created_at).toLocaleDateString('uz-UZ')}</td>
                          <td className="p-5">
                            <select value={s.status} onChange={e => updateStatus(s.id, e.target.value)}
                              className="text-xs font-bold bg-transparent border-0 cursor-pointer focus:outline-none">
                              <option>KUTILMOQDA</option>
                              <option>GAPLASHILDI</option>
                              <option>KOD BERILDI</option>
                            </select>
                          </td>
                          <td className="p-5 text-right">
                            <button onClick={() => deleteSubmission(s.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-lg">
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    {!loading && submissions.length === 0 && (
                      <tr><td colSpan={6} className="p-12 text-center text-gray-400">
                        <Users size={36} className="mx-auto mb-3 opacity-20" />
                        <p className="text-sm">Hozircha arizalar yo'q</p>
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ====== TARJIMONLAR ====== */}
          {activeTab === "translators" && (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Tarjimonlar</h1>
              <p className="text-gray-500 mb-8">Tarjimonlarni qo'shing va boshqaring — Supabase ✓</p>
              <div className="flex gap-8 items-start">
                <div className="flex-1 space-y-3">
                  {translators.map(t => (
                    <div key={t.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-100 flex-shrink-0">
                            {t.img_url ? <img src={t.img_url} alt={t.name} className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center"><UserRound size={22} className="text-gray-300" /></div>}
                          </div>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${t.status === "Online" ? "bg-green-500" : "bg-gray-300"}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{t.name}</h3>
                          <p className="text-sm text-gray-400 flex items-center gap-1"><Globe size={11} className="text-[#C39F57]" /> {t.location}</p>
                        </div>
                      </div>
                      <button onClick={() => deleteTranslator(t.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {translators.length === 0 && (
                    <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-300">
                      <UserRound size={32} className="mx-auto mb-3 opacity-40" />
                      <p className="text-sm">Hozircha tarjimon yo'q</p>
                    </div>
                  )}
                </div>
                <div className="w-80 flex-shrink-0">
                  <form onSubmit={handleAddTrans} className="bg-white border border-gray-100 rounded-2xl p-7 shadow-lg sticky top-0">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><PlusCircle size={18} className="text-[#C39F57]" /> Yangi Tarjimon</h3>
                    <div className="space-y-4">
                      <ImageUpload value={newTrans.img_url} onChange={v => setNewTrans({ ...newTrans, img_url: v })} label="Profil Rasmi" round={true} />
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Ism *</label>
                        <input required value={newTrans.name} onChange={e => setNewTrans({ ...newTrans, name: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#C39F57] focus:outline-none" placeholder="Ali Karimov" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Shahar *</label>
                        <input required value={newTrans.location} onChange={e => setNewTrans({ ...newTrans, location: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#C39F57] focus:outline-none" placeholder="Beijing" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Holati</label>
                        <select value={newTrans.status} onChange={e => setNewTrans({ ...newTrans, status: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#C39F57] focus:outline-none">
                          <option>Online</option>
                          <option>Offline</option>
                        </select>
                      </div>
                      <button type="submit" disabled={addingTrans} className="w-full bg-[#C39F57] hover:bg-[#a08044] text-white font-bold py-3 rounded-xl transition-colors text-sm disabled:opacity-60 flex items-center justify-center gap-2">
                        {addingTrans ? <><Loader2 size={16} className="animate-spin" /> Saqlanmoqda...</> : "Saqlash"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ====== UNIVERSITETLAR ====== */}
          {activeTab === "universities" && (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Universitetlar</h1>
              <p className="text-gray-500 mb-8">Universitetlarni qo'shing — Supabase ✓</p>
              <div className="flex gap-8 items-start">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  {unis.map(u => (
                    <div key={u.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm group hover:shadow-md transition-all">
                      <div className="w-full aspect-video bg-gray-100 overflow-hidden relative">
                        {u.img_url
                          ? <img src={u.img_url} alt={u.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center"><GraduationCap size={32} className="text-gray-200" /></div>}
                        <div className={`absolute top-3 right-3 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wide ${u.grant_type === "To'liq Grant" ? "bg-green-500" : u.grant_type === "Kontrakt" ? "bg-red-500" : "bg-[#C39F57]"}`}>
                          {u.grant_type}
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{u.name}</h3>
                          <p className="text-xs text-gray-400">{u.city}, Xitoy</p>
                        </div>
                        <button onClick={() => deleteUni(u.id)} className="p-1.5 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {unis.length === 0 && (
                    <div className="col-span-2 bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-300">
                      <GraduationCap size={32} className="mx-auto mb-3 opacity-40" />
                      <p className="text-sm">Hozircha universitetlar yo'q</p>
                    </div>
                  )}
                </div>
                <div className="w-80 flex-shrink-0">
                  <form onSubmit={handleAddUni} className="bg-white border border-gray-100 rounded-2xl p-7 shadow-lg sticky top-0">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><PlusCircle size={18} className="text-[#C39F57]" /> Universitet Qo'shish</h3>
                    <div className="space-y-4">
                      <ImageUpload value={newUni.img_url} onChange={v => setNewUni({ ...newUni, img_url: v })} label="Muqova Rasm (16:9)" />
                      <p className="text-[11px] bg-blue-50 text-blue-500 p-2 rounded-lg">Rasm Supabase Storage ga saqlanadi ✓</p>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Nomi *</label>
                        <input required value={newUni.name} onChange={e => setNewUni({ ...newUni, name: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#C39F57] focus:outline-none" placeholder="Tsinghua University" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Shahar *</label>
                        <input required value={newUni.city} onChange={e => setNewUni({ ...newUni, city: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#C39F57] focus:outline-none" placeholder="Beijing" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Grant Turi</label>
                        <select value={newUni.grant_type} onChange={e => setNewUni({ ...newUni, grant_type: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#C39F57] focus:outline-none">
                          <option>To'liq Grant</option>
                          <option>Qisman Grant</option>
                          <option>Kontrakt</option>
                        </select>
                      </div>
                      <button type="submit" disabled={addingUni} className="w-full bg-[#C39F57] hover:bg-[#a08044] text-white font-bold py-3 rounded-xl transition-colors text-sm disabled:opacity-60 flex items-center justify-center gap-2">
                        {addingUni ? <><Loader2 size={16} className="animate-spin" /> Yuklanmoqda...</> : "Universitetni Joylash"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ====== DARSLIKLAR ====== */}
          {activeTab === "courses" && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Darsliklar & Kurs Kodlari</h1>
              <p className="text-gray-500 mb-8">Kurs kirish kodlarini boshqaring.</p>
              <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
                <div className="w-20 h-20 bg-[#C39F57]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <BookOpen size={32} className="text-[#C39F57]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Faol Kodlar</h2>
                <p className="text-gray-500 max-w-md mx-auto mb-6">Kurs kodlarini <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">app/courses/page.tsx</code> dagi VALID_CODES massivida o'zgartiring.</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {["CS-001", "CS-002", "CS-123", "CHINA2026", "DEMO"].map(code => (
                    <div key={code} className="bg-gray-900 text-[#C39F57] font-mono font-bold px-5 py-3 rounded-xl text-sm tracking-widest">
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
