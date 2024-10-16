import React from "react";
import { PropagateLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
function LoadingScreen() {
  return (
    <Wrapper>
      <PropagateLoader color="#FFE900" />
      <h3>잠시만 기다려주세요.</h3>
    </Wrapper>
  );
}

export default LoadingScreen;
