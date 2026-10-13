import React from "react";
import { useNitxUiTranslation } from "../../i18n/nitxuilib";
import { cn } from "../../lib/utils";
import { NitxLogoWatermark } from "./nitx-logo-watermark";
import type { AdBlockerPageProps } from "./types";

/**
 * 12-lobed smooth scalloped badge icon matching the official Nitx ad-blocker design.
 */
export const AdBlockerBadgeIcon: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-9 shrink-0", className)}
      aria-hidden="true"
    >
      {/* 12-lobed floral badge */}
      <path
        d="M16 2.5C17.3 2.5 18.3 3.4 19.3 4C20.4 4.5 21.7 4.7 22.8 5.5C23.9 6.3 24.4 7.6 25.1 8.7C25.8 9.8 26.9 10.7 27.2 12C27.6 13.2 27.2 14.5 27.2 15.8C27.2 17.1 27.6 18.4 27.2 19.6C26.9 20.9 25.8 21.8 25.1 22.9C24.4 24 23.9 25.3 22.8 26.1C21.7 26.9 20.4 27.1 19.3 27.7C18.3 28.3 17.3 29.2 16 29.2C14.7 29.2 13.7 28.3 12.7 27.7C11.6 27.1 10.3 26.9 9.2 26.1C8.1 25.3 7.6 24 6.9 22.9C6.2 21.8 5.1 20.9 4.8 19.6C4.4 18.4 4.8 17.1 4.8 15.8C4.8 14.5 4.4 13.2 4.8 12C5.1 10.7 6.2 9.8 6.9 8.7C7.6 7.6 8.1 6.3 9.2 5.5C10.3 4.7 11.6 4.5 12.7 4C13.7 3.4 14.7 2.5 16 2.5Z"
        fill="#FEE2E2"
        className="dark:fill-rose-950/70"
      />
      {/* Info dot */}
      <circle
        cx="16"
        cy="11.2"
        r="1.3"
        fill="#E11D48"
        className="dark:fill-rose-400"
      />
      {/* Info vertical stem */}
      <rect
        x="14.8"
        y="14.3"
        width="2.4"
        height="7.2"
        rx="1.2"
        fill="#E11D48"
        className="dark:fill-rose-400"
      />
    </svg>
  );
};

/**
 * Full-screen Ad Blocker detected design page.
 * Features centered scalloped info badge, title, localized instructions,
 * and the oversized Nitx brand watermark.
 */
export const AdBlockerPage: React.FC<AdBlockerPageProps> = ({
  title,
  allowUrl = "https://nitx.io",
  serviceName,
  description,
  showRecheckButton = false,
  className,
  onRecheck,
}) => {
  const { t } = useNitxUiTranslation();

  const resolvedTitle = title || t("adBlocker.title");
  const resolvedService = serviceName || t("adBlocker.pageDefaultService");

  return (
    <main
      role="alert"
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white p-6 select-none dark:bg-black",
        className,
      )}
    >
      {/* Central Content */}
      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center justify-center text-center">
        {/* Scalloped badge */}
        <div className="flex items-center justify-center">
          <AdBlockerBadgeIcon className="size-10" />
        </div>

        {/* Heading */}
        <h1 className="mt-4 text-base font-bold tracking-tight text-neutral-900 sm:text-lg dark:text-white">
          {resolvedTitle}
        </h1>

        {/* Subtitle / Description */}
        <div className="mt-2 text-xs leading-relaxed text-neutral-500 sm:text-[13px] dark:text-neutral-400">
          {description ? (
            <p>{description}</p>
          ) : (
            <p>
              <span>{t("adBlocker.pageAllowPrefix")} </span>
              <a
                href={allowUrl}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-700 underline underline-offset-2 transition-colors hover:text-black dark:text-neutral-300 dark:hover:text-white"
              >
                {allowUrl}
              </a>{" "}
              <span>{t("adBlocker.pageAllowMiddle")} </span>
              <span>{resolvedService}</span>
            </p>
          )}
        </div>

        {/* Optional Recheck Action */}
        {showRecheckButton && (
          <div className="mt-5">
            <button
              type="button"
              onClick={onRecheck}
              className="rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 corner-squircle"
            >
              {t("adBlocker.recheck")}
            </button>
          </div>
        )}
      </div>

      {/* Large Nitx Background Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/2 z-0 w-[90vw] max-w-[1200px] -translate-x-1/2 text-[#F3F4F7] select-none sm:-bottom-16 md:-bottom-24 dark:text-[#18181A]"
      >
        <NitxLogoWatermark className="w-full h-auto" />
      </div>
    </main>
  );
};
