/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  width: 100%;
  height: 30vh;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #ddd;
  border-top: 4px solid #666;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default function LoadingSpinner() {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
}
