import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn("py-12 md:py-20 px-4 md:px-12 relative overflow-hidden", className)}
    >
      {children}
    </motion.section>
  );
}
