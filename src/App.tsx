import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchEarthquakes } from "./slices/earthquakeSlice";
import { Header } from "./components/shared/Header";
import { Footer } from "./components/shared/Footer";
import { EarthquakeMap } from "./components/earthquakes/EarthquakeMap";
import { EarthquakeList } from "./components/earthquakes/EarthquakeList";
import { StatisticsDashboard } from "./components/statistics/StatisticsDashboard";
import { FiltersPage } from "./components/filter/FiltersPage";
import { GoToTopButton } from "./components/shared/GoToTopButton";
import { ChartVisualization } from "./components/charts/ChartVisualization";
import Lenis from "lenis";
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEarthquakes() as any);
  }, [dispatch]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: true,
      autoResize: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-500">
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/visualizer" replace />} />
          <Route
            path="/visualizer"
            element={
              <main className="max-w-7xl mx-auto w-full px-4 py-8 fade-in-up">
                <div className="rounded-3xl bg-white/80 dark:bg-black/60 shadow-2xl p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
                  <EarthquakeMap />
                </div>
                <h2 className="mt-12 mb-6 text-3xl font-bold text-gray-800 dark:text-gray-200 text-center fade-in-up">
                  Recent Earthquakes
                </h2>
                <EarthquakeList showFilters={false} />
              </main>
            }
          />
          <Route path="/charts" element={<ChartVisualization />} />
          <Route
            path="/statistics"
            element={
              <div className="max-w-7xl mx-auto w-full px-4 py-8 fade-in-up">
                <StatisticsDashboard />
              </div>
            }
          />
          <Route path="/adv-filters" element={<FiltersPage />} />
        </Routes>

        <Footer />
        <GoToTopButton />
      </div>
    </BrowserRouter>
  );
}
