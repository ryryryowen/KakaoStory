import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/Theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalStyles, mixins } from "./styles/GlobalStyles.styles";
import Layout from "./components/layout/Layout";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";
import MyProfile from "./pages/MyProfile";

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 공통 레이아웃
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/detail/:id", element: <DetailPage /> },
      { path: "/profile", element: <MyProfile /> },
    ],
  },
]);

export const DarkModeStateContext = React.createContext();

function App() {
  const [darkmode, setDarkmode] = useState(false);

  const handleDarkmode = (e) => {
    setDarkmode((currrent) => !currrent);
  };

  return (
    <>
      <GlobalStyles /> {/* 전역 스타일 적용 */}
      <DarkModeStateContext.Provider value={{ darkmode, handleDarkmode }}>
        <ThemeProvider theme={darkmode ? darkTheme : lightTheme}>
          <RouterProvider router={router} /> {/* 라우터 제공 */}
        </ThemeProvider>
      </DarkModeStateContext.Provider>
    </>
  );
}

export default App;
