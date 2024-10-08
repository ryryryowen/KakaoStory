import React from "react";
import Header from "./Header";
import StoryMain from "./StoryMain";
import styled from "styled-components";
import VideoMain from "./VideoMain";
import PostList from "./PostList";

const ListMain = styled.div`
  display: flex;
  padding-top: 20px;
`;

function MainPage() {
  return (
    <div>
      <Header />
      <StoryMain />
      <ListMain>
        <PostList />
        <VideoMain />
      </ListMain>
    </div>
  );
}

export default MainPage;
