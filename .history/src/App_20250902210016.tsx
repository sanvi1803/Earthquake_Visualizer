import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEarthquakes } from "./slices/earthquakeSlice";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeList from "./components/EarthquakeList";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEarthquakes() as any);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          🌍 Earthquake Visualizer
        </h1>
        <p className="text-lg text-gray-600">
          Explore recent global earthquake activity interactively.
        </p>
      </header>
      <main className="max-w-6xl mx-auto">
        <EarthquakeMap />
        <h2 className="mt-10 mb-4 text-2xl font-bold text-gray-700">
          Recent Earthquakes
        </h2>
        <EarthquakeList />
      </main>
      Fo
    </div>
  );
}
