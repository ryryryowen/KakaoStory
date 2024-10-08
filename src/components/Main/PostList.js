import React from "react";
import PostCard from "./PostCard";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostList = () => {
  return (
    <Wrapper>
      <PostCard />
    </Wrapper>
  );
};

export default PostList;
