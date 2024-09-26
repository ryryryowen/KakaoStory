import React from "react";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 950px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 25px;
`;

const PostList = () => {
  return <PostCard />;
};

export default PostList;
