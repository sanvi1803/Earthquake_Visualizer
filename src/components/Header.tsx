// src/components/Header.tsx
import { Globe } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-gray-100 via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-black shadow-lg py-6 px-4 flex flex-col items-center rounded-bl-md rounded-br-md relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
      {/* Subtle background overlay for light mode */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200/30 via-gray-100/30 to-gray-50/30 dark:hidden animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center gap-2">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white dark:drop-shadow-lg tracking-tight">
          Earthquake Visualizer{" "}
          <Globe className="size-10 inline-block animate-spin text-blue-600 dark:text-blue-400" />
        </h1>
        <p className="text-lg text-gray-600 dark:text-blue-200 mt-2">
          Explore recent global earthquake activity interactively.
        </p>
      </div>

      {/* Theme toggle positioned absolutely */}
      <div className="absolute top-6 right-8 z-20">
        <ThemeToggleButton />
      </div>

      {/* Decorative elements for light mode */}
      <div className="absolute top-0 left-0 w-full h-full dark:hidden">
        <div className="absolute top-4 left-4 w-2 h-2 bg-gray-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-8 right-8 w-3 h-3 bg-gray-400 rounded-full animate-pulse delay-300 opacity-60"></div>
        <div className="absolute bottom-4 left-8 w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-700 opacity-60"></div>
      </div>
    </header>
  );
}
