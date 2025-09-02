// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full mt-12 py-6 text-center text-gray-400 text-sm border-t border-gray-800 bg-gradient-to-t from-gray-900 via-black to-black rounded-t-2xl shadow-inner">
      <span>
        Made with <span className="text-pink-400">❤️</span> for Geography
        Students | Data from{" "}
        <a
          href="https://earthquake.usgs.gov/"
          className="underline hover:text-blue-400 transition"
        >
          USGS
        </a>
      </span>
    </footer>
  );
}
