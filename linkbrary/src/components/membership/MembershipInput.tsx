// components/membership/MembershipInput.tsx

import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { theme } from "../../styles/theme";

interface MembershipInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hasError?: boolean;
  required?: boolean;
  hasToggle?: boolean;
  errorMessage?: string;
}

const MembershipInput: React.FC<MembershipInputProps> = ({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  onBlur,
  hasError = false,
  required = false,
  hasToggle = false,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const handleToggle = () => setShowPassword((prev) => !prev);

  return (
    <Field>
      <Label htmlFor={name}>{label}</Label>
      <InputWrapper>
        <StyledInput
          id={name}
          name={name}
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          hasError={hasError}
        />
        {isPasswordField && hasToggle && (
          <ToggleButton type="button" onClick={handleToggle}>
            <Image
              src={
                showPassword
                  ? "/images/ic_eyes_on.svg"
                  : "/images/ic_eyes_off.svg"
              }
              alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"}
              width={24}
              height={24}
            />
          </ToggleButton>
        )}
      </InputWrapper>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Field>
  );
};

export default MembershipInput;

// 스타일
const Field = styled.div`
  margin-bottom: 1.5rem;
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

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  height: 56px;
  padding: 0 100px 0 16px;
  border: 1px solid
    ${(props) => (props.hasError ? "#ff3235" : theme.color.gray60)};
  border-radius: 8px;
  background-color: ${theme.color.gray80};
  color: ${theme.color.white};
  font-size: ${theme.fontSize.fz16};

  &:focus {
    border-color: ${(props) =>
      props.hasError ? "#ff3235" : theme.color.white};
    outline: none;
  }

  ${theme.media.tablet} {
    padding: 0 80px 0 16px;
    font-size: ${theme.fontSize.fz16};
  }
`;

const ToggleButton = styled.button`
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
`;

const ErrorMessage = styled.p`
  color: #ff3235;
  font-size: ${theme.fontSize.fz14};
  margin-top: 8px;
  margin-bottom: 0;
  align-self: flex-start;
  padding: 0 16px;
`;