"use client";

import React from "react";

import { Skeleton } from "../../ui/skeleton";
import { cn } from "../../../lib/utils";
import type { AssetsViewType } from "../hooks/use-assets-store";

interface LazyLoadingSkeletonProps {
  viewType: AssetsViewType;
  count?: number;
}

export const LazyLoadingSkeleton: React.FC<LazyLoadingSkeletonProps> = ({
  viewType,
  count = 6,
}) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={`lazy-skeleton-${i}`}
          className={cn(
            "bg-card rounded-lg p-2 sm:p-2.5 border border-opacity-20 shadow-gray-200/20",
            viewType !== "grid"
              ? "flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4"
              : ""
          )}
        >
          <div
            className={cn(
              "size-full rounded-[12px] overflow-hidden",
              viewType === "grid"
                ? "flex flex-col"
                : "flex flex-row justify-between xs:flex-row xs:justify-between"
            )}
          >
            <div className="p-0 w-auto relative min-w-0">
              <Skeleton
                className={cn(
                  "bg-muted",
                  viewType === "grid"
                    ? "w-full h-32 xs:h-40 sm:h-48"
                    : "w-16 h-16 rounded-lg"
                )}
              />
            </div>
            <div className="flex-1 min-w-0 p-2 xs:p-3">
              <Skeleton className="h-4 w-3/4 mb-2 bg-muted" />
              <Skeleton className="h-3 w-1/2 bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LazyLoadingSkeleton;
