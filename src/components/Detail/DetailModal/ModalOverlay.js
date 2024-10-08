import React from "react";
import styled from "styled-components";

<<<<<<< HEAD
=======
// 백그라운드를 흐리게 만드는 오버레이 스타일
>>>>>>> feature_main
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000; // 모달보다 아래에 위치 모달은 z-index : 1001 입니다
<<<<<<< HEAD
`;  

// 오버레이 컴포넌트
const ModalOverlay = ({ onClick }) => {
  return <Overlay onClick={onClick} />;
=======
`;

// 오버레이 컴포넌트
const ModalOverlay = ({ onClick }) => {
  return <Overlay onClick={onClick} />; // 클릭 시 모달 닫힘버튼
>>>>>>> feature_main
};

export default ModalOverlay;
