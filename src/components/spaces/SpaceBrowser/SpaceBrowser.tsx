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
import { Card } from "../../ui/card";

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
          <Card className="w-full shadow-md lg:rounded-[18px] shadow-zinc-200/50 p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-sm text-red-500">{error}</div>
              <button
                onClick={() => { onFail?.() }}
                className="text-sm text-primary hover:underline"
                id="refetch-spaces-again"
              >
                {t("buttons.try_again")}
              </button>
            </div>
          </Card>
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
