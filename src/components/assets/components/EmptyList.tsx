"use client";

import React from "react";

import { cn } from "../../../lib/utils";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";

interface EmptyListProps {
  title?: string;
  description?: string;
  /** Consumer-public image URL (e.g. "/empty/no-media.svg"). Optional. */
  image?: string;
  className?: string;
}

const EmptyList = ({ title, description, image, className }: EmptyListProps) => {
  const { t } = useNitxUiTranslation();

  return (
    <div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center gap-5",
        className
      )}
    >
      {image && (
        <div className="relative w-[214px] h-[170px]">
          <img
            src={image}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <p className="text-lg font-semibold text-center">
        {title ?? t("assets.emptyList.title")}
      </p>
      <p className="text-muted-foreground text-sm max-w-[499px] text-center">
        {description ?? t("assets.emptyList.description")}
      </p>
    </div>
  );
};

export default EmptyList;
