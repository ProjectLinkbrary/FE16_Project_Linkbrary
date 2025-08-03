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

const AddButton = styled.button`
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
  onClose: () => void;
  onAdd: (name: string) => Promise<void>;
}

export default function AddFolderModal({ onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await onAdd(name.trim());
      onClose();
    } catch {
      alert("폴더 추가 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>폴더 추가</h2>
          <button onClick={onClose}>×</button>
        </Header>
        <Input
          placeholder="폴더 이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <AddButton onClick={handleAdd} disabled={loading}>
          {loading ? "추가 중..." : "추가하기"}
        </AddButton>
      </ModalBox>
    </ModalWrapper>
  );
}
