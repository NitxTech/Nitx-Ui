"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Camera, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { SpaceAvatar } from "./SpaceAvatar";
import { cn } from "../lib/utils";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export interface SpaceAvatarUploadProps {
  currentImageUrl?: string | null;
  spaceName?: string;
  onImageChange: (file: File | null, previewUrl: string | null) => void;
  disabled?: boolean;
  className?: string;
  size?: "md" | "lg" | "xl";
  showRemoveButton?: boolean;
}

export const SpaceAvatarUpload = ({
  currentImageUrl,
  spaceName,
  onImageChange,
  disabled = false,
  className,
  size = "xl",
  showRemoveButton = true,
}: SpaceAvatarUploadProps) => {
  const { t } = useNitxUiTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createdUrlRef = useRef<string | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );
  const [isDragging, setIsDragging] = useState(false);

  const cleanupCreatedUrl = useCallback(() => {
    if (createdUrlRef.current && createdUrlRef.current.startsWith("blob:")) {
      URL.revokeObjectURL(createdUrlRef.current);
      createdUrlRef.current = null;
    }
  }, []);

  useEffect(() => {
    setPreviewUrl(currentImageUrl || null);
  }, [currentImageUrl]);

  useEffect(() => {
    return () => {
      cleanupCreatedUrl();
    };
  }, [cleanupCreatedUrl]);

  const validateAndProcessFile = useCallback(
    (file: File) => {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        toast.error(t("spaceAvatar.invalidType"));
        return false;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error(t("spaceAvatar.fileTooLarge"));
        return false;
      }

      try {
        cleanupCreatedUrl();
        const objectUrl = URL.createObjectURL(file);
        createdUrlRef.current = objectUrl;
        setPreviewUrl(objectUrl);
        onImageChange(file, objectUrl);
        return true;
      } catch {
        toast.error(t("spaceAvatar.uploadError"));
        return false;
      }
    },
    [cleanupCreatedUrl, onImageChange, t]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
    // Reset file input value so selecting the same file again triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    cleanupCreatedUrl();
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageChange(null, null);
  };

  const hasImage = Boolean(previewUrl);

  const dimensionClasses =
    size === "md"
      ? "w-12 h-12"
      : size === "lg"
      ? "w-[70px] h-[70px]"
      : "w-[72px] h-[72px]";

  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      <div className="relative group">
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={
            hasImage
              ? t("spaceAvatar.changeImage")
              : t("spaceAvatar.uploadImage")
          }
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            dimensionClasses,
            "relative shrink-0 rounded-2xl corner-squircle overflow-hidden cursor-pointer select-none transition-all duration-200 outline-none",
            "border border-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            isDragging && "ring-2 ring-primary ring-offset-2 scale-105",
            disabled && "cursor-not-allowed opacity-60"
          )}
        >
          <SpaceAvatar
            imageUrl={previewUrl}
            name={spaceName}
            size={size}
            className="w-full h-full rounded-none"
          />

          {/* Hover overlay with smooth Apple-like transition */}
          <div
            className={cn(
              "absolute inset-0 bg-black/50 backdrop-blur-[1px] flex flex-col items-center justify-center text-white opacity-0 transition-opacity duration-200",
              !disabled && "group-hover:opacity-100",
              isDragging && "opacity-100"
            )}
          >
            {hasImage ? (
              <Camera className="w-5 h-5 stroke-[1.8]" />
            ) : (
              <ImagePlus className="w-5 h-5 stroke-[1.8]" />
            )}
          </div>
        </div>

        {/* Quick remove button badge on top corner when image exists */}
        {hasImage && !disabled && showRemoveButton && (
          <button
            type="button"
            onClick={handleRemove}
            title={t("spaceAvatar.removeImage")}
            aria-label={t("spaceAvatar.removeImage")}
            className="absolute -top-1.5 -end-1.5 size-5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border border-white dark:border-neutral-900 flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer z-10"
          >
            <X className="size-3 stroke-[2.5]" />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_MIME_TYPES.join(",")}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
};

export default SpaceAvatarUpload;
