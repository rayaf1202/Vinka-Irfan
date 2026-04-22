import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 overflow-hidden bg-bg-kuning">
      
      {/* Outer Decorative Frame */}
      <div className="absolute inset-4 md:inset-8 border-[12px] border-hijau-zaitun rounded-t-[100px] md:rounded-t-[200px] overflow-hidden pointer-events-none z-10 flex flex-col justify-between">
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
      <div className="absolute inset-4 md:inset-8 bg-hijau-gelap rounded-t-[100px] md:rounded-t-[200px] overflow-hidden">
        {/* Abstract tree branches */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
          background: 'radial-gradient(circle at 20% 40%, #5b692b 0%, transparent 40%), radial-gradient(circle at 80% 30%, #5b692b 0%, transparent 50%)'
        }}></div>
        {/* Sky hole */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[#4a86e8] rounded-full blur-3xl opacity-40"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative z-20 flex flex-col items-center justify-between min-h-[85vh] pt-24 pb-12 md:pt-32 md:pb-24 lg:py-24"
      >
        <div className="flex flex-col items-center">
          <p className="text-bg-kuning tracking-[0.2em] text-base md:text-xl mb-1 font-sans font-bold drop-shadow-sm">28.06.26</p>
          <p className="text-bg-kuning tracking-[0.3em] text-xs md:text-sm mb-6 font-sans opacity-90 uppercase">THE WEDDING OF</p>
          
          <h1 className="text-5xl md:text-8xl font-serif text-bg-kuning drop-shadow-lg leading-tight lg:leading-normal">
            VINKA & IRFAN
          </h1>
        </div>

        {/* Couple Illustration Placeholder */}
        <div className="my-8 flex justify-center items-center">
          <div className="relative flex items-center justify-center gap-2 md:gap-4 scale-90 md:scale-100">
            {/* Bride */}
            <div className="w-28 h-48 md:w-32 md:h-56 bg-bg-kuning/10 rounded-t-full border-[6px] border-bg-kuning overflow-hidden flex justify-center shadow-2xl relative">
              <img 
                src="https://res.cloudinary.com/dwaizjrar/image/upload/v1776838504/wedding_invitation/v1_png.png" 
                alt="Vinka" 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Vinka&style=transparent&top=hijab&clothing=shirt";
                }}
              />
              <div className="absolute inset-0 border-t-8 border-bg-kuning/30 pointer-events-none"></div>
            </div>

            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-pink-bunga z-30 drop-shadow-lg"
            >
              <Heart size={28} fill="currentColor" />
            </motion.div>

            {/* Groom */}
            <div className="w-28 h-48 md:w-32 md:h-56 bg-bg-kuning/10 rounded-t-full border-[6px] border-bg-kuning overflow-hidden flex justify-center shadow-2xl relative">
              <img 
                src="https://res.cloudinary.com/dwaizjrar/image/upload/v1776838504/wedding_invitation/v2_png.png" 
                alt="Irfan" 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Irfan&style=transparent&top=shortHair&clothing=shirt";
                }}
              />
              <div className="absolute inset-0 border-t-8 border-bg-kuning/30 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Quote at the bottom */}
        <div className="max-w-2xl px-6">
          <h3 className="font-serif text-xl md:text-2xl mb-3 font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">~ Ar-Rum · Ayat 21 ~</h3>
          <p className="italic font-sans text-xs md:text-base leading-relaxed opacity-95 text-center drop-shadow-sm px-2 text-bg-kuning">
            “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”
          </p>
        </div>
      </motion.div>

    </section>
  );
}

