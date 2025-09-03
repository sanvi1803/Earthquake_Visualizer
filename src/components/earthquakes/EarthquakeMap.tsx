import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useTheme } from "@/context/ThemeContext";
import { LocationMarker } from "../shared/LocationMarker";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

// Function to determine marker color based on earthquake magnitude
const getColor = (mag: number) => {
  if (mag >= 5) return "#ef4444"; // Red → Strong
  if (mag >= 3) return "#f59e42"; // Orange → Moderate
  if (mag >= 2) return "#fbbf24"; // Yellow → Light
  if (mag >= 1) return "#34d399"; // Green → Minor
  return "#60a5fa"; // Blue → Very weak
};

export const EarthquakeMap = () => {
  // Access earthquake state from Redux store
  const { data, status } = useSelector((state: RootState) => state.earthquake);

  // Get current theme (dark/light) from context
  const { theme } = useTheme();

  // Loading state → show animated skeleton shimmer
  if (status === "loading")
    return (
      <div className="h-[70vh] w-full rounded-lg shadow-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <div className="w-full h-full rounded-lg bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 animate-shimmer" />
      </div>
    );

  // Handle empty data case
  if (!data) return <div className="text-center py-8">No data available.</div>;

  return (
    // Map container with default world view
    <MapContainer
      center={[20, 0]} // Center map around equator
      zoom={3} // Zoomed out to show world
      scrollWheelZoom
      className="h-[70vh] w-full rounded-lg shadow-lg "
    >
      {/* Map tile layer switches between light/dark modes */}
      <TileLayer
        attribution=""
        url={
          theme === "dark"
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
      />

      {/* Render earthquake markers as circles */}
      {data.features.map((feature: any) => (
        <CircleMarker
          key={feature.id}
          center={[
            feature.geometry.coordinates[1], // Latitude
            feature.geometry.coordinates[0], // Longitude
          ]}
          radius={Math.max(4, feature.properties.mag * 2.5)} // Marker size scales with magnitude
          color={getColor(feature.properties.mag)} // Marker color from magnitude
          fillOpacity={0.6}
          stroke={false}
        >
          {/* Popup with earthquake details */}
          <Popup>
            <div>
              <div className="font-bold text-lg">
                {feature.properties.title}
              </div>
              <div>
                <span className="font-semibold">Magnitude:</span>{" "}
                {feature.properties.mag}
              </div>
              <div>
                <span className="font-semibold">Location:</span>{" "}
                {feature.properties.place}
              </div>
              <div>
                <span className="font-semibold">Time:</span>{" "}
                {new Date(feature.properties.time).toLocaleString()}
              </div>
              {/* Link to USGS page for more details */}
              <a
                href={feature.properties.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
              >
                More info
              </a>
            </div>
          </Popup>
        </CircleMarker>
      ))}

      {/* Show user's current location marker */}
      <LocationMarker />
    </MapContainer>
  );
};
