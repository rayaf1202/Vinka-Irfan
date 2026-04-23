import { motion, AnimatePresence } from "framer-motion";
import { Heart, Flower2 } from "lucide-react";
import { useState, useEffect } from "react";

interface EnvelopeOverlayProps {
  onOpen: () => void;
  isOpen: boolean;
  guestName?: string;
}

export function EnvelopeOverlay({ onOpen, isOpen, guestName: defaultGuestName }: EnvelopeOverlayProps) {
  const [guestName, setGuestName] = useState(defaultGuestName || "");

  // Extract guest name from URL if present (e.g., ?to=John+Doe)
  useEffect(() => {
    if (defaultGuestName) {
      setGuestName(defaultGuestName);
    } else {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to");
      if (to) setGuestName(to);
    }
  }, [defaultGuestName]);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-60 flex items-center justify-center p-6 bg-black/40 overflow-hidden"
        >
          <div 
            className="absolute inset-0 z-0 bg-cover bg-no-repeat min-h-screen w-full"
            style={{
              // Menghapus overlay hitam agar gambar custom terlihat penuh & terang, 
              // serta memastikan scale yang mengisi ruang penuh untuk menghindari tepian yang tidak rata
              backgroundImage: `url('https://res.cloudinary.com/dwaizjrar/image/upload/q_auto,f_auto/bg1_nnaz2z.jpg')`,
              backgroundPosition: "center 10%", // Menggeser titik tengah sedikit ke atas
              transform: "scale(1.3)"
            }}
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            // Menambahkan `mt-[15vh]` untuk menggeser kumpulan teks ke bawah
            className="relative z-10 flex flex-col items-center text-center max-w-xl w-full mt-[15vh]"
          >
            <div className="mb-8 p-4 rounded-3xl bg-black/20 backdrop-blur-[2px] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              <p className="text-[10px] sm:text-xs font-sans italic text-white/90 mb-2 tracking-[0.3em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">The Wedding of</p>
              {/* Ukuran teks diperkecil: dari text-4xl/6xl menjadi 3xl/5xl dan shadow hitam tebal */}
              <h1 className="text-3xl sm:text-5xl font-serif text-white uppercase leading-tight tracking-widest font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
                Vinka <br /> <span className="text-wedding-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">&</span> Irfan
              </h1>
            </div>

            <div className="w-full max-w-sm mx-auto mb-6">
              <p className="text-[10px] sm:text-xs font-sans font-bold text-white/95 mb-3 uppercase tracking-[0.25em] drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">Kepada Yth:</p>
              <div className="mb-6 min-h-[3.5rem] flex items-center justify-center p-3 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
                {guestName ? (
                  <p className="text-base md:text-lg font-bold font-sans text-white leading-tight break-words drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
                    {guestName}
                  </p>
                ) : (
                  <p className="text-sm font-bold font-sans text-white drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
                    Bapak / Ibu / Saudara / i
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{ boxShadow: ["0 0 0 0 rgba(197, 165, 87, 0.4)", "0 0 0 20px rgba(197, 165, 87, 0)"] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                onClick={onOpen}
                className="flex items-center justify-center gap-3 w-full bg-[#c5a557]/80 backdrop-blur-sm border border-white/20 text-white py-4 px-8 rounded-full font-sans font-bold shadow-2xl hover:bg-[#c5a557] transition-all max-w-[260px] mx-auto"
              >
                <Heart size={18} className="text-white" />
                Buka Undangan
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

