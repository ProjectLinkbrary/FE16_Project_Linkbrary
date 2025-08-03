// components/membership/LoginForm.tsx
import React, { useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import MembershipInput from "./MembershipInput"; // 경로 확인 필요
import { theme } from "../../styles/theme";

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${theme.color.gray90};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  background-color: ${theme.color.gray80};
  padding: 40px 32px;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
`;

const LogoArea = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${theme.color.white};
  text-align: center;
  margin-bottom: 32px;
  cursor: pointer;
`;

const SignupPrompt = styled.div`
  display: flex;
  justify-content: center;
  font-size: ${theme.fontSize.fz14};
  color: ${theme.color.gray40};
  margin-bottom: 24px;

  & > span {
    margin-right: 8px;
  }

  a {
    color: ${theme.color.primary};
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #6d6afe;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${theme.color.gray20};
  color: ${theme.color.black};
  border-radius: 28px;
  font-size: ${theme.fontSize.fz18};
  cursor: pointer;
  margin-top: 20px;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.color.gray30};
  }
  &:disabled {
    background-color: ${theme.color.gray50};
    cursor: not-allowed;
  }
`;

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

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

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateEmail(email);
  };

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validatePassword(password);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) return;

    // 실제 로그인 검증 로직 필요시 여기에 작성
    // 예: 서버 API 호출 등

    if (password !== "password123") {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    router.push("/");
  };

  return (
    <Wrapper>
      <FormContainer>
     <LogoArea>
     <Link href="/" passHref>
     <a>Linkbrary</a>
     </Link>
     </LogoArea>
        <SignupPrompt>
          <span>회원이 아니신가요?</span>
          <Link href="/signup">회원 가입하기</Link>
        </SignupPrompt>

        <form onSubmit={handleSubmit} noValidate>
          <MembershipInput
            label="이메일"
            name="email"
            type="email"
            value={email}
            placeholder="codeit@codeit.com"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            onBlur={handleEmailBlur}
            hasError={!!emailError}
            errorMessage={emailError}
            required
          />

          <MembershipInput
            label="비밀번호"
            name="password"
            type="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            onBlur={handlePasswordBlur}
            hasError={!!passwordError}
            errorMessage={passwordError}
            required
            hasToggle
          />

          <SubmitButton type="submit">로그인</SubmitButton>
        </form>
      </FormContainer>
    </Wrapper>
  );
};

export default LoginForm;