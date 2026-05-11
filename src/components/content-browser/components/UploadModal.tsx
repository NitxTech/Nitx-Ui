"use client";

import { useEffect, useState } from "react";
import Uppy, { Meta } from "@uppy/core";
import Tus from "@uppy/tus";
import Dashboard from "@uppy/react/dashboard";
import Dropbox from "@uppy/dropbox";
import GoogleDrive from "@uppy/google-drive";
import { toast } from "sonner";

import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { DrawerDialog } from "../../space-selector/ui/drawer-dialog";
import { UploadModalProps } from "../types";

function createUppy(
  uploadEndpoint: string,
  accessToken: string,
  spaceUuid: string,
  currentFolderUuid: string,
  companionUrl: string,
  onComplete: () => void,
  onCloseModal: () => void,
  translations: {
    fileUploadedSuccessfully: string;
    processingUploads: string;
    filesWillAppear: string;
    uploadFailed: string;
    pleaseTryAgain: string;
  },
) {
  return new Uppy({
    autoProceed: true,
    allowMultipleUploadBatches: true,
    restrictions: {
      maxFileSize: 1 * 1024 * 1024 * 1024,
      allowedFileTypes: [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "video/mp4",
        "video/quicktime",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
    },
  })
    .use(Dropbox, { companionUrl })
    .use(GoogleDrive, { companionUrl })
    .use(Tus, {
      endpoint: uploadEndpoint,
      chunkSize: 5 * 1024 * 1024,
      headers: {
        authorization: `Bearer ${accessToken}`,
        "X-Space-Uuid": spaceUuid,
        "X-Folder-Uuid": currentFolderUuid,
      },
      removeFingerprintOnSuccess: true,
      retryDelays: [0, 1000, 3000, 5000],
      allowedMetaFields: true,
    })
    .on("upload-success", (file) => {
      toast.success(`${file?.name || "File"} ${translations.fileUploadedSuccessfully}`);
    })
    .on("complete", (result) => {
      if ((result.successful || []).length > 0) {
        toast.loading(translations.processingUploads, {
          id: "upload-processing",
          description: translations.filesWillAppear,
        });
      }
      onComplete();
      onCloseModal();
      setTimeout(() => toast.dismiss("upload-processing"), 2000);
    })
    .on("error", (error) => {
      toast.error(translations.uploadFailed, {
        description: error?.message || translations.pleaseTryAgain,
      });
    });
}

const UploadModal = ({
  open,
  onClose,
  uploadEndpoint,
  accessToken,
  spaceUuid,
  currentFolderUuid,
  companionUrl = "http://localhost:3020",
  onUploadComplete,
}: UploadModalProps) => {
  const { t } = useNitxUiTranslation();
  const [uppy, setUppy] = useState<Uppy<Meta, Record<string, never>> | null>(null);

  // Tear down Uppy when modal closes
  useEffect(() => {
    if (!open && uppy) {
      try { uppy.clear(); } catch { }
      try { (uppy as any).close?.(); } catch { }
      uppy.cancelAll();
      setUppy(null);
    }
  }, [open, uppy]);

  // Initialise Uppy when modal opens
  useEffect(() => {
    if (!open) return;

    setUppy(
      createUppy(
        uploadEndpoint,
        accessToken,
        spaceUuid,
        currentFolderUuid || "root",
        companionUrl,
        () => onUploadComplete?.(),
        onClose,
        {
          fileUploadedSuccessfully: t("uploadModal.fileUploadedSuccessfully"),
          processingUploads: t("uploadModal.processingUploads"),
          filesWillAppear: t("uploadModal.filesWillAppear"),
          uploadFailed: t("uploadModal.uploadFailed"),
          pleaseTryAgain: t("uploadModal.pleaseTryAgain"),
        },
      ),
    );
  }, [open, uploadEndpoint, accessToken, spaceUuid, currentFolderUuid, companionUrl]);

  return (
    <DrawerDialog size="lg" open={open} onClose={onClose} title={t("uploadModal.title")}>
      <div className="w-full h-full flex flex-col gap-3 lg:gap-5 relative overflow-hidden">
        <div className="p-3 !pt-2 lg:p-7 flex flex-col gap-3 lg:gap-5">
          {uppy && <Dashboard uppy={uppy} proudlyDisplayPoweredByUppy={false} />}
        </div>
      </div>
    </DrawerDialog>
  );
};

export default UploadModal;
