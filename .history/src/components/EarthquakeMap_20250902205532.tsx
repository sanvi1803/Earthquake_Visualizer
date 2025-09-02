import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import "leaflet/dist/leaflet.css";

const getColor = (mag: number) => {
  if (mag >= 5) return "#ef4444";
  if (mag >= 3) return "#f59e42";
  if (mag >= 2) return "#fbbf24";
  if (mag >= 1) return "#34d399";
  return "#60a5fa";
};

export default function EarthquakeMap() {
  const { data, status } = useSelector((state: RootState) => state.earthquake);

  if (status === "loading")
    return <div className="text-center py-8">Loading map...</div>;
  if (!data) return <div className="text-center py-8">No data available.</div>;

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom
      className="h-[70vh] w-full rounded-lg shadow-lg bg-gray-900 dark:bg-black"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
            <div className="bg-gray-900 dark:bg-black rounded-lg shadow-lg p-4 min-w-[220px] text-white dark:text-white">
              <div className="font-bold text-lg text-gray-100 mb-1">
                {feature.properties.title}
              </div>
              <div className="flex items-center mb-1">
                <span className="font-semibold text-rose-400 mr-1">
                  Magnitude:
                </span>
                <span className="text-lg font-bold">
                  {feature.properties.mag}
                </span>
              </div>
              <div className="mb-1">
                <span className="font-semibold text-sky-400">Location:</span>{" "}
                {feature.properties.place}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-emerald-400">Time:</span>{" "}
                {new Date(feature.properties.time).toLocaleString()}
              </div>
              <a
                href={feature.properties.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-3 py-1 bg-blue-900 text-blue-200 rounded hover:bg-blue-800 transition"
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
