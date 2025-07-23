// src/components/SignupPage/SignupFormLayout.tsx

import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/theme"; // .ts 확장자로 변경되었음을 확인
import Link from "next/link";

// SignupFormLayout 컴포넌트가 받을 props의 타입을 정의합니다.
interface SignupFormLayoutProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // 폼 제출 이벤트 타입
  children: React.ReactNode; // React 노드(컴포넌트, 엘리먼트 등)를 자식으로 받음
}

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
  ${theme.media.tablet} {
    background-image: url("/images/bg_signup.png"); /* 태블릿 이상에서 배경 이미지 적용 */
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
  ${theme.media.tablet} {
    width: 100%;
    max-width: 480px; /* 태블릿에서 폼의 최대 너비 다시 적용 */
    padding: 40px 32px;
    border-radius: 12px; /* 태블릿 이상에서 모서리 둥글기 다시 적용 */
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6); /* 태블릿 이상에서 그림자 다시 적용 */
    min-height: auto; /* 태블릿 이상에서 높이 자동 조절 */
    margin: auto; /* 태블릿 이상에서 중앙 정렬 */
    justify-content: center; /* 태블릿 이상에서 폼 내부 요소 세로 중앙 정렬 */
  }

  /* 데스크탑 (1024px 이상) */
  ${theme.media.desktop} {
    max-width: 480px;
    padding: 50px 40px;
  }
`;

// 헤더 (로고/제목) 스타일
const LogoImageContainer = styled.div`
  margin-bottom: 40px; /* 모바일 기본 */
  width: 133px; /* 로고 이미지의 너비 (시안에 맞춰 조절) */
  height: auto; /* 로고 이미지의 높이 자동 조절 */
  display: flex; /* 이미지 중앙 정렬을 위해 추가 */
  justify-content: center; /* 이미지 중앙 정렬을 위해 추가 */
  align-items: center; /* 이미지 중앙 정렬을 위해 추가 */
  cursor: pointer;
  & img {
    max-width: 100%;
    height: auto;
    display: block; /* img 태그에 display: block 적용 */
  }

  ${theme.media.tablet} {
    margin-bottom: 16px; /* 시안처럼 태블릿에서 마진 조절 */
    width: 167px; /* 태블릿에서 로고 이미지 너비 조절 */
  }

  ${theme.media.desktop} {
    margin-bottom: 24px; /* 데스크탑에서 로고 이미지 마진 조절 */
    width: 200px; /* 데스크탑에서 로고 이미지 너비 조절 */
  }
`;

// 서브 텍스트 (회원 여부 질문) 스타일
const SubText = styled.p`
  font-size: ${theme.fontSize.fz16};
  margin-bottom: 32px;
  color: ${theme.color.gray40};

  ${theme.media.tablet} {
    font-size: ${theme.fontSize.fz18};
  }

  ${theme.media.desktop} {
    font-size: ${theme.fontSize.fz20};
  }
`;

// 링크 텍스트 (로그인하기) 스타일
const LinkText = styled.span`
  color: ${theme.color.primary};
  cursor: pointer;
  margin-left: 5px;
  text-decoration: underline;

  &:hover {
    color: #6d6afe; /* hover 시 색상, theme에 정의된 색상 사용 권장 */
  }
`;
// hover 시, 어떻게 할지 이야기 나눠보기 (주석은 제거)

// SignupFormLayout 컴포넌트에 SignupFormLayoutProps 타입을 명시합니다.
const SignupFormLayout: React.FC<SignupFormLayoutProps> = ({
  onSubmit,
  children,
}) => {
  return (
    <PageContainer>
      <StyledForm onSubmit={onSubmit}>
        <Link href="/">
          <LogoImageContainer>
            <img src="/images/logo.svg" alt="Linkbrary Logo" />{" "}
            {/* 실제 로고 이미지 경로로 변경하세요 */}
          </LogoImageContainer>
        </Link>
        <SubText>
          이미 회원이신가요?
          <Link href="/login">
            {/* Link 컴포넌트 내부의 onClick은 일반적으로 필요하지 않습니다. */}
            {/* Link 컴포넌트 자체가 라우팅을 처리하므로 onClick은 제거해도 됩니다. */}
            <LinkText /* onClick={() => console.log("로그인하기 클릭")} */>
              {" "}
              {/* onClick 제거 */}
              로그인하기
            </LinkText>
          </Link>
        </SubText>
        {children}
      </StyledForm>
    </PageContainer>
  );
};

export default SignupFormLayout;
