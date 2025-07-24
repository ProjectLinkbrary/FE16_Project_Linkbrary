/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import Modal from "components/modals/modal";

const ModalBtn = styled.button`
  border: 1px solid #363636;
  border-radius: 50px;
  padding: 10px 20px;
`;

export default function TestModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <ModalBtn onClick={openModal}>모달 열기</ModalBtn>

      {isOpen && (
        <Modal onClose={closeModal}>
          <h2>테스트 모달입니다</h2>
          <p>이 모달은 브라우저에서 테스트 중입니다.</p>
        </Modal>
      )}
    </div>
  );
}
