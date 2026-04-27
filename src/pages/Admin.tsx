import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  MessageSquare, Copy, CheckCircle, ExternalLink, AlertCircle, 
  Trash2, Heart, Clock, User, Check, X, LogOut, 
  LayoutDashboard, Link2, Users, RefreshCw,
  Search, Filter, ChevronRight, MoreVertical
} from "lucide-react";
import { db } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface Wish {
  id: string;
  nama: string;
  kehadiran: string;
  pesan: string;
  waktu: any;
}

interface AdminProps {
  onLogout?: () => void;
}

export function Admin({ onLogout }: AdminProps) {
  // Navigation States
  const [activeTab, setActiveTab] = useState<"overview" | "generator" | "wishes">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Invitation Generator States
  const [names, setNames] = useState("");
  const [phone, setPhone] = useState("");
  const [baseUrl, setBaseUrl] = useState("https://vinka-irfan.vercel.app/");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ names?: string; phone?: string; baseUrl?: string }>({});
  const MAX_NAMES_PER_BATCH = 50;
  const getNameList = () => names.split('\n').filter(n => n.trim().length > 0);

  // Wishes States
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"Semua" | "Hadir" | "Tidak Hadir" | "Ragu-ragu">("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

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
  const [generatedList, setGeneratedList] = useState<{ name: string; url: string }[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleGenerate = () => {
    if (!validate()) return;
    const nameList = getNameList();
    const newList = nameList.map(name => ({
      name,
      url: getUniqueUrl(name)
    }));
    setGeneratedList(newList);
  };

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
  const getUniqueUrl = (guestName: string) => {
    const formattedName = guestName.trim().replace(/\s+/g, "+");
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    return guestName.trim() ? `${cleanBaseUrl}?to=${formattedName}` : cleanBaseUrl;
  };

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
    const newErrors: { names?: string; phone?: string; baseUrl?: string } = {};
    let isValid = true;

    if (!baseUrl.trim() || !baseUrl.startsWith("http")) {
      newErrors.baseUrl = "Base URL harus valid (diawali dengan http:// atau https://)";
      isValid = false;
    }

    const nameList = getNameList();
    if (nameList.length === 0) {
      newErrors.names = "Nama tamu tidak boleh kosong.";
      isValid = false;
    } else if (nameList.length > MAX_NAMES_PER_BATCH) {
      newErrors.names = `Terlalu banyak nama. Maksimal ${MAX_NAMES_PER_BATCH} nama per batch untuk menjamin performa. Mohon bagi daftar nama Anda.`;
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

    if (newErrors.names || newErrors.phone || newErrors.baseUrl) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
    }
    return isValid;
  };

  const getWhatsappMessage = (guestName?: string) => {
    const nameToUse = guestName || "bapak/ibu/saudara/i";
    const url = getUniqueUrl(guestName || "");
    return `Kepada Yth.
Bapak/Ibu/Saudara/i
${nameToUse.trim() || "[NAMA TAMU]"}

Assalamualaikum Warahmatullahi Wabarakaatuh
Dengan memohon rahmat dan ridho Allah SWT, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami :

👰🏻‍♀️Vinka Intan Citradewi
dengan
🤵🏻Irfan Maulana

Info lengkap dari acara bisa kunjungi link di bawah ini:
${url}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Atas kehadiran dan doa restunya kami ucapkan terima kasih.

Hormat kami,
Vinka & Irfan`;
  };

  const handleCopy = async () => {
    if (!validate()) return;
    const nameList = getNameList();
    try {
      await navigator.clipboard.writeText(getWhatsappMessage(nameList[0]));
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
    setNames("");
    setPhone("");
    setBaseUrl("https://vinka-irfan.vercel.app/");
    setErrors({});
  };

  const getWhatsappLink = () => {
    const nameList = getNameList();
    const text = encodeURIComponent(getWhatsappMessage(nameList[0]));
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

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generator', label: 'URL Generator', icon: Link2 },
    { id: 'wishes', label: 'Guestbook', icon: MessageSquare },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans text-gray-900">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-hijau-gelap text-white fixed h-full z-30 shadow-xl">
        <div className="p-8">
          <h1 className="text-2xl font-serif font-bold text-bg-kuning">Admin Panel</h1>
          <p className="text-bg-kuning/60 text-xs mt-1">Wedding Invitation Manager</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                activeTab === item.id 
                  ? "bg-bg-kuning text-hijau-gelap shadow-lg" 
                  : "text-bg-kuning/70 hover:bg-white/10 hover:text-bg-kuning"
              )}
            >
              <item.icon size={20} className={cn(activeTab === item.id ? "text-hijau-gelap" : "text-bg-kuning/50 group-hover:text-bg-kuning")} />
              {item.label}
              {item.id === 'wishes' && wishes.length > 0 && (
                <span className={cn(
                  "ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold",
                  activeTab === item.id ? "bg-hijau-gelap text-white" : "bg-bg-kuning/20 text-bg-kuning"
                )}>
                  {wishes.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10 space-y-2">
          <Link to="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-bg-kuning/70 hover:bg-white/10 text-sm transition-colors">
            <ExternalLink size={20} />
            View Live Site
          </Link>
          {onLogout && (
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 text-sm transition-colors"
            >
              <LogOut size={20} />
              Logout Session
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Top Nav / Sidebar Toggle */}
      <header className="lg:hidden fixed top-0 w-full h-16 bg-hijau-gelap text-white flex items-center justify-between px-4 z-40 shadow-md">
        <h1 className="text-xl font-serif font-bold text-bg-kuning">Admin Panel</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-white/10 text-bg-kuning"
          >
            {sidebarOpen ? <X size={20} /> : <div className="flex flex-col gap-1 w-5"><span className="h-0.5 bg-current w-full" /><span className="h-0.5 bg-current w-full" /><span className="h-0.5 bg-current w-full" /></div>}
          </button>
        </div>
      </header>

      {/* Sidebar - Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-hijau-gelap text-white z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-white/5">
                <h1 className="text-2xl font-serif font-bold text-bg-kuning">Admin Panel</h1>
                <p className="text-bg-kuning/60 text-xs mt-1">Invitation Management</p>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as any); setSidebarOpen(false); }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all font-medium text-sm",
                      activeTab === item.id 
                        ? "bg-bg-kuning text-hijau-gelap" 
                        : "text-bg-kuning/70 active:bg-white/5"
                    )}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-white/10">
                {onLogout && (
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 text-sm"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 pt-20 lg:pt-0 min-h-screen flex flex-col">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-hijau-gelap">
              {navItems.find(t => t.id === activeTab)?.label}
            </h2>
            <p className="text-gray-500 text-xs">Manage your wedding details through this dashboard.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-sm font-bold text-hijau-zaitun uppercase tracking-wider">Administrator</p>
                <Link to="/" target="_blank" className="text-[10px] text-pink-bunga hover:underline flex items-center justify-end gap-1 font-medium">
                  vinka-irfan.vercel.app <ExternalLink size={10} />
                </Link>
             </div>
             <div className="w-10 h-10 rounded-full bg-hijau-zaitun/10 flex items-center justify-center text-hijau-zaitun border border-hijau-zaitun/20">
                <User size={20} />
             </div>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1 bg-gray-50/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MessageSquare size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-tight">Total Wishes</p>
                        <h4 className="text-2xl font-bold text-gray-900">{wishes.length}</h4>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Check size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-tight">RSVP Yes</p>
                        <h4 className="text-2xl font-bold text-gray-900">{wishes.filter(w => w.kehadiran === 'Hadir').length}</h4>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <X size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-tight">RSVP No</p>
                        <h4 className="text-2xl font-bold text-gray-900">{wishes.filter(w => w.kehadiran === 'Tidak Hadir').length}</h4>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Clock size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-tight">Maybe</p>
                        <h4 className="text-2xl font-bold text-gray-900">{wishes.filter(w => w.kehadiran === 'Ragu-ragu').length}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Content Example */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                       <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                          <h3 className="font-bold text-hijau-gelap flex items-center gap-2">
                             <MessageSquare size={18} className="text-pink-bunga" />
                             Recent Messages
                          </h3>
                          <button onClick={() => setActiveTab('wishes')} className="text-xs font-bold text-hijau-zaitun hover:underline">View All</button>
                       </div>
                       <div className="flex-1 overflow-y-auto max-h-[400px]">
                          {wishes.length > 0 ? (
                            <div className="divide-y divide-gray-50">
                               {wishes.slice(0, 5).map(wish => (
                                 <div key={wish.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                       <span className="font-bold text-gray-800 text-sm">{wish.nama}</span>
                                       <span className={cn(
                                         "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase",
                                         wish.kehadiran === 'Hadir' ? "bg-green-100 text-green-700" : wish.kehadiran === 'Tidak Hadir' ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                                       )}>{wish.kehadiran}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2 italic">"{wish.pesan}"</p>
                                    <p className="text-[10px] text-gray-400 mt-2">{formatTime(wish.waktu)}</p>
                                 </div>
                               ))}
                            </div>
                          ) : (
                            <div className="p-12 text-center text-gray-400 italic text-sm">No messages yet.</div>
                          )}
                       </div>
                    </div>

                    <div className="bg-hijau-gelap text-white rounded-2xl p-8 shadow-sm flex flex-col relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                          <Heart size={120} />
                       </div>
                       <h3 className="text-xl font-serif font-bold text-bg-kuning mb-4">Quick Links</h3>
                       <div className="space-y-4 mt-4 relative z-10">
                          <button 
                            onClick={() => setActiveTab('generator')}
                            className="w-full text-left p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-between group"
                          >
                             <div>
                                <h4 className="text-sm font-bold text-bg-kuning">URL Generator</h4>
                                <p className="text-[10px] text-bg-kuning/60">Generate custom guest links</p>
                             </div>
                             <ChevronRight size={16} className="text-bg-kuning/40 group-hover:translate-x-1 transition-transform" />
                          </button>
                          <Link 
                            to="/" 
                            target="_blank"
                            className="w-full text-left p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-between group"
                          >
                             <div>
                                <h4 className="text-sm font-bold text-bg-kuning">Preview Invitation</h4>
                                <p className="text-[10px] text-bg-kuning/60">Checkout the guest view</p>
                             </div>
                             <ChevronRight size={16} className="text-bg-kuning/40 group-hover:translate-x-1 transition-transform" />
                          </Link>
                       </div>
                       <div className="mt-auto pt-8">
                          <div className="bg-bg-kuning/10 p-4 rounded-xl border border-bg-kuning/10">
                             <p className="text-[10px] uppercase font-bold tracking-widest text-bg-kuning/50 mb-2">Memory Usage</p>
                             <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-bg-kuning w-[10%] shadow-[0_0_10px_rgba(253,246,170,0.5)]" />
                             </div>
                             <p className="text-[10px] text-bg-kuning/40 mt-2 italic">Optimized with Firebase Firestore</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'generator' && (
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-7/12 space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                            <Link2 size={24} />
                         </div>
                         <div>
                            <h3 className="font-bold text-gray-900">Configure Invitation</h3>
                            <p className="text-xs text-gray-500">Set up the base URL and guest list</p>
                         </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Base URL</label>
                          <div className="relative group">
                             <input
                               type="url"
                               value={baseUrl}
                               onChange={(e) => setBaseUrl(e.target.value)}
                               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-hijau-zaitun/20 focus:border-hijau-zaitun outline-none transition-all pr-10 hover:bg-white"
                             />
                             <ExternalLink size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-hijau-zaitun transition-colors" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Guest Names (One per line)</label>
                          <textarea
                            value={names}
                            onChange={(e) => setNames(e.target.value)}
                            rows={6}
                            placeholder="Example:&#10;John Wick&#10;Bruce Wayne"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-hijau-zaitun/20 focus:border-hijau-zaitun outline-none transition-all hover:bg-white"
                          />
                          <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                             <AlertCircle size={10} /> Max 50 names per batch
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number (Optional)</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="6281234567890"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-hijau-zaitun/20 focus:border-hijau-zaitun outline-none transition-all hover:bg-white"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button
                          onClick={handleGenerate}
                          className="flex-1 bg-hijau-gelap text-bg-kuning py-3 px-6 rounded-xl font-bold hover:bg-hijau-gelap/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-hijau-gelap/10 active:scale-[0.98]"
                        >
                          <RefreshCw size={18} />
                          Generate Custom Links
                        </button>
                        <button
                          onClick={handleReset}
                          className="px-6 py-3 border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                        >
                           <X size={18} /> Reset
                        </button>
                      </div>
                    </div>

                    {generatedList.length > 0 && (
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="font-bold text-gray-900">Generated Links ({generatedList.length})</h3>
                            <button 
                                onClick={() => navigator.clipboard.writeText(generatedList.map(item => `Untuk: ${item.name}\n${getWhatsappMessage(item.name)}\n\n---\n`).join("\n"))}
                                className="text-xs font-bold text-hijau-zaitun flex items-center gap-1 hover:underline"
                            >
                                <Copy size={12} /> Copy All Messages
                            </button>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-[10px] text-gray-400 uppercase tracking-widest text-left">
                                    <tr>
                                        <th className="px-6 py-4">Guest Name</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {generatedList.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => copyToClipboard(getWhatsappMessage(item.name), `link-${idx}`)}
                                                    className={cn(
                                                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                                                      copiedId === `link-${idx}` ? "bg-green-50 text-green-600" : "bg-hijau-zaitun/5 text-hijau-zaitun hover:bg-hijau-zaitun/10"
                                                    )}
                                                >
                                                    {copiedId === `link-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                                                    {copiedId === `link-${idx}` ? "Copied" : "Copy Msg"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:w-5/12 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
                      <div className="flex items-center justify-between mb-6">
                         <h3 className="font-bold text-gray-900 flex items-center gap-2">
                           <Users size={20} className="text-pink-bunga" />
                           Message Preview
                         </h3>
                         <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Live Preview</span>
                         </div>
                      </div>

                      <div className="flex-1 bg-[#F0F2F5] rounded-2xl p-6 overflow-hidden flex flex-col relative shadow-inner">
                        {/* WhatsApp Header Mockup */}
                        <div className="absolute top-0 left-0 right-0 bg-[#075E54] text-white p-3 flex items-center gap-3 z-10">
                           <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><User size={20} /></div>
                           <div className="flex-1">
                             <p className="text-xs font-bold leading-tight">Guest Contact</p>
                             <p className="text-[8px] opacity-70">online</p>
                           </div>
                           <MoreVertical size={16} />
                        </div>

                        <div className="flex-1 overflow-y-auto pt-14 pb-4 space-y-4 px-2 custom-scrollbar">
                           <div className="max-w-[85%] bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-xs leading-relaxed text-gray-800 whitespace-pre-wrap font-sans relative group">
                              {getWhatsappMessage(names.split('\n')[0] || undefined)}
                              <p className="text-[9px] text-gray-400 text-right mt-2">12:00 PM ✓✓</p>
                           </div>
                        </div>

                        <div className="bg-white p-3 border-t border-gray-200 mt-auto flex items-center gap-3 mx-2 mb-2 rounded-full shadow-sm">
                           <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400"><X size={16} /></div>
                           <div className="flex-1 text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-full">Type a message</div>
                           <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center text-white"><ChevronRight size={16} /></div>
                        </div>
                      </div>

                      <button
                        onClick={handleCopy}
                        className="mt-6 w-full bg-hijau-zaitun text-white py-3 px-6 rounded-xl font-bold hover:bg-hijau-zaitun/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-hijau-zaitun/10"
                      >
                          <Copy size={18} /> Salin Format WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishes' && (
                <div className="space-y-6">
                  {/* Table Actions */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                       <input 
                         type="text" 
                         placeholder="Search guest name..."
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-hijau-zaitun/10 outline-none transition-all"
                       />
                       <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto">
                       <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
                          <button 
                            onClick={() => setFilterStatus("Semua")}
                            className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", filterStatus === "Semua" ? "bg-white shadow-sm text-hijau-gelap" : "text-gray-400 hover:text-gray-600")}
                          >
                            All
                          </button>
                          <button 
                            onClick={() => setFilterStatus("Hadir")}
                            className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", filterStatus === "Hadir" ? "bg-white shadow-sm text-green-600" : "text-gray-400 hover:text-gray-600")}
                          >
                            Attending
                          </button>
                       </div>
                       
                       <select 
                         value={filterStatus === "Hadir" || filterStatus === "Semua" ? filterStatus : filterStatus}
                         onChange={(e) => setFilterStatus(e.target.value as any)}
                         className="bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold px-3 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-hijau-zaitun/10"
                       >
                         <option value="Semua">All Status</option>
                         <option value="Hadir">Confirmed</option>
                         <option value="Tidak Hadir">Declined</option>
                         <option value="Ragu-ragu">Tentative</option>
                       </select>
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-12 h-12 border-4 border-hijau-zaitun/20 border-t-hijau-zaitun rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-400 font-medium">Syncing guestbook...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishes
                        .filter(w => {
                           const matchesStatus = filterStatus === "Semua" || w.kehadiran === filterStatus;
                           const matchesSearch = w.nama.toLowerCase().includes(searchTerm.toLowerCase());
                           return matchesStatus && matchesSearch;
                        })
                        .map((wish) => (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={wish.id} 
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col group relative hover:shadow-xl hover:shadow-hijau-zaitun/5 transition-all duration-300"
                          >
                            <div className="flex items-start justify-between mb-4">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-hijau-zaitun/5 flex items-center justify-center text-hijau-zaitun relative overflow-hidden">
                                     <User size={20} />
                                     <div className="absolute inset-0 bg-hijau-zaitun/5 animate-pulse" />
                                  </div>
                                  <div>
                                     <h3 className="font-bold text-gray-900 group-hover:text-hijau-zaitun transition-colors">{wish.nama}</h3>
                                     <div className={cn(
                                       "inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                                       wish.kehadiran === 'Hadir' ? "text-green-600 bg-green-50" : wish.kehadiran === 'Tidak Hadir' ? "text-red-500 bg-red-50" : "text-yellow-600 bg-yellow-50 font-bold"
                                     )}>
                                       {wish.kehadiran === 'Hadir' ? <CheckCircle size={10} /> : wish.kehadiran === 'Tidak Hadir' ? <X size={10} /> : <Clock size={10} />}
                                       {wish.kehadiran}
                                     </div>
                                  </div>
                               </div>
                               <button 
                                 onClick={() => handleDeleteWish(wish.id)}
                                 className="text-gray-300 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                               >
                                 <Trash2 size={18} />
                               </button>
                            </div>
                            
                            <div className="flex-1">
                               <p className="text-sm text-gray-500 leading-relaxed italic bg-gray-50/50 p-4 rounded-xl relative group/quote min-h-[80px]">
                                 <span className="text-2xl text-hijau-zaitun/10 absolute -top-1 left-2 font-serif">"</span>
                                 {wish.pesan}
                                 <button 
                                   onClick={() => copyToClipboard(wish.pesan, `copy-${wish.id}`)}
                                   className="absolute bottom-2 right-2 opacity-0 group-hover/quote:opacity-100 transition-opacity bg-white p-1.5 rounded-lg shadow-sm border border-gray-100 text-gray-400 hover:text-hijau-zaitun"
                                 >
                                    {copiedId === `copy-${wish.id}` ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                 </button>
                               </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                               <span className="text-[10px] text-gray-300 flex items-center gap-1 uppercase font-bold tracking-widest">
                                  <Clock size={12} /> {formatTime(wish.waktu)}
                               </span>
                               <div className="flex -space-x-2">
                                  {[1,2].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] text-gray-400"><Heart size={8} /></div>)}
                               </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  )}

                  {/* Pagination Simp */}
                  {wishes.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-center flex-wrap gap-2 py-8">
                       <button 
                         onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
                         disabled={currentPage === 1}
                         className="px-4 py-2 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-500 disabled:opacity-50 hover:bg-gray-50"
                       >
                         Previous
                       </button>
                       <div className="flex gap-2">
                          {Array.from({ length: Math.ceil(wishes.length / ITEMS_PER_PAGE) }).map((_, i) => (
                             <button 
                               key={i}
                               onClick={() => setCurrentPage(i + 1)}
                               className={cn(
                                 "w-10 h-10 rounded-xl text-sm font-bold transition-all",
                                 currentPage === i + 1 ? "bg-hijau-gelap text-bg-kuning shadow-lg shadow-hijau-gelap/20" : "bg-white border border-gray-100 text-gray-400 hover:bg-gray-50"
                               )}
                             >
                               {i + 1}
                             </button>
                          ))}
                       </div>
                       <button 
                         onClick={() => setCurrentPage(c => Math.min(Math.ceil(wishes.length / ITEMS_PER_PAGE), c + 1))}
                         disabled={currentPage === Math.ceil(wishes.length / ITEMS_PER_PAGE)}
                         className="px-4 py-2 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-500 disabled:opacity-50 hover:bg-gray-50"
                       >
                         Next
                       </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
