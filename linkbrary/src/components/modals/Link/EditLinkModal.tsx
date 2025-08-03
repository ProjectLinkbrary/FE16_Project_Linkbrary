/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import { Link } from "../../../pages/api/types";
import { updateLink } from "../../../pages/api/link";

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
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
  }

  button {
    position: absolute;
    right: 0;
    top: -15px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #333;
    line-height: 1.5;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 0.8rem 0;
  background: #2c2c2c;
  color: #fff;
  font-size: 0.95rem;
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
  link: Link;
  onClose: () => void;
  onSuccess: (updatedLink: Link) => void;
}

export default function EditLinkModal({ link, onClose, onSuccess }: Props) {
  const [url, setUrl] = useState(link.url);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!url.trim()) return;
    setLoading(true);
    try {
      const updated = await updateLink({
        id: link.id,
        url,
      });
      onSuccess(updated);
    } catch (error) {
      alert("수정 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>링크 수정</h2>
          <button onClick={onClose}>×</button>
        </Header>

        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <SaveButton onClick={handleSave} disabled={loading}>
          {loading ? "수정 중..." : "수정하기"}
        </SaveButton>
      </ModalBox>
    </ModalWrapper>
  );
}
