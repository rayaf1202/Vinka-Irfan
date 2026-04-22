import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Copy, CheckCircle, ExternalLink } from "lucide-react";

export function Admin() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);

  const baseUrl = "https://vinka-irfan.vercel.app/";
  
  // Format the name for the URL (replace spaces with +)
  const formattedName = name.trim().replace(/\s+/g, "+");
  const uniqueUrl = name.trim() ? `${baseUrl}?to=${formattedName}` : baseUrl;

  const getWhatsappMessage = () => {
    return `${uniqueUrl}

Kepada Yth.
Bapak/Ibu/Saudara/i
${name.trim() || "[NAMA TAMU]"}

Assalamualaikum Warahmatullahi Wabarakaatuh
Dengan memohon rahmat dan ridho Allah SWT, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami :

👰🏻‍♀️Vinka Intan Citradewi
dengan
🤵🏻Irfan Maulana

Info lengkap dari acara bisa kunjungi link di atas.
Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.
Atas kehadiran dan doa restunya kami ucapkan terima kasih.

Hormat kami,
Vinka & Irfan`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getWhatsappMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getWhatsappLink = () => {
    const text = encodeURIComponent(getWhatsappMessage());
    // Provide a phone number if given, otherwise just open whatsapp
    const phoneParam = phone ? `phone=${phone.replace(/\D/g, "")}&` : "";
    return `https://api.whatsapp.com/send?${phoneParam}text=${text}`;
  };

  return (
    <div className="min-h-screen bg-wedding-yellow/30 p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-wedding-green/20">
        <div className="bg-wedding-green text-wedding-yellow p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif font-bold">Admin Generator Undangan</h1>
            <p className="opacity-90 text-sm mt-1">Buat URL unik dan pesan WhatsApp untuk tamu Anda.</p>
          </div>
          <Link to="/" className="flex items-center gap-2 bg-wedding-yellow/20 hover:bg-wedding-yellow/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            <ExternalLink size={16} />
            Lihat Undangan
          </Link>
        </div>

        <div className="p-8 pb-12 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-wedding-green mb-1">
                  Nama Tamu
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-4 py-3 border border-wedding-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-green/50 bg-wedding-yellow/10 transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-wedding-green mb-1">
                  Nomor Telepon <span className="opacity-70 font-normal">(Opsional, untuk link langsung)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 6281234567890"
                  className="w-full px-4 py-3 border border-wedding-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-green/50 bg-wedding-yellow/10 transition-shadow"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-wedding-green/10 flex flex-col gap-3">
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 bg-wedding-green text-wedding-yellow py-3 px-6 rounded-lg font-medium hover:bg-wedding-green/90 transition-colors shadow-sm"
              >
                {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                {copied ? "Berhasil Disalin!" : "Salin Pesan"}
              </button>
              
              <a
                href={getWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#20b858] transition-colors shadow-sm"
              >
                <MessageSquare size={18} />
                Kirim via WhatsApp
              </a>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-wedding-green">
                Pratinjau Pesan:
              </label>
              {phone && (
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-wedding-green/20 text-sm">
                  <span className="font-medium text-wedding-green">{phone}</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(phone)}
                    className="text-wedding-green/70 hover:text-wedding-green"
                    title="Copy Phone Number"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              )}
            </div>
            <div className="bg-[#e5ddd5] p-4 rounded-xl shadow-inner relative overflow-hidden h-[400px] overflow-y-auto">
              {/* WhatsApp background pattern */}
              <div 
                className="absolute inset-0 opacity-10" 
                style={{
                  backgroundImage: "url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')",
                  backgroundSize: "cover"
                }}
              />
              
              <div className="relative z-10 bg-white p-4 rounded-lg rounded-tl-none shadow text-[14.5px] leading-relaxed text-gray-800 whitespace-pre-wrap font-sans max-w-[90%]">
                {getWhatsappMessage()}
                <p className="text-right text-[10px] text-gray-400 mt-2">10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
