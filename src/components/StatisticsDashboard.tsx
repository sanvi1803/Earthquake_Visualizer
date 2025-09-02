import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { TrendingUp, MapPin, Zap, Clock, Globe, Activity } from "lucide-react";

export const StatisticsDashboard = () => {
  const { data } = useSelector((state: RootState) => state.earthquake);

  if (!data?.features) return null;

  const earthquakes = data.features;

  // Calculate statistics
  const totalCount = earthquakes.length;
  const highestMag = Math.max(
    ...earthquakes.map((e: any) => e.properties.mag || 0)
  );
  const lowestMag = Math.min(
    ...earthquakes.map((e: any) => e.properties.mag || 0)
  );
  const avgMag = (
    earthquakes.reduce(
      (sum: number, e: any) => sum + (e.properties.mag || 0),
      0
    ) / totalCount
  ).toFixed(2);

  // Count by magnitude ranges
  const magnitudeRanges = {
    micro: earthquakes.filter((e: any) => (e.properties.mag || 0) < 2).length,
    minor: earthquakes.filter(
      (e: any) => (e.properties.mag || 0) >= 2 && (e.properties.mag || 0) < 4
    ).length,
    moderate: earthquakes.filter(
      (e: any) => (e.properties.mag || 0) >= 4 && (e.properties.mag || 0) < 5
    ).length,
    strong: earthquakes.filter((e: any) => (e.properties.mag || 0) >= 5).length,
  };

  // Get unique countries/regions
  const locations = new Set(
    earthquakes.map((e: any) => {
      const place = e.properties.place || "";
      return place.split(",").pop()?.trim() || "Unknown";
    })
  );
  const uniqueLocations = locations.size;

  // Get most recent earthquake time
  const mostRecent = Math.max(
    ...earthquakes.map((e: any) => e.properties.time || 0)
  );
  const timeSinceLast = Date.now() - mostRecent;
  const hoursSinceLast = Math.floor(timeSinceLast / (1000 * 60 * 60));
  const minutesSinceLast = Math.floor(
    (timeSinceLast % (1000 * 60 * 60)) / (1000 * 60)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Earthquake Statistics
        </h2>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Total
            </span>
          </div>
          <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            {totalCount}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Earthquakes
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 p-4 rounded-xl border border-red-200 dark:border-red-700">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-sm font-medium text-red-700 dark:text-red-300">
              Highest
            </span>
          </div>
          <div className="text-2xl font-bold text-red-800 dark:text-red-200">
            {highestMag}
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            Magnitude
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-xl border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Regions
            </span>
          </div>
          <div className="text-2xl font-bold text-green-800 dark:text-green-200">
            {uniqueLocations}
          </div>
          <div className="text-xs text-green-600 dark:text-green-400">
            Affected
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-xl border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Last
            </span>
          </div>
          <div className="text-lg font-bold text-purple-800 dark:text-purple-200">
            {hoursSinceLast > 0 ? `${hoursSinceLast}h` : `${minutesSinceLast}m`}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Ago
          </div>
        </div>
      </div>

      {/* Magnitude Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Magnitude Distribution
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Micro (0-2)
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(magnitudeRanges.micro / totalCount) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                  {magnitudeRanges.micro}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Minor (2-4)
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(magnitudeRanges.minor / totalCount) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                  {magnitudeRanges.minor}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Moderate (4-5)
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (magnitudeRanges.moderate / totalCount) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                  {magnitudeRanges.moderate}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Strong (5+)
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(magnitudeRanges.strong / totalCount) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                  {magnitudeRanges.strong}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Average Magnitude
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {avgMag}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Lowest Magnitude
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {lowestMag}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Data Source
              </span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                USGS API
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Update Frequency
              </span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Real-time
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
