import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProxySpace, SpaceSelectorApi } from "./types";

interface SpaceSelectorContextType {
  // State
  activeSpace: ProxySpace | undefined;
  spaces: ProxySpace[];
  isExpanded: boolean;

  // Actions
  setActiveSpace: (space: ProxySpace) => void;
  refreshSpaces: () => void;

  // Modal State
  activeModal: string | null;
  setModal: (modal: string | null) => void;
  modalProps: any;
  setModalProps: (props: any) => void;

  // API
  api?: SpaceSelectorApi;

  // Utils
  authUser?: string | number;


  isLoading?: boolean;
  error?: string | null;
  onFail?: () => void,
}

const SpaceSelectorContext = createContext<
  SpaceSelectorContextType | undefined
>(undefined);

export const useSpaceSelector = () => {
  const context = useContext(SpaceSelectorContext);
  if (!context) {
    throw new Error(
      "useSpaceSelector must be used within a SpaceSelectorProvider"
    );
  }
  return context;
};

interface SpaceSelectorProviderProps {
  children: ReactNode;
  activeSpace: ProxySpace | undefined;
  spaces: ProxySpace[];
  onSpaceSelect: (space: ProxySpace) => void;
  onRefreshSpaces?: () => void;
  authUser?: string | number;
  api?: SpaceSelectorApi;
  isExpanded?: boolean;
  isLoading?: boolean;
  error?: string | null;
  onFail?: () => void,
}

export const SpaceSelectorProvider = ({
  children,
  activeSpace,
  spaces,
  onSpaceSelect,
  onRefreshSpaces,
  authUser,
  api,
  isExpanded = true,
  isLoading = false,
  error = null,
  onFail = () => { },
}: SpaceSelectorProviderProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState<any>({});

  const setModal = (modal: string | null) => {
    setActiveModal(modal);
    if (modal === null) setModalProps({});
  };

  return (
    <SpaceSelectorContext.Provider
      value={{
        activeSpace,
        spaces,
        isExpanded,
        setActiveSpace: onSpaceSelect,
        refreshSpaces: onRefreshSpaces || (() => { }),
        activeModal,
        setModal,
        modalProps,
        setModalProps,
        api,
        authUser,
        isLoading,
        error,
        onFail,
      }}
    >
      {children}
    </SpaceSelectorContext.Provider>
  );
};
