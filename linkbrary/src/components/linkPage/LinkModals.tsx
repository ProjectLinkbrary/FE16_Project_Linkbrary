/** @jsxImportSource @emotion/react */
import AddLinkModal from "../modals/Link/AddlinkModal";
import EditLinkModal from "../modals/Link/EditLinkModal";
import DeleteLinkModal from "../modals/Link/DeleteLinkModal";
import { Link, Folder } from "../../pages/api/types";

interface LinkModalsProps {
  isAddLinkModalOpen: boolean;
  pendingUrl: string | null;
  folders: Folder[];
  selectedFolderId: number;
  onCloseAddModal: () => void;
  onAddSuccess: (newLink: Link) => void;

  editingLink: Link | null;
  onCloseEditModal: () => void;
  onEditSuccess: (updatedLink: Link) => void;

  deletingLink: Link | null;
  onCloseDeleteModal: () => void;
  onConfirmDelete: () => void;
  deleteLoading: boolean;
}

export default function LinkModals({
  isAddLinkModalOpen,
  pendingUrl,
  folders,
  selectedFolderId,
  onCloseAddModal,
  onAddSuccess,

  editingLink,
  onCloseEditModal,
  onEditSuccess,

  deletingLink,
  onCloseDeleteModal,
  onConfirmDelete,
  deleteLoading,
}: LinkModalsProps) {
  return (
    <>
      {isAddLinkModalOpen && pendingUrl && (
        <AddLinkModal
          folderId={selectedFolderId > 0 ? selectedFolderId : 0}
          url={pendingUrl}
          folders={folders}
          onClose={onCloseAddModal}
          onSuccess={onAddSuccess}
        />
      )}
      {editingLink && (
        <EditLinkModal
          link={editingLink}
          onClose={onCloseEditModal}
          onSuccess={onEditSuccess}
        />
      )}
      {deletingLink && (
        <DeleteLinkModal
          link={deletingLink}
          onClose={onCloseDeleteModal}
          onConfirm={onConfirmDelete}
          loading={deleteLoading}
        />
      )}
    </>
  );
}
