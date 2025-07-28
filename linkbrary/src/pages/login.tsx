import React, { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "../styles/theme";

import LoginFormLayout from "../components/membership/LoginFormLayout";
import MembershipInput from "../components/membership/MembershipInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError("이메일 형식으로 작성해 주세요.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (password.length < 8) {
      setPasswordError("8자 이상 작성해 주세요.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("이메일 형식으로 작성해 주세요.");
      return;
    }

    if (password.length < 8) {
      setPasswordError("8자 이상 작성해 주세요.");
      return;
    }

    console.log("로그인 성공:", email, password);
  };

  return (
    <LoginFormLayout onSubmit={handleSubmit}>
      <MembershipInput
  label="이메일"
  type="email"
  name="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={handleEmailBlur}
  placeholder="codeit@codeit.com"
  required
  hasError={!!emailError}
  errorMessage={emailError}
/>

<MembershipInput
  label="비밀번호"
  type="password"
  name="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  onBlur={handlePasswordBlur}
  placeholder="비밀번호를 입력하세요"
  required
  hasToggle
  hasError={!!passwordError}
  errorMessage={passwordError}
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
