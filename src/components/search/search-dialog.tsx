"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Loader2, Search, X } from "lucide-react";

import { Button } from "../ui/button";
import { Dialog, DialogOverlay, DialogPortal } from "../ui/dialog";
import { KbdGroup } from "../ui/kbd";
import { cn } from "../../lib/utils";
import { useNitxUiTranslation } from "../../i18n/nitxuilib";
import { SearchResultRow } from "./search-result-row";
import { useSearchEngine } from "./use-search-engine";
import type { SearchHit, SearchSource } from "./types";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Gets focus back when search is dismissed without choosing a result. */
  returnFocusRef: React.RefObject<HTMLElement | null>;
  sources: readonly SearchSource<any>[];
  rtl: boolean;
}

export function SearchDialog({
  open,
  onOpenChange,
  returnFocusRef,
  sources,
  rtl,
}: SearchDialogProps) {
  const { t } = useNitxUiTranslation();
  // Set when search closes because a row was chosen: the page is about to
  // change, so focus should not jump back to the control that opened it.
  const choosingRef = React.useRef(false);

  const choose = (hit: SearchHit) => {
    choosingRef.current = true;
    onOpenChange(false);
    hit.open();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          dir={rtl ? "rtl" : "ltr"}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (!choosingRef.current) returnFocusRef.current?.focus();
            choosingRef.current = false;
          }}
          className={cn(
            // Phones: a full-screen sheet. From md: a fixed-size panel
            // centred by `inset-0 m-auto`, so it never resizes or moves as
            // results change, and centring does not depend on text direction.
            // Above the overlay, which is z-[9999] and carries a backdrop blur in
            // dark mode: below it, the dialog is rendered and then blurred by it.
            // Same layer the package's own DialogContent uses.
            "fixed inset-0 z-[10000] flex flex-col overflow-hidden bg-background text-start text-foreground outline-none",
            "md:m-auto md:h-[min(42rem,calc(100dvh-4rem))] md:w-[calc(100%-2rem)] md:max-w-[48rem] md:rounded-[32px] md:border md:border-border md:shadow-2xl",
            "duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 md:data-[state=open]:zoom-in-95 md:data-[state=closed]:zoom-out-95",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            {t("globalSearch.title")}
          </DialogPrimitive.Title>
          {/* Inside the content, so every opening starts empty. */}
          <SearchPanel sources={sources} onChoose={choose} />
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

function SearchPanel({
  sources,
  onChoose,
}: {
  sources: readonly SearchSource<any>[];
  onChoose: (hit: SearchHit) => void;
}) {
  const { t } = useNitxUiTranslation();
  const [query, setQuery] = React.useState("");
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const { groups, hits, loading, failed, retry } = useSearchEngine(
    sources,
    query,
  );

  const baseId = React.useId();
  const listboxId = `${baseId}-listbox`;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  // The active row is the one picked by arrow keys or the pointer, or the
  // first row when that one is gone (a new query, results still arriving).
  const activeIndex =
    hits.length === 0
      ? -1
      : Math.max(
          0,
          hits.findIndex((hit) => hit.id === activeId),
        );

  React.useEffect(() => {
    if (activeIndex < 0) return;
    document
      .getElementById(`${baseId}-option-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, baseId]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (hits.length === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveId(hits[(activeIndex + step + hits.length) % hits.length].id);
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      onChoose(hits[activeIndex]);
    }
  };

  const trimmed = query.trim();
  const isLoading = trimmed !== "" && loading;
  const hasFailed = trimmed !== "" && failed;
  const isEmpty = trimmed !== "" && hits.length === 0 && !loading && !failed;
  const announcement = !trimmed
    ? ""
    : hits.length > 0
      ? t("globalSearch.resultCount", { count: hits.length })
      : isLoading
        ? t("globalSearch.loading")
        : hasFailed
          ? t("globalSearch.loadError")
          : t("globalSearch.noResults", { query: trimmed });

  return (
    <>
      <div className="flex shrink-0 items-center gap-3.5 border-b border-border ps-5 pe-3 md:px-7">
        <Search aria-hidden className="size-6 shrink-0 text-muted-foreground" />
        <input
          role="combobox"
          aria-label={t("globalSearch.title")}
          aria-expanded={hits.length > 0}
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? optionId(activeIndex) : undefined
          }
          aria-autocomplete="list"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder={t("globalSearch.placeholder")}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveId(null);
          }}
          onKeyDown={onKeyDown}
          className="h-[4.5rem] min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        <DialogPrimitive.Close asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("globalSearch.close")}
            className="shrink-0 rounded-full md:hidden"
          >
            <X aria-hidden />
          </Button>
        </DialogPrimitive.Close>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 md:px-4">
        <div role="listbox" id={listboxId} aria-label={t("globalSearch.title")}>
          {groups.map((group) => (
            <div
              key={group.kind}
              role="group"
              aria-labelledby={`${baseId}-${group.kind}`}
              className="pb-2"
            >
              <div
                id={`${baseId}-${group.kind}`}
                className="px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground"
              >
                {group.label}
              </div>
              {group.hits.map((hit) => {
                const index = hits.indexOf(hit);
                return (
                  <SearchResultRow
                    key={hit.id}
                    id={optionId(index)}
                    active={index === activeIndex}
                    onActivate={() => setActiveId(hit.id)}
                    onChoose={() => onChoose(hit)}
                  >
                    {hit.render()}
                  </SearchResultRow>
                );
              })}
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="flex items-center gap-2.5 px-3 py-3">
            <Loader2
              aria-hidden
              className="size-4 animate-spin text-muted-foreground"
            />
            <p className="text-sm text-muted-foreground">
              {t("globalSearch.loading")}
            </p>
          </div>
        )}

        {hasFailed && (
          <div className="flex items-center justify-between gap-3 ps-3">
            <p className="text-sm text-rose-600 dark:text-rose-400">
              {t("globalSearch.loadError")}
            </p>
            <Button variant="ghost" size="sm" onClick={retry}>
              {t("globalSearch.retry")}
            </Button>
          </div>
        )}

        {isEmpty && (
          <div className="flex h-full flex-col items-center justify-center gap-1 px-6 text-center">
            <p className="max-w-full break-words text-base font-semibold text-foreground">
              {t("globalSearch.noResults", { query: trimmed })}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("globalSearch.noResultsHint")}
            </p>
          </div>
        )}
      </div>

      <footer className="hidden shrink-0 items-center gap-6 border-t border-border px-7 py-4 md:flex">
        <Hint keys={["↑", "↓"]} label={t("globalSearch.hintNavigate")} />
        <Hint keys={["↵"]} label={t("globalSearch.hintOpen")} />
        <Hint keys={["Esc"]} label={t("globalSearch.hintClose")} />
      </footer>

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </>
  );
}

function Hint({ keys, label }: { keys: readonly string[]; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <KbdGroup keys={keys} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </span>
  );
}
