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
  font-size: 20px;
  font-weight: 600;
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

interface FolderTopSectionProps {
  folderTitle?: string;
  onShareClick: () => void;
}

export default function FolderTopSection({
  folderTitle,
  onShareClick,
}: FolderTopSectionProps) {
  return (
    <FolderTag>
      <FolderTitle>{folderTitle ?? "기본 폴더명"}</FolderTitle>
      <FolderActions>
        <IconButton type="button" onClick={onShareClick}>
          <Image src="/images/ic_share.svg" alt="공유" width={24} height={24} />
        </IconButton>
        <IconButton type="button">
          <Image
            src="/images/ic_btn.svg"
            alt="폴더 수정하기"
            width={24}
            height={24}
          />
        </IconButton>
        <IconButton type="button">
          <Image
            src="/images/ic_trash.svg"
            alt="폴더 삭제"
            width={24}
            height={24}
          />
        </IconButton>
      </FolderActions>
    </FolderTag>
  );
}
