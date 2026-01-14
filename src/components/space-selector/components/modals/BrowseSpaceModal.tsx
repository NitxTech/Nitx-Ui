import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSpaceSelector } from "../../context"; 
import { DrawerDialog } from "../../ui/drawer-dialog"; 
import { Button } from "../../ui/button"; 
import SearchInput from "../../ui/search-input"; 
import { SquarePlusIcon } from "lucide-react";
import SpaceCard from "../SpaceCard"; 
import EmptyList from "../EmptyList"; 
import { ProxySpace } from "../../types";

const BrowseSpaceModal = () => {
  const { t } = useTranslation("modals");
  const { spaces, activeModal, setModal, setActiveSpace } = useSpaceSelector();

  const [filteredSpaces, setFilteredSpaces] = useState<ProxySpace[]>(spaces);

  useEffect(() => {
    setFilteredSpaces(spaces);
  }, [spaces]);

  if (activeModal !== "browseSpace") return null;

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
    <DrawerDialog
      size="2xl"
      open={true}
      onClose={() => setModal(null)}
      title={t("browseSpacesModal.title")}
    >
      <div className="w-full h-full flex flex-col gap-5 relative pb-8 mt-5 overflow-hidden">
        <div className="px-3 lg:px-7 flex flex-col gap-3 lg:gap-9">
          {/* search */}
          <div className="flex gap-3 items-center">
            <SearchInput
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t("browseSpacesModal.searchSpacePlaceholder")}
            />
            <Button onClick={() => setModal("newSpace")} size="lg">
              <SquarePlusIcon className="stroke-[1.8] mr-2" />
              {t("browseSpacesModal.newSpace")}
            </Button>
          </div>

          {/* space list */}
          {filteredSpaces.length === 0 ? (
            <div className="py-10 px-3">
              <EmptyList
                title={t("browseSpacesModal.emptyTitle")}
                description={t("browseSpacesModal.emptyDescription")}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
              {filteredSpaces.map((space) => (
                <div
                  key={space.space_uuid}
                  onClick={() => handleSelectSpace(space)}
                  className="cursor-pointer"
                >
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
    </DrawerDialog>
  );
};

export default BrowseSpaceModal;
