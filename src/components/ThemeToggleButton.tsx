import { useTheme } from "@/context/ThemeContext";
import { SunIcon, MoonIcon } from "lucide-react";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = (e: React.MouseEvent) => {
    if (document.startViewTransition) {
      const x = e.clientX;
      const y = e.clientY;
      document.startViewTransition(() => {
        toggleTheme(); // Use toggleTheme instead of setTheme
      });
      document.documentElement.style.setProperty("--circle-x", `${x}px`);
      document.documentElement.style.setProperty("--circle-y", `${y}px`);
    } else {
      toggleTheme(); // Use toggleTheme instead of setTheme
    }
  };

  return (
    <button
      onClick={handleThemeToggle}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 transition"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="w-5 h-5 text-yellow-400" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-800" />
      )}
    </button>
  );
}
