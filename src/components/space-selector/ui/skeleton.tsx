import { cn } from "../lib/utils";
import React from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-md bg-gray-300/50 dark:bg-gray-700/50",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
