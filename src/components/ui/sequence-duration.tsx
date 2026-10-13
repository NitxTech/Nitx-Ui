"use client";

import * as React from "react";
import { Clock } from "lucide-react";

import { cn } from "../../lib/utils";
import { useNitxUiTranslation } from "../../i18n/nitxuilib";

export interface SequenceDurationProps {
  /** Total length in seconds, as the API returns it on `total_duration`. */
  seconds: string | number | null | undefined;
  className?: string;
}

/**
 * The duration on a sequence card, in one treatment for every surface a
 * sequence card appears on.
 *
 * The clock sits immediately before the value, which is what gives a bare
 * number its meaning: the cards used to print `total_duration` on its own, so
 * a 45 second sequence read as "45" with nothing to say what that counted.
 *
 * `gap-1` and `inline-flex` keep the order logical, so Arabic mirrors with no
 * extra rules. The glyph and the short value are hidden from screen readers,
 * which read the spelled-out phrase instead.
 */
export const SequenceDuration: React.FC<SequenceDurationProps> = ({
  seconds,
  className,
}) => {
  const { t } = useNitxUiTranslation();

  const total =
    typeof seconds === "string" ? Number.parseInt(seconds, 10) : seconds;
  const hasDuration =
    typeof total === "number" && Number.isFinite(total) && total > 0;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap",
        className,
      )}
    >
      <Clock size={14} className="shrink-0" aria-hidden />
      <span aria-hidden>
        {hasDuration
          ? t("sequenceDuration.value", { count: total })
          : "-"}
      </span>
      <span className="sr-only">
        {hasDuration
          ? t("sequenceDuration.label", { count: total })
          : t("sequenceDuration.none")}
      </span>
    </span>
  );
};

export default SequenceDuration;
