"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user?: User | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("activity_token");
    const savedUser = localStorage.getItem("activity_user");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }

    setIsLoading(false);
  }, []);

  const login = (nextToken: string, nextUser?: User | null) => {
    localStorage.setItem("activity_token", nextToken);
    document.cookie = `activity_token=${nextToken}; path=/; max-age=604800; samesite=strict`;
    setToken(nextToken);

    if (nextUser) {
      localStorage.setItem("activity_user", JSON.stringify(nextUser));
      setUser(nextUser);
    }
  };

  const logout = () => {
    localStorage.removeItem("activity_token");
    localStorage.removeItem("activity_user");
    document.cookie = "activity_token=; path=/; max-age=0; samesite=strict";
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      logout,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
}