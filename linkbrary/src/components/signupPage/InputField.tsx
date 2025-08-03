import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../styles/theme";
import Image from "next/image";
interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isValid?: boolean;
  isInvalid?: boolean;
  onCheck?: () => void;
  showToggle?: boolean;
  onToggle?: () => void;
  showPassword?: boolean;
  errorMessage?: string | null;
  isMessageSuccess?: boolean;
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

const StyledInput = styled.input<{ isInvalid?: boolean; isValid?: boolean }>`
  width: 100%;
  height: 56px;
  padding: 0 100px 0 16px;
  border: 1px solid
    ${(props) => {
      if (props.isInvalid) return "#ff3235";
      if (props.isValid) return "#1FECC6";
      return theme.color.gray60;
    }};
  border-radius: 8px;
  background-color: ${theme.color.gray80};
  color: ${theme.color.white};
  font-size: ${theme.fontSize.fz16};

  &:focus {
    outline: none;
    border-width: 1px;
    border-color: ${(props) => {
      if (props.isInvalid) return "#ff3235";
      if (props.isValid) return "#1FECC6";
      return theme.color.white;
    }};
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
  isMessageSuccess,
}: InputFieldProps) => {
  const isEmailField = id === "email";
  const isPasswordField = type === "password" || id.includes("password");

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
      {errorMessage && (
        <ErrorMessage isSuccess={isMessageSuccess}>{errorMessage}</ErrorMessage>
      )}
    </InputGroup>
  );
};

export default InputField;
