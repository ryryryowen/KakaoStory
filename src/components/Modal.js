import React, { useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import KakaoLogin from "../routes/KakaoLogin";
import { userKakaoCredentials } from "../routes/KakaoRedirect";
import { userAuth } from "../configs/firebaseconfig";
import logo from "../images/kakaoLogoLight.png";
import { GlobalStyles, mixins } from "../styles/GlobalStyles.styles";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginModal = styled.div`
  position: relative;
  width: 1000px;
  height: 700px;
  padding: 40px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 110px;
  border: 1px solid;
`;

const LeftArea = styled.div`
  flex: 1;
  height: 100%;
`;
const RightArea = styled.div`
  flex: 1;
  height: 100%;
`;

const LogoImg = styled.img`
  width: 206px;
  height: 80px;
  object-fit: cover;
  position: absolute;
  left: 24px;
  top: 12px;
`;

const LeftAreaWrapper = styled.div`
  width: 400px;
  ${mixins.flex({ direction: "column", align: "flex-start" })};
`;

const WelcomeTitle = styled.p`
  font-family: var(--kakao-big-regular);
  font-size: 30px;
`;

const LoginDivider = styled.div`
  ${mixins.flex({ gap: 10 })};
`;

const DividerPart = styled.div`
  width: 140px;
  height: 1px;
  background: #ccc;
`;

const DividerText = styled.span`
  font-size: 12px;
  font-family: var(--kakao-big-regular);
  color: #ccc;
`;

const InputBoxes = styled.div`
  ${mixins.flex()}
`;

const InputTitles = styled.span``;

const InputForms = styled.input`
  ${mixins.loginform()}
  padding-left: 14px;
  &::placeholder {
    font-size: 14px;
  }
`;

const Modal = () => {
  const { user, setUser } = useContext(userKakaoCredentials);
  const handleLogout = async () => {
    try {
      // Kakao 로그아웃 REST API 호출
      const accessToken = userAuth.currentUser?.stsTokenManager.accessToken;

      // Firebase 로그아웃
      await userAuth.signOut();

      if (accessToken) {
        await axios.post(
          "https://kapi.kakao.com/v1/user/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        console.log("Kakao 로그아웃 완료");
        alert("로그아웃 되셨습니다.");
        setUser({
          ...user,
          isLoggedIn: false,
        });
      } else {
        console.log("Access Token이 없습니다.");
      }
    } catch (error) {
      console.log("로그아웃 중 오류 발생:", error);
    }
  };
  return (
    <Wrapper>
      <LoginModal>
        <LeftArea>
          <LogoImg src={logo} alt="mainlogo" />
          <LeftAreaWrapper>
            <WelcomeTitle>돌아오신 것을 환영합니다!</WelcomeTitle>
            <KakaoLogin />
            <LoginDivider>
              <DividerPart></DividerPart>
              <DividerText>이메일로 로그인하기</DividerText>
              <DividerPart></DividerPart>
            </LoginDivider>
            <InputForms
              type="text"
              placeholder="전화번호, 사용자 이름 또는 이메일"
            ></InputForms>
            <InputForms type="text" placeholder="비밀번호"></InputForms>
          </LeftAreaWrapper>
          {user.isLoggedIn && (
            <>
              <h1>{user.userName}님</h1> <span>{user.kakaoId}</span>
              <img src={user.kakaoProfilePic} alt="profilePic" />
            </>
          )}
        </LeftArea>
        <RightArea>
          {/* <KakaoLogin />
          {user.isLoggedIn && <Button onClick={handleLogout}>로그아웃</Button>} */}
        </RightArea>
      </LoginModal>
    </Wrapper>
  );
};

export default Modal;
