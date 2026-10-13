import React, { useState } from "react";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  WifiOff,
  X,
} from "lucide-react";
import { useNitxUiTranslation } from "../../i18n/nitxuilib";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { AdBlockerInstructions } from "./ad-blocker-instructions";
import { AdBlockerPage } from "./ad-blocker-page";
import type { AdBlockerNoticeProps } from "./types";
import { useAdBlocker } from "./use-ad-blocker";

export const AdBlockerNotice: React.FC<AdBlockerNoticeProps> = ({
  variant = "page",
  title,
  description,
  allowUrl,
  serviceName,
  affectedFeatures,
  customInstructions,
  showRecheckButton,
  showDismissButton = true,
  showInstructions = true,
  storageType = "session",
  storageKey,
  forceShow = false,
  className,
  onDismiss,
  onRecheck,
}) => {
  const { t } = useNitxUiTranslation();
  const [instructionsOpen, setInstructionsOpen] = useState<boolean>(false);
  const [justCleared, setJustCleared] = useState<boolean>(false);

  const {
    isBlocked,
    isOffline,
    isChecking,
    check,
    dismiss,
  } = useAdBlocker({
    storageType,
    storageKey,
    onRecheck: (result) => {
      onRecheck?.(result);
      if (!result.isBlocked && !result.isOffline) {
        setJustCleared(true);
        const timer = setTimeout(() => setJustCleared(false), 3500);
        return () => clearTimeout(timer);
      }
    },
  });

  const shouldRender = forceShow || isBlocked || justCleared;

  if (!shouldRender) {
    return null;
  }

  const handleDismiss = () => {
    dismiss();
    onDismiss?.();
  };

  const handleRecheck = async () => {
    const res = await check();
    if (!res.isBlocked && !res.isOffline) {
      setJustCleared(true);
      setTimeout(() => setJustCleared(false), 3500);
    }
  };

  const resolvedTitle = title || t("adBlocker.title");
  const resolvedDescription = description || t("adBlocker.description");

  const defaultFeatureList = [
    t("adBlocker.features.adDelivery"),
    t("adBlocker.features.analytics"),
    t("adBlocker.features.integrations"),
  ];

  const featuresToDisplay = affectedFeatures || defaultFeatureList;

  // When recheck succeeds and blocking is removed
  if (justCleared) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-medium text-emerald-800 transition-all dark:border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-300 corner-squircle",
          className,
        )}
      >
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{t("adBlocker.allClear")}</span>
        </div>
        <button
          type="button"
          onClick={() => setJustCleared(false)}
          className="rounded-md p-1 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300"
          aria-label={t("adBlocker.dismissAria")}
        >
          <X className="size-3.5" />
        </button>
      </div>
    );
  }

  // If user is currently offline
  if (isOffline && !forceShow) {
    return (
      <div
        role="alert"
        className={cn(
          "flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-100/90 px-4 py-3 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 corner-squircle",
          className,
        )}
      >
        <div className="flex items-center gap-2.5">
          <WifiOff className="size-4 shrink-0 text-zinc-500" />
          <span>{t("adBlocker.offlineNotice")}</span>
        </div>
      </div>
    );
  }

  /* ------------------------------- PAGE VARIANT (DEFAULT DESIGN) ------------------------------- */
  if (variant === "page") {
    return (
      <AdBlockerPage
        title={resolvedTitle}
        description={description}
        allowUrl={allowUrl}
        serviceName={serviceName}
        showRecheckButton={showRecheckButton ?? false}
        onRecheck={handleRecheck}
        className={className}
      />
    );
  }

  /* ------------------------------- CARD VARIANT ------------------------------- */
  if (variant === "card") {
    return (
      <Card
        role="alert"
        className={cn(
          "relative overflow-hidden border-amber-500/30 bg-amber-500/5 p-5 text-start shadow-xs dark:border-amber-500/20 dark:bg-amber-950/20 corner-squircle",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 corner-squircle">
              <ShieldAlert className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {resolvedTitle}
              </h3>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {resolvedDescription}
              </p>
            </div>
          </div>

          {showDismissButton && (
            <button
              type="button"
              onClick={handleDismiss}
              className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              aria-label={t("adBlocker.dismissAria")}
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Affected features list */}
        {featuresToDisplay.length > 0 && (
          <div className="mt-3.5 rounded-lg border border-amber-500/20 bg-background/60 p-3 dark:bg-background/40">
            <p className="text-[11px] font-medium text-amber-900 dark:text-amber-300">
              {t("adBlocker.affectedNotice")}
            </p>
            <ul className="mt-1.5 space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
              {featuresToDisplay.map((item, index) => (
                <li key={index} className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions view */}
        {showInstructions && (
          <div className="mt-3.5">
            {customInstructions || <AdBlockerInstructions />}
          </div>
        )}

        {/* Card Actions */}
        <div className="mt-4 flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-amber-500/15">
          {showDismissButton && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDismiss}
            >
              {t("adBlocker.dismiss")}
            </Button>
          )}

          {showRecheckButton && (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleRecheck}
              disabled={isChecking}
              className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-500"
            >
              <RefreshCw
                className={cn("size-3.5", isChecking && "animate-spin")}
              />
              {isChecking ? t("adBlocker.rechecking") : t("adBlocker.recheck")}
            </Button>
          )}
        </div>
      </Card>
    );
  }

  /* ------------------------------ DIALOG VARIANT ------------------------------ */
  if (variant === "dialog") {
    return (
      <Dialog open={shouldRender} onOpenChange={(open) => !open && handleDismiss()}>
        <DialogContent className="max-w-lg p-6 corner-squircle">
          <DialogHeader className="text-start">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 corner-squircle">
                <ShieldAlert className="size-5" />
              </span>
              <div>
                <DialogTitle className="text-base font-semibold">
                  {resolvedTitle}
                </DialogTitle>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {resolvedDescription}
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Affected list */}
          {featuresToDisplay.length > 0 && (
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 dark:bg-amber-950/20">
              <p className="text-xs font-medium text-amber-900 dark:text-amber-300">
                {t("adBlocker.affectedNotice")}
              </p>
              <ul className="mt-1.5 space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
                {featuresToDisplay.map((item, index) => (
                  <li key={index} className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showInstructions && (
            <div className="mt-2">
              {customInstructions || <AdBlockerInstructions />}
            </div>
          )}

          <div className="mt-4 flex items-center justify-end gap-2 pt-2 border-t border-border">
            {showDismissButton && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDismiss}
              >
                {t("adBlocker.dismiss")}
              </Button>
            )}

            {showRecheckButton && (
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={handleRecheck}
                disabled={isChecking}
                className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-500"
              >
                <RefreshCw
                  className={cn("size-3.5", isChecking && "animate-spin")}
                />
                {isChecking ? t("adBlocker.rechecking") : t("adBlocker.recheck")}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  /* ------------------------------ BANNER VARIANT (DEFAULT) ------------------------------ */
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-start transition-all dark:border-amber-500/25 dark:bg-amber-950/30 corner-squircle",
        className,
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="size-4.5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {resolvedTitle}
              </span>
              <span className="hidden text-zinc-400 dark:text-zinc-600 sm:inline">
                •
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-300">
                {resolvedDescription}
              </span>
            </div>

            {/* Quick toggle for instructions */}
            {showInstructions && (
              <button
                type="button"
                onClick={() => setInstructionsOpen((prev) => !prev)}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 underline underline-offset-2"
              >
                <span>{t("adBlocker.howToAllow")}</span>
                {instructionsOpen ? (
                  <ChevronUp className="size-3" />
                ) : (
                  <ChevronDown className="size-3" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          {showRecheckButton && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRecheck}
              disabled={isChecking}
              className="h-7 px-2.5 text-xs border-amber-500/30 bg-background/80 hover:bg-amber-500/15"
            >
              <RefreshCw
                className={cn("size-3", isChecking && "animate-spin")}
              />
              {isChecking ? t("adBlocker.rechecking") : t("adBlocker.recheck")}
            </Button>
          )}

          {showDismissButton && (
            <button
              type="button"
              onClick={handleDismiss}
              className="rounded-lg p-1 text-zinc-500 hover:bg-amber-500/20 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              aria-label={t("adBlocker.dismissAria")}
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Expandable guide panel */}
      {showInstructions && instructionsOpen && (
        <div className="mt-3 pt-3 border-t border-amber-500/20">
          {customInstructions || <AdBlockerInstructions />}
        </div>
      )}
    </div>
  );
};
