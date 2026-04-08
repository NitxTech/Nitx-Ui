import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSpaceSelector } from "../../space-selector/context";
import { Button } from "../../ui/button";
import SearchInput from "../../space-selector/ui/search-input";
import { SquarePlusIcon } from "lucide-react";
import SpaceCard, { SpaceCardSkeleton } from "../../space-selector/components/SpaceCard";
import EmptyList from "../../space-selector/components/EmptyList";
import { ProxySpace } from "../../space-selector/types";
import { cn } from "../../../lib/utils";

export interface SpaceBrowserClasses {
  className?: string;
  internalContainerStyle?: string;
  searchStyle?: string;
  spacesContainerStyle?: string;
  spaceCardStyle?: string;
}

export interface SpaceBrowserProps {
  browserClassNames?: SpaceBrowserClasses,
  isLoading?: boolean,
  error?: string | null,
  onFail?: () => void,
}

const SpaceBrowser = (props: SpaceBrowserProps) => {
  const { browserClassNames, isLoading, error, onFail } = props;
  const {
    className,
    internalContainerStyle,
    searchStyle,
    spacesContainerStyle,
    spaceCardStyle,
  } = browserClassNames ?? {};

  const { t } = useTranslation("modals");

  const { spaces, activeModal, setModal, setActiveSpace } = useSpaceSelector();

  const [filteredSpaces, setFilteredSpaces] = useState<ProxySpace[]>(spaces);

  useEffect(() => {
    setFilteredSpaces(spaces);
  }, [spaces]);

  const handleSearch = (searchTerm: string) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = spaces.filter((space) =>
      space.name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredSpaces(filtered);
  };

  const handleSelectSpace = (space: ProxySpace) => {
    setActiveSpace(space);
    setModal(null);
  };

  return (
    <div className={cn([
      "w-full h-full flex flex-col gap-5 relative pb-8 mt-5 overflow-hidden",
      className
    ])}>

      <div className={cn(["px-3 lg:px-7 flex flex-col gap-3 lg:gap-9", internalContainerStyle])}>
        {/* search */}
        {(isLoading || (!isLoading && spaces.length > 0)) && ( // not loading, there is spaces: show this part
          <div className={cn([
            "flex gap-3 items-center",
            searchStyle
          ])}>
            <SearchInput
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t("browseSpacesModal.searchSpacePlaceholder")}
              disabled={isLoading || error != null}
            />
            <Button onClick={() => setModal("newSpace")} size="lg" disabled={isLoading}>
              <SquarePlusIcon className="stroke-[1.8] mr-2" />
              {t("browseSpacesModal.newSpace")}
            </Button>
          </div>
        )}

        {/* space list */}
        {error ? (
          <div className="w-full flex flex-col items-center justify-center gap-5 py-14 px-6">
            {/* Calm icon */}
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-muted-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                <line x1="2" y1="2" x2="22" y2="22" />
              </svg>
            </span>

            {/* Error text */}
            <div className="flex flex-col items-center gap-1.5 text-center max-w-[260px]">
              <p className="text-sm font-medium text-foreground/80">
                {t("browseSpacesModal.errorTitle", "Couldn't load spaces")}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">{error}</p>
            </div>

            {/* Retry button */}
            <button
              onClick={() => { onFail?.() }}
              id="refetch-spaces-again"
              className={[
                "group inline-flex items-center gap-2 rounded-lg px-4 py-2",
                "border border-border bg-background",
                "text-xs font-medium text-foreground/70",
                "transition-all duration-150 ease-out",
                "hover:bg-muted hover:text-foreground",
                "active:scale-[0.97]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              ].join(" ")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 4v6h6" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.41" />
              </svg>
              {t("buttons.try_again")}
            </button>
          </div>
        ) : isLoading ? (
          <div className={cn([
            "grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto",
            spacesContainerStyle
          ])}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={cn([
                  "cursor-pointer",
                  spaceCardStyle
                ])}>
                <SpaceCardSkeleton />
              </div>
            ))}
          </div>
        ) : spaces.length === 0 ? (  // no spaces
          <div className="py-10 px-3">
            <EmptyList
              title={t("browseSpacesModal.emptyTitle")}  // no spaces message
              description={t("browseSpacesModal.emptyDescription")}
            />
          </div>
        ) : filteredSpaces.length === 0 ? (  // no spaces match search
          <div className="py-10 px-3">
            <EmptyList
              title={t("browseSpacesModal.emptyTitle")}  // no spaces match search message
              description={t("browseSpacesModal.emptyDescription")}
            />
          </div>
        ) : (
          <div className={cn([
            "grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto",
            spacesContainerStyle
          ])}>
            {filteredSpaces.map((space) => (
              <div
                key={space.space_uuid}
                onClick={() => handleSelectSpace(space)}
                className={cn([
                  "cursor-pointer",
                  spaceCardStyle
                ])}>
                <SpaceCard
                  id={space.space_uuid}
                  name={space.name}
                  members={space?.total_members || 0}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceBrowser;
