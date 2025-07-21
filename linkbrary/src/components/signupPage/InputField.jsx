import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/theme.js";

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;

  ${theme.media.tablet} {
    width: 100%;
    margin-bottom: 25px;
  }
`;

const Label = styled.label`
  padding: 0 0;
  display: block;
  font-size: ${theme.fontSize.fz14};
  margin-bottom: 8px;

  color: ${theme.color.white};

  ${theme.media.tablet} {
    font-size: ${theme.fontSize.fz15 || "15px"};
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 24px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid
    ${(props) => {
      if (props.isInvalid) return "red";
      if (props.isValid) return "green";
      return theme.color.white;
    }};
  border-radius: 8px;
  background-color: ${theme.color.gray80};
  color: ${theme.color.white};
  font-size: ${theme.fontSize.fz16};
  &:focus {
    border-color: ${theme.color.primary};
  }

  ${theme.media.tablet} {
    padding: 0 16px;
    font-size: ${theme.fontSize.fz17 || "17px"};
  }
`;

const StyledCheckButton = styled.button`
  position: absolute;
  right: 16px;
  top: 32%;
  transform: translateY(-50%);
  padding: 6px 12px;
  background-color: ${theme.color.white};
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
    font-size: ${theme.fontSize.fz15 || "15px"};
  }
`;

const StyledTogglePasswordButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
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
      width: 20px; /* 태블릿에서 이미지 크기 조정 */
      height: 20px;
  }
`;

const ErrorMessage = styled.p`
  color: #ff3235;
  font-size: ${theme.fontSize.fz14};
  margin-top: 8px;
  align-self: flex-start;
`;

const InputField = ({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  isValid,
  isInvalid,
  onCheck, // 이메일 필드에만 해당
  showToggle, // 비밀번호 필드에만 해당
  onToggle, // 비밀번호 필드에만 해당
  showPassword, // 비밀번호 필드에만 해당
  errorMessage, // 에러 메시지 텍스트
}) => {
  const isEmailField = id === "email";
  const isPasswordField = type === "password";

  return (
    <InputGroup>
      <Label htmlFor={id}>{label}</Label>
      <InputContainer>
        <StyledInput
          type={showToggle && showPassword ? "text" : type} // 비밀번호 토글 로직
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputContainer>
    </InputGroup>
  );
};

export default InputField;
