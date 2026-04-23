import { Section } from "./Section";
import { Card } from "./Card";
import { Navigation, MapPin, Search, Share2, Save, Bookmark, Globe, Clock, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function LocationMap() {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.174154942!2d106.7693529759!3d-6.3847169936054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef29b8b9b9b9%3A0x1b1b1b1b1b1b1b1b!2sMasjid%20Dian%20Al-Mahri%20(Kubah%20Emas)!5e0!3m2!1sen!2sid!4v1713781000000!5m2!1sen!2sid";
  const googleMapsLink = "https://maps.app.goo.gl/ruZFFKh21hNd2XHS9";

  return (
    <Section id="map" className="bg-transparent text-center">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
           <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="inline-block p-4 mb-4 bg-hijau-gelap/5 rounded-full"
           >
              <MapPin size={32} className="text-hijau-gelap" />
           </motion.div>
           <h2 className="font-serif text-4xl md:text-5xl text-hijau-gelap italic">Lokasi Acara</h2>
        </motion.div>

        {/* Google Maps Styled Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col md:flex-row h-[750px] md:h-[750px] relative"
        >
          {/* Side Panel (Navigation Style) */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full md:w-[400px] bg-white z-10 flex flex-col shadow-2xl border-r border-gray-100 overflow-y-auto no-scrollbar"
          >
            {/* Search Header */}
            <div className="p-4 sticky top-0 bg-white z-20">
              <div className="relative group">
                <input 
                  type="text" 
                  readOnly 
                  value="Masjid Kubah Emas Depok"
                  className="w-full pl-12 pr-10 py-3 rounded-full bg-gray-100 border-none text-sm font-medium text-gray-700 focus:outline-none"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-hijau-zaitun" size={18} />
              </div>
            </div>

            {/* Venue Image */}
            <div className="relative h-48 overflow-hidden cursor-pointer group">
              <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://res.cloudinary.com/dwaizjrar/image/upload/v1776837190/Abg_4_nwcoxi.jpg" 
                  alt="Venue" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Buka Maps</span>
                </div>
              </a>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white font-bold text-xl leading-tight">Masjid Dian Al-Mahri (Masjid Kubah Emas)</h3>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 text-left flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-1 mb-1">
                   <h1 className="text-xl font-bold text-gray-900">Masjid Kubah Emas</h1>
                </div>
                <p className="text-sm text-gray-500 font-medium">Place of Worship • Limo, Depok</p>
                <div className="flex items-center gap-2 mt-2">
                   <span className="text-sm font-bold text-hijau-zaitun">5.0</span>
                   <div className="flex text-yellow-400">
                     {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                   </div>
                   <span className="text-xs text-gray-400">(28 Juni 2026)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center px-2 py-4 border-y border-gray-100">
                <a href={googleMapsLink} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                  <div className="p-3 rounded-full bg-hijau-gelap text-white group-hover:bg-hijau-zaitun transition-colors shadow-lg">
                    <Navigation size={22} className="fill-white" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Rute</span>
                </a>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="p-3 rounded-full border border-gray-200 text-hijau-gelap hover:bg-gray-50 transition-colors">
                    <Bookmark size={22} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Simpan</span>
                </div>
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="p-3 rounded-full border border-gray-200 text-hijau-gelap hover:bg-gray-50 transition-colors">
                    <Share2 size={22} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Bagikan</span>
                </div>
              </div>

              {/* Info Rows */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin className="text-hijau-zaitun shrink-0 mt-1" size={20} />
                  <p className="text-sm text-gray-700 leading-snug">
                    Jl. Meruyung Raya, Limo, Kota Depok, Jawa Barat 16515
                  </p>
                </div>
                
                {/* Event Times Integrated */}
                <div className="flex items-start gap-4">
                  <Clock className="text-hijau-zaitun shrink-0 mt-1" size={20} />
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-hijau-gelap font-bold">Akad Nikah</p>
                      </div>
                      <p className="text-xs text-gray-500">Minggu, 08:00 WIB - Selesai</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-hijau-gelap font-bold">Resepsi Pernikahan</p>
                        <ChevronDown size={16} className="text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500">Minggu, 11:00 WIB - Selesai</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Buttons - Updated to include address and direct link */}
              <div className="mt-6 flex flex-col gap-4">
                 <a 
                   href={googleMapsLink} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center justify-center gap-3 w-full bg-hijau-gelap text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all active:scale-95 text-sm"
                 >
                   <Navigation size={18} />
                   Buka di Google Maps
                 </a>
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs text-gray-600 leading-relaxed flex items-center gap-4">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${googleMapsLink}`} 
                      alt="QR Code" 
                      className="w-16 h-16 rounded-lg border border-gray-200"
                    />
                    <div className="text-left">
                      <span className="font-bold text-hijau-gelap block mb-1">Masjid Dian Al-Mahri</span>
                      Jl. Meruyung Raya, Limo, Kota Depok
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Main Map Area */}
          <div className="flex-1 relative bg-gray-50">
            <iframe 
              src={mapUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
              className="w-full h-full grayscale-[0.1] contrast-[1.1]"
            ></iframe>

            {/* Animated Pin and Shadow */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-red-500/20 rounded-full animate-ping"></div>
                <div className="absolute -inset-8 bg-red-500/10 rounded-full animate-pulse"></div>
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative bg-white p-2 rounded-lg shadow-2xl border-2 border-red-500 flex items-center gap-2"
                >
                   <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                      <MapPin size={16} fill="white" />
                   </div>
                   <div className="pr-2 text-left">
                     <p className="text-[10px] font-bold text-gray-400 leading-none uppercase">Lokasi Acara</p>
                     <p className="text-xs font-bold text-gray-900 leading-tight">Masjid Kubah Emas</p>
                   </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* QR Section - Simplified */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white/40 backdrop-blur-sm p-4 rounded-full border border-white/50 shadow-sm">
             <div className="p-1 bg-white rounded-full">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${googleMapsLink}`} alt="QR Code" className="w-12 h-12" />
             </div>
             <p className="text-sm text-hijau-gelap font-medium pr-4">Scan QR untuk membuka lokasi</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}


