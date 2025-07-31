/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import Modal from "../common/Modal";

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccd5e3;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;

  &::placeholder {
    color: #9fa6b2;
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #2c2c2c;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;

interface AddFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFolder: (name: string) => void;
}

export default function AddFolderModal({
  isOpen,
  onClose,
  onAddFolder,
}: AddFolderModalProps) {
  const [folderName, setFolderName] = useState("");

  const handleAddClick = () => {
    if (!folderName.trim()) {
      alert("폴더 이름을 입력하세요.");
      return;
    }
    onAddFolder(folderName);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="폴더 추가">
      <Input
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="내용 입력"
      />
      <AddButton onClick={handleAddClick} disabled={!folderName.trim()}>
        추가하기
      </AddButton>
    </Modal>
  );
}
