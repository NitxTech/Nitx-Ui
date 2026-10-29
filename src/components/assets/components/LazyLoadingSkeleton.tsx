"use client";

import React from "react";
import { AssetCardSkeleton } from "./AssetCard";
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
        <AssetCardSkeleton
          key={`lazy-skeleton-${i}`}
          viewType={viewType}
        />
      ))}
    </>
  );
};

export default LazyLoadingSkeleton;
