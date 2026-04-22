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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2"
    >
      {hasError && (
        <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded shadow-lg animate-bounce font-bold">
          Audio Error!
        </span>
      )}
      <button 
        onClick={togglePlay}
        className="relative flex items-center justify-center w-12 h-12 bg-hijau-gelap text-bg-kuning rounded-full shadow-lg hover:scale-105 transition-transform border-2 border-bg-kuning"
      >
        {/* Spinning flower background when playing */}
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center opacity-20"
        >
          <Flower2 size={40} />
        </motion.div>

        {isPlaying ? <Pause size={20} className="relative z-10" /> : <Play size={20} className="relative z-10 ml-1" />}
        
        {/* Visualizer */}
        {isPlaying && (
          <div className="absolute -top-8 right-0 flex gap-1 items-end h-6">
            <div className="w-1.5 bg-hijau-gelap rounded-t-sm h-full visualizer-bar"></div>
            <div className="w-1.5 bg-hijau-gelap rounded-t-sm h-full visualizer-bar"></div>
            <div className="w-1.5 bg-hijau-gelap rounded-t-sm h-full visualizer-bar"></div>
          </div>
        )}
      </button>
    </motion.div>
  );
}

