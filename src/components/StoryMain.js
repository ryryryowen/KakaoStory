import React from "react";
import styled from "styled-components";

const StoryListMain = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const Story = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: #eee;
`;
function StoryMain() {
  return (
    <StoryListMain>
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
    </StoryListMain>
  );
}

export default StoryMain;
