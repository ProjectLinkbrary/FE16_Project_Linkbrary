/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import TopSection from "../../components/linkPage/TopSection";
import ContentSection from "../../components/linkPage/ContentSection";
import LinkModals from "../../components/linkPage/LinkModals";
import FolderModals from "../../components/linkPage/FolderModals";

import {
  fetchLinksFromServer,
  deleteLink,
  fetchAllLinksFromServer,
} from "../api/link";

import {
  fetchFolders,
  addFolder,
  updateFolder,
  deleteFolder,
} from "../api/folder";

import { Link, Folder } from "../api/types";

const PageContainer = styled.div`
  width: 100%;
  max-width: 66.25rem;
  margin: 0 auto;
  padding: 0 1.563rem;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 1.875rem;
  }
  ${({ theme }) => theme.media.desktop} {
    padding: 0 1.875rem;
  }
`;

export default function FolderLinksPage() {
  // 링크 상태
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [deletingLink, setDeletingLink] = useState<Link | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // 폴더 상태
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<number>(-1);

  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);

  // 폴더 수정, 삭제 대상
  const [folderOperationLoading, setFolderOperationLoading] = useState(false);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [deletingFolder, setDeletingFolder] = useState<Folder | null>(null);

  // 폴더 API 갱신 함수
  const refreshFolders = async () => {
    try {
      const apiFolders = await fetchFolders();
      setFolders(apiFolders);
    } catch (err) {
      console.error("폴더 목록 불러오기 실패:", err);
    }
  };
  // 폴더 추가 모달 열기
  const openAddFolderModal = () => {
    setIsAddFolderModalOpen(true);
  };

  // 폴더 추가 처리 (중복 체크 포함)
  const handleConfirmAddFolder = async (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    // 중복 폴더명 체크
    if (folders.some((folder) => folder.name === trimmedName)) {
      alert(`"${trimmedName}" 폴더가 이미 존재합니다.`);
      return;
    }

    setFolderOperationLoading(true);
    try {
      await addFolder(trimmedName);
      const updatedFolders = await fetchFolders();
      setFolders(updatedFolders);

      const newFolder = updatedFolders.find((f) => f.name === trimmedName);
      if (newFolder) {
        setSelectedFolderId(newFolder.id);
        await handleSelectCategory(newFolder.id);
      }

      setIsAddFolderModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("폴더 추가 실패");
    } finally {
      setFolderOperationLoading(false);
    }
  };

  // 폴더 수정 모달 열기
  const openEditFolderModal = () => {
    const folder = folders.find((f) => f.id === selectedFolderId) || null;
    setEditingFolder(folder);
    setIsEditFolderModalOpen(true);
  };

  // 폴더 수정 처리 (중복 체크 포함)
  const handleEditFolder = async (newName: string) => {
    if (!editingFolder) return;

    const trimmedName = newName.trim();
    if (!trimmedName) return;

    // 중복 폴더명 체크
    if (
      folders.some(
        (folder) =>
          folder.name === trimmedName && folder.id !== editingFolder.id
      )
    ) {
      alert(`"${trimmedName}" 폴더명이 이미 존재합니다.`);
      return;
    }

    setFolderOperationLoading(true);
    try {
      const updated = await updateFolder(editingFolder.id, trimmedName);
      setFolders((prev) =>
        prev.map((f) => (f.id === updated.id ? updated : f))
      );
      setIsEditFolderModalOpen(false);
      setEditingFolder(null);
    } catch (err) {
      console.error(err);
      alert("폴더 수정 실패");
    } finally {
      setFolderOperationLoading(false);
    }
  };

  // 폴더 삭제 모달 열기
  const openDeleteFolderModal = () => {
    const folder = folders.find((f) => f.id === selectedFolderId) || null;
    setDeletingFolder(folder);
    setIsDeleteFolderModalOpen(true);
  };

  // 폴더 삭제 처리
  const handleDeleteFolder = async () => {
    if (!deletingFolder) return;

    if ((deletingFolder.count ?? 0) > 0) {
      alert("현재 폴더에 모든 링크를 삭제한 후에 폴더를 삭제할 수 있습니다.");
      setIsDeleteFolderModalOpen(false);
      return;
    }

    setFolderOperationLoading(true);
    try {
      await deleteFolder(deletingFolder.id);
      setFolders((prev) => prev.filter((f) => f.id !== deletingFolder.id));
      setSelectedFolderId(-1);
      setIsDeleteFolderModalOpen(false);
      setDeletingFolder(null);
    } catch (err) {
      console.error(err);
      alert("폴더 삭제 실패");
    } finally {
      setFolderOperationLoading(false);
    }
  };

  // 링크 관련
  const handleSelectCategory = async (folderId: number) => {
    setSelectedFolderId(folderId);
    setLoading(true);
    try {
      if (folderId === -1) {
        const allLinks = await fetchAllLinksFromServer();
        setLinks(allLinks);
      } else {
        const folderLinks = await fetchLinksFromServer(folderId);
        setLinks(folderLinks);
      }
      setError(null);
    } catch (err) {
      console.error("링크 로드 실패:", err);
      setError("링크를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 링크 삭제 요청
  const handleDeleteRequest = (link: Link) => {
    setDeletingLink(link);
  };

  // 링크 삭제 실제 수행
  const handleDeleteConfirm = async () => {
    if (!deletingLink) return;
    setDeleteLoading(true);
    try {
      await deleteLink(deletingLink.id);
      setLinks((prev) => prev.filter((l) => l.id !== deletingLink.id));
      await refreshFolders();
      await handleSelectCategory(selectedFolderId);
      setDeletingLink(null);
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    } finally {
      setDeleteLoading(false);
    }
  };

  // 링크 편집
  const handleEdit = (link: Link) => setEditingLink(link);
  const handleCloseEditModal = () => setEditingLink(null);
  const handleEditSuccess = (updatedLink: Link) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === updatedLink.id ? updatedLink : l))
    );
    setEditingLink(null);
  };

  // 링크 추가 모달 열기
  const handleRequestAddLink = (url: string) => {
    setPendingUrl(url);
    setIsAddLinkModalOpen(true);
  };

  // 링크 추가 모달 닫기
  const closeModal = () => {
    setPendingUrl(null);
    setIsAddLinkModalOpen(false);
  };

  // 즐겨찾기 토글 핸들러
  const handleToggleFavorite = (link: Link) => {
    setLinks((prev) =>
      prev.map((l) =>
        l.id === link.id ? { ...l, isFavorite: !l.isFavorite } : l
      )
    );
  };

  // 페이지 첫 로딩 시 폴더 및 전체 링크 로드
  useEffect(() => {
    (async () => {
      await refreshFolders();
      await handleSelectCategory(-1);
    })();
  }, []);

  return (
    <>
      <Header isLoggedIn={true} />
      <TopSection
        onRequestAddLink={handleRequestAddLink}
        folders={folders}
        isModalOpen={isAddLinkModalOpen}
        selectedCategoryId={selectedFolderId}
        onSelectCategory={handleSelectCategory}
        onAddFolder={openAddFolderModal} // 모달 열기만 처리
      />

      <PageContainer>
        <ContentSection
          onToggleFavorite={handleToggleFavorite}
          list={links}
          loading={loading}
          onDelete={handleDeleteRequest}
          onEdit={handleEdit}
          folderTitle={
            selectedFolderId === -1
              ? "전체"
              : folders.find((f) => f.id === selectedFolderId)?.name || ""
          }
          folders={folders}
          selectedCategoryId={selectedFolderId}
          onSelectCategory={handleSelectCategory}
          onAddFolder={openAddFolderModal}
          onEditFolder={openEditFolderModal}
          onDeleteFolder={openDeleteFolderModal}
          onRefreshFolders={refreshFolders}
        />
      </PageContainer>

      <Footer />

      <LinkModals
        isAddLinkModalOpen={isAddLinkModalOpen}
        pendingUrl={pendingUrl}
        folders={folders}
        selectedFolderId={selectedFolderId}
        onCloseAddModal={closeModal}
        onAddSuccess={async (newLink) => {
          closeModal();
          setLinks((prev) => [newLink, ...prev]);
          await refreshFolders();
        }}
        editingLink={editingLink}
        onCloseEditModal={handleCloseEditModal}
        onEditSuccess={handleEditSuccess}
        deletingLink={deletingLink}
        onCloseDeleteModal={() => setDeletingLink(null)}
        onConfirmDelete={handleDeleteConfirm}
        deleteLoading={deleteLoading}
      />

      <FolderModals
        isAddFolderModalOpen={isAddFolderModalOpen}
        onCloseAddModal={() => setIsAddFolderModalOpen(false)}
        onAddFolder={handleConfirmAddFolder}
        editingFolder={editingFolder}
        onCloseEditModal={() => {
          setIsEditFolderModalOpen(false);
          setEditingFolder(null);
        }}
        onEditFolder={handleEditFolder}
        deletingFolder={deletingFolder}
        onCloseDeleteModal={() => {
          setIsDeleteFolderModalOpen(false);
          setDeletingFolder(null);
        }}
        onConfirmDelete={handleDeleteFolder}
        deleteLoading={folderOperationLoading}
      />
    </>
  );
}
