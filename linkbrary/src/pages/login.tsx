// pages/login.tsx (또는 src/pages/login.tsx)
import React, { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "../styles/theme";

import LoginFormLayout from "../components/membership/LoginFormLayout";
import MembershipInput from "../components/membership/MembershipInput";
import LofinForm from "../components/membership/LoginForm";

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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`로그인 시도: ${email}, ${password}`);
    // 로그인 API 호출 로직 추가 가능
  };

  return (
    <LoginFormLayout onSubmit={handleSubmit}>
      <MembershipInput
        label="이메일"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="codeit@codeit.com"
        required
      />
      <MembershipInput
        label="비밀번호"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
        required
        hasToggle
      />
     <LoginButton type="submit">로그인</LoginButton>
    </LoginFormLayout>
  );
}