import React from "react";
import { useSpaceSelector } from "../../context";
import { DrawerDialog } from "../../ui/drawer-dialog";
import { MemberRole } from "../../types";
import MembersManager from "../../../spaces/MembersManager/MembersManager";

interface ManageMembersModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialEmail?: string;
  initialRole?: MemberRole;
}

/**
 * ManageMembersModal
 *
 * A thin modal boundary around the standalone <ManageMembers /> component.
 * All UI and logic lives in ManageMembers — this file only handles the
 * DrawerDialog open/close lifecycle and wires up context props.
 */
const ManageMembersModal = ({
  isOpen,
  onClose,
  initialEmail,
  initialRole,
}: ManageMembersModalProps) => {
  const { activeModal, modalProps, setModal, api } = useSpaceSelector();

  const effectiveOpen = isOpen || activeModal === "manageMembers";
  const spaceId = modalProps?.manageSpaceMembers?.spaceId;
  const editEmail =
    initialEmail || modalProps?.manageMembersProps?.initialEmail;
  const editRole = initialRole || modalProps?.manageMembersProps?.initialRole;

  if (!modalProps?.manageSpaceMembers && !isOpen) return null;
  if (!spaceId || !api?.inviteMembers) return null;

  const handleClose = onClose ?? (() => setModal(null));

  return (
    <DrawerDialog
      open={effectiveOpen}
      onClose={handleClose}
      className="sm:max-w-[500px] p-0 overflow-hidden z-[10011] bg-neutral-50 dark:bg-neutral-900"
      overlayClassName="z-[10010]"
    >
      <MembersManager
        spaceId={spaceId}
        initialEmail={editEmail}
        initialRole={editRole}
        onSuccess={() => setModal("membersAndNumbers")}
        onCancel={handleClose}
      />
    </DrawerDialog>
  );
};

export default ManageMembersModal;
