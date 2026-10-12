"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileWarning,
  Loader2,
  Lock,
  RefreshCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { cn } from "../../../lib/utils";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { useAssetsConfig } from "../context";
import type { Asset, AssetDocument } from "../types";

const PDF_MIME = "application/pdf";

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.25;

/** Width the page falls back to before the container has been measured. */
const FALLBACK_WIDTH = 640;

type PdfModule = typeof import("react-pdf");

let cachedModule: PdfModule | null = null;
let modulePromise: Promise<PdfModule> | null = null;

/**
 * pdf.js and its React wrapper are around a megabyte, and most sessions never
 * open a document, so the module is imported on first use and kept for the
 * rest of the session. It stays out of the main bundle because tsup treats
 * `react-pdf` as external: the dynamic import survives into `dist` and the
 * host's bundler splits it.
 */
function loadPdfModule(workerSrc?: string): Promise<PdfModule> {
  if (cachedModule) return Promise.resolve(cachedModule);

  if (!modulePromise) {
    modulePromise = import("react-pdf")
      .then((mod) => {
        // pdf.js parses off the main thread and refuses to render without a
        // worker, so it has to be told where one is. The default is a copy of
        // the exact version react-pdf bundles; a host that cannot reach the
        // CDN points `documentPreview.workerSrc` at its own file instead.
        mod.pdfjs.GlobalWorkerOptions.workerSrc =
          workerSrc ||
          `https://unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
        cachedModule = mod;
        return mod;
      })
      .catch((error) => {
        // Let the next attempt retry instead of resolving the failure forever.
        modulePromise = null;
        throw error;
      });
  }

  return modulePromise;
}

type ViewerError = "load" | "password" | "module";

interface DocumentPreviewProps {
  asset: Asset;
  document: AssetDocument;
  onDownload?: (asset: Asset) => void;
}

/** Shared frame for every non-rendering state, so they all sit the same way. */
const StatePanel: React.FC<{
  icon: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
}> = ({ icon, title, description, children }) => (
  <div className="flex max-w-md flex-col items-center gap-3 rounded-[14px] bg-white/5 px-6 py-8 text-center">
    <span className="text-white/70" aria-hidden>
      {icon}
    </span>
    <p className="text-base font-medium text-white">{title}</p>
    {description && (
      <p className="text-sm text-white/70 break-all">{description}</p>
    )}
    {children && (
      <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
        {children}
      </div>
    )}
  </div>
);

/** Button treatment for the viewer chrome, which always sits on the dark scrim. */
const chromeButton =
  "inline-flex size-9 items-center justify-center rounded-[10px] text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:pointer-events-none disabled:opacity-40";

const chromeTextButton =
  "inline-flex h-9 items-center gap-2 rounded-[10px] px-3 text-sm font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

/**
 * Renders a PDF asset inside the assets preview overlay: one page at a time,
 * with page controls, zoom and recoverable states for a document that will not
 * load, is password protected, or is a format pdf.js cannot read.
 */
const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  asset,
  document: doc,
  onDownload,
}) => {
  const { t } = useNitxUiTranslation();
  const { documentPreview } = useAssetsConfig();

  const isPdf = doc.mime_type === PDF_MIME;

  const [pdf, setPdf] = React.useState<PdfModule | null>(cachedModule);
  const [error, setError] = React.useState<ViewerError | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [zoom, setZoom] = React.useState(1);
  const [containerWidth, setContainerWidth] = React.useState<number>();
  const [attempt, setAttempt] = React.useState(0);

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // One asset per mount is the common case, but the overlay reuses this
  // component as the user steps through a folder, so reset per document.
  React.useEffect(() => {
    setPage(1);
    setZoom(1);
    setPageCount(0);
    setError(null);
  }, [doc.uuid, attempt]);

  React.useEffect(() => {
    if (!isPdf) return;

    let active = true;
    loadPdfModule(documentPreview?.workerSrc)
      .then((mod) => {
        if (active) setPdf(mod);
      })
      .catch(() => {
        if (active) setError("module");
      });

    return () => {
      active = false;
    };
  }, [isPdf, documentPreview?.workerSrc, attempt]);

  // The page is rendered at a pixel width, so it has to follow the container.
  React.useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setContainerWidth(width);
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const goToPage = React.useCallback(
    (next: number) => {
      setPage((current) => {
        const target = Math.min(Math.max(next, 1), pageCount || 1);
        return Number.isFinite(target) ? target : current;
      });
    },
    [pageCount],
  );

  const changeZoom = React.useCallback((delta: number) => {
    setZoom((current) =>
      Math.min(Math.max(Number((current + delta).toFixed(2)), ZOOM_MIN), ZOOM_MAX),
    );
  }, []);

  /**
   * Left and right arrows already step between assets, handled on `window` by
   * the browser that owns this overlay, so the viewer takes the vertical and
   * paging keys instead and stops them before they get there.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["PageDown", "PageUp", "ArrowDown", "ArrowUp", "+", "=", "-", "0"];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    event.stopPropagation();

    switch (event.key) {
      case "PageDown":
      case "ArrowDown":
        goToPage(page + 1);
        break;
      case "PageUp":
      case "ArrowUp":
        goToPage(page - 1);
        break;
      case "+":
      case "=":
        changeZoom(ZOOM_STEP);
        break;
      case "-":
        changeZoom(-ZOOM_STEP);
        break;
      case "0":
        setZoom(1);
        break;
    }
  };

  const downloadButton = onDownload ? (
    <button
      type="button"
      className={chromeTextButton}
      onClick={() => onDownload(asset)}
    >
      <Download className="size-4" aria-hidden />
      {t("assets.assetCard.download")}
    </button>
  ) : null;

  const openButton = (
    <a
      href={doc.original_path}
      target="_blank"
      rel="noreferrer"
      className={chromeTextButton}
    >
      <ExternalLink className="size-4" aria-hidden />
      {t("assets.assetsPreview.documentOpen")}
    </a>
  );

  // A document pdf.js cannot read at all: say so once, and offer the file.
  if (!isPdf) {
    return (
      <StatePanel
        icon={<FileWarning className="size-10" />}
        title={t("assets.assetsPreview.documentUnsupported")}
        description={doc.mime_type}
      >
        {openButton}
        {downloadButton}
      </StatePanel>
    );
  }

  if (error) {
    const retry = (
      <button
        type="button"
        className={chromeTextButton}
        onClick={() => setAttempt((n) => n + 1)}
      >
        <RefreshCw className="size-4" aria-hidden />
        {t("assets.assetsPreview.documentRetry")}
      </button>
    );

    if (error === "password") {
      return (
        <StatePanel
          icon={<Lock className="size-10" />}
          title={t("assets.assetsPreview.documentProtected")}
          description={t("assets.assetsPreview.documentProtectedHint")}
        >
          {openButton}
          {downloadButton}
        </StatePanel>
      );
    }

    return (
      <StatePanel
        icon={<FileWarning className="size-10" />}
        title={t("assets.assetsPreview.documentError")}
        description={t("assets.assetsPreview.documentErrorHint")}
      >
        {retry}
        {openButton}
        {downloadButton}
      </StatePanel>
    );
  }

  const loading = (
    <div className="flex flex-col items-center gap-3 text-white/80">
      <Loader2 className="size-8 animate-spin" aria-hidden />
      <p className="text-sm">{t("assets.assetsPreview.documentLoading")}</p>
    </div>
  );

  if (!pdf) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex h-full w-full items-center justify-center"
      >
        {loading}
      </div>
    );
  }

  const { Document, Page } = pdf;
  const pageWidth = Math.round((containerWidth || FALLBACK_WIDTH) * zoom);

  return (
    <div className="flex h-full w-full flex-col items-center gap-3">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={t("assets.assetsPreview.documentRegion")}
        role="group"
        className={cn(
          "flex w-full flex-1 justify-center overflow-auto rounded-[8px] px-4 outline-none",
          "focus-visible:ring-2 focus-visible:ring-white/70",
        )}
      >
        <Document
          file={doc.original_path}
          loading={
            <div className="flex h-full items-center justify-center py-16">
              {loading}
            </div>
          }
          error={<span className="sr-only" />}
          noData={<span className="sr-only" />}
          onLoadSuccess={({ numPages }: { numPages: number }) => {
            setPageCount(numPages);
            setError(null);
          }}
          onLoadError={() => setError("load")}
          onPassword={() => setError("password")}
          // No text or annotation layer: both need react-pdf's stylesheets,
          // which every consuming app would have to import for itself.
          className="flex items-start justify-center"
        >
          <Page
            pageNumber={page}
            width={pageWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-2xl"
            loading={
              <div
                className="bg-white/10"
                style={{ width: pageWidth, height: pageWidth * 1.4 }}
              />
            }
          />
        </Document>
      </div>

      {/* Controls sit below the page so they never cover the first lines. */}
      <div className="flex flex-wrap items-center justify-center gap-1 rounded-[14px] bg-white/10 px-2 py-1.5 sm:gap-2">
        <button
          type="button"
          className={chromeButton}
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          aria-label={t("assets.assetsPreview.documentPrevPage")}
        >
          <ChevronLeft className="size-5 rtl:rotate-180" aria-hidden />
        </button>

        <p
          aria-live="polite"
          className="min-w-24 whitespace-nowrap px-1 text-center text-sm text-white"
        >
          {t("assets.assetsPreview.documentPage", {
            current: page,
            total: pageCount || 1,
          })}
        </p>

        <button
          type="button"
          className={chromeButton}
          onClick={() => goToPage(page + 1)}
          disabled={pageCount === 0 || page >= pageCount}
          aria-label={t("assets.assetsPreview.documentNextPage")}
        >
          <ChevronRight className="size-5 rtl:rotate-180" aria-hidden />
        </button>

        <span className="mx-1 h-5 w-px bg-white/20" aria-hidden />

        <button
          type="button"
          className={chromeButton}
          onClick={() => changeZoom(-ZOOM_STEP)}
          disabled={zoom <= ZOOM_MIN}
          aria-label={t("assets.assetsPreview.documentZoomOut")}
        >
          <ZoomOut className="size-5" aria-hidden />
        </button>

        <button
          type="button"
          onClick={() => setZoom(1)}
          className="h-9 min-w-14 rounded-[10px] px-2 text-sm font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label={t("assets.assetsPreview.documentZoomReset")}
        >
          {Math.round(zoom * 100)}%
        </button>

        <button
          type="button"
          className={chromeButton}
          onClick={() => changeZoom(ZOOM_STEP)}
          disabled={zoom >= ZOOM_MAX}
          aria-label={t("assets.assetsPreview.documentZoomIn")}
        >
          <ZoomIn className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
};

export default DocumentPreview;
