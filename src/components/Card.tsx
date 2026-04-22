import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "bg-white/80 rounded-[3rem] p-8 md:p-12 shadow-2xl relative border-2 border-hijau-zaitun/10 backdrop-blur-sm mx-auto w-full",
        className
      )}
    >
      {/* Decorative inner border common in wedding invitations */}
      <div className="absolute inset-2 md:inset-4 border border-hijau-zaitun/5 rounded-[2.5rem] pointer-events-none"></div>
      
      {/* Corner Ornaments placeholder */}
      <div className="absolute top-6 left-6 opacity-20">
         <svg width="30" height="30" viewBox="0 0 100 100" className="fill-hijau-zaitun"><path d="M0 0 L100 0 L100 20 Q50 20 20 50 L20 100 L0 100 Z" /></svg>
      </div>
      <div className="absolute top-6 right-6 opacity-20 transform rotate-90">
         <svg width="30" height="30" viewBox="0 0 100 100" className="fill-hijau-zaitun"><path d="M0 0 L100 0 L100 20 Q50 20 20 50 L20 100 L0 100 Z" /></svg>
      </div>
      <div className="absolute bottom-6 left-6 opacity-20 transform -rotate-90">
         <svg width="30" height="30" viewBox="0 0 100 100" className="fill-hijau-zaitun"><path d="M0 0 L100 0 L100 20 Q50 20 20 50 L20 100 L0 100 Z" /></svg>
      </div>
      <div className="absolute bottom-6 right-6 opacity-20 transform rotate-180">
         <svg width="30" height="30" viewBox="0 0 100 100" className="fill-hijau-zaitun"><path d="M0 0 L100 0 L100 20 Q50 20 20 50 L20 100 L0 100 Z" /></svg>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
