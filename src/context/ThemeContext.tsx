import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "light"
  );
  const [transition, setTransition] = useState<null | {
    x: number;
    y: number;
    color: string;
  }>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (e?: React.MouseEvent) => {
    // Get click position for the circle center
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    if (e) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      x = e.clientX;
      y = e.clientY;
    }
    // Set overlay color to the theme we are transitioning TO
    const color = theme === "dark" ? "#fff" : "#18181b"; // adjust for your dark bg
    setTransition({ x, y, color });
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light");
      setTransition(null);
    }, 700); // match animation duration
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {transition && (
        <div
          className="theme-transition-overlay"
          style={
            {
              "--x": `${transition.x}px`,
              "--y": `${transition.y}px`,
              "--transition-bg": transition.color,
            } as React.CSSProperties
          }
        />
      )}
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
