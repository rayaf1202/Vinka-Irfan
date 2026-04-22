import { motion } from "framer-motion";
import { Heart, Instagram, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-hijau-gelap text-bg-kuning py-12 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #fdf6aa 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <h2 className="font-serif text-4xl text-bg-kuning mb-6">Terima Kasih</h2>
        <p className="text-sm md:text-base text-bg-kuning/80 mb-10 leading-relaxed font-sans">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-16 bg-bg-kuning/50"></div>
          <h3 className="font-serif text-2xl tracking-widest">VINKA & IRFAN</h3>
          <div className="h-[1px] w-16 bg-bg-kuning/50"></div>
        </div>

        <div className="flex flex-col items-center gap-4 text-xs text-bg-kuning/80 font-sans mt-8 border-t border-bg-kuning/20 pt-8">
            <p>Made with ❤️ by Overtime Rework ID</p>
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors text-center md:text-left"
                >
                    <Globe size={16} className="shrink-0" />
                    <span className="text-center md:text-left">OT Rework ID | Cinematic Videography & Multimedia</span>
                </a>
                
                <a 
                    href="https://www.instagram.com/otreworkid/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                >
                    <Instagram size={16} className="shrink-0" />
                    <span>@otreworkid</span>
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
}

