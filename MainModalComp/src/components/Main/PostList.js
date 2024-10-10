import React from "react";
import PostCard from "./PostCard";
import styled from "styled-components";
import Video from "./Video";

const Wrapper = styled.div`
  width: 100%;
  background: ${({ theme }) =>
    theme.bgColor === "var(--main-dark)" ? "#222" : theme.bgColor};
  background: #f1f1f1;
`;

const Gototop = styled.a`
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fae100;
  color: #fff;
  font-size: 30px;
  text-align: center;
  line-height: 50px;
  position: fixed;
  top: 85%;
  right: 30px;
  padding-top: 5px;
  opacity: 0;
  transition: all 0.3s;
  z-index: 100;
  &.active {
    opacity: 1;
    bottom: 20px;
  }
`;

const PostList = () => {
  return (
    <Wrapper>
      <PostCard />
      <Video />
      <Gototop className="active" href="#">
        <i class="fa-solid fa-chevron-up"></i>
      </Gototop>
    </Wrapper>
  );
};

export default PostList;
