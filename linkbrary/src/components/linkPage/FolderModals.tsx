import AddFolderModal from "../modals/Folder/AddFolderModal";
import EditFolderModal from "../modals/Folder/EditFolderModal";
import DeleteFolderModal from "../modals/Folder/DeleteFolderModal";
import { Folder } from "../../pages/api/types";
interface Props {
  isAddFolderModalOpen: boolean;
  onCloseAddModal: () => void;
  onAddFolder: (name: string) => Promise<void>;

  editingFolder: Folder | null;
  onCloseEditModal: () => void;
  onEditFolder: (newName: string) => Promise<void>;

  deletingFolder: Folder | null;
  onCloseDeleteModal: () => void;
  onConfirmDelete: () => Promise<void>;
  deleteLoading: boolean;
}

export default function FolderModals({
  isAddFolderModalOpen,
  onCloseAddModal,
  onAddFolder,
  editingFolder,
  onCloseEditModal,
  onEditFolder,
  deletingFolder,
  onCloseDeleteModal,
  onConfirmDelete,
  deleteLoading,
}: Props) {
  return (
    <>
      {isAddFolderModalOpen && (
        <AddFolderModal onClose={onCloseAddModal} onAdd={onAddFolder} />
      )}

      {editingFolder && (
        <EditFolderModal
          initialName={editingFolder.name}
          onClose={onCloseEditModal}
          onEdit={onEditFolder}
        />
      )}

      {deletingFolder && (
        <DeleteFolderModal
          folderName={deletingFolder.name}
          onClose={onCloseDeleteModal}
          onConfirm={onConfirmDelete}
          loading={deleteLoading}
        />
      )}
    </>
  );
}
