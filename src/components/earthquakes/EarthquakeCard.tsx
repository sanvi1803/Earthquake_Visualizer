import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { EarthquakeDetailsModal } from "./EarthquakeDetailsModal";
import { useState } from "react";

interface EarthquakeCardProps {
  feature: any;
  index: number;
}

export const EarthquakeCard = ({ feature, index }: EarthquakeCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <Card
        className={`w-full max-w-sm mx-auto bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200 dark:border-gray-700 card-hover fade-in-up`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-900 dark:text-white text-lg leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
            {feature.properties.title}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {feature.properties.place}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg border border-rose-200 dark:border-rose-800">
            <span className="font-semibold text-rose-700 dark:text-rose-300">
              Magnitude
            </span>
            <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">
              {feature.properties.mag}
            </span>
          </div>

          <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <span className="font-semibold text-blue-700 dark:text-blue-300 block mb-1">
              Time
            </span>
            <div className="text-sm text-blue-600 dark:text-blue-400">
              {new Date(feature.properties.time).toLocaleString()}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          {/* <a
          href={feature.properties.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg font-medium"
        >
          View Details
        </a> */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full inline-flex cursor-pointer items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg font-medium"
          >
            View Details
          </button>
        </CardFooter>
      </Card>
      <EarthquakeDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        earthquake={feature}
      />
    </>
  );
};
