import React from "react";
import MobilePostCard from "./MobilePostCard";
import styled from "styled-components";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PostListM = () => {
  return (
    <Wrapper>
      <MobilePostCard />
    </Wrapper>
  );
};

export default PostListM;
