/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;

  h2 {
    font-weight: 700;
    font-size: 1.25rem;
  }

  button {
    position: absolute;
    right: 0;
    top: -8px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #333;
    line-height: 1;
  }
`;

const FolderNameText = styled.p`
  font-size: 14px;
  color: #555;
  padding-top: 8px;
  margin-bottom: 2rem;
  word-break: break-word;
  text-align: center;
`;

const DeleteButton = styled.button`
  width: 100%;
  padding: 0.8rem 0;
  background: #2c2c2c;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  border: none;
  cursor: pointer;

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

interface Props {
  folderName: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteFolderModal({
  folderName,
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  return (
    <ModalWrapper onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>폴더 삭제</h2>
          <button onClick={onClose}>×</button>
        </Header>

        <FolderNameText>{folderName}</FolderNameText>

        <DeleteButton onClick={onConfirm} disabled={loading}>
          {loading ? "삭제 중..." : "삭제하기"}
        </DeleteButton>
      </ModalBox>
    </ModalWrapper>
  );
}
