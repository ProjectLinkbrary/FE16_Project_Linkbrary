/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import theme from "styles/theme";

const TopSectionWrapper = styled.section`
  background: url("/images/linkpagebg.png") no-repeat center center / cover;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  overflow: hidden;

  width: 100%;

  ${theme.media.tablet} {
    height: 368px;
  }
`;

const LinkWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  ${theme.media.tablet} {
    gap: 2.5rem;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;

  ${theme.media.tablet} {
    font-size: 32px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 20.438rem;
  height: 52px;

  ${theme.media.tablet} {
    width: 35.563rem;
    height: 70px;
  }

  ${theme.media.desktop} {
    width: 40rem;
  }
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

  border-radius: 100px;
  border: none;
  font-size: 1rem;

  color: #b3b3b3;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.color.gray50};
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

  ${theme.media.tablet} {
    height: 3.125rem;
    padding: 8px 30px;
  }
`;

export default function TopSection() {
  // const [link, setLink] = useState("");

  // const handleAddLink = async () => {
  //   try {
  //     const response = await fetch("https://linkbrary-api.vercel.app/1/links", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         url: link,
  //         folderId: 1, // 기본 폴더 ID (테스트용)
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log("링크 추가 성공 ✅", data);
  //     alert("링크가 추가되었습니다!");

  //     setLink(""); // 입력창 초기화
  //   } catch (error) {
  //     console.error("링크 추가 실패 ❌", error);
  //     alert("추가에 실패했습니다.");
  //   }
  // };

  return (
    <TopSectionWrapper>
      <LinkWrapper>
        <Title>세상의 모든 정보, 필요한 순간에</Title>
        <InputWrapper>
          <LinkIcon src="/images/ic_link.svg" alt="링크 아이콘" />
          <LinkInput
            placeholder="링크를 추가해 보세요"
            // value={link}
            // onChange={(e) => setLink(e.target.value)}
          />
          {/* <LightButton type="button" onClick={handleAddLink}>
            추가하기
          </LightButton> */}
          <AddButton>추가하기</AddButton>
        </InputWrapper>
      </LinkWrapper>
    </TopSectionWrapper>
  );
}
