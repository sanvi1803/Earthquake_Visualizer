import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = (e: React.MouseEvent) => {
    // Get click position for the circle center
    const x = e.clientX;
    const y = e.clientY;

    // Set CSS variables for the circle position
    document.documentElement.style.setProperty("--circle-x", `${x}px`);
    document.documentElement.style.setProperty("--circle-y", `${y}px`);

    if (document.startViewTransition) {
      // Use View Transitions API for modern browsers
      document.startViewTransition(() => {
        toggleTheme();
      });
    } else {
      // Fallback for browsers without View Transitions API
      const transitionColor = theme === "light" ? "#1f2937" : "#ffffff";
      document.documentElement.style.setProperty(
        "--transition-color",
        transitionColor
      );

      // Create and add the transition element
      const transitionEl = document.createElement("div");
      transitionEl.className = "theme-transition-circle";
      document.body.appendChild(transitionEl);

      // Remove the element after animation
      setTimeout(() => {
        document.body.removeChild(transitionEl);
      }, 800);

      // Toggle theme after a small delay
      setTimeout(() => {
        toggleTheme();
      }, 100);
    }
  };

  return (
    <button
      onClick={handleThemeToggle}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="w-5 h-5 text-yellow-400 rotate-0 scale-100 transition-all duration-300" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-800 rotate-0 scale-100 transition-all duration-300" />
      )}
    </button>
  );
}
