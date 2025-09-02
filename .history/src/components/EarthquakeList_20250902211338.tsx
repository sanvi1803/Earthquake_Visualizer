import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Card } from "./ui/card";

export default function EarthquakeList() {
  const { data, status } = useSelector((state: RootState) => state.earthquake);

  if (status === "loading") return null;
  if (!data) return null;

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.features.slice(0, 12).map((feature: any) => (
        <div
          key={feature.id}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col justify-between transition-colors duration-300 hover:shadow-2xl"
        >
          <div>
            <div className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              {feature.properties.title}
            </div>
            <div className="mb-1">
              <span className="font-semibold text-rose-700 dark:text-rose-400">
                Magnitude:
              </span>{" "}
              {feature.properties.mag}
            </div>
            <div className="mb-1">
              <span className="font-semibold text-sky-700 dark:text-sky-300">
                Location:
              </span>{" "}
              {feature.properties.place}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                Time:
              </span>{" "}
              {new Date(feature.properties.time).toLocaleString()}
            </div>
          </div>
          <a
            href={feature.properties.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition"
          >
            More info
          </a>
        </div>
      ))}
    </div>
  );
}
