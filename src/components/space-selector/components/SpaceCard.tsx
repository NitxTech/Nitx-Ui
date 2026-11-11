"use client";

import { cn } from "../lib/utils";
import { Card } from "../ui/card";
import { MoreHorizontal, Pen, Trash2, Users2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import { useSpaceSelector } from "../context";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { removeSpaceRecent } from "../lib/space-recent";
import SpaceAvatar, { getSpaceImageUrl } from "./SpaceAvatar";

interface SpaceCardProps {
  id: string;
  name: string;
  members: number;
  className?: string;
  imageUrl?: string | null;
}

import { Skeleton } from "../../ui/skeleton";

export const SpaceCardSkeleton = () => {
  return (
    <Card className="shadow-none bg-neutral-50 border-[.5px] border-neutral-200 p-3 w-full lg:w-auto min-w-72 flex gap-4 dark:bg-neutral-900 dark:border-neutral-800">
      {/* Icon placeholder */}
      <div className="w-full flex-1 flex gap-4 items-center">
        <Skeleton className="w-10 h-10 lg:w-[50px] lg:h-[50px] rounded-lg shrink-0" />

        {/* Name + members placeholder */}
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-3.5 w-32 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>
      </div>

      {/* Dropdown button placeholder */}
      <Skeleton className="size-10 rounded-sm shrink-0" />
    </Card>
  );
};


const SpaceCard = ({ id, name, members, className, imageUrl }: SpaceCardProps) => {
  const { t } = useNitxUiTranslation();
  const [isLoading, setIsLoading] = useState(false);
  // Use package context instead of global hooks
  const {
    setModal,
    setModalProps: setProps,
    api,
    spaces,
    refreshSpaces,
    authUser,
  } = useSpaceSelector();

  const targetSpace = spaces?.find(
    (s) => s.space_uuid === id || s.proxyId === id || s.uuid === id
  );

  const effectiveImageUrl =
    imageUrl !== undefined ? imageUrl : getSpaceImageUrl(targetSpace);

  const handleDeleteSpace = async () => {
    if (!api?.deleteSpace) return;
    setIsLoading(true);
    try {
      await api.deleteSpace(id);
      removeSpaceRecent(id, authUser);
      toast.success(t("spaceCard.spaceDeletedSuccessfully", { name }));
      // Use refreshSpaces instead of removeSpace in package context
      refreshSpaces();
    } catch (error) {
      console.error("Error deleting space:", error);
      toast.error(t("spaceCard.errorDeletingSpace"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={cn(
        "shadow-none bg-neutral-50 border-[.5px] border-neutral-200 p-3 w-full lg:w-auto min-w-72 flex gap-4 text-neutral-900 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-50",
        className
      )}
    >
      <div className="w-full flex-1 flex gap-4 items-center">
        <SpaceAvatar
          name={name}
          imageUrl={effectiveImageUrl}
          size="md"
          fallbackType="cardBuilding"
          className="rounded-lg bg-[#007AFF1A] dark:bg-[#007AFF20]"
        />
        <div className="flex flex-col w-full">
          <p className="text-sm max-w-[10rem] truncate">{name}</p>
          <h2
            className={cn(
              "text-xs text-neutral-600 dark:text-neutral-300"
            )}
          >
            {members} {t("spaceCard.members")}
          </h2>
        </div>
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            className="size-10 hover:bg-neutral-200/40 text-neutral-700 flex items-center justify-center rounded-sm dark:hover:bg-neutral-800 dark:text-neutral-200"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <MoreHorizontal className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setModal("renameSpace");
              setProps({
                renameSpaceModalProps: {
                  spaceId: id,
                  initialName: name,
                },
                initialTab: "settings",
              });
            }}
            className="flex items-center"
          >
            <Pen className="w-4 h-4 mr-1" />
            {t("spaceCard.rename")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setModal("membersAndNumbers");
              setProps({
                manageSpaceMembers: {
                  spaceId: id,
                  spaceName: name,
                },
              });
            }}
            className="flex items-center"
          >
            <Users2 className="w-4 h-4 mr-1" />
            {t("spaceCard.manageMembers")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              // Enable Delete Modal
              setModal("deleteConfirmation");
              setProps({
                deleteModalInfo: {
                  title: t("spaceCard.deleteSpaceConfirmation", { name }),
                  description: t("spaceCard.actionCannotBeUndone"),
                  onDelete: handleDeleteSpace,
                },
              });
            }}
            disabled={isLoading}
            className="flex items-center text-red-500"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            {t("spaceCard.remove")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
};

export default SpaceCard;
