"use client";

import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Check,
  ChevronRight,
  Film,
  FolderOpen,
  Grid2x2,
  Grid2X2Plus,
  Home,
  Layout,
  Link,
  Plus,
  Tv,
  TvMinimalPlay,
} from "lucide-react";

import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { DrawerDialog } from "../../space-selector/ui/drawer-dialog";
import { Button } from "../../space-selector/ui/button";
import SearchInput from "../../space-selector/ui/search-input";
import { Skeleton } from "../../space-selector/ui/skeleton";
import { cn } from "../../space-selector/lib/utils";
import { ChannelSolidPlayIcon } from "../icons/ChannelSolidPlayIcon";
import {
  AddContentModalProps,
  App,
  AppInstance,
  Asset,
  Channel,
  ContentItem,
  Folder,
  Layout as LayoutType,
  Sequence,
  TabId,
} from "../types";

const ALL_TABS: TabId[] = ["Assets", "Links", "Apps", "Sequences", "Layout", "Channels"];

interface PathItem {
  id: string | null;
  label: string;
}

const SkeletonCard = () => (
  <div className="relative flex items-center rounded-md border overflow-hidden shadow border-[#ECEFF1] animate-pulse">
    <Skeleton className="w-[110px] h-[86px] flex-shrink-0 rounded-none" />
    <div className="pl-3 space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-3 w-16" />
    </div>
  </div>
);

const SkeletonGrid = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 py-2">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-40 text-gray-400 dark:text-zinc-500 text-sm">
    No items found
  </div>
);

const documentsImages: Record<string, string> = {
  "application/pdf": "/pdf.svg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "/doc.svg",
};

const AddContentModal = ({
  open,
  onClose,
  onSelect,
  api,
  spaceUuid,
  allowedTabs = ALL_TABS,
  onUploadClick,
  singleSelect = false,
}: AddContentModalProps) => {
  const { t } = useNitxUiTranslation();

  const [activeTab, setActiveTab] = useState<TabId>("Assets");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPath, setCurrentPath] = useState<PathItem[]>([
    { id: null, label: t("addContentModal.allAssets") },
  ]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  // Raw data
  const [assets, setAssets] = useState<Asset[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [layouts, setLayouts] = useState<LayoutType[]>([]);
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [appInstances, setAppInstances] = useState<AppInstance[]>([]);

  // Loading states
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [isLoadingLayouts, setIsLoadingLayouts] = useState(false);
  const [isLoadingSequences, setIsLoadingSequences] = useState(false);
  const [isLoadingChannels, setIsLoadingChannels] = useState(false);
  const [isLoadingApps, setIsLoadingApps] = useState(false);

  // Selections
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [selectedSequence, setSelectedSequence] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedAppInstances, setSelectedAppInstances] = useState<string[]>([]);

  const effectiveTabs = ALL_TABS.filter((t) => allowedTabs.includes(t));
  const firstTab = effectiveTabs[0] ?? "Assets";

  // Reset all state when modal opens
  useEffect(() => {
    if (!open) return;
    setActiveTab(firstTab);
    setSearchTerm("");
    setCurrentPath([{ id: null, label: t("addContentModal.allAssets") }]);
    setCurrentFolderId(null);
    setSelectedAssets([]);
    setSelectedLayout(null);
    setSelectedSequence(null);
    setSelectedChannel(null);
    setSelectedAppInstances([]);
  }, [open]);

  // Fetch assets/folders when open or folder changes
  useEffect(() => {
    if (!open) return;
    setIsLoadingAssets(true);
    api
      .fetchAssets(currentFolderId)
      .then(({ assets, folders }) => {
        setAssets(assets);
        setFolders(folders);
      })
      .catch(console.error)
      .finally(() => setIsLoadingAssets(false));
  }, [open, currentFolderId, api]);

  // Fetch layouts once on open
  useEffect(() => {
    if (!open || !effectiveTabs.includes("Layout")) return;
    setIsLoadingLayouts(true);
    api
      .fetchLayouts()
      .then(setLayouts)
      .catch(console.error)
      .finally(() => setIsLoadingLayouts(false));
  }, [open]);

  // Fetch sequences once on open
  useEffect(() => {
    if (!open || !effectiveTabs.includes("Sequences")) return;
    setIsLoadingSequences(true);
    api
      .fetchSequences()
      .then(setSequences)
      .catch(console.error)
      .finally(() => setIsLoadingSequences(false));
  }, [open]);

  // Fetch channels once on open
  useEffect(() => {
    if (!open || !effectiveTabs.includes("Channels")) return;
    setIsLoadingChannels(true);
    api
      .fetchChannels()
      .then(setChannels)
      .catch(console.error)
      .finally(() => setIsLoadingChannels(false));
  }, [open]);

  // Fetch apps, then instances
  useEffect(() => {
    if (!open || !effectiveTabs.includes("Apps")) return;
    setIsLoadingApps(true);
    api
      .fetchApps(spaceUuid)
      .then((fetchedApps) => {
        setApps(fetchedApps);
        return Promise.all(
          fetchedApps.map((app) => api.fetchAppInstances(spaceUuid, app.id)),
        );
      })
      .then((results) => setAppInstances(results.flat()))
      .catch(console.error)
      .finally(() => setIsLoadingApps(false));
  }, [open, spaceUuid]);

  const term = searchTerm.toLowerCase();

  const filteredAssets = assets.filter((a) => a.name.toLowerCase().includes(term));
  const filteredFolders = folders.filter((f) => f.name.toLowerCase().includes(term));
  const filteredLayouts = layouts.filter((l) => l.name.toLowerCase().includes(term));
  const filteredSequences = sequences.filter((s) => s.name.toLowerCase().includes(term));
  const filteredChannels = channels.filter((c) => c.name.toLowerCase().includes(term));
  const filteredLinkAssets = assets.filter(
    (a) => a.type === "link" && a.name.toLowerCase().includes(term),
  );
  const filteredAppInstances = appInstances.filter(
    (i) =>
      (i.name || "").toLowerCase().includes(term) ||
      (i.app_name || "").toLowerCase().includes(term),
  );

  const formatDate = (dateString: string) =>
    format(new Date(dateString), "MMM d, yyyy");

  const handleFolderClick = (folder: Folder) => {
    setCurrentPath((prev) => [...prev, { id: folder.id, label: folder.name }]);
    setCurrentFolderId(folder.id);
  };

  const handlePathClick = (index: number) => {
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);
    setCurrentFolderId(newPath[newPath.length - 1].id);
  };

  const handleActiveTab = (tab: TabId) => {
    setActiveTab(tab);
    if (tab !== "Assets") {
      setCurrentPath([{ id: null, label: t("addContentModal.allAssets") }]);
      setCurrentFolderId(null);
    }
    setSelectedAssets([]);
    setSelectedLayout(null);
    setSelectedSequence(null);
    setSelectedChannel(null);
  };

  const toggleAssetSelection = (uuid: string) => {
    setSelectedAssets((prev) => {
      if (prev.includes(uuid)) return prev.filter((id) => id !== uuid);
      return singleSelect ? [uuid] : [...prev, uuid];
    });
    setSelectedLayout(null);
  };

  const toggleLayoutSelection = (uuid: string) => {
    setSelectedLayout((prev) => (prev === uuid ? null : uuid));
    setSelectedAssets([]);
    setSelectedSequence(null);
    setSelectedChannel(null);
  };

  const toggleSequenceSelection = (id: string) => {
    setSelectedSequence((prev) => (prev === id ? null : id));
    setSelectedAssets([]);
    setSelectedLayout(null);
    setSelectedChannel(null);
  };

  const toggleChannelSelection = (id: string) => {
    setSelectedChannel((prev) => (prev === id ? null : id));
    setSelectedAssets([]);
    setSelectedLayout(null);
    setSelectedSequence(null);
  };

  const handleAddContent = () => {
    if (selectedAppInstances.length > 0) {
      const selected = appInstances.filter((i) =>
        selectedAppInstances.includes(i.id),
      );
      const items: ContentItem[] = selected.map((inst) => ({
        type: "app",
        screenable_type: "app",
        uuid: inst.id,
        name: inst.name,
        instanceId: inst.id,
        app_id: inst.app_id,
        app: inst.raw,
        is_ready: true,
        duration: { hours: "00", minutes: "01", seconds: "00" },
        created_at: inst.raw?.created_at || new Date().toISOString(),
        updated_at: inst.raw?.updated_at || new Date().toISOString(),
      }));
      onSelect(items);
      onClose();
      return;
    }

    if (selectedAssets.length > 0) {
      const items = assets.filter((a) => selectedAssets.includes(a.uuid));
      if (items.length > 0) onSelect(items as ContentItem[]);
    } else if (selectedLayout) {
      const layout = layouts.find((l) => l.uuid === selectedLayout);
      if (layout)
        onSelect([
          { ...layout, type: "layout", screenable_type: "layout" } as ContentItem,
        ]);
    } else if (selectedSequence) {
      const sequence = sequences.find((s) => s.id === selectedSequence);
      if (sequence)
        onSelect([
          { ...sequence, type: "sequence", screenable_type: "sequence" } as ContentItem,
        ]);
    } else if (selectedChannel) {
      const channel = channels.find((c) => c.id === selectedChannel);
      if (channel)
        onSelect([
          { ...channel, type: "channel", screenable_type: "channel" } as ContentItem,
        ]);
    }

    onClose();
  };

  const hasSelection =
    selectedAssets.length > 0 ||
    selectedAppInstances.length > 0 ||
    !!selectedLayout ||
    !!selectedSequence ||
    !!selectedChannel;

  // ── Sub-components ──────────────────────────────────────────────────────────

  const BreadcrumbNavigation = () => (
    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-zinc-400 mb-3 px-1">
      <Home className="size-4" />
      {currentPath.map((pathItem, index) => (
        <React.Fragment key={index}>
          <button
            onClick={() => handlePathClick(index)}
            className={cn(
              "hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
              index === currentPath.length - 1
                ? "text-gray-900 dark:text-zinc-100 font-medium"
                : "text-gray-500 dark:text-zinc-400",
            )}
          >
            {pathItem.label}
          </button>
          {index < currentPath.length - 1 && (
            <ChevronRight className="size-3 text-gray-400 dark:text-zinc-500" />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderAssetCard = (asset: Asset) => {
    const isSelected = selectedAssets.includes(asset.uuid);
    return (
      <div
        key={asset.uuid}
        className={cn(
          "relative cursor-pointer flex items-center rounded-md border overflow-hidden shadow",
          isSelected
            ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "border-[#ECEFF1] dark:border-zinc-800",
        )}
        onClick={() => toggleAssetSelection(asset.uuid)}
      >
        <div className="w-[110px] h-[86px] flex-shrink-0 relative">
          {asset.type === "image" && (
            <img
              src={asset.is_ready ? asset.image?.thumbnail_path : "/clock.svg"}
              alt={asset.name}
              className={cn(
                "object-cover object-center h-full w-[110px]",
                !asset.is_ready && "bg-amber-50 p-10",
              )}
            />
          )}
          {asset.type === "link" && (
            <img
              src={
                asset.is_ready
                  ? asset.link?.thumbnail_url || "/link-fallback.svg"
                  : "/link-fallback.svg"
              }
              alt={asset.name}
              className="w-full object-cover inset-0 shrink-0"
            />
          )}
          {asset.type === "video" && (
            <>
              <img
                src={asset.is_ready ? asset.video?.thumbnail_path : "/clock.svg"}
                alt={asset.name}
                className={cn(
                  "object-cover object-center h-full w-[110px]",
                  !asset.is_ready && "bg-amber-50 p-20",
                )}
              />
              {asset.is_ready && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <img src="/video-play.svg" alt="video" />
                </div>
              )}
            </>
          )}
          {asset.type === "document" && (
            <img
              src={
                asset.is_ready
                  ? documentsImages[asset.document?.mime_type ?? ""] ?? "/doc.svg"
                  : "/clock.svg"
              }
              alt={asset.name}
              className={cn(
                "object-cover object-center h-full w-[110px]",
                !asset.is_ready && "bg-amber-50",
              )}
            />
          )}
        </div>
        <div className="pl-3">
          <p className="text-sm font-medium truncate">{asset.name.slice(0, 10)}</p>
          <p className="text-[10px] text-gray-500 dark:text-zinc-400">
            {t("addContentModal.upload")} {formatDate(asset.created_at)}
          </p>
        </div>
        <div
          className={cn(
            "w-5 h-5 rounded-full flex absolute right-4 items-center justify-center",
            isSelected
              ? "bg-blue-500"
              : "bg-white dark:bg-card border border-gray-300 dark:border-zinc-700",
          )}
        >
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>
    );
  };

  const renderFolderCard = (folder: Folder) => (
    <div
      key={folder.id}
      className="relative cursor-pointer flex items-center rounded-md border overflow-hidden shadow border-[#ECEFF1] dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-400 transition-colors"
      onClick={() => handleFolderClick(folder)}
    >
      <div className="w-[110px] h-[86px] flex-shrink-0 flex items-center justify-center bg-sky-100">
        <FolderOpen className="text-sky-600 size-8" />
      </div>
      <div className="pl-3">
        <p className="text-sm font-medium truncate">
          {folder.name.length > 20 ? `${folder.name.slice(0, 20)}...` : folder.name}
        </p>
        <p className="text-[10px] text-gray-500 dark:text-zinc-400">
          {folder.assets_count || 0} {t("addContentModal.items")}
        </p>
      </div>
    </div>
  );

  const renderLayoutCard = (layout: LayoutType) => {
    const isSelected = selectedLayout === layout.uuid;
    return (
      <div
        key={layout.uuid}
        className={cn(
          "relative cursor-pointer flex items-center rounded-md border overflow-hidden shadow",
          isSelected
            ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "border-[#ECEFF1] dark:border-zinc-800",
        )}
        onClick={() => toggleLayoutSelection(layout.uuid)}
      >
        <div className="w-[110px] h-[86px] flex-shrink-0 flex items-center justify-center bg-[#FEBC2E]">
          <Layout className="fill-white text-[#FEBC2E] size-8" />
        </div>
        <div className="pl-3">
          <p className="text-sm font-medium truncate">{layout.name}</p>
        </div>
        <div
          className={cn(
            "w-5 h-5 rounded-full flex absolute right-4 items-center justify-center",
            isSelected
              ? "bg-blue-500"
              : "bg-white dark:bg-card border border-gray-300 dark:border-zinc-700",
          )}
        >
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>
    );
  };

  const renderSequenceCard = (sequence: Sequence) => {
    const isSelected = selectedSequence === sequence.id;
    return (
      <div
        key={sequence.id}
        className={cn(
          "relative cursor-pointer flex items-center rounded-md border overflow-hidden shadow",
          isSelected
            ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "border-[#ECEFF1] dark:border-zinc-800",
        )}
        onClick={() => toggleSequenceSelection(sequence.id)}
      >
        <div className="w-[110px] h-[86px] flex-shrink-0 flex items-center justify-center bg-[#00C4CC]">
          <Film className="text-white size-8" />
        </div>
        <div className="pl-3">
          <p className="text-sm font-medium truncate">{sequence.name}</p>
          <p className="text-[10px] text-gray-500 dark:text-zinc-400">
            {sequence.total_duration || "No duration"}
          </p>
        </div>
        <div
          className={cn(
            "w-5 h-5 rounded-full flex absolute right-4 items-center justify-center",
            isSelected
              ? "bg-blue-500"
              : "bg-white dark:bg-card border border-gray-300 dark:border-zinc-700",
          )}
        >
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>
    );
  };

  const renderChannelCard = (channel: Channel) => {
    const isSelected = selectedChannel === channel.id;
    return (
      <div
        key={channel.id}
        className={cn(
          "relative cursor-pointer flex items-center rounded-md border overflow-hidden shadow",
          isSelected
            ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "border-[#ECEFF1] dark:border-zinc-800",
        )}
        onClick={() => toggleChannelSelection(channel.id)}
      >
        <div className="w-[110px] h-[86px] flex-shrink-0 flex items-center justify-center bg-[#575DFC]">
          <ChannelSolidPlayIcon baseColor="white" playColor="#4B53FB" />
        </div>
        <div className="pl-3">
          <p className="text-sm font-medium truncate">{channel.name}</p>
          <p className="text-[10px] text-gray-500 dark:text-zinc-400">
            {channel.isPublished ? "Published" : "Draft"}
          </p>
        </div>
        <div
          className={cn(
            "w-5 h-5 rounded-full flex absolute right-4 items-center justify-center",
            isSelected
              ? "bg-blue-500"
              : "bg-white dark:bg-card border border-gray-300 dark:border-zinc-700",
          )}
        >
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>
    );
  };

  const renderGrid = (children: React.ReactNode[]) => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 py-2">
      {children.map((child, i) => (
        <div
          key={i}
          className="animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{ animationDelay: `${i * 30}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Assets": {
        if (isLoadingAssets) {
          return (
            <div className="space-y-4">
              <BreadcrumbNavigation />
              <div>
                <Skeleton className="h-5 w-16 mb-2" />
                <SkeletonGrid count={3} />
              </div>
              <div>
                <Skeleton className="h-5 w-12 mb-2" />
                <SkeletonGrid count={6} />
              </div>
            </div>
          );
        }
        const hasContent = filteredAssets.length > 0 || filteredFolders.length > 0;
        return (
          <div className="space-y-4">
            <BreadcrumbNavigation />
            {hasContent ? (
              <>
                {filteredFolders.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      {t("addContentModal.folders")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                      {filteredFolders.map((f, i) => (
                        <div
                          key={f.id}
                          className="animate-in fade-in slide-in-from-bottom-4 duration-200"
                          style={{ animationDelay: `${i * 30}ms` }}
                        >
                          {renderFolderCard(f)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {filteredAssets.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      {t("addContentModal.assets")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 py-2">
                      {filteredAssets.map((a, i) => (
                        <div
                          key={a.uuid}
                          className="animate-in fade-in slide-in-from-bottom-4 duration-200"
                          style={{ animationDelay: `${i * 30}ms` }}
                        >
                          {renderAssetCard(a)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        );
      }

      case "Links":
        if (isLoadingAssets) return <SkeletonGrid count={6} />;
        return filteredLinkAssets.length > 0
          ? renderGrid(filteredLinkAssets.map((a) => renderAssetCard(a)))
          : <EmptyState />;

      case "Apps":
        if (isLoadingApps) return <SkeletonGrid count={6} />;
        return filteredAppInstances.length > 0 ? (
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
              {t("addContentModal.apps")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 py-2">
              {filteredAppInstances.map((inst, index) => {
                const isSelected = selectedAppInstances.includes(inst.id);
                return (
                  <div
                    key={inst.id}
                    className={cn(
                      "animate-in fade-in slide-in-from-bottom-4 duration-200 relative cursor-pointer flex items-center rounded-md border overflow-hidden shadow",
                      isSelected
                        ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "border-[#ECEFF1] dark:border-zinc-800",
                    )}
                    style={{ animationDelay: `${index * 30}ms` }}
                    onClick={() =>
                      setSelectedAppInstances((prev) =>
                        prev.includes(inst.id)
                          ? prev.filter((id) => id !== inst.id)
                          : [...prev, inst.id],
                      )
                    }
                  >
                    <div className="w-[86px] h-[86px] flex-shrink-0 flex items-center justify-center bg-gray-50 dark:bg-card">
                      {inst.app_icon_url ? (
                        <img src={inst.app_icon_url} alt={inst.app_name} className="w-10 h-10" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-semibold">
                          {(inst.app_name || "A").charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="pl-3 pr-8 py-2">
                      <p className="text-sm font-medium truncate max-w-[220px]">{inst.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-zinc-400 truncate max-w-[220px]">
                        {inst.app_name}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex absolute right-4 items-center justify-center",
                        isSelected
                          ? "bg-blue-500 dark:bg-blue-600"
                          : "bg-white dark:bg-card border border-gray-300 dark:border-zinc-700",
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyState />
        );

      case "Sequences":
        if (isLoadingSequences) return <SkeletonGrid count={6} />;
        return filteredSequences.length > 0
          ? renderGrid(filteredSequences.map((s) => renderSequenceCard(s)))
          : <EmptyState />;

      case "Channels":
        if (isLoadingChannels) return <SkeletonGrid count={6} />;
        return filteredChannels.length > 0
          ? renderGrid(filteredChannels.map((c) => renderChannelCard(c)))
          : <EmptyState />;

      case "Layout":
        if (isLoadingLayouts) return <SkeletonGrid count={6} />;
        return filteredLayouts.length > 0
          ? renderGrid(filteredLayouts.map((l) => renderLayoutCard(l)))
          : <EmptyState />;

      default:
        return null;
    }
  };

  const tabConfig: Record<TabId, { label: string; icon: React.ElementType }> = {
    Assets: { label: t("addContentModal.assets"), icon: FolderOpen },
    Links: { label: t("addContentModal.links"), icon: Link },
    Apps: { label: t("addContentModal.apps"), icon: Grid2X2Plus },
    Sequences: { label: t("addContentModal.sequences"), icon: TvMinimalPlay },
    Channels: { label: t("addContentModal.channels"), icon: Tv },
    Layout: { label: t("addContentModal.layout"), icon: Grid2x2 },
  };

  return (
    <DrawerDialog size="2xl" open={open} onClose={onClose}>
      <div className="flex flex-col h-[90vh]">
        <div className="px-3 lg:px-5 -mt-5 flex-shrink-0">
          <p className="font-semibold">{t("addContentModal.title")}</p>
        </div>

        {/* Tabs */}
        <div className="w-full px-3 lg:px-5 flex-shrink-0 mt-5">
          <div className="flex border-b w-full">
            {effectiveTabs.map((tabId) => {
              const { label, icon: Icon } = tabConfig[tabId];
              return (
                <Button
                  key={tabId}
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "rounded-none font-light",
                    activeTab === tabId
                      ? "border-b border-b-black text-black dark:text-white"
                      : "text-gray-700 dark:text-zinc-300",
                  )}
                  onClick={() => handleActiveTab(tabId)}
                >
                  <Icon className="stroke-[1.8]" />
                  {label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="px-3 lg:px-5 flex flex-col gap-3 flex-1 min-h-0">
          {/* Search + Upload */}
          <div className="flex gap-3 items-center flex-shrink-0 pt-5">
            <SearchInput onChange={(e) => setSearchTerm(e.target.value)} />
            {onUploadClick && (
              <Button size="lg" onClick={onUploadClick}>
                <span className="w-5 h-5 mr-2 flex items-center justify-center border-[1px] border-gray-200 dark:border-zinc-700 rounded-[4px]">
                  <Plus className="stroke-[1.8]" />
                </span>
                {t("addContentModal.upload")}
              </Button>
            )}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto min-h-0">{renderTabContent()}</div>

          {/* Footer */}
          <div className="flex justify-between items-center gap-4 py-5 flex-shrink-0 border-t">
            <div className="text-sm text-gray-600 dark:text-zinc-400">
              {selectedAssets.length > 0 && (
                <span>
                  {selectedAssets.length}{" "}
                  {selectedAssets.length > 1
                    ? t("addContentModal.assetsSelectedPlural")
                    : t("addContentModal.assetsSelected")}{" "}
                  selected
                </span>
              )}
              {selectedLayout && <span>{t("addContentModal.layoutSelected")}</span>}
              {selectedSequence && <span>{t("addContentModal.sequenceSelected")}</span>}
              {selectedChannel && <span>{t("addContentModal.channelSelected")}</span>}
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="shadow-none"
                onClick={() => {
                  setSelectedAssets([]);
                  setSelectedAppInstances([]);
                  setSelectedLayout(null);
                  setSelectedSequence(null);
                  setSelectedChannel(null);
                  onClose();
                }}
              >
                {t("addContentModal.cancel")}
              </Button>
              <Button
                disabled={!hasSelection}
                onClick={handleAddContent}
                className="disabled:cursor-not-allowed"
              >
                {`${t("addContentModal.add")}${
                  selectedAssets.length > 1 ? ` (${selectedAssets.length})` : ""
                }`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DrawerDialog>
  );
};

export default AddContentModal;
