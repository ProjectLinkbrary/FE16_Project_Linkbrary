import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import SignupFormLayout from "./SignupFormLayout";
import InputField from "./InputField";
import { theme } from "../../styles/theme";

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

  &:hover:not(:disabled) {
    background-color: ${theme.color.gray30};
  }
  &:disabled {
    background-color: ${theme.color.gray50};
    cursor: not-allowed;
  }
`;

type EmailStatus = "valid" | "invalid_format" | "invalid_duplicate" | null;

const SignupPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isPasswordLongEnough = password.length >= 8;
  const doPasswordsMatch = password.length > 0 && password === confirmPassword;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailStatus(null);
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setEmailStatus("invalid_format");
    }
  };

  const handleCheckEmail = async () => {
    handleEmailBlur();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return;

    try {
      const response = await fetch("/api/checkEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.status === 409) setEmailStatus("invalid_duplicate");
      else if (response.ok) setEmailStatus("valid");
    } catch (error) {
      console.error("API 요청 에러:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    // 실제 회원가입 API 호출
    console.log("가입 완료:", { email, name });
    router.push("/login");
  };

  // 전체 폼 유효성
  const isFormValid =
    emailStatus === "valid" &&
    name.length > 0 &&
    isPasswordLongEnough &&
    doPasswordsMatch;

  return (
    <SignupFormLayout onSubmit={handleSubmit}>
      <InputField
        label="이메일"
        type="email"
        id="email"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        onCheck={handleCheckEmail}
        isValid={emailStatus === "valid"}
        isInvalid={
          emailStatus === "invalid_format" ||
          emailStatus === "invalid_duplicate"
        }
        errorMessage={
          emailStatus === "valid"
            ? "사용 가능한 이메일입니다."
            : emailStatus === "invalid_format"
            ? "이메일 형식으로 작성해 주세요."
            : emailStatus === "invalid_duplicate"
            ? "중복된 이메일입니다."
            : null
        }
        isMessageSuccess={emailStatus === "valid"}
      />
      <InputField
        label="이름"
        type="text"
        id="name"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label="비밀번호"
        type="password"
        id="password"
        placeholder="영문, 숫자 조합 8자 이상"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showToggle={true}
        onToggle={() => setShowPassword(!showPassword)}
        showPassword={showPassword}
        isInvalid={password.length > 0 && !isPasswordLongEnough}
        errorMessage={
          password.length > 0 && !isPasswordLongEnough
            ? "8자 이상 입력해주세요."
            : null
        }
      />
      <InputField
        label="비밀번호 확인"
        type="password"
        id="confirmPassword"
        placeholder="비밀번호를 다시 한번 입력해주세요"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        showToggle={true}
        onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
        showPassword={showConfirmPassword}
        isValid={isPasswordLongEnough && doPasswordsMatch}
        isInvalid={confirmPassword.length > 0 && !doPasswordsMatch}
        errorMessage={
          confirmPassword.length > 0 && !doPasswordsMatch
            ? "내용을 다시 작성해주세요."
            : null
        }
        isMessageSuccess={isPasswordLongEnough && doPasswordsMatch}
      />
      <SubmitButton type="submit" disabled={!isFormValid || isLoading}>
        {isLoading ? "처리 중..." : "회원가입"}
      </SubmitButton>
    </SignupFormLayout>
  );
};

export default SignupPage;
