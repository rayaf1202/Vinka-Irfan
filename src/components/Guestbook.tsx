import { Section } from "./Section";
import { Card } from "./Card";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send } from "lucide-react";

interface Wish {
  id: number;
  name: string;
  attendance: "Hadir" | "Tidak Hadir" | "Ragu-ragu";
  message: string;
  time: string;
  likes: number;
}

export function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([
    { id: 1, name: "Budi & Keluarga", attendance: "Hadir", message: "Selamat menempuh hidup baru Vinka & Irfan. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.", time: "2 jam yang lalu", likes: 5 },
    { id: 2, name: "Siti Aminah", attendance: "Tidak Hadir", message: "Maaf belum bisa hadir, doa terbaik untuk kalian berdua!", time: "5 jam yang lalu", likes: 2 },
  ]);

  const [formData, setFormData] = useState({ name: "", attendance: "Hadir", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setWishes([{
        id: Date.now(),
        name: formData.name,
        attendance: formData.attendance as any,
        message: formData.message,
        time: "Baru saja",
        likes: 0
      }, ...wishes]);
      setFormData({ name: "", attendance: "Hadir", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleLike = (id: number) => {
    setWishes(wishes.map(w => w.id === id ? { ...w, likes: w.likes + 1 } : w));
  };

  return (
    <Section className="bg-bg-kuning">
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
                      onChange={e => setFormData({...formData, attendance: e.target.value})}
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
                <AnimatePresence>
                  {wishes.map((wish) => (
                    <motion.div 
                      key={wish.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/60 p-6 rounded-2xl border border-hijau-zaitun/10 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                          <h4 className="font-serif text-lg font-bold text-hijau-gelap">{wish.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold ${
                              wish.attendance === 'Hadir' ? 'bg-green-100 text-green-700' : 
                              wish.attendance === 'Tidak Hadir' ? 'bg-red-100 text-red-700' : 
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {wish.attendance}
                            </span>
                            <span className="text-[10px] text-hijau-zaitun/40 font-bold">{wish.time}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleLike(wish.id)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 text-xs text-pink-bunga hover:bg-pink-bunga hover:text-white transition-all self-start sm:self-center font-bold"
                        >
                          <Heart size={14} className={wish.likes > 0 ? "fill-current" : ""} />
                          {wish.likes > 0 && <span>{wish.likes}</span>}
                          {wish.likes === 0 && <span>Sukai</span>}
                        </button>
                      </div>
                      <p className="text-hijau-zaitun text-sm md:text-base leading-relaxed font-sans italic opacity-90">
                        "{wish.message}"
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

