"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Button } from "../ui/button";
import { KbdGroup } from "../ui/kbd";
import { cn } from "../../lib/utils";
import { useNitxUiTranslation } from "../../i18n/nitxuilib";
import { useGlobalSearch } from "./search-provider";

/** Light and dark surface shared by both triggers. */
const triggerSurface =
  "rounded-[10px] border-zinc-200 bg-white shadow-none hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800";

/** Opens search. The full field, for an expanded sidebar. */
export function SearchTrigger({ className }: { className?: string }) {
  const { t } = useNitxUiTranslation();
  const { openSearch, shortcut } = useGlobalSearch();

  return (
    <Button
      type="button"
      variant="outline"
      aria-haspopup="dialog"
      aria-keyshortcuts={shortcut?.aria}
      onClick={(event) => openSearch(event.currentTarget)}
      className={cn(
        "h-10 w-72 justify-start gap-2.5 ps-3.5 pe-2 text-sm font-normal text-muted-foreground hover:text-foreground",
        triggerSurface,
        className,
      )}
    >
      <Search aria-hidden />
      <span className="flex-1 truncate text-start">
        {t("globalSearch.trigger")}
      </span>
      {shortcut && <KbdGroup keys={shortcut.keys} />}
    </Button>
  );
}

/** Compact trigger for a collapsed rail or a narrow screen, where there is no shortcut to show. */
export function SearchIconTrigger({ className }: { className?: string }) {
  const { t } = useNitxUiTranslation();
  const { openSearch } = useGlobalSearch();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-haspopup="dialog"
      aria-label={t("globalSearch.trigger")}
      onClick={(event) => openSearch(event.currentTarget)}
      className={cn(
        "size-10 shrink-0 text-muted-foreground dark:text-zinc-200",
        triggerSurface,
        className,
      )}
    >
      <Search aria-hidden />
    </Button>
  );
}
