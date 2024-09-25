import React from "react";
import styled from "styled-components";

// 헤더 스타일
const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  text-align: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>카카오스토리 로고 및 헤더</h1>
    </HeaderContainer>
  );
};

export default Header;
