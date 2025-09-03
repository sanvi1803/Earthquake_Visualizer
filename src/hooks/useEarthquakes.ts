import { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { FilterOptions } from "../components/earthquakes/EarthquakeFilters";

export const useEarthquakes = () => {
  const { data, status } = useSelector((state: RootState) => state.earthquake);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [filters, setFilters] = useState<FilterOptions>({
    magnitudeRange: "all",
    timePeriod: "all",
    location: "",
    sortBy: "time",
    sortOrder: "desc",
  });

  // Filter earthquakes based on search query and filters
  const filteredEarthquakes = useMemo(() => {
    if (!data?.features) return [];

    // Create a copy of the array to avoid mutating Redux state
    let filtered = [...data.features];

    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((feature: any) => {
        const properties = feature.properties;
        const place = properties.place?.toLowerCase() || "";
        const title = properties.title?.toLowerCase() || "";
        const magnitude = properties.mag?.toString() || "";

        return (
          place.includes(query) ||
          title.includes(query) ||
          magnitude.includes(query)
        );
      });
    }

    // Apply magnitude range filter
    if (filters.magnitudeRange !== "all") {
      const [min, max] = filters.magnitudeRange.split("-").map(Number);
      filtered = filtered.filter((feature: any) => {
        const magnitude = feature.properties.mag;
        if (filters.magnitudeRange === "5+") {
          return magnitude >= 5;
        }
        return magnitude >= min && magnitude < max;
      });
    }

    // Apply time period filter
    if (filters.timePeriod !== "all") {
      const now = Date.now();
      const periods: { [key: string]: number } = {
        "1h": 60 * 60 * 1000,
        "6h": 6 * 60 * 60 * 1000,
        "12h": 12 * 60 * 60 * 1000,
        "24h": 24 * 60 * 60 * 1000,
        "7d": 7 * 24 * 60 * 60 * 1000,
        "30d": 30 * 24 * 60 * 60 * 1000,
      };

      const timeLimit = now - periods[filters.timePeriod];
      filtered = filtered.filter((feature: any) => {
        return feature.properties.time >= timeLimit;
      });
    }

    // Apply location filter
    if (filters.location.trim()) {
      const locationQuery = filters.location.toLowerCase();
      filtered = filtered.filter((feature: any) => {
        const place = feature.properties.place?.toLowerCase() || "";
        return place.includes(locationQuery);
      });
    }

    // Apply sorting - create a new array for sorting to avoid mutation
    const sortedFiltered = [...filtered].sort((a: any, b: any) => {
      const aProps = a.properties;
      const bProps = b.properties;

      switch (filters.sortBy) {
        case "time":
          return filters.sortOrder === "desc"
            ? bProps.time - aProps.time
            : aProps.time - bProps.time;
        case "time-asc":
          return aProps.time - bProps.time;
        case "magnitude":
          return filters.sortOrder === "desc"
            ? bProps.mag - aProps.mag
            : aProps.mag - bProps.mag;
        case "magnitude-asc":
          return aProps.mag - bProps.mag;
        case "location":
          return aProps.place?.localeCompare(bProps.place) || 0;
        default:
          return bProps.time - aProps.time;
      }
    });

    return sortedFiltered;
  }, [data, searchQuery, filters]);

  // Get visible earthquakes for pagination
  const visibleEarthquakes = useMemo(() => {
    return filteredEarthquakes.slice(0, visibleCount);
  }, [filteredEarthquakes, visibleCount]);

  // Check if there are more earthquakes to load
  const hasMore = visibleCount < filteredEarthquakes.length;

  // Reset pagination when filters change
  const resetPagination = useCallback(() => {
    setVisibleCount(12);
  }, []);

  // Load more earthquakes
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 12, filteredEarthquakes.length));
  }, [filteredEarthquakes.length]);

  // Update filters
  const updateFilters = useCallback(
    (newFilters: FilterOptions) => {
      setFilters(newFilters);
      resetPagination();
    },
    [resetPagination]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      magnitudeRange: "all",
      timePeriod: "all",
      location: "",
      sortBy: "time",
      sortOrder: "desc",
    });
    resetPagination();
  }, [resetPagination]);

  return {
    data,
    status,
    searchQuery,
    setSearchQuery,
    filters,
    updateFilters,
    clearFilters,
    filteredEarthquakes,
    visibleEarthquakes,
    visibleCount,
    resetPagination,
    loadMore,
    hasMore,
  };
};
