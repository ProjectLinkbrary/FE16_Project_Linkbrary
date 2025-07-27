// components/InputField.tsx
import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/theme";
import Image from "next/image";

// InputField 컴포넌트가 받을 props의 타입을 정의합니다.
interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // HTMLInputElement의 change 이벤트
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // HTMLInputElement의 focus 이벤트 (blur는 FocusEvent)
  isValid?: boolean; // 필드의 유효성 상태 (테두리 색상용)
  isInvalid?: boolean; // 필드의 유효성 상태 (테두리 색상용)
  onCheck?: () => void; // 중복 확인 버튼 클릭 핸들러
  showToggle?: boolean; // 비밀번호 토글 버튼 표시 여부
  onToggle?: () => void; // 비밀번호 토글 버튼 클릭 핸들러
  showPassword?: boolean; // 비밀번호 표시 상태
  errorMessage?: string | null; // 에러/유효성 메시지 텍스트
  isMessageSuccess?: boolean; // **메시지가 성공 메시지인지 여부**
}

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;

  ${theme.media.tablet} {
    width: 100%;
    margin-bottom: 25px;
  }
`;

const Label = styled.label`
  padding: 0 16px;
  display: block;
  font-size: ${theme.fontSize.fz14};
  margin-bottom: 8px;
  color: ${theme.color.white};

  ${theme.media.tablet} {
    font-size: ${theme.fontSize.fz14};
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 100px 0 16px;
  border: 1px solid
    ${(props: { isInvalid?: boolean; isValid?: boolean }) => {
      // props에 타입 명시
      if (props.isInvalid) return "red";
      if (props.isValid) return "#1FECC6";
      return theme.color.gray60; // 기본 테두리 색상
    }};
  border-radius: 8px;
  background-color: ${theme.color.gray80};
  color: ${theme.color.white};
  font-size: ${theme.fontSize.fz16};
  &:focus {
    border-color: ${theme.color.white};
  }

  ${theme.media.tablet} {
    padding: 0 80px 0 16px;
    font-size: ${theme.fontSize.fz16};
  }
`;

const StyledCheckButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  padding: 6px 12px;
  background-color: ${theme.color.gray20};
  color: ${theme.color.black};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: ${theme.fontSize.fz14};
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;

  ${theme.media.tablet} {
    padding: 10px 14px;
    font-size: ${theme.fontSize.fz14};
  }
`;

const StyledTogglePasswordButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  & img {
    width: 16px;
    height: 16px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
  ${theme.media.tablet} {
    width: 28px;
    height: 28px;
    & img {
      width: 20px;
      height: 20px;
    }
  }
`;

// ErrorMessage 컴포넌트 수정: `isSuccess` prop을 받아서 색상 결정
const ErrorMessage = styled.p<{ isSuccess?: boolean }>`
  color: ${(props) => (props.isSuccess ? "#1FECC6" : "#ff3235")};
  font-size: ${theme.fontSize.fz14};
  margin-top: 8px;
  margin-bottom: 0;
  align-self: flex-start;
  padding: 0 16px;
`;

const InputField = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  isValid,
  isInvalid,
  onCheck,
  showToggle,
  onToggle,
  showPassword,
  errorMessage,
  isMessageSuccess, // InputFieldProps에서 isMessageSuccess를 구조 분해 할당
}: InputFieldProps) => {
  const isEmailField = id === "email";
  const isPasswordField = type === "password" || id.includes("password"); // id로 비밀번호 필드를 더 정확히 식별

  return (
    <InputGroup>
      <Label htmlFor={id}>{label}</Label>
      <InputContainer>
        <StyledInput
          type={showToggle && showPassword ? "text" : type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isValid={isValid}
          isInvalid={isInvalid}
        />
        {isEmailField && (
          <StyledCheckButton type="button" onClick={onCheck}>
            중복 확인
          </StyledCheckButton>
        )}
        {isPasswordField && showToggle && (
          <StyledTogglePasswordButton type="button" onClick={onToggle}>
            {showPassword ? (
              <Image
                src="/images/ic_eyes_on.svg"
                alt="비밀번호 숨기기"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src="/images/ic_eyes_off.svg"
                alt="비밀번호 보이기"
                width={24}
                height={24}
              />
            )}
          </StyledTogglePasswordButton>
        )}
      </InputContainer>
      {/* errorMessage가 있을 때만 ErrorMessage 컴포넌트를 렌더링하고, isMessageSuccess prop을 전달 */}
      {errorMessage && (
        <ErrorMessage isSuccess={isMessageSuccess}>{errorMessage}</ErrorMessage>
      )}
    </InputGroup>
  );
};

export default InputField;
