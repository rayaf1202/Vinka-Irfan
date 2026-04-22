import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Flower2, Pause, Play } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
  hasError?: boolean;
}

export function MusicPlayer({ isPlaying, togglePlay, hasError }: MusicPlayerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-center gap-2"
    >
      {hasError && (
        <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded shadow-lg animate-bounce font-bold">
          Audio Error!
        </span>
      )}
      <button 
        onClick={togglePlay}
        className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-hijau-gelap text-bg-kuning rounded-full shadow-[0_0_15px_rgba(91,105,43,0.4)] hover:scale-110 active:scale-95 transition-transform border-2 border-bg-kuning group"
      >
        {/* Pulsing ring when playing */}
        {isPlaying && (
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-hijau-zaitun rounded-full -z-10"
          />
        )}

        {/* Spinning flower background when playing */}
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity"
        >
          <Flower2 size={36} className="md:hidden" />
          <Flower2 size={48} className="hidden md:block" />
        </motion.div>

        <div className="relative z-10">
          {isPlaying ? (
            <Pause size={24} className="md:w-7 md:h-7" />
          ) : (
            <Play size={24} className="ml-1 md:w-7 md:h-7" />
          )}
        </div>
        
        {/* Visualizer Floating Labels */}
        {isPlaying && (
          <div className="absolute -top-10 right-0 flex gap-1.5 items-end h-8 px-1">
            <div className="w-1.5 bg-pink-bunga rounded-t-full h-full visualizer-bar shadow-sm"></div>
            <div className="w-1.5 bg-bg-kuning rounded-t-full h-full visualizer-bar shadow-sm"></div>
            <div className="w-1.5 bg-pink-bunga rounded-t-full h-full visualizer-bar shadow-sm"></div>
          </div>
        )}
      </button>
    </motion.div>
  );
}

