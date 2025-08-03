/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { Link, Folder } from "../../pages/api/types";
import {
  fetchLinksFromServer,
  fetchAllLinksFromServer,
  deleteLink,
} from "../../pages/api/link";
import EditLinkModal from "../modals/Link/EditLinkModal";
import DeleteLinkModal from "../modals/Link/DeleteLinkModal";
import AddLinkModal from "../modals/Link/AddlinkModal";

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #fff;
  overflow-y: auto;
`;

const LinkList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LinkInfo = styled.span`
  flex-grow: 1;
  overflow-wrap: break-word;
`;

const LinkButtons = styled.div`
  button {
    margin-left: 8px;
  }
`;

type Props = {
  folderId: number;
  folders: Folder[];
  onFoldersUpdate: () => Promise<void>;
};

export default function LinksContent({
  folderId,
  folders,
  onFoldersUpdate,
}: Props) {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [deletingLink, setDeletingLink] = useState<Link | null>(null);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    async function loadLinks() {
      setLoading(true);
      try {
        const data =
          folderId === -1
            ? await fetchAllLinksFromServer()
            : await fetchLinksFromServer(folderId);
        setLinks(data);
        setError(null);
      } catch (e) {
        setError("링크를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }
    loadLinks();
  }, [folderId]);

  const handleDeleteRequest = (link: Link) => {
    setDeletingLink(link);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingLink) return;

    try {
      setDeleteLoading(true);
      await deleteLink(deletingLink.id);
      setLinks((prev) => prev.filter((l) => l.id !== deletingLink.id));

      await onFoldersUpdate();

      setDeletingLink(null);
    } catch (err) {
      alert("삭제 실패");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEdit = (link: Link) => setEditingLink(link);
  const handleCloseEditModal = () => setEditingLink(null);
  const handleEditSuccess = (updatedLink: Link) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === updatedLink.id ? updatedLink : l))
    );
    setEditingLink(null);
  };

  const handleRequestAddLink = (url: string) => {
    setPendingUrl(url);
    setIsAddLinkModalOpen(true);
  };

  const closeAddModal = () => {
    setPendingUrl(null);
    setIsAddLinkModalOpen(false);
  };

  const handleAddLinkSuccess = async (newLink: Link) => {
    closeAddModal();
    setLinks((prev) => [newLink, ...prev]);
    await onFoldersUpdate();
  };

  return (
    <ContentWrapper>
      <button onClick={() => handleRequestAddLink("")}>링크 추가</button>

      {loading && <p>로딩 중...</p>}
      {error && <p>{error}</p>}

      <LinkList>
        {links.map((link) => (
          <LinkItem key={link.id}>
            <LinkInfo>
              {link.title} - {link.url}
            </LinkInfo>
            <LinkButtons>
              <button onClick={() => handleEdit(link)}>수정</button>
              <button onClick={() => handleDeleteRequest(link)}>삭제</button>
            </LinkButtons>
          </LinkItem>
        ))}
      </LinkList>

      {editingLink && (
        <EditLinkModal
          link={editingLink}
          onClose={handleCloseEditModal}
          onSuccess={handleEditSuccess}
        />
      )}

      {deletingLink && (
        <DeleteLinkModal
          link={deletingLink}
          onClose={() => setDeletingLink(null)}
          onConfirm={handleDeleteConfirm}
          loading={deleteLoading}
        />
      )}

      {isAddLinkModalOpen && pendingUrl !== null && (
        <AddLinkModal
          folderId={folderId > 0 ? folderId : 0}
          url={pendingUrl}
          folders={folders}
          onClose={closeAddModal}
          onSuccess={handleAddLinkSuccess}
        />
      )}
    </ContentWrapper>
  );
}
