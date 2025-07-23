/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  text-align: center;
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 360px;
  height: 260px;
  position: relative;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 24px;
  }
  p {
    font-size: 16px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

export default function Modal({ children, onClose }) {
  return (
    <Backdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="닫기">
          ×
        </CloseButton>
        {children}
      </ModalBox>
    </Backdrop>
  );
}
