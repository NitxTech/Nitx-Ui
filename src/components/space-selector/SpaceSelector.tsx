"use client";

import { SpaceSelectorProvider } from "./context";
import { ProxySpace, SpaceSelectorApi } from "./types";
import BrowseSpaceModal from "./components/modals/BrowseSpaceModal";
import NewSpaceModal from "./components/modals/NewSpaceModal";
import MembersAndNumbersModal from "./components/modals/MembersAndNumbersModal";
import ManageMembersModal from "./components/modals/ManageMembersModal";
import DeleteConfirmationModal from "./components/modals/DeleteConfirmationModal";
import { SpaceBrowser, SpaceBrowserProps } from "../spaces/SpaceBrowser";
import { SpaceSelectorContent } from "./components/SpaceSelectorContent";
import { SpaceBrowserClasses } from "../spaces/SpaceBrowser/SpaceBrowser";
import MembersManager, { MembersManagerProps } from "../spaces/MembersManager/MembersManager";

interface SpaceSelectorProps {
  spaces: ProxySpace[];
  activeSpace: ProxySpace | undefined;
  onSpaceSelect: (space: ProxySpace) => void;
  api?: SpaceSelectorApi;
  authUser?: string | number;
  isExpanded?: boolean;
  className?: string;
  onRefreshSpaces?: () => void; // Explicit prop

  showtype?: "DropDown" | "Browser" | "SpaceManager";
  browserClassNames?: SpaceBrowserClasses;

  isLoading?: boolean;
  error?: string | null,
  onFail?: () => void,

  MembersManager?: MembersManagerProps,
}


export const SpaceSelector = (props: SpaceSelectorProps) => {
  return (
    <SpaceSelectorProvider {...props}>

      {props?.showtype == "Browser" ? (
        <SpaceBrowser browserClassNames={props?.browserClassNames} isLoading={props?.isLoading ?? false} error={props.error} onFail={props.onFail} />
      ) : (
        <SpaceSelectorContent />
      )}

      <BrowseSpaceModal />
      <NewSpaceModal />
      <MembersAndNumbersModal />
      <ManageMembersModal />
      <DeleteConfirmationModal />
    </SpaceSelectorProvider>
  );
};
