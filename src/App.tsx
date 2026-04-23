import { useState, useRef, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { cn } from "./lib/utils";
import { EnvelopeOverlay } from "./components/EnvelopeOverlay";
import { Hero } from "./components/Hero";
import { Quote } from "./components/Quote";
import { Couple } from "./components/Couple";
import { LoveStory } from "./components/LoveStory";
import { Gallery } from "./components/Gallery";
import { EventDetails } from "./components/EventDetails";
import { LocationMap } from "./components/LocationMap";
import { DigitalEnvelope } from "./components/DigitalEnvelope";
import { Guestbook } from "./components/Guestbook";
import { Footer } from "./components/Footer";
import { MusicPlayer } from "./components/MusicPlayer";
import { Admin } from "./pages/Admin";
import { AdminLogin } from "./components/AdminLogin";

function Invitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const guestName = searchParams.get('to')?.replace(/\+/g, ' ');

  useEffect(() => {
    // Initialize audio with The Beatles - In My Life from Cloudinary using specific Public ID
    const audioUrl = "https://res.cloudinary.com/dwaizjrar/video/upload/In_My_Life_ipynxu.mp3";
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0; // Start at 0 for fade in
    
    // Add error handling to see why it might fail
    audioRef.current.onerror = (e) => {
      console.error("Audio failed to load from Cloudinary Public ID:", e);
      // Fallback to the archive.org source if Cloudinary fails
      if (audioRef.current && audioRef.current.src !== "https://archive.org/download/the-beatles-in-my-life/In%20My%20Life.mp3") {
         console.log("Attempting fallback audio...");
         audioRef.current.src = "https://archive.org/download/the-beatles-in-my-life/In%20My%20Life.mp3";
         audioRef.current.load();
      } else {
         setAudioError(true);
      }
    };
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleOpen = () => {
    setIsOpened(true);
    document.body.style.overflow = "auto"; // Unlock scroll
    
    // Play audio and fade in
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setAudioError(false); // Reset error if it plays
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 0.5) {
            vol += 0.05;
            if (audioRef.current) audioRef.current.volume = vol;
          } else {
            clearInterval(fadeInterval);
          }
        }, 200);
      }).catch(err => console.log("Audio autoplay blocked:", err));
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Lock scroll initially
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    }
  }, [isOpened]);

  return (
    <main 
      className={cn(
        "relative min-h-screen font-sans text-wedding-green selection:bg-wedding-gold selection:text-white transition-colors duration-1000",
        isOpened ? "bg-transparent" : "bg-bg-kuning"
      )}
    >
      {isOpened && (
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(253, 246, 170, 0.7), rgba(253, 246, 170, 0.7)), url('https://res.cloudinary.com/dwaizjrar/image/upload/q_auto,f_auto,c_fill,w_800/bg3.jpg')`
          }}
        />
      )}
      
      <EnvelopeOverlay isOpen={isOpened} onOpen={handleOpen} guestName={guestName} />
      
      {isOpened && (
        <>
          <Hero />
          <Quote />
          <Couple />
          <LoveStory />
          <Gallery />
          <EventDetails />
          <LocationMap />
          <DigitalEnvelope />
          <Guestbook />
          <Footer />
          <MusicPlayer isPlaying={isPlaying} togglePlay={togglePlay} hasError={audioError} />
        </>
      )}
    </main>
  );
}

export default function App() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAdminPath = searchParams.has('admin');

  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return localStorage.getItem("isAdminAuth") === "true";
  });

  const [showWarning, setShowWarning] = useState(false);

  const handleLogin = () => {
    setIsAdminAuth(true);
    localStorage.setItem("isAdminAuth", "true");
    localStorage.setItem("adminAuthTime", Date.now().toString());
  };

  const handleLogout = () => {
    setIsAdminAuth(false);
    setShowWarning(false);
    localStorage.removeItem("isAdminAuth");
    localStorage.removeItem("adminAuthTime");
  };

  useEffect(() => {
    if (isAdminAuth) {
      const checkAuth = () => {
        const authTime = localStorage.getItem("adminAuthTime");
        if (authTime) {
          const elapsed = Date.now() - parseInt(authTime);
          
          if (elapsed > 14 * 60 * 1000 && elapsed < 15 * 60 * 1000) {
            setShowWarning(true);
          } else {
            setShowWarning(false);
          }

          if (elapsed > 15 * 60 * 1000) { // 15 menit
            setIsAdminAuth(false);
            setShowWarning(false);
            localStorage.removeItem("isAdminAuth");
            localStorage.removeItem("adminAuthTime");
          }
        }
      };

      const interval = setInterval(checkAuth, 60000); // Cek per menit
      return () => clearInterval(interval);
    }
  }, [isAdminAuth]);

  return (
    <>
      <Routes>
        <Route path="/" element={
          isAdminPath ? 
            (isAdminAuth ? <Admin onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />) 
            : <Invitation />
        } />
        <Route path="*" element={<Invitation />} />
      </Routes>

      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
            <h3 className="text-lg font-bold text-wedding-green mb-4">Peringatan Sesi</h3>
            <p className="text-sm text-gray-600 mb-6 font-medium">Anda akan keluar otomatis karena tidak aktif. Klik 'OK' untuk tetap masuk.</p>
            <button 
              onClick={() => {
                localStorage.setItem("adminAuthTime", Date.now().toString());
                setShowWarning(false);
              }}
              className="w-full bg-wedding-green text-wedding-yellow py-2 rounded-lg font-bold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
