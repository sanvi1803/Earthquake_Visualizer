import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useTheme } from "../../context/ThemeContext";
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  PieChartIcon,
} from "lucide-react";
import { TimeSeriesChart } from "./TimeSeriesChart";
import { MagnitudeDistributionChart } from "./MagnitudeDistributionChart";
import { DepthMagnitudeChart } from "./DepthMagnitudeChart";
import { GeographicDistributionChart } from "./GeographicDistributionChart";

export const ChartVisualization = () => {
  const { data } = useSelector((state: RootState) => state.earthquake);
  const { theme } = useTheme();

  if (!data?.features) return null;

  const earthquakes = data.features;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8 fade-in-up">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <PieChartIcon className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl font-bold text-gray-700 dark:text-white">
            Chart Visualizations
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore earthquake data through interactive charts and graphs. Analyze
          temporal patterns, magnitude distributions, and geographic trends to
          understand seismic activity.
        </p>
      </div>

      {/* Charts Grid */}
      <div className="space-y-8">
        {/* Time Series Chart */}
        <div className="chart-card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Earthquake Frequency Over Time
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Daily earthquake frequency showing temporal patterns and trends.
          </p>
          <TimeSeriesChart earthquakes={earthquakes} theme={theme} />
        </div>

        {/* Magnitude Distribution Chart */}
        <div className="chart-card">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Magnitude Distribution
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Distribution of earthquakes by magnitude range (Gutenberg-Richter
            law).
          </p>
          <MagnitudeDistributionChart earthquakes={earthquakes} theme={theme} />
        </div>

        {/* Depth vs Magnitude Chart */}
        <div className="chart-card">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Depth vs Magnitude Analysis
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Relationship between earthquake depth and magnitude.
          </p>
          <DepthMagnitudeChart earthquakes={earthquakes} theme={theme} />
        </div>

        {/* Geographic Distribution Chart */}
        <div className="chart-card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Geographic Distribution
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Earthquake count by geographic region/country.
          </p>
          <GeographicDistributionChart
            earthquakes={earthquakes}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};
