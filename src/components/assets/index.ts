export {
  AssetsProvider,
  useAssetsConfig,
  useOptionalAssetsConfig,
} from "./context";
export type { AssetsProviderProps, AssetsConfig } from "./context";

export { createAssetsApi } from "./lib/create-api";
export {
  DEFAULT_ASSET_IMAGES,
  type AssetImagesMap,
} from "./lib/default-images";
export {
  createAssetUploader,
  ALLOWED_ASSET_UPLOAD_FILE_TYPES,
} from "./lib/create-asset-uploader";

export { useAssetsStore } from "./hooks/use-assets-store";
export {
  assetKeys,
  useAssetsQuery,
  useDeleteAssetMutation,
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useBulkDeleteFoldersMutation,
  useRenameAssetMutation,
  useRenameFolderMutation,
  useMoveAssetMutation,
  useMoveFolderMutation,
} from "./hooks/use-assets-query";
export { useLazyLoading } from "./hooks/use-lazy-loading";

export { default as AssetsBrowser } from "./components/AssetsBrowser";
export type { AssetsBrowserProps } from "./components/AssetsBrowser";
export { default as AssetsTabbar } from "./components/AssetsTabbar";
export { default as AssetsPath } from "./components/AssetsPath";
export {
  AssetsUploadModal,
  type AssetsUploadModalProps,
} from "./components/modals/UploadModal";
export { default as LinkEditor } from "./links/LinkEditor";
export type { LinkEditorProps, LinkEditorTitleInfo } from "./links/LinkEditor";
export type { AssetsTab, AssetsViewType } from "./hooks/use-assets-store";

export type {
  Asset,
  AssetType,
  AssetImage,
  AssetVideo,
  AssetDocument,
  AssetLink,
  AssetApp,
  AssetCanvas,
  Folder,
  Path,
  LinkDetail,
  LinkInput,
  AssetsApi,
  AssetsFeatureFlags,
  AssetsUploadConfig,
  AssetsNavigation,
} from "./types";
