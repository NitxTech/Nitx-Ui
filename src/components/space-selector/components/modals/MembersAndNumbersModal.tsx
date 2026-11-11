"use client";

import React, { useMemo } from "react";
import { useSpaceSelector } from "../../context";
import { DrawerDialog } from "../../ui/drawer-dialog";
import MembersAndNumbers from "../../../spaces/MembersAndNumbers";
import { getSpaceImageUrl } from "../SpaceAvatar";

const MembersAndNumbersModal = () => {
  const {
    activeModal: modal,
    modalProps: props,
    setModal,
    setModalProps: setProps,
    refreshSpaces,
    api,
    spaces,
    activeSpace,
    setActiveSpace,
  } = useSpaceSelector();

  const spaceId = props?.manageSpaceMembers?.spaceId;

  const targetSpace = useMemo(() => {
    if (!spaceId) return undefined;
    return spaces.find(
      (s) =>
        s.space_uuid === spaceId ||
        s.proxyId === spaceId ||
        s.uuid === spaceId
    );
  }, [spaces, spaceId]);

  const spaceImage = props?.manageSpaceMembers?.spaceImage || getSpaceImageUrl(targetSpace);

  if (modal !== "membersAndNumbers" || !spaceId) return null;

  return (
    <DrawerDialog
      size="2xl"
      className="p-0 overflow-hidden sm:max-w-7xl h-[80vh] sm:max-h-[800px] flex flex-col"
      bodyClassName="min-h-0 overflow-hidden"
      open={modal === "membersAndNumbers"}
      onClose={() => setModal(null)}
    >
      <MembersAndNumbers
        spaceId={spaceId}
        spaceName={props?.manageSpaceMembers?.spaceName}
        spaceImage={spaceImage}
        api={api}
        isOpen={modal === "membersAndNumbers"}
        onRefreshSpaces={refreshSpaces}
        onSpaceNameChange={(nextSpaceName) => {
          setProps((currentProps: any) => {
            if (!currentProps?.manageSpaceMembers) return currentProps;

            return {
              ...currentProps,
              manageSpaceMembers: {
                ...currentProps.manageSpaceMembers,
                spaceName: nextSpaceName,
              },
            };
          });
        }}
        onSpaceImageChange={(nextImage) => {
          if (
            activeSpace &&
            (activeSpace.space_uuid === spaceId ||
              activeSpace.proxyId === spaceId ||
              activeSpace.uuid === spaceId)
          ) {
            setActiveSpace({
              ...activeSpace,
              avatar: nextImage,
              image: nextImage,
            });
          }
        }}
      />
    </DrawerDialog>
  );
};

export default MembersAndNumbersModal;
