import { useSelector } from "react-redux";
import type { RootState } from "../store";
import EarthquakeList from "./EarthquakeList";
import { Filter, Search, List } from "lucide-react";

export const FiltersPage = () => {
  const { data } = useSelector((state: RootState) => state.earthquake);

  if (!data?.features) return null;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8 fade-in-up">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Filter className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Advanced Filters
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Use powerful filtering options to find specific earthquakes by
          magnitude, time, location, and more. Combine multiple filters for
          precise results.
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Filter Controls
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Configure your search criteria below. All filters work together to
          narrow down results.
        </p>

        {/* Earthquake List with Filters */}
        <EarthquakeList showFilters={true} showSearch={true} />
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-3 mb-3">
            <Filter className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
              Smart Filtering
            </h3>
          </div>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Filter by magnitude ranges, time periods, and geographic locations
            with intuitive controls.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl border border-green-200 dark:border-green-700">
          <div className="flex items-center gap-3 mb-3">
            <Search className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
              Real-time Search
            </h3>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm">
            Search through earthquake titles, locations, and magnitudes with
            instant results.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-3 mb-3">
            <List className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
              Organized Results
            </h3>
          </div>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            View filtered results in organized cards with infinite scroll
            pagination.
          </p>
        </div>
      </div>
    </div>
  );
};
