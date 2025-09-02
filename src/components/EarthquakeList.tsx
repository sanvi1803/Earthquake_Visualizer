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
//           className="p-4 shadow-md hover:shadow-xl transition bg-gray-600 text-white"
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
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function EarthquakeList() {
  const { data, status } = useSelector((state: RootState) => state.earthquake);

  if (status === "loading") return null;
  if (!data) return null;

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.features.slice(0, 12).map((feature: any) => (
        <Card
          key={feature.id}
          className="w-full max-w-sm mx-auto bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-black hover:shadow-lg transition hover:dark:shadow-2xl"
        >
          <CardHeader>
            <CardTitle>{feature.properties.title}</CardTitle>
            <CardDescription>{feature.properties.place}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <span className="font-semibold">Magnitude:</span>{" "}
              {feature.properties.mag}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Time:</span>{" "}
              {new Date(feature.properties.time).toLocaleString()}
            </div>
          </CardContent>
          <CardFooter>
            <a
              href={feature.properties.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
            >
              More info
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
