import React, { useEffect, useState } from "react";
import { useSpaceSelector } from "../space-selector/context";
import { Button } from "../ui/button";
import SearchInput from "../space-selector/ui/search-input";
import { SquarePlusIcon } from "lucide-react";
import SpaceCard, { SpaceCardSkeleton } from "../space-selector/components/SpaceCard";
import EmptyList from "../space-selector/components/EmptyList";
import ErrorState from "../ui/error-state";
import { ProxySpace } from "../space-selector/types";
import { cn } from "../../lib/utils";
import { useNitxUiTranslation } from "../../i18n/nitxuilib";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SpaceBrowserClasses {
  className?: string;
  internalContainerStyle?: string;
  searchStyle?: string;
  spacesContainerStyle?: string;
  spaceCardStyle?: string;
}

export interface SpaceBrowserProps {
  browserClassNames?: SpaceBrowserClasses;
  isLoading?: boolean;
  error?: string | null;
  onFail?: () => void;
}

// ─── Inner view functions ─────────────────────────────────────────────────────

function renderSearchBar(
  searchStyle: string | undefined,
  isLoading: boolean | undefined,
  error: string | null | undefined,
  onSearch: (term: string) => void,
  onNewSpace: () => void,
  t: (key: string) => string,
) {
  const shouldShow = isLoading || (!isLoading && true); // kept for parity with original logic
  if (!shouldShow) return null;

  return (
    <div className={cn(["flex gap-3 items-center", searchStyle])}>
      <SearchInput
        onChange={(e) => onSearch(e.target.value)}
        placeholder={t("browseSpacesModal.searchSpacePlaceholder")}
        disabled={isLoading || error != null}
      />
      <Button onClick={onNewSpace} size="lg" disabled={isLoading} className="bg-primary text-white dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary">
        <SquarePlusIcon className="stroke-[1.8] mr-2" />
        {t("browseSpacesModal.newSpace")}
      </Button>
    </div>
  );
}

function renderSpaceListSkeleton(spacesContainerStyle: string | undefined, spaceCardStyle: string | undefined) {
  return (
    <div className={cn(["grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto", spacesContainerStyle])}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className={cn(["cursor-pointer", spaceCardStyle])}>
          <SpaceCardSkeleton />
        </div>
      ))}
    </div>
  );
}

function renderEmptySpaces(t: (key: string) => string) {
  return (
    <div className="py-10 px-3">
      <EmptyList
        title={t("browseSpacesModal.emptyTitle")}
        description={t("browseSpacesModal.emptyDescription")}
      />
    </div>
  );
}

function renderNoSearchResults(t: (key: string) => string) {
  return (
    <div className="py-10 px-3">
      <EmptyList
        title={t("browseSpacesModal.emptyTitle")}
        description={t("browseSpacesModal.emptyDescription")}
      />
    </div>
  );
}

function renderSpaceList(
  filteredSpaces: ProxySpace[],
  spacesContainerStyle: string | undefined,
  spaceCardStyle: string | undefined,
  onSelect: (space: ProxySpace) => void,
) {
  return (
    <div className={cn(["grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto", spacesContainerStyle])}>
      {filteredSpaces.map((space) => (
        <div
          key={space.space_uuid}
          onClick={() => onSelect(space)}
          className={cn(["cursor-pointer", spaceCardStyle])}
        >
          <SpaceCard
            id={space.space_uuid}
            name={space.name}
            members={getSpaceMemberCount(space)}
          />
        </div>
      ))}
    </div>
  );
}

function getSpaceMemberCount(space: ProxySpace) {
  const candidates = [
    space.total_members,
    space.totalMembers,
    space.members_count,
    space.member_count,
    space.memberCount,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "number" && Number.isFinite(candidate)) {
      return candidate;
    }

    if (typeof candidate === "string") {
      const parsed = Number(candidate);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  if (Array.isArray(space.members)) {
    return space.members.length;
  }

  return 0;
}

// ─── SpaceBrowser ─────────────────────────────────────────────────────────────

const SpaceBrowser = (props: SpaceBrowserProps) => {
  const { browserClassNames, isLoading, error, onFail } = props;
  const { className, internalContainerStyle, searchStyle, spacesContainerStyle, spaceCardStyle } =
    browserClassNames ?? {};

  const { t } = useNitxUiTranslation();
  const { spaces, setModal, setActiveSpace } = useSpaceSelector();

  const [filteredSpaces, setFilteredSpaces] = useState<ProxySpace[]>(spaces);

  useEffect(() => {
    setFilteredSpaces(spaces);
  }, [spaces]);

  const handleSearch = (searchTerm: string) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    setFilteredSpaces(spaces.filter((s) => s.name.toLowerCase().includes(lowercasedTerm)));
  };

  const handleSelectSpace = (space: ProxySpace) => {
    setActiveSpace(space);
    setModal(null);
  };

  // ── Resolve which content view to render ──
  const renderContent = () => {
    if (error) {
      return (
        <ErrorState
          title={t("browseSpacesModal.errorTitle")}
          message={error}
          onRetry={onFail}
          retryLabel={t("buttons.tryAgain")}
        />
      );
    }
    if (isLoading) return renderSpaceListSkeleton(spacesContainerStyle, spaceCardStyle);
    if (spaces.length === 0) return renderEmptySpaces(t);
    if (filteredSpaces.length === 0) return renderNoSearchResults(t);
    return renderSpaceList(filteredSpaces, spacesContainerStyle, spaceCardStyle, handleSelectSpace);
  };

  // ── Only show the search bar when there are (or may be) spaces ──
  const showSearchBar = isLoading || (!isLoading && spaces.length > 0);

  return (
    <div className={cn(["w-full h-full flex flex-col gap-5 relative pb-8 mt-5 overflow-hidden", className])}>
      <div className={cn(["px-3 lg:px-7 flex flex-col gap-3 lg:gap-9", internalContainerStyle])}>
        {showSearchBar &&
          renderSearchBar(searchStyle, isLoading, error, handleSearch, () => setModal("newSpace"), t)}

        {renderContent()}
      </div>
    </div>
  );
};

export default SpaceBrowser;
