import { useState, useRef, useEffect } from "react";
import { Copy, Check, MessageSquare, Link as LinkIcon, RefreshCw } from "lucide-react";

interface GuestData {
  name: string;
  phone?: string;
  link: string;
  message: string;
}

export function InvitationGenerator() {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<GuestData[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  const domain = window.location.origin;

  const processData = () => {
    // Split by lines
    const lines = inputText.split("\n").filter(line => line.trim() !== "");
    const processed: GuestData[] = lines.map(line => {
      // Split by comma, tab, or common delimiters to try and find name and phone
      let name = line.trim();
      let phone = "";

      if (line.includes(",") || line.includes("\t") || line.includes(";")) {
        const parts = line.split(/[,\t;]/);
        name = parts[0].trim();
        phone = parts[1]?.trim() || "";
      }

      const encodedName = name.replace(/\s+/g, "+");
      const link = `${domain}/?to=${encodedName}`;
      const message = `Kepada Yth.
Bapak/Ibu/Saudara/i
${name}

Assalamualaikum Warahmatullahi Wabarakaatuh
Dengan memohon rahmat dan ridho Allah SWT, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami :

👰🏻‍♀️Vinka Intan Citradewi 

dengan

🤵🏻Irfan Maulana


Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi :
${link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Atas kehadiran dan doa restunya kami ucapkan terima kasih.


Hormat kami,
Vinka & Irfan`;

      return { name, phone, link, message };
    });

    setResults(processed);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl mt-4 md:mt-10 border border-hijau-zaitun/20 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="p-2 bg-hijau-gelap text-white rounded-lg shrink-0">
          <RefreshCw size={24} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-hijau-gelap leading-none">WhatsApp Invitation Generator</h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Generate personalized messages & links for your guests</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Input Guest List</label>
          <p className="text-xs text-gray-500 mb-2">Format: Name, Phone (or just Name). Enter one guest per line.</p>
          <textarea
            className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-hijau-zaitun focus:border-transparent transition-all outline-none text-sm placeholder:text-gray-300 shadow-inner bg-gray-50/50"
            placeholder={"John Doe, 08123456789\nJane Smith\n..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <button
          onClick={processData}
          className="w-full bg-hijau-gelap text-white py-3 rounded-xl font-bold hover:bg-hijau-zaitun transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Generate Messages
        </button>

        {results.length > 0 && (
          <div ref={resultsRef} className="mt-10 space-y-6 scroll-mt-6">
            <div className="flex items-center justify-between border-b pb-2 border-gray-100">
              <h3 className="font-bold text-hijau-gelap">Results ({results.length} Guests)</h3>
              <button 
                onClick={() => setResults([])}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                Clear Results
              </button>
            </div>
            
            <div className="space-y-4">
              {results.map((guest, index) => (
                <div key={index} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-4 relative group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-hijau-zaitun uppercase tracking-widest">Guest</span>
                      <h4 className="font-bold text-gray-900 text-lg">{guest.name}</h4>
                      {guest.phone && <p className="text-xs text-gray-500">{guest.phone}</p>}
                    </div>
                    
                    <div className="flex items-center gap-2">
                       <button
                         onClick={() => copyToClipboard(guest.link, index + 1000)}
                         className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-bold text-gray-600 hover:border-hijau-zaitun hover:text-hijau-zaitun transition-all"
                       >
                         {copiedIndex === index + 1000 ? <Check size={14} /> : <LinkIcon size={14} />}
                         Copy Link
                       </button>
                    </div>
                  </div>

                  <div className="relative">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 bg-white p-4 rounded-xl border border-gray-100 shadow-sm leading-relaxed">
                      {guest.message}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(guest.message, index)}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-hijau-gelap hover:text-white transition-all shadow-sm"
                      title="Copy Message"
                    >
                      {copiedIndex === index ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>

                  {guest.phone && (
                    <a 
                      href={`https://wa.me/${guest.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(guest.message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-[#25D366] text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all"
                    >
                      <MessageSquare size={16} />
                      Send to WhatsApp
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
