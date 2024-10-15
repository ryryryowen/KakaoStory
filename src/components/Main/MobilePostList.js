import React from "react";
import PostCardM from "./MobilePostCard";
import styled from "styled-components";
import User from "./User";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const PostListM = () => {
  return (
    <Wrapper>
      <User />
      <PostCardM />
    </Wrapper>
  );
};

export default PostListM;
