import React from "react";
import styled, { keyframes } from "styled-components";
import part1 from "../images/logoSpinner/logo_part1.png";
import part2 from "../images/logoSpinner/logo_part2.png";
import part3 from "../images/logoSpinner/logo_part3.png";
import part4 from "../images/logoSpinner/logo_part4.png";

// 회전 애니메이션 정의
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 스케일 애니메이션 정의
const scale = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;

// 로딩 스피너 스타일 정의
const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #222; // 검정 배경
`;

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  animation: ${rotate} 2s linear infinite; // 전체 회전 애니메이션
`;

const Square = styled.div`
  width: 30px;
  height: 30px;
  animation: ${scale} 1.5s ease-in-out infinite; // 색상 전환과 크기 변화 애니메이션
`;

// 각 사각형이 위치할 스타일 정의
const SquareOne = styled(Square)`
  background: url(${part1}) center/cover no-repeat;
  position: absolute;
  top: 0;
  left: 0;
`;

const SquareTwo = styled(Square)`
  background: url(${part2}) center/cover no-repeat;
  position: absolute;
  top: 0;
  right: 0;
`;

const SquareThree = styled(Square)`
  background: url(${part3}) center/cover no-repeat;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const SquareFour = styled(Square)`
  background: url(${part4}) center/cover no-repeat;
  position: absolute;
  bottom: 0;
  right: 0;
`;

// 최종 로딩 화면 컴포넌트
const LoadingScreen = () => {
  return (
    <SpinnerWrapper>
      <Spinner>
        <SquareOne />
        <SquareTwo />
        <SquareThree />
        <SquareFour />
      </Spinner>
    </SpinnerWrapper>
  );
};

export default LoadingScreen;
