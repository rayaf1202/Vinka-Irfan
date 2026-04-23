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
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center py-12 md:py-20 text-white overflow-hidden bg-cover bg-no-repeat h-[100dvh] w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://res.cloudinary.com/dwaizjrar/image/upload/q_auto,f_auto/bg1_rpzxaw.jpg')`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg w-full h-full justify-between"
          >
            <div className="mt-44 md:mt-64">
              <p className="text-lg md:text-2xl font-sans italic text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-1 capitalize">The Wedding of</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white uppercase drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] leading-tight tracking-wider font-bold">
                Vinka & Irfan
              </h1>
            </div>

            <div className="w-full max-w-md mx-auto mb-6 md:mb-10">
              <p className="text-base md:text-xl font-sans font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-1">Kepada Yth:</p>
              <div className="mb-4 md:mb-6 min-h-[40px] flex items-center justify-center">
                {guestName ? (
                  <p className="text-xl md:text-3xl font-semibold font-sans text-white leading-tight break-words drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {guestName}
                  </p>
                ) : (
                  <p className="text-base sm:text-xl md:text-2xl font-semibold font-sans text-white whitespace-nowrap overflow-hidden text-ellipsis px-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Bapak / Ibu / Saudara / i
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                className="flex items-center justify-center gap-2 w-full bg-[#a39171]/90 backdrop-blur-md border border-white/50 text-white py-3 px-6 rounded-full font-sans font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:bg-[#a39171] transition-colors mx-auto max-w-[220px] md:max-w-[250px]"
              >
                <Flower2 size={20} />
                Buka Undangan
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

