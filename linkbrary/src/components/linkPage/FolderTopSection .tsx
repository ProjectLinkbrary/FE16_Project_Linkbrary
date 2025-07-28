/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

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
  gap: 12px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
`;

const ShareIcon = styled.img``;
const EditIcon = styled.img``;
const TrashIcon = styled.img``;

interface FolderTopSectionProps {
  folderTitle: string;
}

export default function FolderTopSection({
  folderTitle,
}: FolderTopSectionProps) {
  return (
    <FolderTag>
      <FolderTitle>{folderTitle}</FolderTitle>
      <FolderActions>
        <IconButton type="button">
          <ShareIcon src="/images/ic_share.svg" alt="공유" />
        </IconButton>
        <IconButton type="button">
          <EditIcon src="/images/ic_btn.svg" alt="폴더 수정하기" />
        </IconButton>
        <IconButton type="button">
          <TrashIcon src="/images/ic_trash.svg" alt="폴더 삭제" />
        </IconButton>
      </FolderActions>
    </FolderTag>
  );
}
