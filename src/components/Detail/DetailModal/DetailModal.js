import React from "react";
import styled from "styled-components";
import ModalOverlay from "./ModalOverlay"; // 백그라운드 흐림 효과를 위한 오버레이

// 모달 창 스타일
const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1001; // 오버레이보다 위에 있어야 함
  width: 500px;
  max-width: 90vw;
`;

// DetailModal 컴포넌트
const DetailModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // 모달이 열리지 않았을 경우 렌더링하지 않음

  return (
    <>
      <ModalOverlay onClick={onClose} /> {/* 오버레이 클릭 시 모달 닫힘 */}
      <ModalContent>
        <button onClick={onClose}>X</button> {/* 닫기 버튼 */}
        {children} {/* 게시물 상세 내용을 여기에 표시 */}
      </ModalContent>
    </>
  );
};

export default DetailModal;
