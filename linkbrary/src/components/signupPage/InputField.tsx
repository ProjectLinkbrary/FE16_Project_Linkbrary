import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/theme";

// InputField 컴포넌트가 받을 props의 타입을 정의합니다.
interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // HTMLInputElement의 change 이벤트
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // HTMLInputElement의 focus 이벤트 (blur는 FocusEvent)
  isValid?: boolean; // 유효성 상태 (선택적)
  isInvalid?: boolean; // 유효성 상태 (선택적)
  onCheck?: () => void; // 중복 확인 버튼 클릭 핸들러 (선택적)
  showToggle?: boolean; // 비밀번호 토글 버튼 표시 여부 (선택적)
  onToggle?: () => void; // 비밀번호 토글 버튼 클릭 핸들러 (선택적)
  showPassword?: boolean; // 비밀번호 표시 상태 (선택적)
  errorMessage?: string | null; // 에러 메시지 (선택적, 문자열 또는 null)
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
  padding: 0 16px; /* <-- 단위 'px' 추가되었는지 다시 확인 */
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
  /* InputContainer의 margin-bottom은 제거하는 것을 권장합니다 (InputGroup에서 간격 제어) */
  /* margin-bottom: 24px; <-- 이 줄을 삭제하거나 0으로 설정하세요 */
`;

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 80px 0 16px;
  border: 1px solid
    ${(props: { isInvalid?: boolean; isValid?: boolean }) => {
      // props에 타입 명시
      if (props.isInvalid) return theme.color.primary; // 에러 시 테마 primary 색상
      if (props.isValid) return "green";
      return theme.color.gray60; // 기본 테두리 색상
    }};
  border-radius: 8px;
  background-color: ${theme.color.gray80};
  color: ${theme.color.white};
  font-size: ${theme.fontSize.fz16};
  &:focus {
    border-color: ${theme.color.primary};
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
  background-color: ${theme.color.gray20}; /* <-- 시안처럼 회색 배경 */
  color: ${theme.color.black}; /* <-- 시안처럼 검정색 글씨 */
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
  border: none; /* <-- border: none; 추가 */
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0; /* <-- 이전에 문법 오류였던 부분 */

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

const ErrorMessage = styled.p`
  color: #ff3235;
  font-size: ${theme.fontSize.fz14};
  margin-top: 8px;
  margin-bottom: 0; /* <-- 세미콜론(;) 추가 */
  align-self: flex-start;
  padding: 0 16px;
`;

// InputField 컴포넌트 자체에 InputFieldProps 타입을 명시합니다.
const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  onBlur, // <-- onBlur prop
  isValid,
  isInvalid,
  onCheck,
  showToggle,
  onToggle,
  showPassword,
  errorMessage,
}) => {
  const isEmailField = id === "email";
  const isPasswordField = type === "password";

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
          onBlur={onBlur} // <-- onBlur 이벤트 핸들러 연결
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
              <img src="/images/ic_eyes_on.svg" alt="비밀번호 숨기기" />
            ) : (
              <img src="/images/ic_eyes_off.svg" alt="비밀번호 보이기" />
            )}
          </StyledTogglePasswordButton>
        )}
      </InputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputGroup>
  );
};

export default InputField;
