import React from "react";
import styled from "styled-components";

// 사이드바 스타일
const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <nav>
        <ul>
          <li>아이콘 1</li>
          <li>아이콘 2</li>
          <li>아이콘 3</li>
          <li>아이콘 4</li>
          <li>아이콘 5</li>
        </ul>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;
