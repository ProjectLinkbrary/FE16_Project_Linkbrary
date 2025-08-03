/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Image from "next/image";
import { useState, useEffect } from "react";
import ContentList from "./ContentList";
import NoLinks from "./Nolinks";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";

import { Folder, Link } from "../../pages/api/types";
import FolderTopSection from "./FolderTopSection";
import LoadingSpinner from "../common/Spinner";
import FolderModals from "./FolderModals";
import {
  addFolder,
  updateFolder,
  deleteFolder,
  fetchFolders,
} from "../../pages/api/folder";
const ContentSectionWrapper = styled.section`
  /* margin: 24px 0; */
`;

const CategoryContainer = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0 1rem 0;

  ${({ theme }) => theme.media.tablet} {
    margin: 2.5rem 0 1.5rem 0;
  }

  ${({ theme }) => theme.media.desktop} {
    margin: 3rem 0 2rem 0;
  }
`;

const Pagination = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;

  margin: 4rem 0 4rem 0;
`;

const defaultPageNumbers: Array<string | number> = ["<", 1, 2, 3, 4, 5, ">"];

interface ContentSectionProps {
  list: Link[];
  loading: boolean;
  folderTitle?: string;
  onDelete: (link: Link) => void;
  onEdit: (link: Link) => void;
  onToggleFavorite: (link: Link) => void;

  folders: Folder[];
  selectedCategoryId: number | null;
  onSelectCategory: (folderId: number) => void;
  onAddFolder: () => void;
  onEditFolder: () => void;
  onDeleteFolder: () => void;
  onRefreshFolders: () => void;

  kebabMenuOpenId: string | null;
  toggleKebabMenu: (linkId: string) => void;
}

export default function ContentSection({
  list,
  loading,
  folderTitle,
  onDelete,
  onEdit,
  folders,
  selectedCategoryId,
  onSelectCategory,
  onAddFolder,
  onEditFolder,
  onDeleteFolder,
  onRefreshFolders,
  onToggleFavorite,
  kebabMenuOpenId,
  toggleKebabMenu,
}: ContentSectionProps) {
  const [openMenuCardId, setOpenMenuCardId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 모달 상태 관리
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 검색 필터링
  const filteredList = list.filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 선택된 폴더 정보
  const selectedFolder =
    folders.find((folder) => folder.id === selectedCategoryId) || null;

  // 폴더 추가 핸들러
  const addFolderHandler = async (name: string) => {
    try {
      const newFolder = await addFolder(name);
      console.log("폴더 추가 성공:", newFolder);
      setIsAddFolderModalOpen(false);
      onRefreshFolders();
      onSelectCategory(newFolder.id);
    } catch (error) {
      console.error("폴더 추가 실패:", error);
    }
  };

  // 폴더 수정 핸들러
  const editFolderHandler = async (updatedName: string) => {
    if (!selectedFolder) return;
    try {
      const updatedFolder = await updateFolder(selectedFolder.id, updatedName);
      console.log("폴더 수정 성공:", updatedFolder);
      setIsEditFolderModalOpen(false);
      onRefreshFolders(); // 🔥 폴더 이름 변경된 걸 반영
      onSelectCategory(updatedFolder.id);
    } catch (error) {
      console.error("폴더 수정 실패:", error);
    }
  };

  // 폴더 삭제 핸들러
  const deleteFolderHandler = async () => {
    if (!selectedFolder) return;
    setIsDeleting(true);
    try {
      await deleteFolder(selectedFolder.id);
      console.log("폴더 삭제 성공");
      setIsDeleteFolderModalOpen(false);
      onRefreshFolders(); // 🔥 목록 갱신
      onSelectCategory(-1); // 전체로 이동
    } catch (e) {
      console.error("폴더 삭제 실패:", e);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditFolderOpen = () => setIsEditFolderModalOpen(true);
  const handleDeleteFolderOpen = () => setIsDeleteFolderModalOpen(true);

  const handleToggleMenu = (id: number) => {
    setOpenMenuCardId((prev) => (prev === id ? null : id));
  };

  return (
    <ContentSectionWrapper>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClear={() => setSearchTerm("")}
      />

      <CategoryContainer>
        <CategoryFilter
          folders={folders}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={onSelectCategory}
          onAddFolder={onAddFolder}
        />
      </CategoryContainer>

      {selectedCategoryId !== null && (
        <ContentWrapper>
          <FolderTopSection
            folderTitle={selectedCategoryId === -1 ? "전체" : folderTitle ?? ""}
            onEditFolder={selectedCategoryId === -1 ? undefined : onEditFolder}
            onDeleteFolder={
              selectedCategoryId === -1 ? undefined : onDeleteFolder
            }
            onShareFolder={() => alert("공유 기능 준비 중")}
          />
        </ContentWrapper>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : filteredList.length > 0 ? (
        <ContentList
          list={filteredList}
          onDeleteRequest={onDelete}
          onEdit={onEdit}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <NoLinks />
      )}
    </ContentSectionWrapper>
  );
}
