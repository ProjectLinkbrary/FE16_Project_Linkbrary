/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";

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
  margin-bottom: 1.5rem;
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

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 1.5rem;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 0.8rem 0;
  font-weight: 600;
  font-size: 1rem;
  color: #fff;
  background: #2c2c2c;
  border-radius: 30px;
  border: none;
  cursor: pointer;

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

interface Props {
  initialName: string;
  onClose: () => void;
  onEdit: (newName: string) => Promise<void>;
}

export default function EditFolderModal({
  initialName,
  onClose,
  onEdit,
}: Props) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await onEdit(name.trim());
      onClose();
    } catch {
      alert("폴더 수정 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>폴더 이름 변경</h2>
          <button onClick={onClose}>×</button>
        </Header>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <SaveButton onClick={handleSave} disabled={loading || !name.trim()}>
          {loading ? "수정 중..." : "수정하기"}
        </SaveButton>
      </ModalBox>
    </ModalWrapper>
  );
}
