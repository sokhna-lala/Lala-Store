import { useContext } from "react";
import AuthContext from "./AuthContext";

// reuse the runtime shape from the context file
type AuthContextValue = {
  user: { name: string; email: string } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export function useAuth() {
  const ctx = useContext(AuthContext as React.Context<AuthContextValue>);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx as AuthContextValue;
}

export default useAuth;
