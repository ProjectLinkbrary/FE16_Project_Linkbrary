import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderName: string;
  folderUrl: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 32px 40px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 360px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

const FolderName = styled.p`
  font-size: 14px;
  color: #9fa6b2;
  margin: 0 0 24px 0;
`;

const ShareOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
`;

const ShareOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const IconCircle = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OptionLabel = styled.span`
  font-size: 13px;
  color: #333;
`;

const ShareModal = ({
  isOpen,
  onClose,
  folderName,
  folderUrl,
}: ShareModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleKakaoShare = () => {
    alert("카카오톡으로 공유되었습니다.");
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        folderUrl
      )}`,
      "_blank"
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(folderUrl)
      .then(() => alert("링크가 복사되었습니다!"))
      .catch((err) => console.error("링크 복사 실패:", err));
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>폴더 공유</Title>
        <FolderName>{folderName}</FolderName>
        <ShareOptions>
          <ShareOption onClick={handleKakaoShare}>
            <IconCircle>
              <Image
                src="/images/bt_kakao.svg"
                alt="카카오톡 공유"
                width={42}
                height={42}
              />
            </IconCircle>
            <OptionLabel>카카오톡</OptionLabel>
          </ShareOption>
          <ShareOption onClick={handleFacebookShare}>
            <IconCircle>
              <Image
                src="/images/bt_facebook.svg"
                alt="페이스북 공유"
                width={42}
                height={42}
              />
            </IconCircle>
            <OptionLabel>페이스북</OptionLabel>
          </ShareOption>
          <ShareOption onClick={handleCopyLink}>
            <IconCircle>
              <Image
                src="/images/bt_link.svg"
                alt="링크 복사"
                width={42}
                height={42}
              />
            </IconCircle>
            <OptionLabel>링크 복사</OptionLabel>
          </ShareOption>
        </ShareOptions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ShareModal;
