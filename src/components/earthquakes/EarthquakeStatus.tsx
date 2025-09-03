import { MapPin, Loader2 } from "lucide-react";

interface SearchResultsInfoProps {
  searchQuery: string;
  filteredCount: number;
}

export const SearchResultsInfo = ({
  searchQuery,
  filteredCount,
}: SearchResultsInfoProps) => (
  <div className="text-center text-sm text-gray-600 dark:text-gray-400">
    <MapPin className="inline-block w-4 h-4 mr-1" />
    Found {filteredCount} earthquake{filteredCount !== 1 ? "s" : ""} for "
    {searchQuery}"
  </div>
);

interface ResultsCountProps {
  visibleCount: number;
  totalCount: number;
}

export const ResultsCount = ({
  visibleCount,
  totalCount,
}: ResultsCountProps) => (
  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
    Showing {visibleCount} of {totalCount} earthquakes
  </div>
);

interface LoadingMoreProps {
  loadingRef: React.RefObject<HTMLDivElement | null>;
}

export const LoadingMore = ({ loadingRef }: LoadingMoreProps) => (
  <div ref={loadingRef} className="flex justify-center items-center py-8">
    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>Loading more earthquakes...</span>
    </div>
  </div>
);

interface EndOfResultsProps {
  totalCount: number;
}

export const EndOfResults = ({ totalCount }: EndOfResultsProps) =>
  totalCount > 0 && (
    <div className="text-center py-8">
      <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400">
        <MapPin className="w-4 h-4 mr-2" />
        You've reached the end of the earthquake list
      </div>
    </div>
  );

interface NoResultsProps {
  searchQuery: string;
}

export const NoResults = ({ searchQuery }: NoResultsProps) => (
  <div className="text-center py-8">
    <MapPin className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
    <p className="text-lg text-gray-600 dark:text-gray-400">
      No earthquakes found for "{searchQuery}"
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
      Try searching for a different location, magnitude, or earthquake title
    </p>
  </div>
);
