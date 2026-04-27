import { Card } from "./Card";
import { motion } from "framer-motion";
import { Section } from "./Section";
import { Instagram } from "lucide-react";

export function Couple() {
  return (
    <Section className="bg-transparent text-center py-0">
      <div className="max-w-4xl mx-auto px-4 relative">
        <Card>
          {/* Bride */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="w-full mb-8 px-2"
          >
            <h2 className="font-serif text-3xl md:text-6xl text-hijau-gelap mb-6 font-bold leading-tight balance italic">Vinka Intan Citradewi</h2>
            
            <div className="w-32 h-44 md:w-40 md:h-56 mx-auto mb-4 rounded-t-full border-[4px] md:border-[6px] border-bg-kuning overflow-hidden shadow-xl bg-bg-kuning/10">
              <img 
                src="https://res.cloudinary.com/dwaizjrar/image/upload/q_auto,f_auto/ft_1_xcwghk.jpg" 
                alt="Vinka" 
                className="w-full h-full object-cover"
              />
            </div>

            <a 
              href="https://www.instagram.com/vcitradewi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-hijau-zaitun hover:text-hijau-gelap transition-colors mb-6"
            >
              <Instagram size={18} />
              <span className="text-sm font-sans font-medium">@vcitradewi</span>
            </a>
            
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-hijau-zaitun mb-3">Putri Pertama Dari</p>
            <p className="text-sm md:text-2xl text-hijau-gelap leading-relaxed font-serif italic">
              Bapak Moh. Elvin Muharam & Ibu Ika Sartikawati
            </p>
          </motion.div>

          {/* Ampersand */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="h-10 w-px bg-hijau-zaitun/20"></div>
            <span className="font-serif text-5xl md:text-7xl text-hijau-zaitun opacity-30 italic">&</span>
            <div className="h-10 w-px bg-hijau-zaitun/20"></div>
          </div>

          {/* Groom */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="w-full mb-4 px-2"
          >
            <h2 className="font-serif text-3xl md:text-6xl text-hijau-gelap mb-6 font-bold leading-tight balance italic">Irfan Maulana</h2>
            
            <div className="w-32 h-44 md:w-40 md:h-56 mx-auto mb-4 rounded-t-full border-[4px] md:border-[6px] border-bg-kuning overflow-hidden shadow-xl bg-bg-kuning/10">
              <img 
                src="https://res.cloudinary.com/dwaizjrar/image/upload/q_auto,f_auto/ft_2_ibu1ff.jpg" 
                alt="Irfan" 
                className="w-full h-full object-cover"
              />
            </div>

            <a 
              href="https://www.instagram.com/irfanmavl/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-hijau-zaitun hover:text-hijau-gelap transition-colors mb-6"
            >
              <Instagram size={18} />
              <span className="text-sm font-sans font-medium">@irfanmavl</span>
            </a>
            
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-hijau-zaitun mb-3">Putra Kedua Dari</p>
            <p className="text-sm md:text-2xl text-hijau-gelap leading-relaxed font-serif italic">
              Bapak Yadi Supriatna & Ibu N. Julaeha
            </p>
          </motion.div>
        </Card>
      </div>
    </Section>
  );
}

