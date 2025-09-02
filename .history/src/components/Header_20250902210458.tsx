// src/components/Header.tsx
import ThemeToggleButton from "./ui/theme-toggle-button";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-black shadow-lg py-8 px-4 flex flex-col items-center rounded-b-2xl">
      <div className="flex flex-col items-center gap-2">
        <span className="text-6xl">🌍</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
          Earthquake Visualizer
        </h1>
        <p className="text-lg text-blue-200 mt-2">
          Explore recent global earthquake activity interactively.
        </p>
      </div>
      <div className="absolute top-6 right-8">
        <ThemeToggleButton />
      </div>
    </header>
  );
}
