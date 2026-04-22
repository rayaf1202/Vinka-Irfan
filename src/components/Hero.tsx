import { motion, AnimatePresence } from "framer-motion";
import { Heart, Instagram } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [
    "https://res.cloudinary.com/dwaizjrar/image/upload/v1776837190/Abg_4_nwcoxi.jpg",
    "https://res.cloudinary.com/dwaizjrar/image/upload/v1776837190/Abg_7_glxhbq.jpg",
    "https://res.cloudinary.com/dwaizjrar/image/upload/v1776837190/Abg_6_tuiwuy.jpg",
    "https://res.cloudinary.com/dwaizjrar/image/upload/v1776837189/Abg_3_lug2br.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 overflow-hidden bg-bg-kuning">
      
      {/* Outer Decorative Frame */}
      <div className="absolute inset-4 md:inset-8 border-[12px] border-hijau-zaitun rounded-t-[80px] md:rounded-t-[200px] overflow-hidden pointer-events-none z-10 flex flex-col justify-between">
        {/* Top floral ornament */}
        <div className="w-full flex justify-center -mt-2">
          <svg width="150" height="60" viewBox="0 0 150 60" className="fill-hijau-zaitun">
            <path d="M75 0 C90 20 120 10 150 30 L150 60 L0 60 L0 30 C30 10 60 20 75 0 Z" />
            <circle cx="75" cy="30" r="10" fill="#e85d88" />
            <circle cx="50" cy="40" r="6" fill="#fdf6aa" />
            <circle cx="100" cy="40" r="6" fill="#fdf6aa" />
          </svg>
        </div>
        
        {/* Bottom floral ornament */}
        <div className="w-full flex justify-center -mb-2">
          <svg width="150" height="40" viewBox="0 0 150 40" className="fill-hijau-zaitun">
            <path d="M0 0 L150 0 L150 20 C120 40 90 30 75 10 C60 30 30 40 0 20 Z" />
          </svg>
        </div>
      </div>

      {/* Background Arch (Tree representation) */}
      <div className="absolute inset-4 md:inset-8 bg-hijau-gelap rounded-t-[80px] md:rounded-t-[200px] overflow-hidden">
        {/* Abstract tree branches */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
          background: 'radial-gradient(circle at 20% 40%, #5b692b 0%, transparent 40%), radial-gradient(circle at 80% 30%, #5b692b 0%, transparent 50%)'
        }}></div>
        {/* Background Photo Window with Carousel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[55%] md:w-[75%] md:h-[65%] overflow-hidden rounded-[100px] border-4 border-hijau-gelap/20 shadow-inner">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              src={backgroundImages[currentImageIndex]} 
              alt="Decoration Carousel" 
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 0.35, scale: 1.1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-hijau-gelap/10 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none"></div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1.2 }}
        className="relative z-20 flex flex-col items-center justify-between min-h-screen py-16 md:py-24"
      >
        <div className="flex flex-col items-center mt-8 md:mt-0">
          <p className="text-bg-kuning tracking-[0.2em] text-sm md:text-xl mb-1 font-sans font-bold drop-shadow-sm">28.06.26</p>
          <p className="text-bg-kuning tracking-[0.3em] text-[10px] md:text-sm mb-6 font-sans opacity-90 uppercase">THE WEDDING OF</p>
          
          <h1 className="text-4xl md:text-8xl font-serif text-bg-kuning drop-shadow-lg leading-tight lg:leading-normal max-w-[280px] md:max-w-none">
            VINKA & IRFAN
          </h1>
        </div>

        {/* Couple Illustration Placeholder */}
        <div className="my-8 flex justify-center items-center">
          <div className="relative flex items-center justify-center gap-2 md:gap-4 scale-90 md:scale-100">
            {/* Bride - Vinka */}
            <motion.a 
              href="https://www.instagram.com/vcitradewi/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="relative group block"
            >
              <div className="w-28 h-48 md:w-32 md:h-56 bg-bg-kuning/10 rounded-t-full border-[6px] border-bg-kuning overflow-hidden flex justify-center shadow-2xl relative">
                <img 
                  src="https://res.cloudinary.com/dwaizjrar/image/upload/v1776838504/wedding_invitation/v1_png.png" 
                  alt="Vinka" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Vinka&style=transparent&top=hijab&clothing=shirt";
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 py-2 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Instagram size={16} className="text-white" />
                </div>
                <div className="absolute inset-0 border-t-8 border-bg-kuning/30 pointer-events-none"></div>
              </div>
            </motion.a>

            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-pink-bunga z-30 drop-shadow-lg"
            >
              <Heart size={28} fill="currentColor" />
            </motion.div>

            {/* Groom - Irfan */}
            <motion.a 
              href="https://www.instagram.com/irfanmavl/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="relative group block"
            >
              <div className="w-28 h-48 md:w-32 md:h-56 bg-bg-kuning/10 rounded-t-full border-[6px] border-bg-kuning overflow-hidden flex justify-center shadow-2xl relative">
                <img 
                  src="https://res.cloudinary.com/dwaizjrar/image/upload/v1776838504/wedding_invitation/v2_png.png" 
                  alt="Irfan" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Irfan&style=transparent&top=shortHair&clothing=shirt";
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 py-2 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Instagram size={16} className="text-white" />
                </div>
                <div className="absolute inset-0 border-t-8 border-bg-kuning/30 pointer-events-none"></div>
              </div>
            </motion.a>
          </div>
        </div>

        {/* Quote at the bottom */}
        <div className="max-w-2xl px-6 text-bg-kuning">
          <h3 className="font-serif text-xl md:text-2xl mb-3 font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] scale-110">~ Ar-Rum · Ayat 21 ~</h3>
          <p className="italic font-sans text-xs md:text-base leading-relaxed opacity-95 text-center drop-shadow-sm px-2">
            “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”
          </p>
        </div>
      </motion.div>

    </section>
  );
}

