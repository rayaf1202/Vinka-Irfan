import { useState } from "react";
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
    <div className="min-h-screen flex items-center justify-center bg-bg-kuning p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-wedding-green/20">
        <h2 className="text-2xl font-bold text-wedding-green mb-6 text-center">Login Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg border border-wedding-green/20 focus:outline-none focus:ring-2 focus:ring-wedding-green/20"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-wedding-green/20 focus:outline-none focus:ring-2 focus:ring-wedding-green/20"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-wedding-green text-white p-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-wedding-green/70 hover:text-wedding-green transition-colors">
                <ArrowLeft size={16} /> Kembali ke Undangan
            </Link>
        </div>
      </div>
    </div>
  );
}
