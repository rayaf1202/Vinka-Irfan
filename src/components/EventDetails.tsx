import { Section } from "./Section";
import { Card } from "./Card";
import { useState, useEffect } from "react";

export function EventDetails() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-06-28T07:00:00+07:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section className="bg-bg-kuning text-center pt-0">
      <div className="max-w-4xl mx-auto relative px-2">
        <Card>
          <p className="mb-4 text-hijau-zaitun font-sans text-sm md:text-base px-2 uppercase tracking-widest font-bold">Save The Date</p>
          
          <div className="text-3xl md:text-6xl font-serif font-bold mb-8 text-hijau-gelap leading-tight italic">
            Minggu, 28 Juni 2026
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 md:gap-8 mb-12 max-w-sm md:max-w-2xl mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-28 md:h-28 bg-white border-2 border-hijau-zaitun/10 text-hijau-gelap rounded-3xl flex items-center justify-center mb-2 shadow-xl">
                  <span className="font-serif text-2xl md:text-5xl font-bold">{value.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-[10px] md:text-sm uppercase tracking-[0.2em] text-hijau-zaitun font-bold">
                  {unit === 'days' ? 'Hari' : unit === 'hours' ? 'Jam' : unit === 'minutes' ? 'Menit' : 'Detik'}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-hijau-zaitun/10 mb-12"></div>

          {/* Event Times */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-16 mb-12">
            <div className="text-center md:text-right flex-1">
              <h3 className="font-serif text-3xl text-hijau-gelap font-bold mb-2 italic">Akad Nikah</h3>
              <p className="text-hijau-zaitun font-medium text-xl">07.00 WIB - selesai</p>
            </div>
            <div className="hidden md:block w-px h-24 bg-hijau-zaitun/20 self-center"></div>
            <div className="text-center md:text-left flex-1">
              <h3 className="font-serif text-3xl text-hijau-gelap font-bold mb-2 italic">Resepsi</h3>
              <p className="text-hijau-zaitun font-medium text-xl">11.00 - 13.00 WIB</p>
            </div>
          </div>

          <div className="mb-12 px-2">
            <div className="inline-block p-4 mb-4 bg-hijau-gelap/5 rounded-full">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-hijau-gelap mx-auto">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
               </svg>
            </div>
            <h4 className="font-serif text-2xl md:text-3xl font-bold text-hijau-gelap mb-3 leading-tight tracking-tight">Masjid Dian Al-Mahri<br className="md:hidden" /> (Masjid Kubah Emas)</h4>
            <p className="text-hijau-zaitun text-base md:text-xl opacity-80 font-medium">Jl. Meruyung Raya, Limo, Kota Depok</p>
          </div>

          <p className="text-hijau-zaitun text-sm md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed italic border-t border-hijau-zaitun/10 pt-10 px-4">
            "Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/I berkenan hadir untuk memberikan doa restu kepada putra-putri kami"
          </p>
        </Card>

        {/* Bottom floral ornament */}
        <div className="absolute -bottom-10 left-0 right-0 flex justify-between opacity-80 pointer-events-none">
          <svg width="100" height="100" viewBox="0 0 100 100" className="fill-hijau-zaitun" style={{ transform: 'scaleY(-1)' }}>
            <path d="M0 50 Q50 0 100 50 Q50 100 0 50 Z" />
            <circle cx="50" cy="50" r="20" fill="#fdf6aa" />
            <circle cx="50" cy="50" r="10" fill="#e85d88" />
          </svg>
          <svg width="100" height="100" viewBox="0 0 100 100" className="fill-hijau-zaitun" style={{ transform: 'scale(-1, -1)' }}>
            <path d="M0 50 Q50 0 100 50 Q50 100 0 50 Z" />
            <circle cx="50" cy="50" r="20" fill="#fdf6aa" />
            <circle cx="50" cy="50" r="10" fill="#e85d88" />
          </svg>
        </div>
      </div>
    </Section>
  );
}

