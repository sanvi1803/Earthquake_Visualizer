import { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export const useEarthquakes = () => {
  const { data, status } = useSelector((state: RootState) => state.earthquake);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  // Filter earthquakes based on search query
  const filteredEarthquakes = useMemo(() => {
    if (!data || !searchQuery.trim()) {
      return data?.features || [];
    }

    const query = searchQuery.toLowerCase();
    return data.features.filter((feature: any) => {
      const place = feature.properties.place.toLowerCase();
      const title = feature.properties.title.toLowerCase();
      const magnitude = feature.properties.mag.toString();

      return (
        place.includes(query) ||
        title.includes(query) ||
        magnitude.includes(query)
      );
    });
  }, [data, searchQuery]);

  // Get visible earthquakes for current page
  const visibleEarthquakes = useMemo(() => {
    return filteredEarthquakes.slice(0, visibleCount);
  }, [filteredEarthquakes, visibleCount]);

  // Reset visible count when search changes
  const resetPagination = useCallback(() => {
    setVisibleCount(12);
  }, []);

  // Load more earthquakes
  const loadMore = useCallback(() => {
    if (visibleCount < filteredEarthquakes.length) {
      setVisibleCount((prev) =>
        Math.min(prev + 12, filteredEarthquakes.length)
      );
    }
  }, [visibleCount, filteredEarthquakes.length]);

  // Check if more earthquakes can be loaded
  const hasMore = visibleCount < filteredEarthquakes.length;

  return {
    data,
    status,
    searchQuery,
    setSearchQuery,
    filteredEarthquakes,
    visibleEarthquakes,
    visibleCount,
    resetPagination,
    loadMore,
    hasMore,
  };
};
