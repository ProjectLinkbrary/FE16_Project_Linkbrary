import React, { useState } from "react";
import styled from "@emotion/styled";
import SignupFormLayout from "./SignupFormLayout";
import InputField from "./InputField";
import { theme } from "../../styles/theme.js";

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${theme.color.gray20};
  color: ${theme.color.black};
  border-radius: 8px;
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

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // 'valid', 'invalid', null

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailStatus(null); // 이메일 변경 시 상태 초기화
  };

  const handleCheckEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailStatus("invalid"); // 이메일 형식 불일치 시 'invalid'
      return;
    }

    // --- 임시 유효성 검사 로직 (실제 API 호출 주석 처리) ---
    // 백엔드 API가 준비되면 이 부분을 실제 API 호출 로직으로 교체해야함
    if (email === "valid@example.com") {
      // 이메일이 'valid@example.com'이면 유효
      setEmailStatus("valid");
    } else if (email === "duplicate@example.com") {
      // 이메일이 'duplicate@example.com'이면 중복
      setEmailStatus("invalid");
    } else {
      // 그 외의 모든 이메일은 임시로 유효하다고 처리
      setEmailStatus("valid");
    }
    // --- 임시 유효성 검사 로직 끝 ---

    // 실제 API 호출 로직 (나중에...)
    /*
    try {
      const response = await fetch("/api/check-email", { // 실제 백엔드 API 경로로 변경
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && !data.isDuplicate) { // API 응답이 성공적이고 중복이 아닐 때
        setEmailStatus("valid");
      } else {
        setEmailStatus("invalid"); // API 응답이 실패했거나 중복일 때
      }
    } catch (error) {
      console.error("이메일 중복 확인 오류:", error);
      setEmailStatus("invalid"); // 통신 오류 시 유효하지 않은 것으로 처리
    }
    */
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailStatus !== "valid") {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
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
        isValid={emailStatus === "valid"}
        isInvalid={emailStatus === "invalid"}
        onCheck={handleCheckEmail}
        errorMessage={
          emailStatus === "valid"
            ? "사용 가능한 이메일입니다."
            : emailStatus === "invalid"
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
        onChange={(e) => setName(e.target.value)}
      />

      <InputField
        label="비밀번호"
        type="password"
        id="password"
        placeholder="linkbrary2023"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showToggle={true}
        onToggle={() => setShowPassword(!showPassword)}
        showPassword={showPassword}
      />

      <InputField
        label="비밀번호 확인"
        type="password"
        id="confirmPassword"
        placeholder="linkbrary20245"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        showToggle={true}
        onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
        showPassword={showConfirmPassword} // showConfirmPassword 상태 사용
        isInvalid={password !== confirmPassword && confirmPassword !== ""}
        errorMessage={
          password !== confirmPassword && confirmPassword !== ""
            ? "내용을 다시 작성해주세요"
            : null
        }
      />

      <SubmitButton type="submit">회원가입</SubmitButton>
    </SignupFormLayout>
  );
};

export default SignupPage;
