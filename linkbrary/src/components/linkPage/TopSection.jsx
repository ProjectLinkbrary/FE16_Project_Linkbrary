/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";

const TopSectionWrapper = styled.section`
  background: url("/images/linkpagebg.png") no-repeat center / cover;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 327px;
  height: 52px;
`;
const LinkIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
`;

const LinkInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.5rem 3rem 0.5rem 3rem;

  border-radius: 25px;
  border: none;
  font-size: 1rem;

  color: #b3b3b3;
  background-color: transparent;
  border: 1px solid #b3b3b3;
`;

const AddButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  background: none;
  border: none;

  color: #000000;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 50px;
  background-color: #ffffff;
  cursor: pointer;
`;

export default function TopSection() {
  const [link, setLink] = useState("");

  const handleAddLink = async () => {
    try {
      const response = await fetch("https://linkbrary-api.vercel.app/1/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: link,
          folderId: 1, // 기본 폴더 ID (테스트용)
        }),
      });

      const data = await response.json();
      console.log("링크 추가 성공 ✅", data);
      alert("링크가 추가되었습니다!");

      setLink(""); // 입력창 초기화
    } catch (error) {
      console.error("링크 추가 실패 ❌", error);
      alert("추가에 실패했습니다.");
    }
  };

  return (
    <TopSectionWrapper>
      <LinkWrapper>
        <Title>세상의 모든 정보, 필요한 순간에</Title>
        <InputWrapper>
          <LinkIcon src="/images/ic_link.svg" alt="링크 아이콘" />
          <LinkInput
            placeholder="링크를 추가해 보세요"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <AddButton type="button" onClick={handleAddLink}>
            추가하기
          </AddButton>
        </InputWrapper>
      </LinkWrapper>
    </TopSectionWrapper>
  );
}
