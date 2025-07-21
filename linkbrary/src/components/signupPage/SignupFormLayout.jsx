import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/theme.js";

const breakpoints = {
  tablet: "768px",
  desktop: "1024px",
};

const media = {
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
};

// 페이지 전체 컨테이너 스타일 (모바일에서는 폼이 화면을 꽉 채우도록 조정)
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* 화면 높이를 항상 꽉 채움 */
  background-color: ${theme.color
    .gray90}; /* 모바일에서 폼과 동일한 배경색으로 통일 */
  color: ${theme.color.white};
  padding: 0; /* 모바일에서 PageContainer의 패딩을 제거하여 폼이 꽉 차게 함 */
  box-sizing: border-box;

  background-image: none; /* 모바일에서는 배경 이미지 제거 */

  /* 태블릿 (768px 이상) - 배경 이미지를 적용하고 폼이 중앙에 뜨도록 */
  ${media.tablet} {
    background-image: url("/images/signup-bg.png"); /* 태블릿 이상에서 배경 이미지 적용 */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-color: #313131;
    padding: 20px;
  }
`;

// 폼(카드) 스타일 - 모바일에서 화면을 꽉 채우도록
const StyledForm = styled.form`
  width: 100%;
  max-width: none;
  background-color: ${theme.color.gray90}; /* 폼 배경색 */
  border-radius: 0; /* 모바일에서 모서리 둥글기 제거하여 화면에 꽉 차게 함 */
  padding: 32px 24px;
  box-shadow: none;
  min-height: 100vh; /* 모바일에서 세로로 화면 높이 꽉 채움 */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 모바일에서 폼 내부 요소를 상단에 정렬하여 시안처럼 보이도록 */

  /* 태블릿 (768px 이상) - 폼이 카드 형태로 중앙에 뜨도록 다시 설정 */
  ${media.tablet} {
    width: 100%;
    max-width: 500px; /* 태블릿에서 폼의 최대 너비 다시 적용 */
    padding: 40px 32px;
    border-radius: 12px; /* 태블릿 이상에서 모서리 둥글기 다시 적용 */
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6); /* 태블릿 이상에서 그림자 다시 적용 */
    min-height: auto; /* 태블릿 이상에서 높이 자동 조절 */
    margin: auto; /* 태블릿 이상에서 중앙 정렬 */
    justify-content: center; /* 태블릿 이상에서 폼 내부 요소 세로 중앙 정렬 */
  }

  /* 데스크탑 (1024px 이상) */
  ${media.desktop} {
    max-width: 540px;
    padding: 50px 40px;
  }
`;

// 헤더 (로고/제목) 스타일
const Header = styled.h1`
  font-size: ${theme.fontSize.fz32};
  margin-bottom: 40px;
  color: ${theme.color.white};
  font-weight: 700;

  ${media.tablet} {
    font-size: ${theme.fontSize.fz36 || "36px"};
    margin-bottom: 50px;
  }

  ${media.desktop} {
    font-size: ${theme.fontSize.fz42};
    margin-bottom: 60px;
  }
`;

// 서브 텍스트 (회원 여부 질문) 스타일
const SubText = styled.p`
  font-size: ${theme.fontSize.fz16};
  margin-bottom: 30px;
  color: ${theme.color.gray40};

  ${media.tablet} {
    font-size: ${theme.fontSize.fz18};
    margin-bottom: 35px;
  }

  ${media.desktop} {
    font-size: ${theme.fontSize.fz20};
    margin-bottom: 40px;
  }
`;

// 링크 텍스트 (로그인하기) 스타일
const LinkText = styled.span`
  color: ${theme.color.primary};
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const SignupFormLayout = ({ onSubmit, children }) => {
  return (
    <PageContainer>
      <StyledForm onSubmit={onSubmit}>
        <Header>Linkbrary</Header>
        <SubText>
          이미 회원이신가요?
          <LinkText onClick={() => console.log("로그인하기 클릭")}>
            로그인하기
          </LinkText>
        </SubText>
        {children}
      </StyledForm>
    </PageContainer>
  );
};

export default SignupFormLayout;
