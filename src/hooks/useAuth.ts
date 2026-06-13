import { useState, useEffect, useCallback } from 'react';

const AUTH_KEY = 'crm_auth';

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { isAuthenticated: false, email: null };
      }
    }
    return { isAuthenticated: false, email: null };
  });

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  }, [auth]);

  const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
    if (!email.trim()) return { success: false, error: 'Email is required' };
    if (!password.trim()) return { success: false, error: 'Password is required' };
    if (email !== 'admin@crm.com') return { success: false, error: 'Invalid email address' };
    if (password !== 'admin123') return { success: false, error: 'Invalid password' };

    setAuth({ isAuthenticated: true, email });
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setAuth({ isAuthenticated: false, email: null });
  }, []);

  return { isAuthenticated: auth.isAuthenticated, email: auth.email, login, logout };
}
