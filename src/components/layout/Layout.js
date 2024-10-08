import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import MobileSidebar from "./MobileSidebar";

// 밑에 스타일들은 전부 목업 예시입니다 전부 바꾸면됩니다~

// 레이아웃 컨테이너 스타일
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// 콘텐츠 및 사이드바를 포함하는 Wrapper
const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

// 메인 콘텐츠 영역
const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

const Layout = () => {
  const [mobileSize, setMobileSize] = useState(false);

  const updateSize = (e) => {
    if (e.target.innerWidth <= 768) setMobileSize(true);
    else setMobileSize(false);
  };

  useEffect(() => {
    window.innerWidth <= 768 ? setMobileSize(true) : setMobileSize(false);
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <LayoutContainer>
      <Header /> {/* 공통 헤더 */}
      <ContentWrapper>
        {mobileSize ? <MobileSidebar /> : <Sidebar />}
        {/* <MainContent> */}
        <Outlet /> {/* Outlet을 사용하여 자식 컴포넌트를 렌더링 */}
        {/* </MainContent> */}
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default Layout;
