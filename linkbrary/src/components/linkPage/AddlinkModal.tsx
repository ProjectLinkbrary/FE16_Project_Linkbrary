/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import { addLink } from "../../pages/api/link";
import { Folder, Link } from "../../pages/api/types";

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem 2.5rem;
  border-radius: 30px;
  width: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem;

  h2 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 700;
    font-size: 1.25rem;
  }

  button {
    margin-left: auto;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
  }
`;
const LinkUrlTitle = styled.p`
  font-size: 0.875rem;
  color: #b3b3b3;
  text-align: center;
`;

const FolderList = styled.ul`
  margin: 1.5rem 0;
  max-height: 400px;
  overflow-y: auto;
`;

const FolderItem = styled.li<{ selected: boolean }>`
  padding: 0.75rem 1rem;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 1rem;
  color: #111111;
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  background: ${({ selected }) => (selected ? "#F5F5F5" : "transparent")};
  border-radius: 8px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FolderName = styled.span`
  font-size: 0.875rem;
`;

const Count = styled.span`
  color: #b3b3b3;
  font-size: 0.875rem;
  user-select: none;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
`;

const CheckIcon = styled.span`
  width: 20px;
  height: 20px;

  display: inline-block;
  background-image: url("/images/ic_check.svg");
  background-size: contain;
  background-repeat: no-repeat;
`;

const AddButton = styled.button`
  background: #2c2c2c;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  padding: 0.75rem 0;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  user-select: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface Props {
  folderId: number;
  url: string;
  folders: Folder[];
  onClose: () => void;
  onSuccess: (newLink: Link) => void;
}

export default function AddLinkModal({
  folderId,
  url,
  folders,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputUrl, setInputUrl] = useState(url);
  const [selectedFolderId, setSelectedFolderId] = useState<number>(
    Number.isFinite(folderId) ? folderId : folders[0]?.id ?? 0
  );

  const handleAdd = async () => {
    if (!inputUrl.trim()) {
      setErrorMsg("URL을 입력하세요.");
      return;
    }

    try {
      setLoading(true);
      const newLink = await addLink({
        url: inputUrl,
        folderId: selectedFolderId,
      });
      onSuccess(newLink);
      onClose();
    } catch (err) {
      setErrorMsg("링크 추가 실패! URL을 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>폴더에 추가</h2>
          <button aria-label="닫기" onClick={onClose}>
            ×
          </button>
        </Header>
        <LinkUrlTitle>{inputUrl}</LinkUrlTitle>

        <FolderList>
          {(Array.isArray(folders) ? folders : []).map(
            ({ id, name, count }) => (
              <FolderItem
                key={id}
                selected={selectedFolderId === id}
                onClick={() => setSelectedFolderId(id)}
              >
                <LeftContent>
                  <FolderName>{name}</FolderName>
                  <Count>{count}개 링크</Count>
                </LeftContent>
                <RightContent>
                  {selectedFolderId === id && <CheckIcon />}
                </RightContent>
              </FolderItem>
            )
          )}
        </FolderList>
        <AddButton onClick={handleAdd}>
          {loading ? "추가 중..." : "링크 추가하기"}
        </AddButton>
      </ModalBox>
    </ModalWrapper>
  );
}
