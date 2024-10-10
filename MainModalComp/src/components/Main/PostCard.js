import React, { useContext } from "react";
import styled from "styled-components";
import PostForm from "./PostForm";
import User from "./User";
import { DarkModeStateContext } from "../../App";

const Wrapper = styled.div`
  width: 100%;
  /* width: 100%; */
  background: ${({ theme }) => theme.bgSubColor};
`;

const Container = styled.div`
  width: 1406px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  /* background: ${({ darkmode }) =>
    darkmode ? "var(--main-bg-color)" : "var(--main-dark)"}; */
  margin: 60px 0 0 100px;
  padding: 0 20px;
  padding-left: 20%;
  @media screen and (max-width: 1760px) {
    width: 100%;
    padding-left: 10%;
  }
  @media screen and (max-width: 1460px) {
    padding-left: 5%;
  }
  @media screen and (max-width: 1190px) {
    padding-left: 5px;
  }
`;

const PostCard = () => {
  const { darkmode } = useContext(DarkModeStateContext);
  return (
    <Wrapper>
      <Container $darkmode={darkmode}>
        <User />
        <PostForm />
        <PostForm />
        <PostForm />
        <PostForm />
        <PostForm />
        <PostForm />
        <PostForm />
        <PostForm />
      </Container>
    </Wrapper>
  );
};

export default PostCard;
