import React from "react";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";

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
  const { t } = useNitxUiTranslation();
  const defaultTitle = title || t("emptyList.noItemsFound");
  const defaultDescription = description || t("emptyList.defaultDescription");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <img
        src="/illustrations/empty-spaces.svg"
        alt={t("emptyList.imageAlt")}
      />
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
