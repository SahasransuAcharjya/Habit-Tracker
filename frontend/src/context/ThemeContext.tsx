"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";
type ThemeColor = "red" | "blue" | "green";

type ThemeContextType = {
  mode: ThemeMode;
  color: ThemeColor;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [color, setColorState] = useState<ThemeColor>("red");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedMode = localStorage.getItem("activity_theme_mode") as ThemeMode | null;
    const savedColor = localStorage.getItem("activity_theme_color") as ThemeColor | null;

    if (savedMode) setModeState(savedMode);
    if (savedColor) setColorState(savedColor);

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply to html element
    const root = document.documentElement;
    
    if (mode === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    if (color !== "red") {
      root.setAttribute("data-color", color);
    } else {
      root.removeAttribute("data-color");
    }

    localStorage.setItem("activity_theme_mode", mode);
    localStorage.setItem("activity_theme_color", color);
  }, [mode, color, mounted]);

  // Prevent hydration mismatch by not rendering until mounted
  // Actually, standard practice is to render children but avoid accessing state in SSR that differs from initial
  
  return (
    <ThemeContext.Provider value={{ mode, color, setMode: setModeState, setColor: setColorState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
