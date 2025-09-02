import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = (e: React.MouseEvent) => {
    // Get the button's position and size
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();

    // Calculate center of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Set CSS variables for the circle center
    document.documentElement.style.setProperty("--circle-x", `${centerX}px`);
    document.documentElement.style.setProperty("--circle-y", `${centerY}px`);

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

      // Create a localized transition element
      const transitionEl = document.createElement("div");
      transitionEl.className = "local-theme-transition";
      transitionEl.style.cssText = `
        position: fixed;
        top: ${centerY}px;
        left: ${centerX}px;
        width: 0;
        height: 0;
        background: ${transitionColor};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(transitionEl);

      // Animate the circle expansion
      requestAnimationFrame(() => {
        transitionEl.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        transitionEl.style.width = "200px";
        transitionEl.style.height = "200px";
      });

      // Remove the element after animation
      setTimeout(() => {
        if (document.body.contains(transitionEl)) {
          document.body.removeChild(transitionEl);
        }
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
