import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await signup(name, email, password);
    if (ok) nav("/");
    else setError("Un compte existe déjà pour cet email.");
  }

  return (
    <Layout>
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Créer un compte</h1>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm">Nom</label>
            <input
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">Mot de passe</label>
            <input
              placeholder="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-2 py-1"
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#8B5E3C] text-white rounded">
              Créer
            </button>
            <Link to="/login" className="px-4 py-2 border rounded">
              Se connecter
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
