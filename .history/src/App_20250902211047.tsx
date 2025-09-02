// src/App.tsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeList from "./components/EarthquakeList";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-2 py-8">
        <div className="rounded-2xl bg-black/60 shadow-2xl p-4">
          <EarthquakeMap />
        </div>
        <h2 className="mt-10 mb-4 text-2xl font-bold text-gray-200">
          Recent Earthquakes
        </h2>
        <EarthquakeList />
      </main>
      <Footer />
    </div>
  );
}
