import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/theme.js";
import { media } from "../../styles/media.js"; // 미디어쿼리 유틸리티 임포트
import LoginForm from "./LoginForm"; // 로그인 폼 컴포넌트

export default function LoginFormLayout() {
  return (
    <Wrapper>
      {/* 왼쪽 설명 박스 */}
      <Description>
        <h2>로그인 페이지("/login")</h2>
        <ul>
          <li>로그인 버튼 클릭 시 페이지 이동</li>
          <li>회원 가입하기 버튼 클릭 시 /signup 페이지 이동</li>
        </ul>
      </Description>

      {/* 오른쪽 영역 */}
      <Background>
        <FormWrapper>
          <StyledForm>
            <LoginForm />
          </StyledForm>
        </FormWrapper>
      </Background>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Description = styled.div`
  flex: 1;
  padding: 40px;
  color: #fff;
  background-color: #1e1e1e;
  overflow-y: auto;
`;

const Background = styled.div`
  position: relative;
  width: 1440px;
  height: 982px;
  background-image: url("/images/signup-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 1;
  transform: rotate(0deg);
  border: 1px solid red;
`;

// 로그인 폼 위치 박스 (패딩 역할)
const FormWrapper = styled.div`
  position: absolute;
  top: 238.5px;
  left: 520px;
  width: 400px;
  height: 487px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  opacity: 1;
`;

// 실제 로그인 폼 스타일
const StyledForm = styled.form`
  width: 100%;
  max-width: none;
  background-color: ${theme.color.gray90};
  border-radius: 0;
  padding: 32px 24px;
  box-shadow: none;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  ${media.tablet} {
    width: 100%;
    max-width: 500px;
    padding: 40px 32px;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
    min-height: auto;
    margin: auto;
    justify-content: center;
  }

  ${media.desktop} {
    max-width: 540px;
    padding: 50px 40px;
  }
`;