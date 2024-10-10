import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/Theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalStyles, mixins } from "./styles/GlobalStyles.styles";
import Layout from "./components/layout/Layout";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";
import MyProfile from "./pages/MyProfile";
import Modal from "../src/components/Login/LoginModal/Modal";
import ProtectedRoute from "./components/ProtectedRoute";
import { userKakaoCredentials } from "./routes/KakaoRedirect";
import KakaoRedirect from "./routes/KakaoRedirect";
import { userAuth } from "./configs/firebase";

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <MainPage /> },
      { path: "/detail/:id", element: <DetailPage /> },
      { path: "/profile", element: <MyProfile /> },
    ],
  },
  {
    path: "/login",
    element: <Modal />,
  },
  {
    path: "/auth/callback/kakaotalk",
    element: <KakaoRedirect />,
  },
]);

export const DarkModeStateContext = React.createContext();

function App() {
  const [user, setUser] = useState({
    userName: "",
    kakaoId: "",
    kakaoProfilePic: "",
    accessToken: "",
    isLoggedIn: false,
  });

  const [darkmode, setDarkmode] = useState(false);

  const handleDarkmode = (e) => {
    setDarkmode((currrent) => !currrent);
  };

  const init = async () => {
    await userAuth.authStateReady();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <userKakaoCredentials.Provider value={{ user, setUser }}>
        <GlobalStyles /> {/* 전역 스타일 적용 */}
        <DarkModeStateContext.Provider value={{ darkmode, handleDarkmode }}>
          <ThemeProvider theme={darkmode ? darkTheme : lightTheme}>
            <RouterProvider router={router} /> {/* 라우터 제공 */}
          </ThemeProvider>
        </DarkModeStateContext.Provider>
      </userKakaoCredentials.Provider>
    </>
  );
}

export default App;
