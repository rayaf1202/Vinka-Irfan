import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-transparent py-4 md:py-10 px-0 md:px-10">
      
      {/* Outer Decorative Frame */}
      <div className="absolute inset-0 md:inset-10 border-[8px] md:border-[20px] border-hijau-zaitun rounded-t-[50px] md:rounded-t-[280px] overflow-hidden pointer-events-none z-10 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Top floral ornament */}
        <div className="w-full flex justify-center -mt-1 md:-mt-3">
          <svg width="120" height="50" viewBox="0 0 150 60" className="fill-hijau-zaitun md:w-[220px] md:h-[90px]">
            <path d="M75 0 C90 20 120 10 150 30 L150 60 L0 60 L0 30 C30 10 60 20 75 0 Z" />
            <circle cx="75" cy="30" r="10" fill="#e85d88" />
            <circle cx="50" cy="40" r="6" fill="#fdf6aa" />
            <circle cx="100" cy="40" r="6" fill="#fdf6aa" />
          </svg>
        </div>
        
        {/* Bottom floral ornament */}
        <div className="w-full flex justify-center -mb-1 md:-mb-3">
          <svg width="120" height="30" viewBox="0 0 150 40" className="fill-hijau-zaitun md:w-[200px] md:h-[60px]">
            <path d="M0 0 L150 0 L150 20 C120 40 90 30 75 10 C60 30 30 40 0 20 Z" />
          </svg>
        </div>
      </div>

      {/* Background Arch (Tree representation) */}
      <div className="absolute inset-0 md:inset-10 bg-hijau-gelap rounded-t-[50px] md:rounded-t-[280px] overflow-hidden">
        <img 
          src="https://res.cloudinary.com/dwaizjrar/image/upload/q_auto,f_auto/bg3.jpg" 
          alt="Decoration Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-hijau-gelap/40 via-transparent to-hijau-gelap/60"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative z-20 flex flex-col items-center justify-between min-h-[75vh] py-12 md:py-24 w-full"
      >
        <div className="flex flex-col items-center w-full px-6">
          <p className="text-bg-kuning tracking-[0.2em] text-[11px] md:text-lg mb-1 font-sans font-bold drop-shadow-md">28.06.26</p>
          <p className="text-bg-kuning tracking-[0.3em] text-[9px] md:text-sm mb-2 font-sans opacity-95 uppercase">THE WEDDING OF</p>
          
          <h1 className="text-3xl md:text-7xl font-serif text-bg-kuning drop-shadow-xl leading-tight text-center px-4">
            VINKA & IRFAN
          </h1>
        </div>

        {/* Couple Illustration */}
        <div className="my-4 md:my-8 flex justify-center items-center scale-[0.85] md:scale-100">
          <div className="relative flex items-center justify-center gap-2 md:gap-6">
            {/* Bride */}
            <div className="w-24 h-36 md:w-32 md:h-52 bg-bg-kuning/10 rounded-t-full border-[4px] md:border-[6px] border-bg-kuning overflow-hidden shadow-2xl relative">
              <img 
                src="https://res.cloudinary.com/dwaizjrar/image/upload/v1776838504/wedding_invitation/v1_png.png" 
                alt="Vinka" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-pink-bunga z-30 drop-shadow-lg">
              <Heart size={24} md:size={32} fill="currentColor" />
            </div>

            {/* Groom */}
            <div className="w-24 h-36 md:w-32 md:h-52 bg-bg-kuning/10 rounded-t-full border-[4px] md:border-[6px] border-bg-kuning overflow-hidden shadow-2xl relative">
              <img 
                src="https://res.cloudinary.com/dwaizjrar/image/upload/v1776838504/wedding_invitation/v2_png.png" 
                alt="Irfan" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="max-w-lg px-6 mt-2">
          <h3 className="font-serif text-sm md:text-xl mb-2 font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)] uppercase tracking-widest italic text-center">~ Ar-Rum · Ayat 21 ~</h3>
          <p className="italic font-sans text-[10px] md:text-sm leading-snug text-center drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] px-4 text-bg-kuning">
            “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”
          </p>
        </div>
      </motion.div>

    </section>
  );
}

