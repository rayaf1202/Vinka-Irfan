import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Copy, CheckCircle, ExternalLink, AlertCircle, Trash2 } from "lucide-react";

export function Admin() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [baseUrl, setBaseUrl] = useState("https://vinka-irfan.vercel.app/");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; baseUrl?: string }>({});

  // Format the name for the URL (replace spaces with +)
  const formattedName = name.trim().replace(/\s+/g, "+");
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const uniqueUrl = name.trim() ? `${cleanBaseUrl}?to=${formattedName}` : cleanBaseUrl;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);

    const newErrors = { ...errors };

    if (!val.trim()) {
      delete newErrors.phone;
    } else {
      // Check for invalid characters (letters, symbols other than +)
      if (/[^\+0-9]/.test(val.replace(/\s/g, ""))) {
        newErrors.phone = "Hanya angka dan awalan '+' yang diperbolehkan.";
      } else {
        const numericLength = val.replace(/\D/g, "").length;
        if (numericLength > 15) {
          newErrors.phone = `Maksimal 15 digit (saat ini ${numericLength} digit).`;
        } else if (numericLength > 0 && numericLength < 10) {
          newErrors.phone = `Minimal 10 digit (saat ini ${numericLength} digit).`;
        } else {
          delete newErrors.phone;
        }
      }
    }
    setErrors(newErrors);
  };

  const validate = () => {
    const newErrors: { name?: string; phone?: string; baseUrl?: string } = {};
    let isValid = true;

    if (!baseUrl.trim() || !baseUrl.startsWith("http")) {
      newErrors.baseUrl = "Base URL harus valid (diawali dengan http:// atau https://)";
      isValid = false;
    }

    if (!name.trim()) {
      newErrors.name = "Nama tamu tidak boleh kosong.";
      isValid = false;
    }

    if (phone.trim()) {
      // Allow only numbers and optional leading +, length between 10 to 15
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (!phoneRegex.test(phone.trim().replace(/\s/g, ""))) {
        newErrors.phone = "Format nomor telepon tidak valid. (Cth: 081234567890 atau 6281234567890)";
        isValid = false;
      }
    }

    if (newErrors.name || newErrors.phone || newErrors.baseUrl) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
    }
    return isValid;
  };

  const getWhatsappMessage = () => {
    return `${uniqueUrl}

Kepada Yth.
Bapak/Ibu/Saudara/i


Assalamualaikum Warahmatullahi Wabarakaatuh
Dengan memohon rahmat dan ridho Allah SWT, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami :

👰🏻‍♀️Vinka Intan Citradewi
dengan
🤵🏻Irfan Maulana

Info lengkap dari acara bisa kunjungi link di Dibawah ini.
Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.
${name.trim() || "[NAMA TAMU]"}

Atas kehadiran dan doa restunya kami ucapkan terima kasih.

Hormat kami,
Vinka & Irfan`;
  };

  const handleCopy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(getWhatsappMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleWhatsappClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) {
      e.preventDefault();
      return;
    }
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setBaseUrl("https://vinka-irfan.vercel.app/");
    setErrors({});
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
          <a href="/" className="flex items-center gap-2 bg-wedding-yellow/20 hover:bg-wedding-yellow/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
            <ExternalLink size={16} />
            Lihat Undangan
          </a>
        </div>

        <div className="p-8 pb-12 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="baseUrl" className="block text-sm font-semibold text-wedding-green mb-1">
                  Base URL Undangan <span className="opacity-70 font-normal">(Cth: https://vinka-irfan.vercel.app/)</span>
                </label>
                <input
                  type="url"
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => {
                    setBaseUrl(e.target.value);
                    if (errors.baseUrl) setErrors({...errors, baseUrl: undefined});
                  }}
                  placeholder="https://domain-anda.com/"
                  className="w-full px-4 py-3 border border-wedding-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-green/50 bg-wedding-yellow/10 transition-shadow"
                />
                {errors.baseUrl && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1.5 font-medium">
                    <AlertCircle size={14} />
                    {errors.baseUrl}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-wedding-green mb-1">
                  Nama Tamu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({...errors, name: undefined});
                  }}
                  placeholder="Contoh: Budi Santoso"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-wedding-yellow/10 transition-shadow ${
                    errors.name 
                      ? "border-red-400 focus:ring-red-400/50" 
                      : "border-wedding-green/30 focus:ring-wedding-green/50"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1.5 font-medium">
                    <AlertCircle size={14} />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-wedding-green mb-1">
                  Nomor Telepon <span className="opacity-70 font-normal">(Opsional, untuk link langsung)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Contoh: 6281234567890"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-wedding-yellow/10 transition-shadow ${
                    errors.phone 
                      ? "border-red-400 focus:ring-red-400/50" 
                      : "border-wedding-green/30 focus:ring-wedding-green/50"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1.5 font-medium">
                    <AlertCircle size={14} />
                    {errors.phone}
                  </p>
                )}
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
                onClick={handleWhatsappClick}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#20b858] transition-colors shadow-sm"
              >
                <MessageSquare size={18} />
                Kirim via WhatsApp
              </a>

              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 bg-transparent text-red-500 border border-red-200 py-3 px-6 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} />
                Hapus Form
              </button>
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
