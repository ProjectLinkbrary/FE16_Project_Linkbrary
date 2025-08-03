/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import styled from "@emotion/styled";
import LoginFormLayout from "../components/membership/LoginFormLayout";
import MembershipInput from "../components/membership/MembershipInput";
import { theme } from "../styles/theme";
import { instance } from "../pages/api/instance";
<<<<<<< HEAD
import { saveToStorage } from "../utils/storage";
import Image from "next/image";
=======
import { saveToStorage } from "../utils/storage"; // 토큰 저장 함수
import KakaoLoginButton from "../components/signupPage/KakaoLogin";
>>>>>>> 2f5adc4b7baa2bfcecff82c92236ac8e06cb7c06

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("이메일 형식으로 작성해 주세요.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      setPasswordError("8자 이상 작성해 주세요.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleEmailBlur = () => {
    validateEmail(email);
  };

  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid || !isPasswordValid) return;

    try {
      const response = await instance.post("/auth/sign-in", {
        email,
        password,
      });

      const token = response.data.accessToken;
      saveToStorage({ accessToken: token });
      alert("로그인 성공!");
      window.location.href = "/";
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("비밀번호가 일치하지 않습니다.");
      } else if (error.response?.status === 400) {
        alert(error.response.data.message || "로그인 오류.");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <LoginFormLayout onSubmit={handleLogin}>
      <MembershipInput
        label="이메일"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleEmailBlur}
        hasError={!!emailError}
        errorMessage={emailError}
        placeholder="이메일을 입력해주세요"
      />
      <MembershipInput
        label="비밀번호"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={handlePasswordBlur}
        hasError={!!passwordError}
        errorMessage={passwordError}
        hasToggle={true}
        placeholder="비밀번호를 입력해주세요"
      />
      <LoginButton type="submit">로그인</LoginButton>
<<<<<<< HEAD

      {/* ✅ 소셜 로그인 버튼 */}
      <SocialLoginButton type="button">
        <SocialLoginText>소셜 로그인</SocialLoginText>
        <Image src="/images/bt_kakao.svg" alt="카카오 로그인" width={42} height={42} />
      </SocialLoginButton>
=======
      <KakaoLoginButton />
>>>>>>> 2f5adc4b7baa2bfcecff82c92236ac8e06cb7c06
    </LoginFormLayout>
  );
};

const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${theme.color.gray20};
  color: ${theme.color.black};
  border-radius: 28px;
  font-size: ${theme.fontSize.fz18};
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: ${theme.color.gray30};
  }
  &:disabled {
    background-color: ${theme.color.gray50};
    cursor: not-allowed;
  }
`;

/* ✅ 소셜 로그인 버튼 스타일 */
const SocialLoginButton = styled.button`
  width: 400px;
  height: 66px;
  background-color: rgba(30, 30, 30, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;

/* ✅ 텍스트 스타일 따로 */
const SocialLoginText = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0%;
  color: white;
`;

export default LoginPage;
