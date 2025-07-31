import React, { useState } from "react";
import styled from "@emotion/styled";
import LoginFormLayout from "../components/membership/LoginFormLayout";
import MembershipInput from "../components/membership/MembershipInput";
import { theme } from "../styles/theme";
import { instance } from "../pages/api/instance"
import { saveToStorage } from "../utils/storage"; // 토큰 저장 함수

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
        hasToggle={true} // 여기에 true 넣어야 눈 아이콘 나옵니다.
        placeholder="비밀번호를 입력해주세요"
      />
      <LoginButton type="submit">로그인</LoginButton>
    </LoginFormLayout>
  );
};

export default LoginPage;

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
