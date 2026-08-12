"use client";

import React from "react";
import {
  ChevronRight,
  ChevronLeft,
  MoreHorizontal,
  FolderIcon,
  Home,
} from "lucide-react";

import { cn } from "../../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";
import { useAssetsStore } from "../hooks/use-assets-store";

interface AssetsPathProps {
  className?: string;
}

/**
 * Responsive breadcrumb component for the assets module. Reads the shared
 * breadcrumb path from the assets store.
 */
const AssetsPath: React.FC<AssetsPathProps> = ({ className }) => {
  const path = useAssetsStore((s) => s.path);
  const setPath = useAssetsStore((s) => s.setPath);

  const navigateTo = (idx: number) => {
    setPath(path.slice(0, idx + 1));
  };

  const goBack = () => {
    setPath(path.slice(0, -1));
  };

  // Decide which crumbs are visible vs. collapsed
  const buildCrumbs = () => {
    if (path.length <= 4) return path.map((p, i) => ({ ...p, idx: i }));

    const first = { ...path[0], idx: 0 };
    const last = { ...path[path.length - 1], idx: path.length - 1 };
    const hidden = path.slice(1, -1).map((p, i) => ({ ...p, idx: i + 1 }));

    return [first, { label: "…", idx: -1, hidden }, last];
  };

  const crumbs = buildCrumbs();

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-sm text-muted-foreground min-w-0 overflow-x-auto scrollbar-none",
        className
      )}
    >
      {path.length > 1 && (
        <button
          onClick={goBack}
          className="flex-shrink-0 mr-1 p-1 rounded hover:bg-muted"
          aria-label="Go back one level"
          type="button"
        >
          <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
        </button>
      )}

      {path.length > 0 &&
        crumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <ChevronRight className="w-4 h-4 flex-shrink-0 rtl:rotate-180" />
            )}

            {"hidden" in crumb ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-1 px-1 text-muted-foreground hover:text-primary"
                    type="button"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {crumb.hidden!.map((h) => (
                    <DropdownMenuItem
                      key={h.idx}
                      onSelect={() => navigateTo(h.idx)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <FolderIcon className="w-4 h-4 text-muted-foreground" />
                      {h.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => navigateTo(crumb.idx)}
                disabled={crumb.idx === path.length - 1}
                className={cn(
                  "flex items-center gap-1 hover:text-primary max-w-[10rem]",
                  crumb.idx === path.length - 1 &&
                    "font-semibold text-foreground cursor-default"
                )}
                type="button"
              >
                {crumb.idx === 0 ? (
                  <Home className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <FolderIcon className="w-4 h-4 flex-shrink-0" />
                )}
                <span className="overflow-hidden text-ellipsis whitespace-nowrap inline-block max-w-full">
                  {crumb.label === "~Root" ? "Root" : crumb.label}
                </span>
              </button>
            )}
          </React.Fragment>
        ))}
    </div>
  );
};

export default AssetsPath;
