import React from "react";
import { cn } from "../../lib/utils";

export interface ErrorStateProps {
  /** Short description text shown below the icon */
  message: string;
  /** Optional heading — defaults to "Couldn't load data" */
  title?: string;
  /** Called when the user clicks the retry button. If omitted the button is hidden. */
  onRetry?: () => void;
  /** Label for the retry button — defaults to "Try again" */
  retryLabel?: string;
}

const ErrorState = ({ message, title = "Couldn't load data", onRetry, retryLabel = "Try again" }: ErrorStateProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 py-14 px-6">
      {/* Icon */}
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-muted-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <line x1="2" y1="2" x2="22" y2="22" />
        </svg>
      </span>

      {/* Text */}
      <div className="flex flex-col items-center gap-1.5 text-center max-w-[260px]">
        <p className="text-sm font-medium text-foreground/80">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{message}</p>
      </div>

      {/* Retry */}
      {onRetry && (
        <button
          onClick={onRetry}
          className={cn([
            "group inline-flex items-center gap-2 rounded-lg px-4 py-2",
            "border border-border bg-background",
            "text-xs font-medium text-foreground/70",
            "transition-all duration-150 ease-out",
            "hover:bg-muted hover:text-foreground",
            "active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          ])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.41" />
          </svg>
          {retryLabel}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
