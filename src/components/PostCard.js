import React from "react";
import styled from "styled-components";
import PostForm from "./PostForm";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const PostCard = () => {
  return (
    <Container>
      <PostForm />
      <PostForm />
    </Container>
  );
};

export default PostCard;
