import {
  X,
  MapPin,
  Clock,
  Activity,
  AlertTriangle,
  Info,
  ArrowUpRight,
} from "lucide-react";

interface EarthquakeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  earthquake: any;
}

export const EarthquakeDetailsModal = ({
  isOpen,
  onClose,
  earthquake,
}: EarthquakeDetailsModalProps) => {
  if (!isOpen || !earthquake) return null;

  const { properties, geometry } = earthquake;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };

  const getMagnitudeColor = (mag: number) => {
    if (mag >= 5) return "text-red-600 dark:text-red-400";
    if (mag >= 3) return "text-orange-600 dark:text-orange-400";
    if (mag >= 2) return "text-yellow-600 dark:text-yellow-400";
    if (mag >= 1) return "text-green-600 dark:text-green-400";
    return "text-blue-600 dark:text-blue-400";
  };

  const getMagnitudeBackground = (mag: number) => {
    if (mag >= 5)
      return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
    if (mag >= 3)
      return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
    if (mag >= 2)
      return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
    if (mag >= 1)
      return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
    return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Earthquake Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 pt-2 space-y-6" data-lenis-prevent>
          {/* Title and Magnitude */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {properties.title}
            </h1>
            <div
              className={`inline-block px-6 py-3 rounded-full text-xl font-bold ${getMagnitudeColor(
                properties.mag
              )} ${getMagnitudeBackground(properties.mag)}`}
            >
              M {properties.mag}
            </div>
          </div>

          {/* Location */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Location
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-md">
              {properties.place}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Latitude:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {geometry.coordinates[1].toFixed(4)}°
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Longitude:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {geometry.coordinates[0].toFixed(4)}°
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Depth:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {geometry.coordinates[2].toFixed(2)} km
                </span>
              </div>
            </div>
          </div>

          {/* Time Information */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Time Information
              </h3>
            </div>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Occurred:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatTime(properties.time)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Updated:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatTime(properties.updated)}
                </span>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center gap-3 mb-3">
              <Info className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Technical Details
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Magnitude Type:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {properties.magType}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Network:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {properties.net}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Status:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white capitalize">
                  {properties.status}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Significance:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {properties.sig}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Stations Used:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {properties.nst}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  RMS Error:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {properties.rms}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {properties.felt && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                  Felt Reports
                </h3>
              </div>
              <p className="text-amber-700 dark:text-amber-300">
                This earthquake was felt by people in the area.
              </p>
            </div>
          )}

          {/* External Link */}
          <div className="text-center pt-2">
            <a
              href={properties.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              View on USGS Website
              <span className="text-sm">
                <ArrowUpRight />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
