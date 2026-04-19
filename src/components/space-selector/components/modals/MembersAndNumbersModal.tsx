"use client";

import React from "react";
import { useSpaceSelector } from "../../context";
import { DrawerDialog } from "../../ui/drawer-dialog";
import MembersAndNumbers from "../../../spaces/MembersAndNumbers";

const MembersAndNumbersModal = () => {
  const {
    activeModal: modal,
    modalProps: props,
    setModal,
    setModalProps: setProps,
    refreshSpaces,
    api,
  } = useSpaceSelector();

  const spaceId = props?.manageSpaceMembers?.spaceId;

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
      />
    </DrawerDialog>
  );
};

export default MembersAndNumbersModal;
