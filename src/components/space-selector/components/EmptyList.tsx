import React from "react";
import { useTranslation } from "react-i18next";

interface EmptyListProps {
  title?: string;
  description?: string;
  image?: string;
}

const EmptyList = ({
  title,
  description,
  image = "/empty-list.png", // Asset handling in package might be tricky
}: EmptyListProps) => {
  const { t } = useTranslation("components");
  const defaultTitle = title || t("emptyList.noItemsFound");
  const defaultDescription = description || t("emptyList.defaultDescription");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <div className="relative w-[214px] h-[170px] bg-neutral-100 rounded-md flex items-center justify-center text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500">
        {/* Placeholder for image to avoid missing asset issues */}
        <span>No Image</span>
      </div>
      <p className="text-lg font-semibold text-center text-neutral-900 dark:text-neutral-50">
        {defaultTitle}
      </p>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-[499px] text-center">
        {defaultDescription}
      </p>
    </div>
  );
};

export default EmptyList;
