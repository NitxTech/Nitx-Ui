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
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from "./drawer";

const sizeVariants = {
  default: "sm:max-w-[500px]",
  sm: "sm:max-w-[320px]",
  md: "sm:max-w-[640px]",
  lg: "sm:max-w-[768px]",
  xl: "sm:max-w-[900px]",
  "2xl": "sm:max-w-[1024px]",
};

interface DrawerDialogProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizeVariants;
  back?: () => void;
  onClose: () => void;
}

const restoreBodyStyles = () => {
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "0px";
  document.body.style.pointerEvents = "auto";
};

export function DrawerDialog({
  title,
  description,
  children,
  className,
  size = "default",
  back,
  onClose,
}: DrawerDialogProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1140px)");
  const { t } = useNitxUiTranslation();

  const handleChange = (open: boolean) => {
    if (open) {
      document.body.classList.add("modal-open");
    } else {
      restoreBodyStyles();
      onClose();
    }
  };

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => restoreBodyStyles, []);

  if (!isMounted) return null;

  if (isDesktop) {
    return (
      <Dialog open onOpenChange={handleChange}>
        <DialogContent
          className={cn(
            "flex flex-col gap-4 h-auto p-0 border-none",
            sizeVariants[size],
            className
          )}
        >
          {back && (
            <button
              className="flex items-center hover:scale-95 hover:opacity-80 transition-all duration-300 w-fit"
              onClick={back}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t("drawerDialog.back")}
            </button>
          )}
          <DialogHeader className="p-5 h-auto">
            <DialogTitle
              className={cn(!title && " sr-only", !!back && "text-lg")}
            >
              {title}
            </DialogTitle>

            <VisuallyHidden.Root>{title || "Modal Title"}</VisuallyHidden.Root>
            <DialogDescription className="text-sm">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow flex flex-col justify-between w-full h-full">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open onOpenChange={(open) => handleChange(open)}>
      <DrawerContent className=" max-h-[calc(100vh-3rem)]">
        <DrawerHeader className="text-left px-0 pb-0">
          <DialogTrigger className="sr-only">{title}</DialogTrigger>
          {title}
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col h-auto overflow-y-auto">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
