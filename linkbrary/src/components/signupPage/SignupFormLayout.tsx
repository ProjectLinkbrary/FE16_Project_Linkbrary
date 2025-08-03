import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import { theme } from "../../styles/theme";

interface SignupFormLayoutProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${theme.color.gray90};
  color: ${theme.color.white};
  padding: 0;
  box-sizing: border-box;

  background-image: none;
  \ ${theme.media.tablet} {
    background-image: url("/images/bg_signup.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-color: #313131;
    padding: 20px;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: none;
  background-color: ${theme.color.gray90};
  border-radius: 0;
  padding: 32px 24px;
  box-shadow: none;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  ${theme.media.tablet} {
    width: 100%;
    max-width: 480px;
    padding: 40px 32px;
    border-radius: 15px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
    min-height: auto;
    margin: auto;
    justify-content: center;
  }

  ${theme.media.desktop} {
    max-width: 480px;
    padding: 50px 40px;
  }
`;

// 헤더 (로고/제목) 스타일
const LogoImageContainer = styled.div`
  margin-bottom: 40px;
  width: 133px; // 모바일 기본 너비
  position: relative;
  padding-bottom: 33.33%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${theme.media.tablet} {
    margin-bottom: 16px;
    width: 167px; // 태블릿 너비
  }

  ${theme.media.desktop} {
    width: 210px; // 데스크탑 너비
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
    color: #6d6afe;
  }
`;

const SignupFormLayout = ({ onSubmit, children }: SignupFormLayoutProps) => {
  return (
    <PageContainer>
      <StyledForm onSubmit={onSubmit}>
        <Link href="/">
          <LogoImageContainer>
            <Image
              src="/images/logo.svg"
              alt="잉크브러리 로고"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </LogoImageContainer>
        </Link>
        <SubText>
          이미 회원이신가요?
          <Link href="/login">
            <LinkText>로그인하기</LinkText>
          </Link>
        </SubText>
        {children} {/* 자식 컴포넌트들을 렌더링합니다. */}
      </StyledForm>
    </PageContainer>
  );
};

export default SignupFormLayout;
