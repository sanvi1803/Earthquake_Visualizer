// src/components/Footer.tsx
export const Footer = () => {
  return (
    <footer className="w-full mt-12 py-8 text-center text-gray-500 dark:text-gray-500 text-sm border-t dark:border-gray-800 d from-gray-900 via-black to-black dark:from-gray-950 dark:via-black dark:to-black rounded-t-3xl shadow-inner relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-purple-900/5 to-pink-900/5 animate-pulse"></div>

      <div className="relative z-10">
        <span className="flex items-center justify-center gap-1">
          Made with love for Geography Students
          <span className="text-pink-400 animate-pulse">❤️</span>
        </span>
        <div className="mt-2">
          Data from{" "}
          <a
            href="https://earthquake.usgs.gov/"
            className="underline hover:text-blue-400 transition-colors duration-300 hover:scale-105 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            USGS
          </a>
        </div>

        {/* Decorative elements */}
        <div className="mt-4 flex justify-center gap-4">
          <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300"></div>
          <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>
    </footer>
  );
};
