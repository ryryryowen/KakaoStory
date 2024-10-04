import "./App.css";
import { useState } from "react";
import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles.styles";
import { mixins } from "./styles/GlobalStyles.styles";
import Modal from "./components/Modal";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import KakaoRedirect from "./routes/KakaoRedirect";
import { userKakaoCredentials } from "./routes/KakaoRedirect";

// 라우터 설정
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />, // 공통 레이아웃
//     children: [
//       { path: "/", element: <MainPage /> },
//       { path: "/login", element: <LoginPage /> },
//       { path: "/detail/:id", element: <DetailPage /> },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Modal />,
      },
    ],
  },
  {
    path: "/auth/callback/kakaotalk",
    element: <KakaoRedirect />,
  },
]);

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [user, setUser] = useState({
    userName: "",
    kakaoId: "",
    kakaoProfilePic: "",
    accessToken: "",
    isLoggedIn: false,
  });
  return (
    <>
      <userKakaoCredentials.Provider value={{ user, setUser }}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </userKakaoCredentials.Provider>
    </>
  );
}

export default App;
