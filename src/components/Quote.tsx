import { motion } from "framer-motion";
import { Section } from "./Section";

export function Quote() {
  return (
    <Section className="bg-bg-kuning text-center pb-0">
      <div className="max-w-3xl mx-auto relative px-4">
        {/* Top floral ornament */}
        <div className="absolute -top-16 left-0 right-0 flex justify-between opacity-30 pointer-events-none px-4 md:px-0">
          <motion.div
            initial={{ rotate: -15, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <svg width="80" height="80" viewBox="0 0 100 100" className="fill-hijau-zaitun transform -rotate-12">
              <path d="M0 50 Q50 0 100 50 Q50 100 0 50 Z" />
              <circle cx="50" cy="50" r="20" fill="#fdf6aa" />
              <circle cx="50" cy="50" r="10" fill="#e85d88" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ rotate: 15, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <svg width="80" height="80" viewBox="0 0 100 100" className="fill-hijau-zaitun transform rotate-12 scale-x-[-1]">
              <path d="M0 50 Q50 0 100 50 Q50 100 0 50 Z" />
              <circle cx="50" cy="50" r="20" fill="#fdf6aa" />
              <circle cx="50" cy="50" r="10" fill="#e85d88" />
            </svg>
          </motion.div>
        </div>

        <div className="pt-16 pb-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-xl md:text-2xl text-hijau-gelap mb-6 font-bold tracking-wide"
          >
            Assalamu’alaikum Warahmatullahi Wabarakatuh
          </motion.p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="w-16 h-[2px] bg-hijau-zaitun/20 mx-auto mb-8 origin-center"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-hijau-zaitun text-sm md:text-xl leading-relaxed max-w-2xl mx-auto italic font-medium"
          >
            "Dengan memohon rahmat serta ridho Allah SWT, kami bermaksud menyelenggarakan resepsi pernikahan putra-putri kami yang tercinta:"
          </motion.p>
        </div>
      </div>
    </Section>
  );
}

