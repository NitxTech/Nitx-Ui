import { useState, useEffect, useRef, useCallback, useMemo } from "react";

interface UseLazyLoadingOptions {
  itemsPerBatch?: number;
  rootMargin?: string;
  threshold?: number;
}

interface UseLazyLoadingReturn<T> {
  visibleItems: T[];
  loadingMore: boolean;
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
  observerRef: React.RefObject<HTMLDivElement | null>;
}

export function useLazyLoading<T>(
  items: T[],
  options: UseLazyLoadingOptions = {}
): UseLazyLoadingReturn<T> {
  const {
    itemsPerBatch = 12, // Default to 12 items (2-3 rows in grid view)
    rootMargin = "100px",
    threshold = 0.1,
  } = options;

  const [visibleCount, setVisibleCount] = useState(itemsPerBatch);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  // Use useMemo to compute visible items based on count
  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  const hasMore = visibleCount < items.length;

  // Reset visible count when items array changes
  useEffect(() => {
    setVisibleCount(itemsPerBatch);
    setLoadingMore(false);
  }, [items, itemsPerBatch]);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + itemsPerBatch, items.length));
      setLoadingMore(false);
    }, 100);
  }, [itemsPerBatch, loadingMore, hasMore, items.length]);

  const reset = useCallback(() => {
    setVisibleCount(itemsPerBatch);
    setLoadingMore(false);
  }, [itemsPerBatch]);

  // Intersection Observer for automatic loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [loadMore, hasMore, loadingMore, rootMargin, threshold]);

  return {
    visibleItems,
    loadingMore,
    hasMore,
    loadMore,
    reset,
    observerRef,
  };
}
