// src/App.tsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeList from "./components/EarthquakeList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEarthquakes } from "./slices/earthquakeSlice";
import "./App.css";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEarthquakes() as any);
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-black text-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-2 py-8">
        <div className="rounded-2xl dark:bg-black/60 shadow-2xl p-4">
          <EarthquakeMap />
        </div>
        <h2 className="mt-10 mb-4 text-2xl font-bold dark:text-gray-200 text-gray-700">
          Recent Earthquakes
        </h2>
        <EarthquakeList />
      </main>
      <Footer />
    </div>
  );
}
