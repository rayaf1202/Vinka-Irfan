import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = [
    "https://res.cloudinary.com/dwaizjrar/image/upload/v1776837189/Abg_5_ogwp3f.jpg",
    "https://res.cloudinary.com/dwaizjrar/image/upload/v1776837190/Abg_7_glxhbq.jpg",
    "https://res.cloudinary.com/dwaizjrar/image/upload/v1776837189/Abg_3_lug2br.jpg",
    "https://res.cloudinary.com/dwaizjrar/image/upload/v1776837190/Abg_4_nwcoxi.jpg",
    "https://res.cloudinary.com/dwaizjrar/image/upload/Abg_6_tuiwuy",
    "https://res.cloudinary.com/dwaizjrar/image/upload/wedding_invitation/v1"
  ];

  return (
    <>
    <Section className="bg-transparent">
      <div className="max-w-4xl mx-auto px-4 relative">
        {/* Decorative Border Container */}
        <div className="p-4 md:p-8 border-4 border-hijau-zaitun/30 rounded-[2rem] md:rounded-[4rem] bg-white/30 backdrop-blur-sm shadow-inner">
          <h2 className="font-serif text-4xl md:text-5xl text-hijau-gelap text-center mb-8 italic">Our Gallery</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
            {images.map((src, index) => {
              const isLandscape = index === 0 || index === images.length - 1;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, rotate: isLandscape ? 0 : (index % 2 === 0 ? 0.5 : -0.5) }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className={`group cursor-pointer ${isLandscape ? 'lg:col-span-3 sm:col-span-2' : ''}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <motion.div 
                    className={`relative ${isLandscape ? 'aspect-video' : 'aspect-[4/5]'} rounded-xl overflow-hidden border-2 border-white shadow-lg group-hover:shadow-xl transition-all duration-300 bg-hijau-gelap/5`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <img 
                      src={src} 
                      alt={`Gallery ${index}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-hijau-gelap/0 group-hover:bg-hijau-gelap/5 transition-colors duration-300 pointer-events-none"></div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>

    {/* Carousel / Lightbox */}
    <AnimatePresence>
      {selectedIndex !== null && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
          >
            <X size={32} />
          </button>

          {/* Prev Button */}
          <button 
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] bg-white/5 p-3 rounded-full backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
            } }
          >
            <ChevronLeft size={32} />
          </button>

          {/* Image Container */}
          <motion.div 
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-5xl w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={images[selectedIndex]} 
              alt="Gallery Preview" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
            />
            
            {/* Index indicator */}
            <div className="absolute bottom-[-2rem] left-0 right-0 text-center text-white/50 font-sans text-sm tracking-widest">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>

          {/* Next Button */}
          <button 
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] bg-white/5 p-3 rounded-full backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
            } }
          >
            <ChevronRight size={32} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
}
