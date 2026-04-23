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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 overflow-hidden"
        >
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dwaizjrar/image/upload/q_auto,f_auto,c_fill,w_1000/bg1_rpzxaw.jpg')`
            }}
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center text-center max-w-xl w-full"
          >
            <div className="mb-12">
              <p className="text-xs sm:text-sm font-sans italic text-white/90 mb-2 tracking-[0.3em] uppercase">The Wedding of</p>
              <h1 className="text-4xl sm:text-6xl font-serif text-white uppercase leading-tight tracking-widest font-bold drop-shadow-lg">
                Vinka <br /> <span className="text-wedding-gold">&</span> Irfan
              </h1>
            </div>

            <div className="w-full max-w-sm mx-auto mb-10">
              <p className="text-xs font-sans font-medium text-white/70 mb-3 uppercase tracking-[0.25em]">Kepada Yth:</p>
              <div className="mb-8 min-h-[4rem] flex items-center justify-center p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                {guestName ? (
                  <p className="text-lg md:text-xl font-medium font-sans text-white leading-tight break-words">
                    {guestName}
                  </p>
                ) : (
                  <p className="text-base font-sans text-white">
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

