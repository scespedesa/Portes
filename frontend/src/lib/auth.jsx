import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const KEY = "portes-auth-user-v1";

const ACCOUNTS = [
  { email: "admin@portespro.fr", password: "admin123", user: { email: "admin@portespro.fr", nom: "Admin PortesPro", role: "admin" } },
  { email: "tech@portespro.fr", password: "tech123", user: { email: "tech@portespro.fr", nom: "Antoine Roux", role: "technicien" } },
];

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = useCallback((email, password) => {
    const acc = ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password,
    );
    if (!acc) return { ok: false, error: "Email ou mot de passe incorrect." };
    setUser(acc.user);
    window.localStorage.setItem(KEY, JSON.stringify(acc.user));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(KEY);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return v;
}