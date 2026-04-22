import { Section } from "./Section";
import { Card } from "./Card";
import { motion } from "framer-motion";
import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function DigitalEnvelope() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const accounts = [
    { id: "mandiri", name: "Mandiri", account: "1570010260074", owner: "Ika Sartikawati" },
    { id: "dana", name: "Dana", account: "083815643299", owner: "Vinka Intan Citradewi" },
  ];

  const giftAddress = "Perumahan Pasadena Pasir Putih blok A1, kelurahan Pasir Putih, Kecamatan Sawangan, Kota Depok.";

  return (
    <Section className="bg-bg-kuning text-center pt-0">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-hijau-gelap mb-4 leading-tight italic">Amplop Digital</h2>
          <p className="text-hijau-zaitun mb-0 font-sans text-sm md:text-lg leading-relaxed opacity-90 italic">
            "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Bapak/Ibu/Saudara/i ingin memberikan tanda kasih, dapat melalui fitur di bawah ini"
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {accounts.map((account) => (
            <motion.div 
              key={account.id}
              whileHover={{ y: -8 }}
              className="bg-white/60 p-8 rounded-[2rem] relative overflow-hidden text-left border-2 border-hijau-zaitun/20 shadow-xl backdrop-blur-sm"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-hijau-gelap/5 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="bg-hijau-gelap text-bg-kuning px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  {account.name}
                </div>
                <div className="text-hijau-gelap/20 italic font-serif text-lg">Wedding Gift</div>
              </div>

              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-hijau-zaitun/60 mb-2 font-bold">Nomor Rekening</p>
                <p className="font-serif text-2xl tracking-[0.1em] text-hijau-gelap font-bold">{account.account}</p>
              </div>

              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-hijau-zaitun/60 mb-1 font-bold">Atas Nama</p>
                <p className="text-lg text-hijau-gelap font-serif font-semibold italic">{account.owner}</p>
              </div>
              
              <button 
                onClick={() => handleCopy(account.account, account.id)}
                className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-hijau-zaitun text-bg-kuning hover:bg-hijau-gelap transition-all shadow-md active:scale-95 font-sans font-bold"
              >
                {copiedId === account.id ? (
                  <>
                    <CheckCircle2 size={20} />
                    <span>Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy size={20} />
                    <span>Salin Nomor</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Gift Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 p-8 rounded-[2rem] relative overflow-hidden text-left border-2 border-hijau-zaitun/20 shadow-xl backdrop-blur-sm"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="bg-hijau-gelap text-bg-kuning px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              Kirim Kado atau Gift
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-hijau-zaitun/60 mb-3 font-bold">Alamat Pengiriman</p>
            <p className="font-sans text-lg text-hijau-gelap leading-relaxed">
              {giftAddress}
            </p>
          </div>

          <button 
            onClick={() => handleCopy(giftAddress, "address")}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-hijau-zaitun text-bg-kuning hover:bg-hijau-gelap transition-all shadow-md active:scale-95 font-sans font-bold"
          >
            {copiedId === "address" ? (
              <>
                <CheckCircle2 size={20} />
                <span>Alamat Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Copy size={20} />
                <span>Salin Alamat</span>
              </>
            )}
          </button>
        </motion.div>
      </div>
    </Section>
  );
}

