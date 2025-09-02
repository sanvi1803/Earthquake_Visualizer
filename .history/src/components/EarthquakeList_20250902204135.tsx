import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Card } from "./ui/card";

export default function EarthquakeList() {
  const { data, status } = useSelector((state: RootState) => state.earthquake);

  if (status === "loading") return null;
  if (!data) return null;

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.features.slice(0, 12).map((feature: any) => (
        <Card
          key={feature.id}
          className="p-4 shadow-md hover:shadow-xl transition"
        >
          <div className="font-bold text-lg">{feature.properties.title}</div>
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
            className="text-blue-600 underline"
          >
            More info
          </a>
        </Card>
      ))}
    </div>
  );
}
