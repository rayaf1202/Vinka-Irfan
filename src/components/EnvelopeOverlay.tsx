import { motion, AnimatePresence } from "framer-motion";
import { Heart, Flower2 } from "lucide-react";
import { useState, useEffect } from "react";

interface EnvelopeOverlayProps {
  onOpen: () => void;
  isOpen: boolean;
}

export function EnvelopeOverlay({ onOpen, isOpen }: EnvelopeOverlayProps) {
  const [guestName, setGuestName] = useState("");

  // Extract guest name from URL if present (e.g., ?to=John+Doe)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) setGuestName(to);
  }, []);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-hijau-zaitun text-bg-kuning overflow-hidden"
        >
          {/* Decorative side ornaments (abstract representation) */}
          <div className="absolute left-4 top-0 bottom-0 w-12 flex flex-col justify-around opacity-60">
            {[...Array(6)].map((_, i) => (
              <svg key={`l-${i}`} viewBox="0 0 50 100" className="w-full h-20 fill-bg-kuning">
                <path d="M25 0 Q50 25 25 50 Q0 75 25 100 Q50 75 25 50 Q0 25 25 0 Z" />
              </svg>
            ))}
          </div>
          <div className="absolute right-4 top-0 bottom-0 w-12 flex flex-col justify-around opacity-60">
            {[...Array(6)].map((_, i) => (
              <svg key={`r-${i}`} viewBox="0 0 50 100" className="w-full h-20 fill-bg-kuning">
                <path d="M25 0 Q50 25 25 50 Q0 75 25 100 Q50 75 25 50 Q0 25 25 0 Z" />
              </svg>
            ))}
          </div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full"
          >
        {/* Portraits */}
        <div className="flex justify-center items-center gap-4 mb-8">
          {/* Groom Portrait */}
          <div className="relative w-32 h-44 bg-bg-kuning/20 rounded-2xl border-2 border-bg-kuning overflow-hidden group shadow-xl">
            <img 
              src="https://res.cloudinary.com/dwaizjrar/image/upload/v1776838504/wedding_invitation/v2_png.png" 
              alt="Irfan" 
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Irfan&style=transparent&top=shortHair&clothing=blazerAndShirt";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hijau-zaitun/40 to-transparent"></div>
          </div>

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-pink-bunga z-20"
          >
            <Heart size={24} fill="currentColor" />
          </motion.div>

          {/* Bride Portrait */}
          <div className="relative w-32 h-44 bg-bg-kuning/20 rounded-2xl border-2 border-bg-kuning overflow-hidden group shadow-xl">
            <img 
              src="https://res.cloudinary.com/dwaizjrar/image/upload/v1776838504/wedding_invitation/v1_png.png" 
              alt="Vinka" 
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Vinka&style=transparent&top=hijab&clothing=blazerAndShirt";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hijau-zaitun/40 to-transparent"></div>
          </div>
        </div>

            <h1 className="text-6xl md:text-7xl font-serif text-bg-kuning mb-12 leading-none drop-shadow-md">
              Vinka <span className="text-5xl">&</span><br/>Irfan
            </h1>

            <div className="w-full max-w-sm mx-auto">
              <p className="text-lg mb-2 font-sans">Kepada yth:</p>
              <div className="border-4 border-hijau-gelap bg-transparent p-6 rounded-sm relative mb-8">
                {/* Decorative corners */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-hijau-gelap rounded-full"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-hijau-gelap rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-hijau-gelap rounded-full"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-hijau-gelap rounded-full"></div>
                
                <p className="text-xl md:text-2xl font-semibold font-serif text-bg-kuning leading-tight break-words px-2">
                  {guestName || "Bapak / Ibu / Saudara / i"}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                className="flex items-center justify-center gap-2 w-full bg-pink-bunga text-white py-3 px-6 rounded-full font-sans font-semibold shadow-lg hover:bg-[#c7456d] transition-colors mx-auto max-w-[250px]"
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

