import { useEffect } from "react";
import { useEarthquakes } from "../../hooks/useEarthquakes";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { EarthquakeSearch } from "./EarthquakeSearch";
import { EarthquakeFilters } from "./EarthquakeFilters";
import { EarthquakeCard } from "./EarthquakeCard";
import {
  SearchResultsInfo,
  ResultsCount,
  LoadingMore,
  EndOfResults,
  NoResults,
} from "./EarthquakeStatus";

interface EarthquakeListProps {
  showFilters?: boolean;
  showSearch?: boolean;
}

export const EarthquakeList = ({
  showFilters = true,
  showSearch = true,
}: EarthquakeListProps = {}) => {
  const {
    data,
    status,
    searchQuery,
    setSearchQuery,
    filters,
    updateFilters,
    clearFilters,
    filteredEarthquakes,
    visibleEarthquakes,
    resetPagination,
    loadMore,
    hasMore,
  } = useEarthquakes();

  // Reset pagination when search or filters change
  useEffect(() => {
    resetPagination();
  }, [searchQuery, filters, resetPagination]);

  // Infinite scroll hook
  const { loadingRef } = useInfiniteScroll(loadMore, hasMore, false);

  if (status === "loading") return null;
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Advanced Filters - Only show if showFilters is true */}
      {showFilters && (
        <EarthquakeFilters
          filters={filters}
          onFiltersChange={updateFilters}
          onClearFilters={clearFilters}
          totalCount={data.features?.length || 0}
          filteredCount={filteredEarthquakes.length}
        />
      )}

      {/* Search Input - Only show if showSearch is true */}
      {showSearch && (
        <EarthquakeSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery("")}
        />
      )}

      {/* Search Results Info */}
      {searchQuery && (
        <SearchResultsInfo
          searchQuery={searchQuery}
          filteredCount={filteredEarthquakes.length}
        />
      )}

      {/* Results Count */}
      <ResultsCount
        visibleCount={visibleEarthquakes.length}
        totalCount={filteredEarthquakes.length}
      />

      {/* Earthquake Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleEarthquakes.map((feature: any, index: number) => (
          <EarthquakeCard key={feature.id} feature={feature} index={index} />
        ))}
      </div>

      {/* Loading More Indicator */}
      {hasMore && <LoadingMore loadingRef={loadingRef} />}

      {/* End of Results */}
      <EndOfResults totalCount={filteredEarthquakes.length} />

      {/* No Results Message */}
      {searchQuery && filteredEarthquakes.length === 0 && (
        <NoResults searchQuery={searchQuery} />
      )}
    </div>
  );
};
