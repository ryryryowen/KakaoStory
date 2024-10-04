import React from "react";
import { Outlet } from "react-router-dom";
import KakaoRedirect from "../routes/KakaoRedirect";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
