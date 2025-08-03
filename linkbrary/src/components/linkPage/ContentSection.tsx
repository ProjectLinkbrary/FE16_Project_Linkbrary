/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import ContentList from "./ContentList";
import NoLinks from "./Nolinks";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import SearchNoResult from "./SearchNoResult";
import { Folder, Link } from "../../pages/api/types";
import FolderTopSection from "./FolderTopSection";
import LoadingSpinner from "../common/Spinner";
import { useState } from "react";

const ContentSectionWrapper = styled.section``;

const SearchSummary = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #b3b3b3;

  ${({ theme }) => theme.media.tablet} {
    font-size: 1.5rem;
  }
`;

const Highlight = styled.span`
  color: #1e1e1e;
  font-weight: 600;
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

interface ContentSectionProps {
  list: Link[];
  loading: boolean;
  folderTitle?: string;
  onDelete: (link: Link) => void;
  onEdit: (link: Link) => void;
  folders: Folder[];
  selectedCategoryId: number | null;
  onSelectCategory: (folderId: number) => void;
  onAddFolder: () => void;
  onEditFolder: () => void;
  onDeleteFolder: () => void;
  onRefreshFolders: () => void;
  onShareFolder: (folder: Folder) => void;
  onToggleFavorite: (link: Link) => void;
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
  onShareFolder,
}: ContentSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = (list ?? []).filter((link) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      link.title?.toLowerCase().includes(lowerSearch) ||
      link.description?.toLowerCase().includes(lowerSearch) ||
      link.url?.toLowerCase().includes(lowerSearch)
    );
  });

  const selectedFolder =
    folders.find((folder) => folder.id === selectedCategoryId) || null;

  const handleShareFolder = () => {
    if (selectedFolder) {
      onShareFolder(selectedFolder);
    }
  };

  return (
    <ContentSectionWrapper>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClear={() => setSearchTerm("")}
      />

      {searchTerm && (
        <SearchSummary>
          <Highlight>{searchTerm}</Highlight>으로 검색한 결과입니다.
        </SearchSummary>
      )}

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
            onShareFolder={handleShareFolder}
          />
        </ContentWrapper>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : searchTerm && filteredList.length === 0 ? (
        <SearchNoResult />
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
