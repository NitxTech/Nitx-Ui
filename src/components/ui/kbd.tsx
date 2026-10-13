import * as React from "react";

import { cn } from "../../lib/utils";

/** One key, as printed on the keyboard. */
export function Kbd({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-zinc-200 bg-zinc-100 px-1 font-sans text-xs font-medium leading-none text-muted-foreground dark:border-zinc-600 dark:bg-zinc-800",
        className,
      )}
      {...props}
    />
  );
}

/**
 * A key combination, one `kbd` per key. Always left to right: "Command K"
 * reads the same in an Arabic interface as in an English one.
 */
export function KbdGroup({
  keys,
  className,
}: {
  keys: readonly string[];
  className?: string;
}) {
  return (
    <span dir="ltr" className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((key) => (
        <Kbd key={key}>{key}</Kbd>
      ))}
    </span>
  );
}
