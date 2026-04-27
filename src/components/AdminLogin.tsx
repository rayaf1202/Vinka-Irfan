import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "vinkairfan" && password === "Karawang&99") {
      onLogin();
    } else {
      setError("Username atau Password salah.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-kuning p-4 pb-20">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-hijau-gelap/20">
        <h2 className="text-2xl font-serif font-bold text-hijau-gelap mb-6 text-center uppercase tracking-widest">Login Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 rounded-lg border border-hijau-gelap/20 focus:outline-none focus:ring-2 focus:ring-hijau-zaitun/50 text-hijau-gelap"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-lg border border-hijau-gelap/20 focus:outline-none focus:ring-2 focus:ring-hijau-zaitun/50 text-hijau-gelap"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-hijau-gelap text-bg-kuning p-4 rounded-lg font-bold hover:bg-hijau-zaitun transition-colors active:scale-95 duration-100 uppercase tracking-widest mt-6"
            style={{ minHeight: '50px' }}
          >
            Login
          </button>
        </form>
        <div className="mt-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-hijau-zaitun/70 hover:text-hijau-gelap transition-colors">
                <ArrowLeft size={16} /> Kembali ke Undangan
            </Link>
        </div>
      </div>
    </div>
  );
}
