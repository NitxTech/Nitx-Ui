import Uppy from "@uppy/core";
import Dropbox from "@uppy/dropbox";
import GoogleDrive from "@uppy/google-drive";
import Tus from "@uppy/tus";
import { toast } from "sonner";

const DEFAULT_MAX_UPLOAD_SIZE_BYTES = 1024 * 1024 * 1024;

/**
 * Video uploads are intentionally extension-restricted to MP4 until the
 * backend compression pipeline can safely normalize other video containers.
 * Consumers whose backend policy differs (e.g. reach allows QuickTime) pass
 * their own list via `AssetsUploadConfig.allowedFileTypes`.
 */
export const ALLOWED_ASSET_UPLOAD_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  ".mp4",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const;

interface UploadMessages {
  fileUploadedSuccessfully: string;
  filesWillAppear: string;
  pleaseTryAgain: string;
  processingUploads: string;
  uploadFailed: string;
}

interface CreateAssetUploaderOptions {
  accessToken: string;
  companionUrl: string;
  currentFolderUuid?: string;
  messages: UploadMessages;
  onClose: () => void;
  onUploadComplete: () => void;
  spaceUuid: string;
  uploadEndpoint: string;
  maxFileSize?: number;
  allowedFileTypes?: string[];
}

/**
 * Creates the configured asset uploader used by the upload modal.
 *
 * Keeping restrictions and transport configuration together ensures local,
 * Dropbox, and Google Drive selections all follow the same upload policy.
 */
export function createAssetUploader({
  accessToken,
  companionUrl,
  currentFolderUuid,
  messages,
  onClose,
  onUploadComplete,
  spaceUuid,
  uploadEndpoint,
  maxFileSize,
  allowedFileTypes,
}: CreateAssetUploaderOptions): Uppy {
  return new Uppy({
    autoProceed: true,
    allowMultipleUploadBatches: true,
    restrictions: {
      maxFileSize: maxFileSize ?? DEFAULT_MAX_UPLOAD_SIZE_BYTES,
      allowedFileTypes: allowedFileTypes ?? [...ALLOWED_ASSET_UPLOAD_FILE_TYPES],
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
        "X-Folder-Uuid": currentFolderUuid ?? "root",
      },
      removeFingerprintOnSuccess: true,
      retryDelays: [0, 1000, 3000, 5000],
      allowedMetaFields: true,
    })
    .on("upload-success", (file) => {
      toast.success(
        `${file?.name ?? "File"} ${messages.fileUploadedSuccessfully}`,
      );
    })
    .on("complete", (result) => {
      if ((result.successful ?? []).length > 0) {
        toast.loading(messages.processingUploads, {
          id: "upload-processing",
          description: messages.filesWillAppear,
        });
      }

      onUploadComplete();
      onClose();
      window.setTimeout(() => toast.dismiss("upload-processing"), 2000);
    })
    .on("error", (error) => {
      toast.error(messages.uploadFailed, {
        description: error.message || messages.pleaseTryAgain,
      });
    });
}
