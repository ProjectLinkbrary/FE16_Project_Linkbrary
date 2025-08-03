/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Link } from "../../../pages/api/types";

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

const UrlText = styled.p`
  width: 100%;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  word-break: break-all;
`;

const DeleteButton = styled.button`
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
  onConfirm: () => void; // 삭제 확정 시 실행
  loading?: boolean;
}

export default function DeleteLinkModal({
  link,
  onClose,
  onConfirm,
  loading = false,
}: Props) {
  return (
    <ModalWrapper onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>링크 삭제</h2>
          <button onClick={onClose}>×</button>
        </Header>

        <UrlText>{link.url}</UrlText>

        <DeleteButton onClick={onConfirm} disabled={loading}>
          {loading ? "삭제 중..." : "삭제하기"}
        </DeleteButton>
      </ModalBox>
    </ModalWrapper>
  );
}
