/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Image from "next/image";

const FolderTag = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FolderTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;

  ${({ theme }) => theme.media.tablet} {
    font-size: 2rem;
  }
`;

const FolderActions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const IconItem = styled.img`
  width: 2rem;

  ${({ theme }) => theme.media.tablet} {
    width: 2.5rem;
  }
`;

interface FolderTopSectionProps {
  folderTitle?: string;
  onEditFolder?: () => void;
  onDeleteFolder?: () => void;
  onShareFolder?: () => void;
}

export default function FolderTopSection({
  folderTitle,
  onEditFolder,
  onDeleteFolder,
  onShareFolder,
}: FolderTopSectionProps) {
  return (
    <FolderTag>
      <FolderTitle>{folderTitle ?? "기본 폴더명"}</FolderTitle>
      <FolderActions>
        <IconButton type="button" onClick={onShareFolder}>
          <IconItem src="/images/ic_share.svg" alt="공유" />
        </IconButton>
        <IconButton type="button" onClick={onEditFolder}>
          <IconItem src="/images/ic_btn.svg" alt="폴더 수정하기" />
        </IconButton>
        <IconButton type="button" onClick={onDeleteFolder}>
          <IconItem src="/images/ic_trash.svg" alt="폴더 삭제" />
        </IconButton>
      </FolderActions>
    </FolderTag>
  );
}
