import React, { createContext, useContext, useEffect, useState } from "react";

type User = { name: string; email: string; role: string } | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_USER_KEY = "authUser";
const USERS_KEY = "users";

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw
      ? (JSON.parse(raw) as Array<{
          name: string;
          email: string;
          password: string;
          role?: string;
        }>)
      : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  async function login(email: string, password: string) {
    // simple client-side check against stored users
    const users = readUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const u = {
        name: found.name,
        email: found.email,
        role: found.role || "user",
      };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(u));
      setUser(u);
      return true;
    }
    return false;
  }

  async function signup(name: string, email: string, password: string) {
    const users = readUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) return false;
    const role = email.includes("admin") ? "admin" : "user";
    users.push({ name, email, password, role });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const u = { name, email, role };
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(u));
    setUser(u);
    return true;
  }

  function logout() {
    localStorage.removeItem(AUTH_USER_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export default AuthContext;
