"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { cn } from "../../../../lib/utils";
import { useNitxUiTranslation } from "../../../../i18n/nitxuilib";
import { useAssetsConfig } from "../../context";
import { useAssetsStore } from "../../hooks/use-assets-store";
import type { Folder } from "../../types";

interface MoveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMove: (destinationId: string | null) => void;
  itemsToMove?: string[];
  moveItemType?: "asset" | "folder";
}

const MoveModal = ({
  isOpen,
  onClose,
  onMove,
  itemsToMove = [],
  moveItemType = "asset",
}: MoveModalProps) => {
  const { t } = useNitxUiTranslation();
  const { api } = useAssetsConfig();
  const path = useAssetsStore((s) => s.path);

  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const [currentFolders, setCurrentFolders] = useState<Folder[]>([]);
  const [search, setSearch] = useState("");
  const [modalPath, setModalPath] = useState<
    { id: string | null; name: string }[]
  >([]);

  const fetchFoldersForPath = async (
    targetPath: { id: string | null; name: string }[]
  ) => {
    try {
      const activePathId = targetPath[targetPath.length - 1]?.id;
      const { folders } = await api.fetchAssetsAndFolders(activePathId);
      return folders;
    } catch (err) {
      console.error("Error fetching folders for move modal:", err);
      return [] as Folder[];
    }
  };

  useEffect(() => {
    if (isOpen) {
      const initialPath = path.map((p) => ({
        id: p.id,
        name: p.label === "~Root" ? t("assets.folderModal.root") : p.label,
      }));
      setModalPath(initialPath);
      setSelectedDestination(null);

      fetchFoldersForPath(initialPath).then((fetchedFolders) => {
        setCurrentFolders(fetchedFolders);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, path]);

  const handleFolderClick = async (folder: Folder) => {
    setSelectedDestination(folder.id);

    const newPath = [...modalPath, { id: folder.id, name: folder.name }];
    setModalPath(newPath);

    const fetchedFolders = await fetchFoldersForPath(newPath);
    setCurrentFolders(fetchedFolders);
  };

  const handlePathClick = async (pathIndex: number) => {
    const newPath = modalPath.slice(0, pathIndex + 1);
    setModalPath(newPath);

    const clickedPathItem = modalPath[pathIndex];
    setSelectedDestination(clickedPathItem?.id || null);

    const fetchedFolders = await fetchFoldersForPath(newPath);
    setCurrentFolders(fetchedFolders);
  };

  const handleMove = () => {
    onMove(selectedDestination);
    onClose();
  };

  const visibleFolders = search
    ? currentFolders.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
      )
    : currentFolders;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("assets.folderModal.title")}</DialogTitle>
        </DialogHeader>

        {/* Breadcrumbs navigation */}
        <div className="flex items-center gap-1 text-sm mb-2 overflow-x-auto pb-2">
          {modalPath.length > 3 ? (
            <>
              <button
                onClick={() => handlePathClick(0)}
                className="hover:underline whitespace-nowrap text-muted-foreground"
              >
                {modalPath[0].name.length > 10
                  ? modalPath[0].name.slice(0, 10) + "..."
                  : modalPath[0].name}
              </button>
              <ChevronRight className="h-4 w-4 mx-1 rtl:rotate-180" />
              <span className="text-muted-foreground whitespace-nowrap">
                ...
              </span>
              <ChevronRight className="h-4 w-4 mx-1 rtl:rotate-180" />
              <button
                onClick={() => handlePathClick(modalPath.length - 1)}
                className="hover:underline whitespace-nowrap font-medium text-primary"
              >
                {modalPath[modalPath.length - 1].name.length > 10
                  ? modalPath[modalPath.length - 1].name.slice(0, 10) + "..."
                  : modalPath[modalPath.length - 1].name}
              </button>
            </>
          ) : (
            modalPath.map((pathName, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 mx-1 rtl:rotate-180" />
                )}
                <button
                  onClick={() => handlePathClick(index)}
                  className={cn(
                    "hover:underline whitespace-nowrap max-w-[100%] truncate",
                    index === modalPath.length - 1
                      ? "font-medium text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {pathName.name.length > 10
                    ? pathName.name.slice(0, 10) + "..."
                    : pathName.name}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Search bar */}
        <div className="mb-2">
          <Input
            placeholder={t("assets.folderModal.searchFoldersPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Folders list */}
        <div className="h-[300px] overflow-y-auto border rounded-md p-4">
          {visibleFolders.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {t("assets.folderModal.noFoldersAvailable")}
            </div>
          ) : (
            <div className="space-y-2">
              {visibleFolders.map((folder) => {
                const isBeingMoved =
                  moveItemType === "folder" && itemsToMove.includes(folder.id);
                const isDisabled = isBeingMoved;

                return (
                  <div
                    key={folder.id}
                    className={cn(
                      "flex items-center p-2 rounded-md",
                      isDisabled
                        ? "opacity-50 cursor-not-allowed bg-muted"
                        : selectedDestination === folder.id
                          ? "bg-primary/10 cursor-pointer"
                          : "hover:bg-muted cursor-pointer"
                    )}
                    onClick={() => !isDisabled && handleFolderClick(folder)}
                  >
                    <div className="w-6 h-6 mr-2 rtl:mr-0 rtl:ml-2 flex items-center justify-center bg-yellow-100 rounded text-yellow-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                      </svg>
                    </div>
                    <span>
                      {folder.name.length > 30
                        ? folder.name.slice(0, 30) + "..."
                        : folder.name}
                    </span>
                    {isDisabled && (
                      <span className="ml-auto rtl:ml-0 rtl:mr-auto text-xs text-muted-foreground">
                        {t("assets.folderModal.current")}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            {t("assets.folderModal.cancel")}
          </Button>
          <Button onClick={handleMove}>{t("assets.folderModal.move")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoveModal;
