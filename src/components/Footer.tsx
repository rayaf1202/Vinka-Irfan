import { motion } from "framer-motion";
import { Heart, Instagram, Globe, MessageCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-hijau-gelap text-bg-kuning py-20 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #fdf6aa 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="font-serif text-5xl md:text-6xl text-bg-kuning mb-8 uppercase tracking-widest font-bold">Terima Kasih</h2>
        <p className="text-base md:text-lg text-bg-kuning mb-16 leading-relaxed font-sans italic px-2">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
        </p>
        
        {/* Decorative Lines Section */}
        <div className="space-y-12 mb-16 px-4">
          <div className="flex justify-between items-center opacity-30">
            <div className="h-[2px] w-1/4 bg-bg-kuning"></div>
            <div className="h-[2px] w-1/4 bg-bg-kuning"></div>
          </div>
          <div className="w-full h-[1px] bg-bg-kuning/20"></div>
        </div>
        
        {/* Branding & Socials */}
        <div className="flex flex-col items-center gap-6 text-bg-kuning font-sans">
            <p className="text-sm md:text-base font-medium opacity-90">
                Made with ❤️ by Overtime Rework ID
            </p>
            <p className="text-sm md:text-base font-medium opacity-90">
                Hubungi Kami OT Rework ID : <a href="https://wa.me/+6285973777718" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white transition-all underline underline-offset-4">
                    +6285973777718 <MessageCircle size={16} />
                </a>
            </p>
            
            <div className="flex flex-col items-center gap-4">
                <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-all group"
                >
                    <Globe size={18} className="shrink-0 text-bg-kuning/80 group-hover:text-white" />
                    <span className="font-medium text-[11px] md:text-base leading-tight">OT Rework ID | Cinematic Videography & Multimedia</span>
                </a>
                
                <a 
                    href="https://www.instagram.com/otreworkid/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-all group"
                >
                    <Instagram size={18} className="shrink-0 text-bg-kuning/80 group-hover:text-white" />
                    <span className="font-medium text-[11px] md:text-base">@otreworkid</span>
                </a>
            </div>

            {/* Admin Login Button */}
            <div className="mt-8 pt-8 border-t border-bg-kuning/10 w-full flex justify-center">
                <Link 
                    to="/?admin=true" 
                    className="flex items-center gap-2 text-xs md:text-sm text-bg-kuning/50 hover:text-bg-kuning transition-colors px-4 py-2 rounded-full hover:bg-white/5"
                >
                    <Lock size={14} />
                    <span>Admin Login</span>
                </Link>
            </div>
        </div>
      </div>
    </footer>
  );
}

