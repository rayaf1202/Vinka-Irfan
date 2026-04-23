import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Copy, CheckCircle, ExternalLink, AlertCircle, Trash2, Heart, Clock, User, Check, X } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, Timestamp } from "firebase/firestore";

interface Wish {
  id: string;
  nama: string;
  kehadiran: string;
  pesan: string;
  waktu: any;
}

export function Admin() {
  // Invitation Generator States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [baseUrl, setBaseUrl] = useState("https://vinka-irfan.vercel.app/");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; baseUrl?: string }>({});

  // Wishes States
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"generator" | "wishes">("generator");

  // Fetch Wishes
  useEffect(() => {
    const colRef = collection(db, "ucapan");
    const q = query(colRef, orderBy("waktu", "desc"));
    
    console.log("Setting up snapshot listener for 'ucapan'...");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(`Received snapshot with ${snapshot.docs.length} documents`);
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Wish[];
      
      setWishes(list);
      setIsLoading(false);
    }, (err) => {
      console.error("Firestore snapshot error:", err);
      setIsLoading(false);
    });

    return () => {
      console.log("Unsubscribing from snapshot listener");
      unsubscribe();
    };
  }, []);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteWish = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
      setDeletingId(id);
      try {
        console.log(`Attempting to delete document from 'ucapan' with ID: ${id}`);
        // Ensure doc points to the correct collection reference
        const docRef = doc(collection(db, "ucapan"), id);
        await deleteDoc(docRef);
        console.log("Document successfully deleted in Firestore.");
        
        // Alert user
        alert("Pesan berhasil dihapus!");
      } catch (error) {
        console.error("Gagal hapus:", error);
        alert("Gagal menghapus. Pastikan 'Rules' di Firebase sudah diizinkan.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Format the name for the URL (replace spaces with +)
  const formattedName = name.trim().replace(/\s+/g, "+");
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const uniqueUrl = name.trim() ? `${cleanBaseUrl}?to=${formattedName}` : cleanBaseUrl;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);

    const newErrors = { ...errors };

    if (!val.trim()) {
      delete newErrors.phone;
    } else {
      // Check for invalid characters (letters, symbols other than +)
      if (/[^\+0-9]/.test(val.replace(/\s/g, ""))) {
        newErrors.phone = "Hanya angka dan awalan '+' yang diperbolehkan.";
      } else {
        const numericLength = val.replace(/\D/g, "").length;
        if (numericLength > 15) {
          newErrors.phone = `Maksimal 15 digit (saat ini ${numericLength} digit).`;
        } else if (numericLength > 0 && numericLength < 10) {
          newErrors.phone = `Minimal 10 digit (saat ini ${numericLength} digit).`;
        } else {
          delete newErrors.phone;
        }
      }
    }
    setErrors(newErrors);
  };

  const validate = () => {
    const newErrors: { name?: string; phone?: string; baseUrl?: string } = {};
    let isValid = true;

    if (!baseUrl.trim() || !baseUrl.startsWith("http")) {
      newErrors.baseUrl = "Base URL harus valid (diawali dengan http:// atau https://)";
      isValid = false;
    }

    if (!name.trim()) {
      newErrors.name = "Nama tamu tidak boleh kosong.";
      isValid = false;
    }

    if (phone.trim()) {
      // Allow only numbers and optional leading +, length between 10 to 15
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (!phoneRegex.test(phone.trim().replace(/\s/g, ""))) {
        newErrors.phone = "Format nomor telepon tidak valid. (Cth: 081234567890 atau 6281234567890)";
        isValid = false;
      }
    }

    if (newErrors.name || newErrors.phone || newErrors.baseUrl) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
    }
    return isValid;
  };

  const getWhatsappMessage = () => {
    return `Kepada Yth.
Bapak/Ibu/Saudara/i
${name.trim() || "[NAMA TAMU]"}

Assalamualaikum Warahmatullahi Wabarakaatuh
Dengan memohon rahmat dan ridho Allah SWT, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami :

👰🏻‍♀️Vinka Intan Citradewi
dengan
🤵🏻Irfan Maulana

Info lengkap dari acara bisa kunjungi link di bawah ini:
${uniqueUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Atas kehadiran dan doa restunya kami ucapkan terima kasih.

Hormat kami,
Vinka & Irfan`;
  };

  const handleCopy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(getWhatsappMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleWhatsappClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) {
      e.preventDefault();
      return;
    }
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setBaseUrl("https://vinka-irfan.vercel.app/");
    setErrors({});
  };

  const getWhatsappLink = () => {
    const text = encodeURIComponent(getWhatsappMessage());
    // Provide a phone number if given, otherwise just open whatsapp
    const phoneParam = phone ? `phone=${phone.replace(/\D/g, "")}&` : "";
    return `https://api.whatsapp.com/send?${phoneParam}text=${text}`;
  };

  const formatTime = (waktu: any) => {
    if (!waktu) return "...";
    const date = waktu instanceof Timestamp ? waktu.toDate() : new Date(waktu);
    return date.toLocaleString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-wedding-yellow/30 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-wedding-green/20">
        <div className="bg-wedding-green text-wedding-yellow p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold">Admin Panel Undangan</h1>
            <p className="opacity-90 text-sm mt-1">Kelola undangan dan lihat doa restu tamu.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white/10 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab("generator")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'generator' ? 'bg-wedding-yellow text-wedding-green' : 'text-wedding-yellow hover:bg-white/10'}`}
              >
                Generator URL
              </button>
              <button 
                onClick={() => setActiveTab("wishes")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'wishes' ? 'bg-wedding-yellow text-wedding-green' : 'text-wedding-yellow hover:bg-white/10'}`}
              >
                Data Ucapan ({wishes.length})
              </button>
            </div>
            <Link to="/" className="flex items-center gap-2 bg-wedding-yellow/20 hover:bg-wedding-yellow/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              <ExternalLink size={16} />
              Buka Web
            </Link>
          </div>
        </div>

        {activeTab === "generator" ? (
          <div className="p-4 md:p-8 pb-12 flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="baseUrl" className="block text-sm font-semibold text-wedding-green mb-1">
                    Base URL Undangan <span className="opacity-70 font-normal">(Cth: https://vinka-irfan.vercel.app/)</span>
                  </label>
                  <input
                    type="url"
                    id="baseUrl"
                    value={baseUrl}
                    onChange={(e) => {
                      setBaseUrl(e.target.value);
                      if (errors.baseUrl) setErrors({...errors, baseUrl: undefined});
                    }}
                    placeholder="https://domain-anda.com/"
                    className="w-full px-4 py-3 border border-wedding-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-green/50 bg-wedding-yellow/10 transition-shadow"
                  />
                  {errors.baseUrl && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle size={14} />
                      {errors.baseUrl}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-wedding-green mb-1">
                    Nama Tamu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({...errors, name: undefined});
                    }}
                    placeholder="Contoh: Budi Santoso"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-wedding-yellow/10 transition-shadow ${
                      errors.name 
                        ? "border-red-400 focus:ring-red-400/50" 
                        : "border-wedding-green/30 focus:ring-wedding-green/50"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-wedding-green mb-1">
                    Nomor Telepon <span className="opacity-70 font-normal">(Opsional, untuk link langsung)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Contoh: 6281234567890"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-wedding-yellow/10 transition-shadow ${
                      errors.phone 
                        ? "border-red-400 focus:ring-red-400/50" 
                        : "border-wedding-green/30 focus:ring-wedding-green/50"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle size={14} />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-wedding-green/10 flex flex-col gap-3">
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2 bg-wedding-green text-wedding-yellow py-3 px-6 rounded-lg font-medium hover:bg-wedding-green/90 transition-colors shadow-sm"
                >
                  {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                  {copied ? "Berhasil Disalin!" : "Salin Pesan"}
                </button>
                
                <a
                  href={getWhatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsappClick}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#20b858] transition-colors shadow-sm"
                >
                  <MessageSquare size={18} />
                  Kirim via WhatsApp
                </a>

                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 bg-transparent text-red-500 border border-red-200 py-3 px-6 rounded-lg font-medium hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                  Hapus Form
                </button>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-wedding-green">
                  Pratinjau Pesan:
                </label>
                {phone && (
                  <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-wedding-green/20 text-sm">
                    <span className="font-medium text-wedding-green">{phone}</span>
                    <button 
                      onClick={() => navigator.clipboard.writeText(phone)}
                      className="text-wedding-green/70 hover:text-wedding-green"
                      title="Copy Phone Number"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                )}
              </div>
              <div className="bg-[#e5ddd5] p-4 rounded-xl shadow-inner relative overflow-hidden h-[400px] overflow-y-auto">
                {/* WhatsApp background pattern */}
                <div 
                  className="absolute inset-0 opacity-10" 
                  style={{
                    backgroundImage: "url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')",
                    backgroundSize: "cover"
                  }}
                />
                
                <div className="relative z-10 bg-white p-4 rounded-lg rounded-tl-none shadow text-[14.5px] leading-relaxed text-gray-800 whitespace-pre-wrap font-sans max-w-[90%]">
                  {getWhatsappMessage()}
                  <p className="text-right text-[10px] text-gray-400 mt-2">10:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-wedding-green flex items-center gap-2">
                <MessageSquare size={24} />
                Daftar Ucapan & Doa
              </h2>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                  <Check size={16} />
                  Hadir: {wishes.filter(w => w.kehadiran === 'Hadir').length}
                </div>
                <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                  <X size={16} />
                  Abstain: {wishes.filter(w => w.kehadiran === 'Tidak Hadir').length}
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-wedding-green opacity-50">
                <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin mb-4"></div>
                <p>Memuat data ucapan...</p>
              </div>
            ) : wishes.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-wedding-green/20 rounded-2xl">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-wedding-green/60 italic">Belum ada ucapan yang masuk.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {wishes.map((wish) => (
                  <div key={wish.id} className="bg-wedding-yellow/10 border border-wedding-green/10 rounded-xl p-4 md:p-6 transition-all hover:border-wedding-green/30 hover:shadow-md group">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-wedding-green/10 flex items-center justify-center text-wedding-green">
                            <User size={20} />
                          </div>
                          <div>
                            <h3 className="font-bold text-wedding-green text-lg">{wish.nama}</h3>
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                              <span className={`px-2 py-0.5 rounded ${
                                wish.kehadiran === 'Hadir' 
                                  ? 'bg-green-100 text-green-700' 
                                  : wish.kehadiran === 'Tidak Hadir' 
                                    ? 'bg-red-100 text-red-700' 
                                    : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {wish.kehadiran}
                              </span>
                              <span className="text-gray-400 flex items-center gap-1">
                                <Clock size={12} />
                                {formatTime(wish.waktu)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-wedding-green/80 italic font-medium leading-relaxed bg-white/50 p-3 rounded-lg border border-wedding-green/5">
                          "{wish.pesan}"
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteWish(wish.id)}
                        disabled={deletingId === wish.id}
                        className="flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 disabled:opacity-50 rounded-lg transition-all border border-red-200 md:border-transparent md:hover:border-red-100 shrink-0"
                        title="Hapus Ucapan"
                      >
                        {deletingId === wish.id ? (
                          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 size={18} />
                        )}
                        <span className="text-xs font-bold md:hidden">Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
