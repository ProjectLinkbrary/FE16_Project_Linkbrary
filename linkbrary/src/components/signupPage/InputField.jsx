import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/theme.js";

const breakpoints = {
  tablet: "768px",
  desktop: "1024px",
};

const media = {
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
};

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;

  ${media.tablet} {
    margin-bottom: 25px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.fontSize.fz14};
  margin-bottom: 8px;
  color: ${theme.color.white};

  ${media.tablet} {
    font-size: ${theme.fontSize.fz15 || "15px"};
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: calc(100% - 20px);
  padding: 12px 10px;
  border: 1px solid
    ${(props) => {
      if (props.isInvalid) return "red";
      if (props.isValid) return "green";
      return theme.color.gray60;
    }};
  border-radius: 8px;
  background-color: ${theme.color.gray80};
  color: ${theme.color.white};
  font-size: ${theme.fontSize.fz16};
  &:focus {
    border-color: ${theme.color.primary};
  }

  ${media.tablet} {
    padding: 14px 12px;
    font-size: ${theme.fontSize.fz17 || "17px"};
  }
`;

const StyledCheckButton = styled.button`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 5px;
  background-color: ${theme.color.white};
  color: ${theme.color.black};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: ${theme.fontSize.fz14};

  ${media.tablet} {
    padding: 10px 14px;
    font-size: ${theme.fontSize.fz15 || "15px"};
  }
`;

const StyledTogglePasswordButton = styled.button`
  position: absolute;
  right: 30px;
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
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  ${media.tablet} {
    width: 28px;
    height: 28px;
  }
`;

const ErrorMessage = styled.p`
  color: #ff3235;
  font-size: ${theme.fontSize.fz14};
  margin-top: 5px; /* 양수 값으로 조정하여 텍스트가 아래로 보이도록 함 */
  margin-bottom: 0; /* 필요 없으면 0으로 설정 */
  align-self: flex-start;
  margin-left: 10px;
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
      </InputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputGroup>
  );
};

export default InputField;
