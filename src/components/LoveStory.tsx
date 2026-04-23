import { motion } from "framer-motion";
import { Section } from "./Section";

export function LoveStory() {
  const stories = [
    {
      title: "AWAL BERTEMU",
      date: "2018",
      description: "Bagi Irfan, kekaguman muncul 2018 silam, ketika melihat Vinka pertama kali di pintu fakultas. Namun kala itu, mereka tidak pernah benar-benar berinteraksi, hanya sesekali melirik kehidupan satu sama lain di media sosial."
    },
    {
      title: "MENJALIN HUBUNGAN",
      date: "Januari 2024",
      description: "Hingga akhirnya, pada akhir 2023, waktu memberi mereka kesempatan untuk saling mengenal. Berawal dari percakapan sederhana—tentang lagu dari band Alvvays—lalu berkembang menjadi cerita tentang musik favorit, buku, dan seni. Dari sana, perasaan pun tumbuh perlahan, seiring proses mengenal satu sama lain. Pada 5 Januari 2024, keduanya bertemu lagi pertama kali setelah tumbuh dewasa di persimpangan jalan yang berbeda."
    },
    {
      title: "PERTEMUAN DUA KELUARGA",
      date: "6 Juli 2025",
      description: "Setelah melewati berbagai dinamika—naik turun, ragu dan yakin—hubungan mereka justru semakin kuat. Vinka dan Irfan pun sepakat untuk melangkah ke jenjang yang lebih serius. Keseriusan itu ditunjukkan pada 6 Juli 2025, saat Irfan datang bersama keluarga untuk menyampaikan niat baiknya kepada keluarga Vinka."
    }
  ];

  return (
    <Section className="bg-transparent">
      <div className="max-w-4xl mx-auto px-4 relative">
        {/* Decorative Border Container */}
        <div className="p-4 md:p-8 lg:p-12 border-4 border-hijau-zaitun/30 rounded-[2rem] md:rounded-[4rem] bg-white/30 backdrop-blur-sm shadow-inner">
          <div className="text-center mb-10 md:mb-16">
            {/* Floral icon like reference */}
            <div className="inline-block mb-4">
              <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto md:w-[120px] md:h-[120px]">
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

          <div className="space-y-8 md:space-y-12">
            {stories.map((story, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/80 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border-2 border-hijau-zaitun/20 shadow-xl backdrop-blur-sm relative overflow-hidden"
              >
                {/* Minimalist Date Label */}
                <div className="inline-block bg-hijau-gelap/10 px-4 py-1 rounded-full mb-4 md:mb-6 border border-hijau-gelap/20">
                  <p className="text-hijau-gelap font-serif italic font-bold md:text-lg">{story.date}</p>
                </div>
                
                <h3 className="font-serif text-2xl md:text-3xl text-hijau-gelap mb-4 font-bold tracking-tight uppercase leading-snug">{story.title}</h3>
                
                <p className="text-hijau-zaitun text-sm md:text-base lg:text-lg leading-relaxed font-sans opacity-95 text-justify md:text-left">
                  {story.description}
                </p>

                {/* Decorative Element */}
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-1/4 translate-y-1/4">
                  <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-hijau-gelap">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 text-center"
          >
            <div className="max-w-2xl mx-auto px-6 py-8 md:p-10 bg-hijau-gelap/5 rounded-3xl border border-hijau-zaitun/20 italic relative">
              {/* Quote marks */}
              <div className="absolute top-2 left-4 text-4xl font-serif text-hijau-gelap/20">"</div>
              <div className="absolute bottom-[-1rem] right-4 text-4xl font-serif text-hijau-gelap/20">"</div>
              
              <p className="text-hijau-gelap text-base md:text-xl font-serif leading-relaxed z-10 relative">
                Dengan doa dan restu kedua keluarga, Vinka dan Irfan akan mengikat janji suci pada 28 Juni 2026. Sebuah perjalanan yang dimulai dari diam, kini berlabuh dalam satu tujuan.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
