// import { useSelector } from "react-redux";
// import type { RootState } from "../store";
// import { Card } from "./ui/card";

// export default function EarthquakeList() {
//   const { data, status } = useSelector((state: RootState) => state.earthquake);

//   if (status === "loading") return null;
//   if (!data) return null;

//   return (
//     <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//       {data.features.slice(0, 12).map((feature: any) => (
//         <Card
//           key={feature.id}
//           className="p-4 shadow-md hover:shadow-xl transition"
//         >
//           <div className="font-bold text-lg">{feature.properties.title}</div>
//           <div>
//             <span className="font-semibold">Magnitude:</span>{" "}
//             {feature.properties.mag}
//           </div>
//           <div>
//             <span className="font-semibold">Location:</span>{" "}
//             {feature.properties.place}
//           </div>
//           <div>
//             <span className="font-semibold">Time:</span>{" "}
//             {new Date(feature.properties.time).toLocaleString()}
//           </div>
//           <a
//             href={feature.properties.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
//           >
//             More info
//           </a>
//         </Card>
//       ))}
//     </div>
//   );
// }

// src/components/EarthquakeList.tsx
import { Card } from "shadcn-ui"; // or your Card import
import { Globe2 } from "lucide-react"; // or any icon library

export default function EarthquakeList() {
  const { data, status } = useSelector((state: RootState) => state.earthquake);

  if (status === "loading") return null;
  if (!data) return null;

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.features.slice(0, 12).map((feature: any) => (
        <Card
          key={feature.id}
          className="relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-0 flex flex-col transition hover:shadow-2xl"
        >
          {/* Image/Icon Section */}
          <div className="flex items-center justify-center h-32 bg-gradient-to-tr from-blue-200 via-blue-400 to-blue-600 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
            <Globe2 className="w-16 h-16 text-blue-700 dark:text-blue-300 opacity-80" />
          </div>
          {/* Content Section */}
          <div className="p-6 flex flex-col flex-1">
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
            <a
              href={feature.properties.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition"
            >
              More info
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
}
