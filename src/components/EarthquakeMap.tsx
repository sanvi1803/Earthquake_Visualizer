import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import "leaflet/dist/leaflet.css";
import { useTheme } from "@/context/ThemeContext";

const getColor = (mag: number) => {
  if (mag >= 5) return "#ef4444";
  if (mag >= 3) return "#f59e42";
  if (mag >= 2) return "#fbbf24";
  if (mag >= 1) return "#34d399";
  return "#60a5fa";
};

export default function EarthquakeMap() {
  const { data, status } = useSelector((state: RootState) => state.earthquake);
  const { theme } = useTheme();
  if (status === "loading")
    return (
      <div className="h-[70vh] w-full rounded-lg shadow-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <div className="w-full h-full rounded-lg bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 animate-shimmer" />
      </div>
    );
  if (!data) return <div className="text-center py-8">No data available.</div>;

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom
      className="h-[70vh] w-full rounded-lg shadow-lg "
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url={
          theme === "dark"
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
      />
      {data.features.map((feature: any) => (
        <CircleMarker
          key={feature.id}
          center={[
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ]}
          radius={Math.max(4, feature.properties.mag * 3)}
          color={getColor(feature.properties.mag)}
          fillOpacity={0.7}
          stroke={false}
        >
          <Popup>
            <div className="bg-white dark:bg-gray-900 dark:text-white rounded-xl shadow-2xl p-4 min-w-[280px] border border-gray-200 dark:border-gray-700">
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
    </MapContainer>
  );
}
