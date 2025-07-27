import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/theme";
import Link from "next/link";
import Image from "next/image";

interface LoginLayoutProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginFormLayout = ({ children, onSubmit }: LoginLayoutProps) => {
  return (
    <Wrapper>
      <Background>
        <FormWrapper>
          <StyledForm onSubmit={onSubmit}>
            <LogoWrapper>
              <Image
                src="/images/logo.svg"
                alt="Linkbrary 로고"
                width={210.58}
                height={38}
                priority
              />
              <JoinLink>
                회원이 아니신가요? <a href="/signup">회원 가입하기</a>
              </JoinLink>
            </LogoWrapper>
            {children}
          </StyledForm>
        </FormWrapper>
      </Background>
    </Wrapper>
  );
};

export default LoginFormLayout;

// ==========================
// Styled Components
// ==========================

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Background = styled.div`
  background: url("/images/bg_signup.png") no-repeat center center / cover;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  background-color: ${theme.color.gray90}; // fallback 색상

  ${theme.media.tablet} {
    padding: 40px;
  }

  ${theme.media.desktop} {
    padding: 60px;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 0;
  padding: 32px 24px;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;

  ${theme.media.tablet} {
    border-radius: 15px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
    padding: 40px 32px;
  }

  ${theme.media.desktop} {
    padding: 50px 40px;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const JoinLink = styled.p`
  margin-top: 8px;
  color: ${theme.color.white};
  font-size: 16px;

  a {
    color: ${theme.color.primary};
    text-decoration: none;
    margin-left: 4px;

    &:hover {
      color: #6d6afe;
    }
  }

  ${theme.media.tablet} {
    font-size: 18px;
  }

  ${theme.media.desktop} {
    font-size: 20px;
  }
`;


