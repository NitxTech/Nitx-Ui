import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { ProxySpace, SpaceSelectorApi } from "./types";
import {
  getRecentSpacesMap,
  recordSpaceUsage,
  sortSpacesByLastUsed,
  SPACE_RECENT_EVENT_NAME,
} from "./lib/space-recent";

interface SpaceSelectorContextType {
  // State
  activeSpace: ProxySpace | undefined;
  spaces: ProxySpace[];
  sortedSpaces?: ProxySpace[];
  rawSpaces?: ProxySpace[];
  isExpanded: boolean;
  className?: string;
  triggerClassName?: string;

  // Actions
  setActiveSpace: (space: ProxySpace) => void;
  refreshSpaces: () => void | Promise<void>;
  recordRecentSpace?: (space: ProxySpace) => void;

  // Modal State
  activeModal: string | null;
  setModal: (modal: string | null) => void;
  modalProps: any;
  setModalProps: Dispatch<SetStateAction<any>>;

  // API
  api?: SpaceSelectorApi;

  // Utils
  authUser?: string | number;
  recentMap?: Record<string, number>;

  isLoading?: boolean;
  error?: string | null;
  onFail?: () => void;
}

const SpaceSelectorContext = createContext<
  SpaceSelectorContextType | undefined
>(undefined);

export const useOptionalSpaceSelector = () => {
  return useContext(SpaceSelectorContext);
};

export const useSpaceSelector = () => {
  const context = useOptionalSpaceSelector();
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
  onRefreshSpaces?: () => void | Promise<void>;
  authUser?: string | number;
  api?: SpaceSelectorApi;
  isExpanded?: boolean;
  className?: string;
  triggerClassName?: string;
  isLoading?: boolean;
  error?: string | null;
  onFail?: () => void;
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
  className,
  triggerClassName,
  isLoading = false,
  error = null,
  onFail = () => { },
}: SpaceSelectorProviderProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState<any>({});
  const [recentMap, setRecentMap] = useState<Record<string, number>>(() =>
    getRecentSpacesMap(authUser)
  );

  // Synchronize recentMap whenever authUser changes or when storage events fire
  useEffect(() => {
    setRecentMap(getRecentSpacesMap(authUser));

    const handleSync = () => {
      setRecentMap(getRecentSpacesMap(authUser));
    };

    if (typeof window !== "undefined") {
      window.addEventListener(SPACE_RECENT_EVENT_NAME, handleSync);
      window.addEventListener("storage", handleSync);
      return () => {
        window.removeEventListener(SPACE_RECENT_EVENT_NAME, handleSync);
        window.removeEventListener("storage", handleSync);
      };
    }
  }, [authUser]);

  // When activeSpace is provided or changes, record its last-used timestamp
  useEffect(() => {
    if (activeSpace) {
      const updated = recordSpaceUsage(activeSpace, authUser);
      setRecentMap(updated);
    }
  }, [activeSpace, authUser]);

  const handleSpaceSelect = useCallback(
    (space: ProxySpace) => {
      const updated = recordSpaceUsage(space, authUser);
      setRecentMap(updated);
      onSpaceSelect(space);
    },
    [authUser, onSpaceSelect]
  );

  const sortedSpaces = useMemo(() => {
    return sortSpacesByLastUsed(spaces, recentMap, activeSpace);
  }, [spaces, recentMap, activeSpace]);

  const setModal = (modal: string | null) => {
    setActiveModal(modal);
    if (modal === null) setModalProps({});
  };

  return (
    <SpaceSelectorContext.Provider
      value={{
        activeSpace,
        spaces: sortedSpaces,
        sortedSpaces,
        rawSpaces: spaces,
        isExpanded,
        className,
        triggerClassName,
        setActiveSpace: handleSpaceSelect,
        refreshSpaces: onRefreshSpaces || (() => { }),
        recordRecentSpace: (space: ProxySpace) => {
          const updated = recordSpaceUsage(space, authUser);
          setRecentMap(updated);
        },
        activeModal,
        setModal,
        modalProps,
        setModalProps,
        api,
        authUser,
        recentMap,
        isLoading,
        error,
        onFail,
      }}
    >
      {children}
    </SpaceSelectorContext.Provider>
  );
};
