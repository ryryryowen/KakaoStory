import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalStyles, mixins } from "./styles/GlobalStyles.styles";
import Layout from "./components/layout/Layout";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 공통 레이아웃
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/detail/:id", element: <DetailPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <GlobalStyles /> {/* 전역 스타일 적용 */}
      <RouterProvider router={router} /> {/* 라우터 제공 */}
    </>
  );
}

export default App;
