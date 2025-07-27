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

type EmailStatus = "valid" | "invalid_format" | "invalid_duplicate" | null;
type NameStatus = "valid" | "invalid" | null;
type PasswordStatus = "valid" | "invalid" | null;

// SignupPage 컴포넌트 정의 방식 변경: React.FC<Props> 대신 일반 함수형 컴포넌트로 정의
// 이 컴포넌트는 부모로부터 props를 받지 않으므로, 별도의 props 타입 정의는 필요 없습니다.
const SignupPage = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false); // useState에 타입 명시

  const [emailStatus, setEmailStatus] = useState<EmailStatus>(null); // 정의된 타입 사용
  const [nameStatus, setNameStatus] = useState<NameStatus>(null); // 정의된 타입 사용
  const [passwordStatus, setPasswordStatus] = useState<PasswordStatus>(null); // 새로운 상태 변수

  // 이메일 변경 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이벤트 객체 타입 명시
    setEmail(e.target.value);
    setEmailStatus(null); // 이메일 변경 시 상태 초기화
  };

  // 이메일 필드 focus out 핸들러
  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 이벤트 객체 타입 명시
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (e.target.value.trim() === "") {
      setEmailStatus(null);
      return;
    }
    if (!emailRegex.test(e.target.value)) {
      setEmailStatus("invalid_format"); // 이메일 형식 불일치
    } else {
      // 형식이 맞으면 일단 null로 유지 (중복 확인은 버튼으로)
      setEmailStatus(null);
    }
  };

  // 이메일 중복 확인 핸들러
  const handleCheckEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailStatus("invalid_format");
      return;
    }

    // --- 임시 유효성 검사 로직 (실제 API 호출 주석 처리) ---
    if (email === "valid@example.com") {
      setEmailStatus("valid");
    } else if (email === "duplicate@example.com") {
      setEmailStatus("invalid_duplicate"); // 중복된 이메일
    } else {
      setEmailStatus("valid"); // 그 외의 모든 이메일은 임시로 유효하다고 처리
    }
    // --- 임시 유효성 검사 로직 끝 ---

    // 실제 API 호출 로직 (백엔드가 준비되면 아래 주석 해제 후 위 임시 로직 삭제)
    /*
    try {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && !data.isDuplicate) {
        setEmailStatus("valid");
      } else {
        setEmailStatus("invalid_duplicate"); // API 응답이 실패했거나 중복일 때
      }
    } catch (error) {
      console.error("이메일 중복 확인 오류:", error);
      setEmailStatus("invalid_duplicate"); // 통신 오류 시 유효하지 않은 것으로 처리
    }
    */
  };

  // 이름 변경 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이벤트 객체 타입 명시
    setName(e.target.value);
    setNameStatus(null); // 이름 변경 시 상태 초기화
  };

  // 이름 필드 focus out 핸들러
  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 이벤트 객체 타입 명시
    if (e.target.value.trim() === "") {
      setNameStatus(null);
      return;
    }
    if (e.target.value.length > 10) {
      setNameStatus("invalid"); // 열 자 초과
    } else {
      setNameStatus("valid"); // 유효
    }
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이벤트 객체 타입 명시
    setPassword(e.target.value);
    setPasswordStatus(null); // 비밀번호 변경 시 상태 초기화
  };

  // 비밀번호 필드 focus out 핸들러
  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 이벤트 객체 타입 명시
    if (e.target.value.trim() === "") {
      setPasswordStatus(null);
      return;
    }
    if (e.target.value.length < 8) {
      setPasswordStatus("invalid"); // 8자 미만
    } else {
      setPasswordStatus("valid"); // 유효
    }
  };

  // 비밀번호 확인 변경 핸들러
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // 이벤트 객체 타입 명시
    setConfirmPassword(e.target.value);
    // 비밀번호 불일치는 InputField의 isInvalid prop으로 처리되므로 별도의 상태 없음
  };

  // 비밀번호 확인 필드 focus out 핸들러
  const handleConfirmPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 이벤트 객체 타입 명시
    // 이 필드의 isInvalid prop은 이미 비밀번호 불일치를 잘 처리하고 있으므로, 추가적인 onBlur 로직은 필요 없음.
    // 다만 onBlur prop을 연결하기 위해 함수는 추가.
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 이벤트 객체 타입 명시
    e.preventDefault();

    // 제출 시에도 최종 유효성 검사를 위해 onBlur 핸들러를 호출 (UI 업데이트 위함)
    // TypeScript에서 e.target이 HTMLFormElement이므로, 각 Input 필드를 직접 찾아서 호출해야 함
    // 여기서는 간단화를 위해 임시로 any를 사용했지만, 실제 프로덕션 코드에서는 각 Input 요소를 참조하여 호출할 것
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
    } else if (emailStatus !== "valid") {
      // 형식은 맞지만 중복 확인이 안됐거나 유효하지 않은 경우
      isValidForm = false;
    }

    // 이름 유효성 검사
    if (name.length === 0) {
      setNameStatus("invalid");
      isValidForm = false;
    } else if (name.length > 10) {
      setNameStatus("invalid");
      isValidForm = false;
    } else if (nameStatus === null) {
      // 비어있지 않고 10자 이하지만 blur가 안됐다면 valid로 설정
      setNameStatus("valid");
    }

    // 비밀번호 유효성 검사
    if (password.length < 8) {
      setPasswordStatus("invalid");
      isValidForm = false;
    } else if (passwordStatus === null) {
      // 비어있지 않고 8자 이상이지만 blur가 안됐다면 valid로 설정
      setPasswordStatus("valid");
    }

    // 비밀번호 확인 일치 여부
    if (password !== confirmPassword) {
      isValidForm = false;
    }

    if (!isValidForm) {
      // alert("모든 필드의 유효성을 확인해주세요."); // alert 대신 커스텀 메시지 박스 사용 권장
      console.error("모든 필드의 유효성을 확인해주세요."); // 개발자 콘솔에 에러 출력
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
        onBlur={handleEmailBlur} // onBlur 핸들러 연결
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
        onBlur={handleNameBlur} // onBlur 핸들러 연결
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
        onBlur={handlePasswordBlur} // onBlur 핸들러 연결
        showToggle={true}
        onToggle={() => setShowPassword(!showPassword)}
        showPassword={showPassword}
        isValid={passwordStatus === "valid"}
        isInvalid={passwordStatus === "invalid"}
        errorMessage={
          passwordStatus === "invalid" ? "8자 이상 입력해주세요." : null
        }
      />

      <InputField
        label="비밀번호 확인"
        type="password"
        id="confirmPassword"
        placeholder="linkbrary20245"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        onBlur={handleConfirmPasswordBlur} // onBlur 핸들러 연결
        showToggle={true}
        onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
        showPassword={showConfirmPassword}
        isInvalid={password !== confirmPassword || passwordStatus === "invalid"} // 비밀번호 자체도 invalid면 확인도 invalid
        errorMessage={
          password !== confirmPassword && confirmPassword !== ""
            ? "비밀번호가 일치하지 않습니다."
            : passwordStatus === "invalid" &&
              password.length > 0 &&
              confirmPassword.length > 0 &&
              confirmPassword.length < 8
            ? "8자 이상 입력해주세요." // 비밀번호가 짧을 때도 메시지 표시
            : null
        }
      />

      <SubmitButton type="submit">회원가입</SubmitButton>
    </SignupFormLayout>
  );
};

export default SignupPage;
