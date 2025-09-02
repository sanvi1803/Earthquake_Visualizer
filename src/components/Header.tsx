// src/components/Header.tsx
import { Globe } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r dark:from-gray-950 dark:via-gray-900 dark:to-black shadow-lg py-6 px-4 flex flex-col items-center ">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white dark:drop-shadow-lg drop-shadow-md tracking-tight">
          Earthquake Visualizer <Globe className="size-10 inline-block animate-spin" />
        </h1>
        <p className="text-lg text-blue-800 dark:text-blue-200 mt-2">
          Explore recent global earthquake activity interactively.
        </p>
      </div>
      <div className="absolute top-6 right-8">
        <ThemeToggleButton />
      </div>
    </header>
  );
}
