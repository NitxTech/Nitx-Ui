"use client";

import React, { useEffect, useState } from "react";
import { FolderSymlink, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { useAssetsConfig } from "../context";
import {
  useAssetsStore,
  type AssetsViewType,
} from "../hooks/use-assets-store";
import {
  assetKeys,
  useAssetsQuery,
  useBulkDeleteFoldersMutation,
  useDeleteAssetMutation,
  useDeleteFolderMutation,
  useMoveAssetMutation,
  useMoveFolderMutation,
  useRenameAssetMutation,
  useRenameFolderMutation,
} from "../hooks/use-assets-query";
import { useLazyLoading } from "../hooks/use-lazy-loading";
import type { Asset, Folder } from "../types";
import AssetsTabbar from "./AssetsTabbar";
import AssetsHeader from "./AssetsHeader";
import AssetCard, { AssetCardSkeleton } from "./AssetCard";
import FolderCard from "./FolderCard";
import AssetsPreview from "./AssetsPreview";
import EmptyList from "./EmptyList";
import LazyLoadingSkeleton from "./LazyLoadingSkeleton";
import ConfirmDeleteDialog, {
  type ConfirmDeleteState,
} from "./ConfirmDeleteDialog";
import MoveModal from "./modals/MoveModal";
import CreateFolderModal from "./modals/CreateFolderModal";
import AssetsUploadModal from "./modals/UploadModal";
import NewLinkModal from "./modals/NewLinkModal";

export interface AssetsBrowserProps {
  className?: string;
  /**
   * Reports the localized page title so the consumer can surface it in its
   * own topbar (signage renders it in a custom topbar component).
   */
  onTitleChange?: (title: string) => void;
  /** Consumer-public empty state illustrations per tab. */
  emptyStateImages?: Partial<Record<"media" | "document" | "link", string>>;
  /** Extra per-asset action buttons (e.g. signage's "send to screen"). */
  renderAssetActions?: (asset: Asset) => React.ReactNode;
  /** Extra folder dropdown menu items (e.g. signage's "create sequence"). */
  renderFolderMenuItems?: (folder: Folder) => React.ReactNode;
}

const getExtensionFromMimeType = (mimeType: string): string => {
  const mimeToExt: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "video/mp4": ".mp4",
    "video/quicktime": ".mov",
    "video/x-msvideo": ".avi",
    "video/webm": ".webm",
    "application/pdf": ".pdf",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
    "application/vnd.ms-excel": ".xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      ".xlsx",
    "application/vnd.ms-powerpoint": ".ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      ".pptx",
    "text/plain": ".txt",
  };

  return mimeToExt[mimeType] || "";
};

const saveBlob = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const AssetsBrowser = ({
  className,
  onTitleChange,
  emptyStateImages,
  renderAssetActions,
  renderFolderMenuItems,
}: AssetsBrowserProps) => {
  const { t } = useNitxUiTranslation();
  const { api, spaceUuid, features } = useAssetsConfig();
  const queryClient = useQueryClient();

  const path = useAssetsStore((s) => s.path);
  const addPath = useAssetsStore((s) => s.addPath);
  const activeTab = useAssetsStore((s) => s.activeTab);
  const renamingItemId = useAssetsStore((s) => s.renamingItemId);
  const setRenamingItemId = useAssetsStore((s) => s.setRenamingItemId);
  const viewType = useAssetsStore((s) => s.viewType);
  const setViewType = useAssetsStore((s) => s.setViewType);

  const currentFolderId = features.folders
    ? path[path.length - 1]?.id || null
    : null;

  const { data, isLoading: isFetching } = useAssetsQuery(currentFolderId);
  const assetsRaw = data?.assets || [];
  const foldersRaw = data?.folders || [];

  // Stabilize arrays to prevent effect loops on referentially-new results.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const assets = React.useMemo(() => assetsRaw, [JSON.stringify(assetsRaw)]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const folders = React.useMemo(() => foldersRaw, [JSON.stringify(foldersRaw)]);

  // Mutations
  const { mutateAsync: deleteAssets } = useDeleteAssetMutation(currentFolderId);
  const { mutateAsync: deleteFolder } = useDeleteFolderMutation(currentFolderId);
  const { mutateAsync: deleteFolders } =
    useBulkDeleteFoldersMutation(currentFolderId);
  const { mutateAsync: renameAsset } = useRenameAssetMutation(currentFolderId);
  const { mutateAsync: renameFolder } = useRenameFolderMutation(currentFolderId);
  const { mutateAsync: moveAssets } = useMoveAssetMutation(currentFolderId);
  const { mutateAsync: moveFolder } = useMoveFolderMutation(currentFolderId);

  // UI state
  const [enableCheckbox, setEnableCheckbox] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [lastClickedAsset, setLastClickedAsset] = useState<string | null>(null);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [itemsToMove, setItemsToMove] = useState<string[]>([]);
  const [moveItemType, setMoveItemType] = useState<"asset" | "folder">("asset");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showNewLinkModal, setShowNewLinkModal] = useState(false);
  const [confirmDelete, setConfirmDelete] =
    useState<ConfirmDeleteState | null>(null);
  const [draggedAssets, setDraggedAssets] = useState<string[]>([]);
  const [dropTarget, setDropTarget] = useState<string | null>(null);

  useEffect(() => {
    onTitleChange?.(t("assets.headerWithCustomTabbar.asset"));
  }, [onTitleChange, t]);

  useEffect(() => {
    if (!enableCheckbox) {
      setSelected([]);
    }
  }, [enableCheckbox]);

  // Tab + search filtering
  const filteredAssets = React.useMemo(() => {
    let filtered = assets;
    if (activeTab === "media") {
      filtered = assets.filter(
        (a) => a.type === "image" || a.type === "video"
      );
    } else if (activeTab === "document") {
      filtered = assets.filter((a) => a.type === "document");
    } else if (activeTab === "link") {
      filtered = assets.filter((a) => a.type === "link");
    }

    if (searchTerm) {
      const lowercased = searchTerm.toLowerCase();
      filtered = filtered.filter((a) =>
        a.name.toLowerCase().includes(lowercased)
      );
    }
    return filtered;
  }, [assets, activeTab, searchTerm]);

  const filteredDirectories = React.useMemo(() => {
    if (!features.folders || activeTab !== "all") return [] as Folder[];
    if (searchTerm) {
      const lowercased = searchTerm.toLowerCase();
      return folders.filter((f) => f.name.toLowerCase().includes(lowercased));
    }
    return folders;
  }, [folders, activeTab, searchTerm, features.folders]);

  const {
    visibleItems: visibleAssets,
    loadingMore,
    hasMore,
    observerRef,
  } = useLazyLoading(filteredAssets, {
    itemsPerBatch: 12,
    rootMargin: "200px",
  });

  // Keyboard shortcuts: select-all, escape, preview arrows
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "a" && renamingItemId === null) {
        e.preventDefault();
        const folderIds = filteredDirectories.map((folder) => folder.id);
        const assetUuids = filteredAssets.map((asset) => asset.uuid);
        setSelected([...assetUuids, ...folderIds]);
        if (!enableCheckbox) {
          setEnableCheckbox(true);
        }
      }

      if (e.key === "Escape") {
        setSelected([]);
        setEnableCheckbox(false);
        setPreviewAsset(null);
      }

      if (previewAsset) {
        if (e.key === "ArrowLeft") {
          handlePreviewNavigation("prev");
        } else if (e.key === "ArrowRight") {
          handlePreviewNavigation("next");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filteredAssets,
    filteredDirectories,
    enableCheckbox,
    previewAsset,
    previewIndex,
    renamingItemId,
  ]);

  const onDownload = async (asset: Asset) => {
    try {
      const downloadToast = toast.loading(
        t("assets.assetList.downloading", { name: asset.name })
      );

      const blob = await api.downloadAsset(asset.uuid);

      let fileName = asset.name || `download-${asset.uuid}`;
      if (
        asset.type === "image" &&
        !fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i)
      ) {
        fileName += getExtensionFromMimeType(
          asset.image?.mime_type || blob.type || "image/jpeg"
        );
      } else if (
        asset.type === "video" &&
        !fileName.match(/\.(mp4|mov|avi|webm)$/i)
      ) {
        fileName += getExtensionFromMimeType(
          asset.video?.mime_type || blob.type || "video/mp4"
        );
      } else if (
        asset.type === "document" &&
        !fileName.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i)
      ) {
        fileName += getExtensionFromMimeType(
          asset.document?.mime_type || blob.type || "application/pdf"
        );
      }

      saveBlob(blob, fileName);
      toast.dismiss(downloadToast);
      toast.success(
        t("assets.assetList.downloadedSuccess", { name: asset.name })
      );
    } catch (error) {
      console.error("Error downloading asset:", error);
      toast.error(t("assets.assetList.downloadFailed", { name: asset.name }));
    }
  };

  const onDownloadFolder = async (folder: Folder) => {
    try {
      const downloadToast = toast.loading(
        t("assets.folderCard.preparingDownload")
      );
      const blob = await api.downloadFolderContents(folder.id);
      saveBlob(blob, `${folder.name}-${folder.id}.zip`);
      toast.dismiss(downloadToast);
      toast.success(
        t("assets.folderCard.folderDownloadedSuccess", { name: folder.name })
      );
    } catch (error) {
      console.error("Error downloading folder:", error);
      toast.error(
        t("assets.folderCard.folderDownloadFailed", { name: folder.name })
      );
    }
  };

  const requestDeleteAsset = (asset: Asset) => {
    setConfirmDelete({
      title: t("assets.assetList.deleteAsset"),
      description: t("assets.assetList.deleteConfirm", { name: asset.name }),
      onConfirm: async () => {
        const deletingToast = toast.loading(
          t("assets.assetList.deleting", { name: asset.name })
        );
        try {
          await deleteAssets([asset.uuid]);
          toast.success(
            t("assets.assetList.deletedSuccess", { name: asset.name }),
            { id: deletingToast }
          );
        } catch (error) {
          console.error("Error deleting asset:", error);
          toast.error(
            t("assets.assetList.deleteFailed", { name: asset.name }),
            { id: deletingToast }
          );
        }
      },
    });
  };

  const requestDeleteFolder = (folder: Folder) => {
    setConfirmDelete({
      title: t("assets.folderCard.deleteFolder"),
      description: t("assets.folderCard.deleteConfirm", { name: folder.name }),
      onConfirm: async () => {
        const deletingToast = toast.loading(
          t("assets.assetList.deleting", { name: folder.name })
        );
        try {
          await deleteFolder(folder.id);
          toast.success(
            t("assets.assetList.deletedSuccess", { name: folder.name }),
            { id: deletingToast }
          );
        } catch (error) {
          console.error("Error deleting folder:", error);
          toast.error(
            t("assets.assetList.deleteFailed", { name: folder.name }),
            { id: deletingToast }
          );
        }
      },
    });
  };

  const handleBulkDelete = () => {
    const assetUuids = filteredAssets
      .filter((a) => selected.includes(a.uuid))
      .map((a) => a.uuid);
    const folderIds = filteredDirectories
      .filter((f) => selected.includes(f.id))
      .map((f) => f.id);

    setConfirmDelete({
      title: t("assets.assetList.deleteItems", {
        count: selected.length,
        plural: selected.length > 1 ? "s" : "",
      }),
      description: t("assets.assetList.deleteItemsConfirm", {
        count: selected.length,
      }),
      onConfirm: async () => {
        const deletingToast = toast.loading(
          t("assets.assetList.deletingItems")
        );
        try {
          if (assetUuids.length > 0) {
            await deleteAssets(assetUuids);
          }
          if (folderIds.length > 0) {
            await deleteFolders(folderIds);
          }
          toast.success(t("assets.assetList.itemsDeletedSuccess"), {
            id: deletingToast,
          });
        } catch (error) {
          console.error("Error deleting asset/folder:", error);
          toast.error(t("assets.assetList.itemsDeleteFailed"), {
            id: deletingToast,
          });
        } finally {
          setEnableCheckbox(false);
        }
      },
    });
  };

  const handleMove = (itemId: string, type: "asset" | "folder") => {
    setItemsToMove([itemId]);
    setMoveItemType(type);
    setShowMoveModal(true);
  };

  const handleBulkMove = () => {
    setItemsToMove(selected);
    setMoveItemType("asset");
    setShowMoveModal(true);
  };

  const performMove = async (destinationId: string | null) => {
    try {
      if (moveItemType === "folder") {
        await moveFolder({ id: itemsToMove[0], parentId: destinationId });
      } else {
        await moveAssets({ uuids: itemsToMove, destinationId });
      }
      setSelected([]);
      setEnableCheckbox(false);
    } catch (error) {
      // Error toast handled by the mutation.
      console.error("Error moving items:", error);
    }
  };

  const handleAssetClick = (e: React.MouseEvent, assetId: string) => {
    e.stopPropagation();

    if (!enableCheckbox) {
      const assetIndex = filteredAssets.findIndex((a) => a.uuid === assetId);
      const asset = filteredAssets[assetIndex];
      if (!asset) return;

      setPreviewAsset(asset);
      setPreviewIndex(assetIndex);
      return;
    }

    if (e.shiftKey && lastClickedAsset) {
      const allAssetIds = filteredAssets.map((asset) => asset.uuid);
      const currentIndex = allAssetIds.indexOf(assetId);
      const lastIndex = allAssetIds.indexOf(lastClickedAsset);

      if (currentIndex !== -1 && lastIndex !== -1) {
        const start = Math.min(currentIndex, lastIndex);
        const end = Math.max(currentIndex, lastIndex);
        const rangeSelection = allAssetIds.slice(start, end + 1);

        if (e.ctrlKey || e.metaKey) {
          setSelected((prev) => {
            const newSelection = [...prev];
            rangeSelection.forEach((id) => {
              if (!newSelection.includes(id)) {
                newSelection.push(id);
              }
            });
            return newSelection;
          });
        } else {
          setSelected(rangeSelection);
        }
      }
    } else {
      setSelected((prev) => {
        if (prev.includes(assetId)) {
          return prev.filter((id) => id !== assetId);
        }
        return [...prev, assetId];
      });
    }

    setLastClickedAsset(assetId);
  };

  const handleFolderClick = (e: React.MouseEvent, folder: Folder) => {
    e.stopPropagation();
    if (enableCheckbox) {
      setSelected((prev) => {
        if (prev.includes(folder.id)) {
          return prev.filter((id) => id !== folder.id);
        }
        return [...prev, folder.id];
      });
    } else {
      addPath({ id: folder.id, label: `${folder.name}` });
    }
  };

  // Prefetch folder contents on hover for instant navigation
  const handleFolderHover = (folderId: string) => {
    queryClient.prefetchQuery({
      queryKey: assetKeys.list(spaceUuid, folderId),
      queryFn: () => api.fetchAssetsAndFolders(folderId),
      staleTime: 1000 * 60 * 5,
    });
  };

  const handlePreviewNavigation = (direction: "prev" | "next") => {
    if (!previewAsset) return;

    const newIndex =
      direction === "prev"
        ? Math.max(0, previewIndex - 1)
        : Math.min(filteredAssets.length - 1, previewIndex + 1);

    setPreviewIndex(newIndex);
    setPreviewAsset(filteredAssets[newIndex]);
  };

  const handleRenameAsset = async (asset: Asset, newName: string) => {
    const normalize = (s: string) => s.trim().toLowerCase();
    const hasDuplicate = assets.some(
      (a) =>
        a.uuid !== asset.uuid &&
        a.folder_id === asset.folder_id &&
        a.type === asset.type &&
        normalize(a.name) === normalize(newName)
    );

    if (hasDuplicate) {
      toast.error(
        t("assets.assetCard.duplicateNameError", {
          type: asset.type,
          name: newName,
        })
      );
      setRenamingItemId(null);
      return;
    }

    const renameToast = toast.loading(
      t("assets.assetList.renaming", { name: newName })
    );
    try {
      await renameAsset({ id: asset.uuid, name: newName });
      toast.dismiss(renameToast);
    } catch (error) {
      console.error("Error renaming asset:", error);
      toast.dismiss(renameToast);
    }
  };

  const handleRenameFolder = async (folder: Folder, newName: string) => {
    const normalize = (s: string) => s.trim().toLowerCase();
    const hasDuplicate = folders.some(
      (f) =>
        f.id !== folder.id &&
        f.parent_id === folder.parent_id &&
        normalize(f.name) === normalize(newName)
    );

    if (hasDuplicate) {
      toast.error(
        t("assets.folderCard.duplicateFolderError", { name: newName })
      );
      setRenamingItemId(null);
      return;
    }

    const renameToast = toast.loading(
      t("assets.assetList.renamingFolder", { name: newName })
    );
    try {
      await renameFolder({
        id: folder.id,
        name: newName,
        parentId: folder.parent_id,
      });
      toast.dismiss(renameToast);
    } catch (error) {
      console.error("Error renaming folder:", error);
      toast.dismiss(renameToast);
    }
  };

  // Drag and drop (features.dragDrop)
  const handleAssetDragStart = (e: React.DragEvent, assetId: string) => {
    const itemsToDrag =
      selected.includes(assetId) && selected.length > 1 ? selected : [assetId];

    setDraggedAssets(itemsToDrag);
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        type: "assets",
        items: itemsToDrag,
      })
    );
    e.dataTransfer.effectAllowed = "move";
  };

  const handleAssetDragEnd = () => {
    setDraggedAssets([]);
    setDropTarget(null);
  };

  const handleFolderDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleFolderDragEnter = (e: React.DragEvent, folderId: string) => {
    e.preventDefault();
    setDropTarget(folderId);
  };

  const handleFolderDragLeave = (e: React.DragEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDropTarget(null);
    }
  };

  const handleFolderDrop = async (e: React.DragEvent, targetFolderId: string) => {
    e.preventDefault();
    setDropTarget(null);

    try {
      const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));

      if (dragData.type === "assets" && dragData.items.length > 0) {
        await moveAssets({
          uuids: dragData.items,
          destinationId: targetFolderId,
        });

        if (selected.some((id) => dragData.items.includes(id))) {
          setSelected([]);
          setEnableCheckbox(false);
        }
      }
    } catch (error) {
      console.error("Error moving assets:", error);
      toast.error(t("assets.assetList.assetsMoveFailed"));
    } finally {
      setDraggedAssets([]);
    }
  };

  let emptyImage: string | undefined;
  if (!filteredAssets.length && !filteredDirectories.length) {
    if (activeTab === "media") emptyImage = emptyStateImages?.media;
    else if (activeTab === "document") emptyImage = emptyStateImages?.document;
    else if (activeTab === "link") emptyImage = emptyStateImages?.link;
  }

  const isEmpty =
    !isFetching && !filteredAssets.length && !filteredDirectories.length;

  return (
    <div className={cn("w-full h-full relative dark:bg-card", className)}>
      {/* Tabbar - sticky at top */}
      <div className="sticky top-0 z-20 bg-white dark:bg-card">
        <AssetsTabbar />
      </div>
      <div className="w-full h-full p-6 flex flex-col">
        {/* Header - below tabbar */}
        <div className="sticky top-[43px] w-full z-10 bg-zinc-50 dark:bg-card mb-5">
          <AssetsHeader
            viewType={viewType}
            onChangeView={(v: AssetsViewType) => setViewType(v)}
            enableCheckbox={enableCheckbox}
            onEnableCheckbox={setEnableCheckbox}
            onSearch={(e) => setSearchTerm(e.target.value)}
            onUploadClick={() => setShowUploadModal(true)}
            onNewFolderClick={() => setShowCreateFolderModal(true)}
            onCreateLinkClick={
              features.links ? () => setShowNewLinkModal(true) : undefined
            }
          />
        </div>

        {isEmpty ? (
          <EmptyList image={emptyImage} />
        ) : (
          <div className="h-full z-0">
            <div
              className={cn(
                "h-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-4 pb-5",
                viewType === "list" &&
                  "grid-cols-1 md:grid-cols-1 xl:grid-cols-1",
                viewType === "grid-list" &&
                  "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3"
              )}
            >
              {filteredDirectories.map((folder, i) => (
                <div
                  key={folder.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-200"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <FolderCard
                    data={folder}
                    viewType={viewType}
                    onMove={handleMove}
                    allowSelect={enableCheckbox}
                    onClick={handleFolderClick}
                    onMouseEnter={() =>
                      !enableCheckbox && handleFolderHover(folder.id)
                    }
                    selected={selected.includes(folder.id)}
                    onDragOver={
                      features.dragDrop ? handleFolderDragOver : undefined
                    }
                    onDragEnter={
                      features.dragDrop
                        ? (e) => handleFolderDragEnter(e, folder.id)
                        : undefined
                    }
                    onDragLeave={
                      features.dragDrop ? handleFolderDragLeave : undefined
                    }
                    onDrop={
                      features.dragDrop
                        ? (e) => handleFolderDrop(e, folder.id)
                        : undefined
                    }
                    isDropTarget={dropTarget === folder.id}
                    onDelete={() => requestDeleteFolder(folder)}
                    onRename={(newName) => handleRenameFolder(folder, newName)}
                    onDownload={onDownloadFolder}
                    renderMenuItems={renderFolderMenuItems}
                  />
                </div>
              ))}
              {visibleAssets.map((asset, i) => (
                <div
                  key={asset.uuid}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-200"
                  style={{
                    transitionDelay: `${(filteredDirectories.length + i) * 30}ms`,
                  }}
                >
                  <AssetCard
                    data={asset}
                    viewType={viewType}
                    allowSelect={enableCheckbox}
                    onClick={(e) => handleAssetClick(e, asset.uuid)}
                    onMove={handleMove}
                    selected={selected.includes(asset.uuid)}
                    draggable={features.dragDrop && !enableCheckbox}
                    onDragStart={
                      features.dragDrop
                        ? (e) => handleAssetDragStart(e, asset.uuid)
                        : undefined
                    }
                    onDragEnd={
                      features.dragDrop ? handleAssetDragEnd : undefined
                    }
                    isDragging={draggedAssets.includes(asset.uuid)}
                    onDelete={() => requestDeleteAsset(asset)}
                    onRename={(newName) => handleRenameAsset(asset, newName)}
                    onDownload={onDownload}
                    renderActions={renderAssetActions}
                  />
                </div>
              ))}

              {loadingMore && (
                <LazyLoadingSkeleton viewType={viewType} count={6} />
              )}

              {hasMore && !loadingMore && (
                <div ref={observerRef} className="h-4 w-full" />
              )}

              {isFetching &&
                !filteredAssets.length &&
                !filteredDirectories.length &&
                [...Array(20)].map((_, i) => (
                  <AssetCardSkeleton viewType={viewType} key={i} />
                ))}
            </div>
          </div>
        )}
      </div>

      {enableCheckbox && selected.length > 0 && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-10 z-50 shadow-md w-full max-w-lg p-2 px-4 rounded-[14px] bg-white dark:bg-card flex items-center justify-between">
          <p className="text-sm">
            {t("assets.assetList.itemsSelected", {
              count: selected.length,
            })}
          </p>
          <Button
            variant="ghost"
            className="flex gap-4 rounded-[8px] px-4"
            onClick={handleBulkMove}
          >
            <FolderSymlink />
            {t("assets.assetList.moveTo")}
          </Button>
          <Button
            onClick={handleBulkDelete}
            variant="ghost"
            className="flex gap-4 px-4 rounded-[8px] text-rose-500 hover:bg-rose-700 focus:text-rose-200 hover:text-rose-100 transition-all"
          >
            <Trash2 /> {t("assets.assetList.delete")}
          </Button>
        </div>
      )}

      {previewAsset && (
        <AssetsPreview
          previewAsset={previewAsset}
          previewIndex={previewIndex}
          filteredAssets={filteredAssets}
          setPreviewAsset={setPreviewAsset}
          setPreviewIndex={setPreviewIndex}
          handlePreviewNavigation={handlePreviewNavigation}
          type={activeTab}
          onDownload={onDownload}
        />
      )}

      {features.folders && (
        <MoveModal
          isOpen={showMoveModal}
          onClose={() => setShowMoveModal(false)}
          onMove={performMove}
          itemsToMove={itemsToMove}
          moveItemType={moveItemType}
        />
      )}

      {features.folders && (
        <CreateFolderModal
          open={showCreateFolderModal}
          onClose={() => setShowCreateFolderModal(false)}
        />
      )}

      {features.upload && (
        <AssetsUploadModal
          open={showUploadModal}
          onClose={() => setShowUploadModal(false)}
        />
      )}

      {features.links && (
        <NewLinkModal
          open={showNewLinkModal}
          onClose={() => setShowNewLinkModal(false)}
        />
      )}

      <ConfirmDeleteDialog
        state={confirmDelete}
        onClose={() => setConfirmDelete(null)}
      />
    </div>
  );
};

export default AssetsBrowser;
