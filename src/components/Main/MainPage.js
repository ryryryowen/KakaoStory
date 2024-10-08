import React, { useEffect, useState } from "react";
import User from "./User";
import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import MobileHeader from "../layout/MobileHeader"; // Import MobileHeader
import styled from "styled-components";
import Video from "./Video";
import PostList from "./PostList";
import MobliePostList from "./MobilePostList"; // Fix the spelling here
import { useLocation } from "react-router-dom"; // Import useLocation if needed
import { userAuth } from "../../configs/firebase";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.bgMainColor};
`;

const Container = styled.div`
  width: 1084px;
  background: #fff;
  background: ${({ theme }) =>
    theme.bgColor === "var(--main-dark)" ? "#222" : theme.bgColor};
  @media (max-width: 768px) {
    width: 100%; // 모바일에서 숨기기
  }
`;

const Videomap = styled.div`
  display: ${({ isMobile }) =>
    isMobile ? "none" : "block"}; // Mobile일 때 숨기기
`;

const MainPage = () => {
  const [mobileSize, setMobileSize] = useState(false);

  const updateSize = () => {
    setMobileSize(window.innerWidth <= 768);
  };

  useEffect(() => {
    console.log(userAuth.currentUser);
    updateSize(); // Initial check
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <Wrapper>
      {mobileSize ? <MobileHeader /> : <User />}
      <Container>
        {mobileSize ? <MobliePostList /> : <Sidebar />}
        <Outlet />
        <PostList />
      </Container>
      <Videomap isMobile={mobileSize}>
        <Video />
      </Videomap>
    </Wrapper>
  );
};

export default MainPage;
