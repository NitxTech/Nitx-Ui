import React from "react";
import { useOptionalSpaceSelector } from "../../context";
import { DrawerDialog } from "../../ui/drawer-dialog";
import { MemberRole, SpaceSelectorApi } from "../../types";
import MembersManager from "../../../spaces/MembersManager";

interface ManageMembersModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  spaceId?: string;
  api?: Pick<SpaceSelectorApi, "inviteMembers">;
  initialEmail?: string;
  initialRole?: MemberRole;
  onSuccess?: () => void;
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
  spaceId: spaceIdProp,
  api: apiProp,
  initialEmail,
  initialRole,
  onSuccess,
}: ManageMembersModalProps) => {
  const spaceSelector = useOptionalSpaceSelector();
  const activeModal = spaceSelector?.activeModal;
  const modalProps = spaceSelector?.modalProps;
  const setModal = spaceSelector?.setModal;
  const api = apiProp ?? spaceSelector?.api;

  const effectiveOpen = isOpen || activeModal === "manageMembers";
  const spaceId = spaceIdProp ?? modalProps?.manageSpaceMembers?.spaceId;
  const editEmail =
    initialEmail ?? modalProps?.manageMembersProps?.initialEmail;
  const editRole = initialRole ?? modalProps?.manageMembersProps?.initialRole;

  if (!effectiveOpen) return null;
  if (!spaceId || !api?.inviteMembers) return null;

  const handleClose = onClose ?? (() => setModal?.(null));
  const handleSuccess = onSuccess ?? (() => setModal?.("membersAndNumbers"));

  return (
    <DrawerDialog
      open={effectiveOpen}
      onClose={handleClose}
      className="sm:max-w-[500px] p-0 overflow-hidden z-[10011] bg-neutral-50 dark:bg-neutral-900"
      overlayClassName="z-[10010]"
    >
      <MembersManager
        spaceId={spaceId}
        api={api}
        initialEmail={editEmail}
        initialRole={editRole}
        onSuccess={handleSuccess}
        onCancel={handleClose}
      />
    </DrawerDialog>
  );
};

export default ManageMembersModal;
