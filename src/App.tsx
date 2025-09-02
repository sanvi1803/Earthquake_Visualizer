// src/App.tsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEarthquakes } from "./slices/earthquakeSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeList from "./components/EarthquakeList";
import "./App.css";
import { GoToTopButton } from "./components/GoToTopButton";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEarthquakes() as any);
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-500">
      <Header />
      <main className="max-w-7xl mx-auto w-full px-4 py-8 fade-in-up">
        <div className="rounded-3xl bg-white/80 dark:bg-black/60 shadow-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
          <EarthquakeMap />
        </div>
        <h2 className="mt-12 mb-6 text-3xl font-bold text-gray-800 dark:text-gray-200 text-center fade-in-up">
          Recent Earthquakes
        </h2>
        <EarthquakeList />
      </main>
      <Footer />
      <GoToTopButton />
    </div>
  );
}
