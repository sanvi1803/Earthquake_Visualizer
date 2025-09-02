import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEarthquakes } from "./slices/earthquakeSlice";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeList from "./components/EarthquakeList";
import ThemeToggleButton from "@components/ui/theme-toggle-button"

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEarthquakes() as any);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black dark:bg-black text-white dark:text-white transition-colors duration-300">
      <header className="flex flex-col md:flex-row items-center justify-between py-6 px-4 max-w-6xl mx-auto">
        <div>
          <h1 className="text-4xl font-extrabold mb-1 tracking-tight text-white dark:text-white">🌍 Earthquake Visualizer</h1>
          <p className="text-lg text-gray-300 dark:text-gray-400">Explore recent global earthquake activity interactively.</p>
        </div>
        <ThemeToggleButton className="mt-4 md:mt-0" />
      </header>
      <main className="max-w-6xl mx-auto px-2">
        <EarthquakeMap />
        <h2 className="mt-10 mb-4 text-2xl font-bold text-gray-200 dark:text-gray-100">Recent Earthquakes</h2>
        <EarthquakeList />
      </main>
      <footer className="mt-12 py-6 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-800 dark:border-gray-700 bg-gradient-to-t from-gray-900 via-black to-black">
        <span>Made with ❤️ for Geography Students | Data from <a href="https://earthquake.usgs.gov/" className="underline hover:text-blue-400">USGS</a></span>
      </footer>
    </div>
  );
}