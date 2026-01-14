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
      <div className="relative w-[214px] h-[170px] bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
        {/* Placeholder for image to avoid missing asset issues */}
        <span>No Image</span>
      </div>
      <p className="text-lg font-semibold text-center">{defaultTitle}</p>
      <p className="text-zinc-600 text-sm max-w-[499px] text-center">
        {defaultDescription}
      </p>
    </div>
  );
};

export default EmptyList;
