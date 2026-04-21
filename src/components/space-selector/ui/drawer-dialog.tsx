import * as React from "react";
import { useTranslation } from "react-i18next";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { cn } from "../lib/utils";
import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"; // Local import
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from "./drawer"; // Local import
import { ChevronLeft } from "lucide-react";

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
  onClose?: () => void;
  open?: boolean;
  overlayClassName?: string;
}

export function DrawerDialog({
  title,
  description,
  children,
  className,
  size = "default",
  back,
  onClose,
  open = true,
  overlayClassName,
}: DrawerDialogProps) {
  const { t } = useTranslation("components");
  const [isMounted, setIsMounted] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1140px)");

  // Removed global useModal dependency.
  // Parent MUST control open/onClose

  const handleChange = (isOpen: boolean) => {
    if (!isOpen && onClose) {
      onClose();
    }
  };

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleChange}>
        <DialogContent
          overlayClassName={overlayClassName}
          className={cn(
            "flex flex-col gap-4 max-h-[96vh] pt-0 border-none overflow-hidden",
            sizeVariants[size],
            className
          )}
        >
          {back && (
            <button
              className="flex items-center hover:scale-95 hover:opacity-80 transition-all duration-300 w-fit p-5 pb-0"
              onClick={back}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t("drawerDialog.back")}
            </button>
          )}
          {title || description || back ? (
            <DialogHeader className="p-5 h-auto flex-shrink-0">
              <DialogTitle
                className={cn(!title && " sr-only", !!back && "text-lg")}
              >
                {title}
              </DialogTitle>

              <VisuallyHidden.Root>
                {title || t("drawerDialog.modalTitle")}
              </VisuallyHidden.Root>
              <DialogDescription className="text-sm">
                {description}
              </DialogDescription>
            </DialogHeader>
          ) : (
            <VisuallyHidden.Root>
              <DialogTitle>{t("drawerDialog.modalTitle")}</DialogTitle>
            </VisuallyHidden.Root>
          )}
          <div className="flex-grow flex flex-col min-h-0 w-full overflow-y-auto">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleChange}>
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
