import React, { useState } from "react";
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

  &:hover {
    background-color: ${theme.color.gray30};
  }
  &:disabled {
    background-color: ${theme.color.gray50};
    cursor: not-allowed;
  }
`;

// 타입 정의 (이전과 동일)
type EmailStatus = "valid" | "invalid_format" | "invalid_duplicate" | null;
type NameStatus = "valid" | "invalid" | null;
type PasswordStatus = "valid" | "invalid" | null;

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [emailStatus, setEmailStatus] = useState<EmailStatus>(null);
  const [nameStatus, setNameStatus] = useState<NameStatus>(null);
  const [passwordStatus, setPasswordStatus] = useState<PasswordStatus>(null);

  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true); // 비밀번호 일치 여부 상태

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailStatus(null);
  };
  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (e.target.value.trim() === "") {
      setEmailStatus(null);
      return;
    }
    if (!emailRegex.test(e.target.value)) {
      setEmailStatus("invalid_format");
    } else {
      setEmailStatus(null);
    }
  };
  const handleCheckEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailStatus("invalid_format");
      return;
    }
    // 임시 로직
    if (email === "valid@example.com") {
      setEmailStatus("valid");
    } else if (email === "duplicate@example.com") {
      setEmailStatus("invalid_duplicate");
    } else {
      setEmailStatus("valid");
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameStatus(null);
  };
  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      setNameStatus(null);
      return;
    }
    if (e.target.value.length > 10) {
      setNameStatus("invalid");
    } else {
      setNameStatus("valid");
    }
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = e.target.value; // 현재 입력 값 변수에 할당
    setPassword(newPasswordValue);

    // 1. 비밀번호 길이 유효성 검사
    if (newPasswordValue.length < 8 && newPasswordValue.length > 0) {
      // 비어있지 않으면서 8자 미만
      setPasswordStatus("invalid");
    } else if (newPasswordValue.length === 0) {
      // 비어있으면 유효성 상태 초기화
      setPasswordStatus(null);
    } else {
      // 8자 이상이면 일단 valid
      setPasswordStatus("valid");
    }

    // 2. 비밀번호 확인과의 일치 여부 검사
    // 비밀번호가 변경될 때마다 confirmPassword와 비교하여 passwordsMatch 업데이트
    setPasswordsMatch(newPasswordValue === confirmPassword);
  };

  // 비밀번호 필드 focus out 핸들러
  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      setPasswordStatus(null);
    } else if (e.target.value.length < 8) {
      setPasswordStatus("invalid");
    } else {
      setPasswordStatus("valid");
    }
    // 비밀번호 유효성 검사 후, 비밀번호 확인과도 일치하는지 최종 확인
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  // 비밀번호 확인 변경 핸들러
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPasswordValue = e.target.value;
    setConfirmPassword(newConfirmPasswordValue);

    // 비밀번호 확인이 변경될 때마다 password와 비교하여 passwordsMatch 업데이트
    setPasswordsMatch(password === newConfirmPasswordValue);
  };

  // 비밀번호 확인 필드 focus out 핸들러
  const handleConfirmPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 비밀번호 일치 여부 최종 확인
    setPasswordsMatch(password === e.target.value);
  };

  // 폼 제출 핸들러 (이전과 동일한 유효성 검사 로직 유지)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 제출 시에도 최종 유효성 검사를 위해 onBlur 핸들러들을 호출
    // (이메일, 이름, 비밀번호의 형식 및 길이 검사 상태를 최종적으로 업데이트)
    handleEmailBlur(e as any);
    handleNameBlur(e as any);
    handlePasswordBlur(e as any);
    handleConfirmPasswordBlur(e as any);

    // 최종 상태 확인 후 제출
    let isValidForm = true;

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailStatus("invalid_format");
      isValidForm = false;
    } else if (emailStatus !== "valid" && emailStatus !== null) {
      isValidForm = false;
    } else if (emailStatus === null) {
      setEmailStatus("invalid_duplicate"); // 이메일 형식이 맞지만 중복 확인 안 한 경우
      isValidForm = false;
    }

    // 이름 유효성 검사
    if (name.length === 0) {
      setNameStatus("invalid");
      isValidForm = false;
    } else if (name.length > 10) {
      setNameStatus("invalid");
      isValidForm = false;
    } else if (nameStatus === null && name.length > 0) {
      setNameStatus("valid");
    }

    // 비밀번호 유효성 검사
    if (password.length < 8) {
      setPasswordStatus("invalid");
      isValidForm = false;
    } else if (passwordStatus === null && password.length > 0) {
      setPasswordStatus("valid");
    }

    // 비밀번호 확인 일치 여부 (최종 검사)
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      isValidForm = false;
    } else {
      setPasswordsMatch(true);
    }

    if (!isValidForm) {
      console.error("모든 필드의 유효성을 확인해주세요.");
      return;
    }

    console.log({ email, name, password, confirmPassword });
    // 실제 회원가입 API 호출 로직
  };

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
        isValid={emailStatus === "valid"}
        isInvalid={
          emailStatus === "invalid_format" ||
          emailStatus === "invalid_duplicate"
        }
        onCheck={handleCheckEmail}
        errorMessage={
          emailStatus === "valid"
            ? "사용 가능한 이메일입니다."
            : emailStatus === "invalid_format"
            ? "이메일 형식으로 작성해 주세요."
            : emailStatus === "invalid_duplicate"
            ? "중복된 이메일입니다."
            : null
        }
      />

      <InputField
        label="이름"
        type="text"
        id="name"
        placeholder="홍길동"
        value={name}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        isValid={nameStatus === "valid"}
        isInvalid={nameStatus === "invalid"}
        errorMessage={
          nameStatus === "invalid" ? "열 자 이하로 작성해주세요." : null
        }
      />

      <InputField
        label="비밀번호"
        type="password"
        id="password"
        placeholder="linkbrary2023"
        value={password}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        showToggle={true}
        onToggle={() => setShowPassword(!showPassword)}
        showPassword={showPassword}
        // 비밀번호 자체 유효성 오류 (8자 미만) 또는 비밀번호 불일치 시
        isValid={passwordStatus === "valid" && passwordsMatch}
        isInvalid={passwordStatus === "invalid" || !passwordsMatch}
        errorMessage={
          passwordStatus === "invalid" && password.length > 0
            ? "8자 이상 입력해주세요."
            : !passwordsMatch && confirmPassword.length > 0 // 비밀번호 확인이 비어있지 않고 불일치할 때
            ? "비밀번호가 일치하지 않습니다."
            : null
        }
      />

      <InputField
        label="비밀번호 확인"
        type="password"
        id="confirmPassword"
        placeholder="linkbrary20245"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        onBlur={handleConfirmPasswordBlur}
        showToggle={true}
        onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
        showPassword={showConfirmPassword}
        // 비밀번호 확인은 일치 여부로만 판단 (비밀번호 자체 유효성도 isInvalid에 반영)
        isValid={passwordsMatch && passwordStatus === "valid"}
        isInvalid={!passwordsMatch || passwordStatus === "invalid"}
        errorMessage={
          !passwordsMatch && confirmPassword.length > 0 // 비밀번호 확인이 비어있지 않고 불일치할 때
            ? "비밀번호가 일치하지 않습니다."
            : passwordStatus === "invalid" &&
              password.length > 0 &&
              confirmPassword.length > 0 // 비밀번호가 짧을 때
            ? "비밀번호를 8자 이상 입력해주세요."
            : null
        }
      />

      <SubmitButton type="submit">회원가입</SubmitButton>
    </SignupFormLayout>
  );
};

export default SignupPage;
