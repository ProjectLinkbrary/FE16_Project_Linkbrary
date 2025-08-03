/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { addLink } from "../../../pages/api/link";
import { Folder, Link } from "../../../pages/api/types";

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.563rem;
  z-index: 999;
  pointer-events: auto;
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
  padding: 0.5rem 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 400;
  color: #111111;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.5;

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
  font-size: 1rem;
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

const ErrorText = styled.p`
  color: red;
  font-size: 1rem;
  text-align: center;
  padding-bottom: 14px;
`;

const AddButton = styled.button`
  background: #2c2c2c;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  padding: 0.75rem 0;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// URL 유효성 검사 함수
function isValidUrl(url: string) {
  try {
    const testUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;
    new URL(testUrl);
    return true;
  } catch {
    return false;
  }
}

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
  const filteredFolders = folders.filter((f) => f.id !== -1);
  const [selectedFolderId, setSelectedFolderId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (folderId > 0) {
      setSelectedFolderId(folderId);
    } else if (filteredFolders.length > 0) {
      setSelectedFolderId(filteredFolders[0].id);
    }
  }, []);

  const handleAdd = async () => {
    console.log("추가할 폴더ID, URL:", selectedFolderId, url);
    try {
      setLoading(true);
      setErrorMsg("");

      const formattedUrl =
        url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `https://${url}`;

      const newLink = await addLink({
        url: formattedUrl,
        folderId: selectedFolderId,
      });

      onSuccess(newLink);
      onClose();
    } catch (err: any) {
      const serverMessage = err.response?.data?.message || "";
      if (serverMessage.includes("이미 등록된 URL")) {
        setErrorMsg("이미 추가된 링크입니다.");
      } else {
        setErrorMsg("링크 추가 실패! URL을 확인해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <ModalBox>
        <Header>
          <h2>폴더에 추가</h2>
          <button aria-label="닫기" onClick={onClose}>
            ×
          </button>
        </Header>
        <LinkUrlTitle>{url}</LinkUrlTitle>

        <FolderList>
          {filteredFolders.map(({ id, name, count }) => (
            <FolderItem
              key={id}
              selected={selectedFolderId === id}
              onClick={() => setSelectedFolderId(id)}
            >
              <LeftContent>
                <FolderName>{name}</FolderName>
                <Count>{count ?? 0}개 링크</Count>
              </LeftContent>
              <RightContent>
                {selectedFolderId === id && <CheckIcon />}
              </RightContent>
            </FolderItem>
          ))}
        </FolderList>

        {errorMsg && <ErrorText>{errorMsg}</ErrorText>}

        <AddButton
          onClick={handleAdd}
          disabled={loading || !isValidUrl(url) || filteredFolders.length === 0}
        >
          {loading ? "추가 중..." : "링크 추가하기"}
        </AddButton>
      </ModalBox>
    </ModalWrapper>
  );
}
