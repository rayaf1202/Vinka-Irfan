import { Section } from "./Section";
import { Card } from "./Card";
import { useState, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send } from "lucide-react";
import { db } from "../lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  getDocFromServer,
  Timestamp 
} from "firebase/firestore";

interface Wish {
  id: string;
  nama: string;
  kehadiran: "Hadir" | "Tidak Hadir" | "Ragu-ragu";
  pesan: string;
  waktu: any; // Firestore Timestamp
  likes?: number;
}

export function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [formData, setFormData] = useState({ name: "", attendance: "Hadir", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate Firestore Connection
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'ucapan', 'connection-test'));
      } catch (error: any) {
        if(error.message?.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    }
    testConnection();
  }, []);

  // Real-time listener for wishes
  useEffect(() => {
    const q = query(collection(db, "ucapan"), orderBy("waktu", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wishesList: Wish[] = [];
      snapshot.forEach((doc) => {
        wishesList.push({ id: doc.id, ...doc.data() } as Wish);
      });
      setWishes(wishesList);
    }, (err) => {
      console.error("Firestore List Error:", err);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, "ucapan"), {
        nama: formData.name,
        kehadiran: formData.attendance,
        pesan: formData.message,
        waktu: serverTimestamp()
      });
      setFormData({ name: "", attendance: "Hadir", message: "" });
    } catch (err: any) {
      console.error("Firestore Write Error:", err);
      setError("Gagal mengirim ucapan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (waktu: any) => {
    if (!waktu) return "Baru saja";
    const date = waktu instanceof Timestamp ? waktu.toDate() : new Date(waktu);
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return "Baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <Section className="bg-transparent">
      <div className="max-w-5xl mx-auto px-4">
        <Card>
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-hijau-gelap mb-4 italic">Ucapan & Doa</h2>
            <p className="text-hijau-zaitun font-sans text-lg">Tinggalkan pesan manis untuk kedua mempelai</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white/80 p-8 rounded-[2rem] sticky top-24 border-2 border-hijau-zaitun/20 shadow-xl">
                <h3 className="font-serif text-2xl text-hijau-gelap mb-6 font-bold uppercase tracking-tight">Kirim Doa Restu</h3>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg font-sans">
                    {error}
                  </div>
                )}

                <div className="mb-5">
                  <label className="block text-xs uppercase tracking-widest text-hijau-zaitun font-bold mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border-2 border-hijau-zaitun/10 rounded-xl px-4 py-3 focus:outline-none focus:border-hijau-zaitun transition-all font-sans"
                    placeholder="Nama Anda..."
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-xs uppercase tracking-widest text-hijau-zaitun font-bold mb-2">Kehadiran</label>
                  <div className="relative">
                    <select 
                      value={formData.attendance}
                      onChange={e => setFormData({...formData, attendance: e.target.value as any})}
                      className="w-full bg-white border-2 border-hijau-zaitun/10 rounded-xl px-4 py-3 focus:outline-none focus:border-hijau-zaitun transition-all font-sans appearance-none"
                    >
                      <option value="Hadir">Saya Akan Hadir</option>
                      <option value="Tidak Hadir">Mohon Maaf, Berhalangan</option>
                      <option value="Ragu-ragu">Masih Ragu-ragu</option>
                    </select>
                  </div>
                </div>
                <div className="mb-8">
                  <label className="block text-xs uppercase tracking-widest text-hijau-zaitun font-bold mb-2">Pesan & Doa</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white border-2 border-hijau-zaitun/10 rounded-xl px-4 py-3 focus:outline-none focus:border-hijau-zaitun transition-all resize-none font-sans"
                    placeholder="Tulis ucapan selamat..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-hijau-zaitun text-bg-kuning py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-hijau-gelap transition-all shadow-lg active:scale-95 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-3 border-bg-kuning border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Kirim Ucapan</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] flex-1 bg-hijau-zaitun/10"></div>
                <p className="text-xs font-bold text-hijau-zaitun tracking-widest uppercase">{wishes.length} Pesan Diterima</p>
                <div className="h-[2px] flex-1 bg-hijau-zaitun/10"></div>
              </div>
              
              <div className="h-[600px] overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
                <AnimatePresence initial={false}>
                  {wishes.length === 0 && !isSubmitting && (
                    <p className="text-center text-hijau-zaitun opacity-50 font-sans italic py-10">Belum ada ucapan.</p>
                  )}
                  {wishes.map((wish) => (
                    <motion.div 
                      key={wish.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/60 p-6 rounded-2xl border border-hijau-zaitun/10 shadow-sm"
                    >
                      <div className="flex flex-col mb-4">
                        <h4 className="font-serif text-lg font-bold text-hijau-gelap">{wish.nama}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold ${
                            wish.kehadiran === 'Hadir' ? 'bg-green-100 text-green-700' : 
                            wish.kehadiran === 'Tidak Hadir' ? 'bg-red-100 text-red-700' : 
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {wish.kehadiran}
                          </span>
                          <span className="text-[10px] text-hijau-zaitun/40 font-bold">{formatTime(wish.waktu)}</span>
                        </div>
                      </div>
                      <p className="text-hijau-zaitun text-sm md:text-base leading-relaxed font-sans italic opacity-90">
                        "{wish.pesan}"
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

