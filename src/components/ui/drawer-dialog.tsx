"use client";

import * as React from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ChevronLeft } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "../../lib/utils";
import { useNitxUiTranslation } from "../../i18n/nitxuilib";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";

const sizeVariants = {
  default: "sm:max-w-[31.25rem]",
  sm: "sm:max-w-[20rem]",
  md: "sm:max-w-[40rem]",
  lg: "sm:max-w-[48rem]",
  xl: "sm:max-w-[56.25rem]",
  "2xl": "sm:max-w-[64rem]",
  full: "sm:max-w-[calc(100vw-4rem)]",
  auto: "sm:max-w-fit",
};

export type DrawerDialogSize = keyof typeof sizeVariants;

export interface DrawerDialogProps {
  title?: React.ReactNode;
  accessibleTitle?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  overlayClassName?: string;
  size?: DrawerDialogSize;
  back?: () => void;
  backLabel?: string;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  hideClose?: boolean;
  dir?: "ltr" | "rtl";
}

const restoreBodyStyles = () => {
  if (typeof document === "undefined") return;
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.body.style.pointerEvents = "";
};

export function DrawerDialog({
  title,
  accessibleTitle,
  description,
  children,
  className,
  bodyClassName,
  headerClassName,
  overlayClassName,
  size = "default",
  back,
  backLabel,
  onClose,
  onOpenChange,
  open = true,
  hideClose = false,
  dir,
}: DrawerDialogProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1140px)");
  const { t } = useNitxUiTranslation();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      if (typeof document !== "undefined") {
        document.body.classList.add("modal-open");
      }
    } else {
      restoreBodyStyles();
      onClose?.();
    }
    onOpenChange?.(isOpen);
  };

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (open && typeof document !== "undefined") {
      document.body.classList.add("modal-open");
    }
    return () => {
      restoreBodyStyles();
    };
  }, [open]);

  if (!isMounted) return null;

  const fallbackTitle =
    accessibleTitle ||
    (typeof title === "string" ? title : "") ||
    t("drawerDialog.modalTitle") ||
    "Modal";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          overlayClassName={overlayClassName}
          showCloseButton={!hideClose}
          dir={dir}
          className={cn(
            "flex flex-col gap-0 max-h-[96vh] p-0 border dark:border-zinc-800 bg-background dark:bg-zinc-950 overflow-hidden rounded-2xl shadow-2xl",
            sizeVariants[size],
            className,
          )}
        >
          {back && (
            <button
              type="button"
              className="flex items-center hover:opacity-80 transition-opacity w-fit px-5 pt-4 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={back}
            >
              <ChevronLeft className="size-4 me-1 rtl:rotate-180 shrink-0" />
              {backLabel || t("drawerDialog.back")}
            </button>
          )}

          {title || description ? (
            <DialogHeader className={cn("p-5 pb-3 text-start", headerClassName)}>
              {title ? (
                <DialogTitle
                  className={cn("text-lg font-semibold", !!back && "text-base")}
                >
                  {title}
                </DialogTitle>
              ) : (
                <VisuallyHidden.Root>
                  <DialogTitle>{fallbackTitle}</DialogTitle>
                </VisuallyHidden.Root>
              )}
              {description && (
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          ) : (
            <VisuallyHidden.Root>
              <DialogTitle>{fallbackTitle}</DialogTitle>
            </VisuallyHidden.Root>
          )}

          <div
            className={cn(
              "flex-grow flex flex-col min-h-0 w-full overflow-y-auto",
              bodyClassName,
            )}
          >
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="max-h-[calc(100vh-3rem)]" dir={dir}>
        <DrawerHeader className={cn("text-start px-4 pt-3 pb-2", headerClassName)}>
          {title ? (
            <DrawerTitle className="text-lg font-semibold">{title}</DrawerTitle>
          ) : (
            <VisuallyHidden.Root>
              <DrawerTitle>{fallbackTitle}</DrawerTitle>
            </VisuallyHidden.Root>
          )}
          {description && (
            <DrawerDescription className="text-sm text-muted-foreground">
              {description}
            </DrawerDescription>
          )}
        </DrawerHeader>
        <div
          className={cn(
            "flex flex-col h-auto overflow-y-auto px-4 pb-6",
            bodyClassName,
          )}
        >
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { DrawerDialog as ModalShell, DrawerDialog as Modal };
