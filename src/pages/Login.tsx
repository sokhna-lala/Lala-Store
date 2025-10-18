import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [error, setError] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error on change
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<LoginFormData> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const ok = await login(formData.email, formData.password);
    if (ok) {
      nav("/");
    } else {
      setError("Email ou mot de passe incorrect.");
    }
  }

  return (
    <Layout>
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Connexion</h1>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-sm">Email</label>
            <input
              name="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-2 py-1"
            />
            {errors.email && (
              <div className="text-red-600 text-sm">{errors.email}</div>
            )}
          </div>
          <div>
            <label className="block text-sm">Mot de passe</label>
            <input
              name="password"
              placeholder="Mot de passe"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-2 py-1"
            />
            {errors.password && (
              <div className="text-red-600 text-sm">{errors.password}</div>
            )}
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#8B5E3C] text-white rounded">
              Se connecter
            </button>
            <Link to="/signup" className="px-4 py-2 border rounded">
              Créer un compte
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
