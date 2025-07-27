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

// 타입 정의
type EmailStatus = "valid" | "invalid_format" | "invalid_duplicate" | null;
type NameStatus = "valid" | "invalid" | null;
type PasswordStatus = "valid" | "invalid" | null;

// React.FC 대신 일반 함수형 컴포넌트 형태로 변경
const SignupPage = () => {
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
    setEmailStatus(null); // 입력 시 에러 메시지 초기화
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (e.target.value.trim() === "") {
      setEmailStatus(null); // 비어있으면 상태 초기화
      return;
    }
    if (!emailRegex.test(e.target.value)) {
      setEmailStatus("invalid_format"); // 형식 불일치
    } else {
      setEmailStatus(null); // 유효한 형식일 경우 초기화 (중복 확인 대기)
    }
  };

  const handleCheckEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailStatus("invalid_format"); // 유효하지 않은 형식
      return;
    }
    // 임시 로직: 실제 API 호출 대신 특정 이메일로 유효성 검사
    if (email === "valid@example.com") {
      setEmailStatus("valid"); // 사용 가능한 이메일
    } else if (email === "duplicate@example.com") {
      setEmailStatus("invalid_duplicate"); // 중복된 이메일
    } else {
      setEmailStatus("valid"); // 기본적으로 사용 가능하다고 가정
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameStatus(null); // 입력 시 에러 메시지 초기화
  };

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      setNameStatus(null); // 비어있으면 상태 초기화
      return;
    }
    if (e.target.value.length > 10) {
      setNameStatus("invalid"); // 10자 초과
    } else {
      setNameStatus("valid"); // 유효한 이름
    }
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = e.target.value;
    setPassword(newPasswordValue);

    // 1. 비밀번호 길이 유효성 검사
    if (newPasswordValue.length > 0 && newPasswordValue.length < 8) {
      setPasswordStatus("invalid"); // 비어있지 않으면서 8자 미만
    } else if (newPasswordValue.length === 0) {
      setPasswordStatus(null); // 비어있으면 유효성 상태 초기화
    } else {
      setPasswordStatus("valid"); // 8자 이상이면 일단 valid
    }

    // 2. 비밀번호 확인과의 일치 여부 검사
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

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 제출 시에는 각 필드의 현재 state 값을 사용하여 유효성 검사를 수행합니다.

    // 최종 상태 확인 후 제출
    let isValidForm = true;

    // 이메일 유효성 검사 (제출 시 최종 확인)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailStatus("invalid_format");
      isValidForm = false;
    } else if (emailStatus !== "valid" && emailStatus !== "invalid_duplicate") {
      // 이메일 형식이 맞지만 중복 확인이 안 되었거나, 유효하지 않은 경우
      setEmailStatus("invalid_duplicate"); // 중복 확인을 강제
      isValidForm = false;
    }

    // 이름 유효성 검사 (제출 시 최종 확인)
    if (name.length === 0) {
      setNameStatus("invalid");
      isValidForm = false;
    } else if (name.length > 10) {
      setNameStatus("invalid");
      isValidForm = false;
    } else if (nameStatus === null && name.length > 0) {
      setNameStatus("valid"); // 입력값이 있지만 blur가 없었을 경우
    }

    // 비밀번호 유효성 검사 (제출 시 최종 확인)
    if (password.length < 8) {
      setPasswordStatus("invalid");
      isValidForm = false;
    } else if (passwordStatus === null && password.length > 0) {
      setPasswordStatus("valid"); // 입력값이 있지만 blur가 없었을 경우
    }

    // 비밀번호 확인 일치 여부 (제출 시 최종 확인)
    if (password !== confirmPassword || confirmPassword.length === 0) {
      setPasswordsMatch(false);
      isValidForm = false;
    } else {
      setPasswordsMatch(true);
    }

    // 모든 필드가 유효하고 비밀번호가 일치하는지 최종 확인
    const finalFormValidity =
      emailStatus === "valid" &&
      nameStatus === "valid" &&
      passwordStatus === "valid" &&
      passwordsMatch &&
      email.length > 0 && // 입력값이 비어있지 않아야 함
      name.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0;

    if (!finalFormValidity) {
      console.error("모든 필드의 유효성을 확인해주세요.");
      return;
    }

    // 폼의 모든 유효성 검사를 통과했을 때 실행될 로직
    alert("가입이 완료되었습니다."); // 알림창 표시
    window.location.href = "/login"; // /login 페이지로 이동
  };

  // 모든 필드의 유효성 상태를 종합하여 제출 버튼 활성화 여부 결정
  const isFormValid =
    emailStatus === "valid" &&
    nameStatus === "valid" &&
    passwordStatus === "valid" &&
    passwordsMatch &&
    email.length > 0 && // 입력값이 비어있지 않아야 함
    name.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0;

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
        // 이메일 상태가 'valid'일 때만 isMessageSuccess를 true로 설정
        isMessageSuccess={emailStatus === "valid"}
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
          nameStatus === "invalid" && name.length > 0 // 이름이 비어있지 않으면서 유효하지 않을 때만 메시지 표시
            ? "열 자 이하로 작성해주세요."
            : nameStatus === "valid"
            ? null
            : null
        }
        // 이름 상태가 'valid'일 때 isMessageSuccess를 true로 설정
        isMessageSuccess={nameStatus === "valid"}
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
        // 비밀번호 자체 유효성 오류 (8자 미만) 또는 비밀번호 불일치 시 isInvalid
        isValid={passwordStatus === "valid" && passwordsMatch}
        isInvalid={passwordStatus === "invalid" || !passwordsMatch}
        errorMessage={
          passwordStatus === "invalid" && password.length > 0 // 비밀번호가 비어있지 않으면서 8자 미만
            ? "8자 이상 입력해주세요."
            : !passwordsMatch &&
              confirmPassword.length > 0 &&
              password.length > 0 // 비밀번호 확인이 비어있지 않고 불일치할 때
            ? "비밀번호가 일치하지 않습니다."
            : null // "사용 가능한 비밀번호입니다." 메시지 제거
        }
        // 비밀번호 상태가 'valid'이고 일치할 때 isMessageSuccess를 true로 설정
        isMessageSuccess={passwordStatus === "valid" && passwordsMatch}
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
        // 비밀번호 확인은 일치 여부와 비밀번호 자체 유효성으로 판단
        isValid={passwordsMatch && passwordStatus === "valid"}
        isInvalid={!passwordsMatch || passwordStatus === "invalid"}
        errorMessage={
          !passwordsMatch && confirmPassword.length > 0 // 비밀번호 확인이 비어있지 않고 불일치할 때
            ? "비밀번호가 일치하지 않습니다."
            : passwordStatus === "invalid" &&
              password.length > 0 &&
              confirmPassword.length > 0 // 비밀번호가 짧을 때
            ? "비밀번호를 8자 이상 입력해주세요."
            : passwordsMatch &&
              passwordStatus === "valid" &&
              confirmPassword.length > 0
            ? "비밀번호가 일치합니다."
            : null
        }
        // 비밀번호 확인 상태도 일치하고 비밀번호가 유효할 때 isMessageSuccess를 true로 설정
        isMessageSuccess={passwordsMatch && passwordStatus === "valid"}
      />

      <SubmitButton type="submit" disabled={!isFormValid}>
        회원가입
      </SubmitButton>
    </SignupFormLayout>
  );
};

export default SignupPage;
