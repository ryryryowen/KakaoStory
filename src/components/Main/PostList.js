import React from "react";
import PostCard from "./PostCard";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: none; // 모바일에서 숨기기
  }
`;

const PostList = () => {
  return (
    <Wrapper>
      <PostCard />
    </Wrapper>
  );
};

export default PostList;
