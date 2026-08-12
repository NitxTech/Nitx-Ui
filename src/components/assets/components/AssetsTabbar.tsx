"use client";

import React from "react";

import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { useAssetsConfig } from "../context";
import { useAssetsStore, type AssetsTab } from "../hooks/use-assets-store";
import CustomTabbar, { type AssetsTabItem } from "./CustomTabbar";

const AllIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 19 20"
    fill="none"
    stroke="currentColor"
    className="w-4 h-4 sm:w-[19px] sm:h-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.58337 11.9017C1.58337 8.91613 1.58337 7.42335 2.51087 6.49585C3.43836 5.56836 4.93115 5.56836 7.91671 5.56836H11.0834C14.0689 5.56836 15.5617 5.56836 16.4892 6.49585C17.4167 7.42335 17.4167 8.91613 17.4167 11.9017C17.4167 14.8873 17.4167 16.38 16.4892 17.3075C15.5617 18.235 14.0689 18.235 11.0834 18.235H7.91671C4.93115 18.235 3.43836 18.235 2.51087 17.3075C1.58337 16.38 1.58337 14.8873 1.58337 11.9017Z"
      strokeWidth="1.2"
    />
    <path
      d="M3.16665 6.36003L3.15698 5.56836C3.24599 4.8313 3.43181 4.32195 3.81976 3.93536C4.56436 3.19336 5.76277 3.19336 8.1596 3.19336H10.7018C13.0987 3.19336 14.2971 3.19336 15.0417 3.93536C15.4296 4.32195 15.6154 4.8313 15.7044 5.56836V6.36003"
      strokeWidth="1.2"
    />
    <circle cx="13.8541" cy="9.13086" r="1.1875" strokeWidth="1.2" />
    <path
      d="M1.58337 12.2976L2.97005 11.0843C3.69147 10.4531 4.77876 10.4893 5.45659 11.1671L8.85262 14.5631C9.39668 15.1072 10.2531 15.1814 10.8826 14.739L11.1187 14.5731C12.0245 13.9364 13.2501 14.0102 14.0731 14.7509L16.625 17.0476"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const MediaIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 19 19"
    fill="none"
    className="w-4 h-4 sm:w-[19px] sm:h-[19px]"
  >
    <g clipPath="url(#clip_nitxui_assets_media)">
      <path
        d="M1.58337 9.49992C1.58337 5.76797 1.58337 3.90199 2.74274 2.74262C3.90211 1.58325 5.76809 1.58325 9.50004 1.58325C13.232 1.58325 15.098 1.58325 16.2573 2.74262C17.4167 3.90199 17.4167 5.76797 17.4167 9.49992C17.4167 13.2319 17.4167 15.0978 16.2573 16.2572C15.098 17.4166 13.232 17.4166 9.50004 17.4166C5.76809 17.4166 3.90211 17.4166 2.74274 16.2572C1.58337 15.0978 1.58337 13.2319 1.58337 9.49992Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle
        cx="12.6667"
        cy="6.33333"
        r="1.58333"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M3.95837 10.5348L4.60003 9.93885C5.33317 9.2579 6.47841 9.29612 7.16453 10.0244L9.26045 12.2493C9.68652 12.7015 10.384 12.7625 10.882 12.3909C11.5997 11.8556 12.599 11.9164 13.2464 12.5349L15.0417 14.2501"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip_nitxui_assets_media">
        <rect width="19" height="19" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const DocumentIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 21 20"
    fill="none"
    className="w-4 h-4 sm:w-[19px] sm:h-[19px]"
  >
    <path
      d="M7.16699 14.1667H13.8337"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.16699 10.8333H10.5003"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.333 2.08333V2.5C11.333 4.85702 11.333 6.03553 12.0653 6.76776C12.7975 7.5 13.976 7.5 16.333 7.5H16.7497M17.1663 8.88075V11.6667C17.1663 14.8093 17.1663 16.3807 16.19 17.357C15.2138 18.3333 13.6423 18.3333 10.4997 18.3333C7.35697 18.3333 5.78563 18.3333 4.80932 17.357C3.83301 16.3807 3.83301 14.8093 3.83301 11.6667V7.87986C3.83301 5.17568 3.83301 3.82359 4.5714 2.90777C4.72057 2.72276 4.8891 2.55423 5.07412 2.40506C5.98993 1.66666 7.34202 1.66666 10.0462 1.66666C10.6342 1.66666 10.9281 1.66666 11.1973 1.76167C11.2533 1.78143 11.3082 1.80416 11.3618 1.82979C11.6193 1.95296 11.8272 2.16083 12.2429 2.57656L16.19 6.52369C16.6718 7.00541 16.9126 7.24626 17.0395 7.55255C17.1663 7.85883 17.1663 8.19946 17.1663 8.88075Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    className="w-4 h-4 sm:w-[19px] sm:h-[19px]"
  >
    <path
      d="M7.61982 8.90917L7.79225 8.73675C9.44116 7.08777 12.1147 7.08777 13.7636 8.73675C15.4126 10.3857 15.4126 13.0592 13.7636 14.7081L11.3751 17.0966C9.72616 18.7456 7.05265 18.7456 5.4037 17.0966C3.75476 15.4477 3.75476 12.7742 5.4037 11.1253L5.79066 10.7383"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <path
      d="M14.2097 9.26167L14.5966 8.87475C16.2456 7.22579 16.2456 4.55233 14.5966 2.90338C12.9477 1.25444 10.2742 1.25444 8.62525 2.90338L6.23671 5.29193C4.58776 6.94087 4.58776 9.61434 6.23671 11.2633C7.88566 12.9123 10.5592 12.9123 12.2081 11.2633L12.3805 11.0908"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

interface AssetsTabbarProps {
  className?: string;
  sticky?: boolean;
}

const AssetsTabbar = ({ className, sticky = true }: AssetsTabbarProps) => {
  const { t } = useNitxUiTranslation();
  const { features } = useAssetsConfig();
  const activeTab = useAssetsStore((s) => s.activeTab);
  const setActiveTab = useAssetsStore((s) => s.setActiveTab);

  const tabs: AssetsTabItem[] = [
    { id: "all", label: t("assets.assetsTabbar.all"), icon: AllIcon },
    { id: "media", label: t("assets.assetsTabbar.media"), icon: MediaIcon },
    {
      id: "document",
      label: t("assets.assetsTabbar.documents"),
      icon: DocumentIcon,
    },
    ...(features.links
      ? [
          {
            id: "link",
            label: t("assets.assetsTabbar.links"),
            icon: LinkIcon,
          },
        ]
      : []),
  ];

  return (
    <CustomTabbar
      tabs={tabs}
      sticky={sticky}
      className={className}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as AssetsTab)}
    />
  );
};

export default AssetsTabbar;
