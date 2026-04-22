import { motion } from "framer-motion";
import { Section } from "./Section";

export function LoveStory() {
  const stories = [
    {
      title: "AWAL BERTEMU",
      date: "2018",
      image: "https://res.cloudinary.com/dwaizjrar/image/upload/v1776837190/Abg_4_nwcoxi.jpg",
      description: "Bagi Irfan, kekaguman muncul 2018 silam, ketika melihat Vinka pertama kali di pintu fakultas. Namun kala itu, mereka tidak pernah benar-benar berinteraksi, hanya sesekali melirik kehidupan satu sama lain di media sosial."
    },
    {
      title: "MENJALIN HUBUNGAN",
      date: "Januari 2024",
      image: "https://res.cloudinary.com/dwaizjrar/image/upload/v1776837190/Abg_7_glxhbq.jpg",
      description: "Hingga akhirnya, pada akhir 2023, waktu memberi mereka kesempatan untuk saling mengenal. Berawal dari percakapan sederhana—tentang lagu dari band Alvvays—lalu berkembang menjadi cerita tentang musik favorit, buku, dan seni. Dari sana, perasaan pun tumbuh perlahan, seiring proses mengenal satu sama lain. Pada 5 Januari 2024, keduanya bertemu lagi pertama kali setelah tumbuh dewasa di persimpangan jalan yang berbeda."
    },
    {
      title: "PERTEMUAN DUA KELUARGA",
      date: "6 Juli 2025",
      image: "https://res.cloudinary.com/dwaizjrar/image/upload/v1776837190/Abg_6_tuiwuy.jpg",
      description: "Setelah melewati berbagai dinamika—naik turun, ragu dan yakin—hubungan mereka justru semakin kuat. Vinka dan Irfan pun sepakat untuk melangkah ke jenjang yang lebih serius. Keseriusan itu ditunjukkan pada 6 Juli 2025, saat Irfan datang bersama keluarga untuk menyampaikan niat baiknya kepada keluarga Vinka."
    }
  ];

  return (
    <Section className="bg-bg-kuning">
      <div className="max-w-4xl mx-auto px-4 relative">
        {/* Decorative Border Container */}
        <div className="p-4 md:p-8 border-4 border-hijau-zaitun/30 rounded-[2rem] md:rounded-[4rem] bg-white/30 backdrop-blur-sm shadow-inner">
          <div className="text-center mb-12">
            {/* Floral icon like reference */}
            <div className="inline-block mb-4">
              <svg width="120" height="120" viewBox="0 0 100 100" className="mx-auto">
                {/* Simplified floral/bouquet icon placeholder */}
                <circle cx="50" cy="40" r="15" fill="#fdb8c1" opacity="0.6" />
                <circle cx="40" cy="50" r="15" fill="#fdb8c1" opacity="0.6" />
                <circle cx="60" cy="50" r="15" fill="#fdb8c1" opacity="0.6" />
                <path d="M50 60 L40 90 M50 60 L50 95 M50 60 L60 90" stroke="#d49e6a" strokeWidth="2" />
                <rect x="42" y="65" width="16" height="8" rx="4" fill="#d49e6a" />
              </svg>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-hijau-gelap italic">Love Story</h2>
          </div>

          <div className="space-y-12">
            {stories.map((story, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/80 rounded-[2.5rem] overflow-hidden border-2 border-hijau-zaitun/20 shadow-2xl backdrop-blur-sm"
              >
                <div className="p-4">
                  <div className="rounded-[2rem] overflow-hidden aspect-[4/3] relative shadow-inner">
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-6">
                      <p className="text-white font-serif italic text-lg">{story.date}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 pt-2">
                  <h3 className="font-serif text-3xl text-hijau-gelap mb-4 font-bold tracking-tight uppercase">{story.title}</h3>
                  <p className="text-hijau-zaitun text-sm md:text-base leading-relaxed font-sans opacity-95">
                    {story.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="max-w-2xl mx-auto px-4 py-8 bg-hijau-gelap/5 rounded-3xl border border-hijau-zaitun/10 italic">
              <p className="text-hijau-gelap text-lg md:text-xl font-serif leading-relaxed">
                "Dengan doa dan restu kedua keluarga, Vinka dan Irfan akan mengikat janji suci pada 28 Juni 2026. Sebuah perjalanan yang dimulai dari diam, kini berlabuh dalam satu tujuan."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
