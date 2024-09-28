import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { userAuth } from "../configs/firebaseconfig";
import styled from "styled-components";
import { GlobalStyles, mixins } from "../styles/GlobalStyles.styles";
import KakaoLogin from "../routes/KakaoLogin";
import { userKakaoCredentials } from "../routes/KakaoRedirect";
import logo from "../images/kakaoLogoLight.png";
import mobileLogo from "../images/kakaoLogoMobile.png";
import lightThemeImg from "../images/kakaoLoginImgLight.png";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 768px) {
    background: var(--main-white);
    flex-direction: column;
    .mobile-inner {
      width: 370px;
      margin: 0 auto;
      padding: 0 30px;
      .mobile-contents {
        width: 300px;
        justify-content: center;
        align-items: center;
        .main-logo {
          width: 80px;
          position: static;
          object-fit: cover;
          margin-bottom: 14px;
        }
        .mobile-forms {
          display: flex;
          flex-direction: column;
          width: 100%;
          position: static;
          .welcome-title {
            text-align: center;
          }
          .mobile-divider {
            order: 1;
            & div{
              width: 110px;
            }
          }
          .mobile-input {
            order: 0;
          }
          .mobile-submenu{
            order: 4;
          }
          .mobile-login-btn{
            order: 0;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
  & * {
    input[type="password"]::-ms-reveal,
    input[type="password"]::-ms-clear,
    input[type="password"]::-webkit-textfield-decoration-container {
      display: none;
    }
  }
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
  background: var(--main-white);
`;

const LeftArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
`;
const RightArea = styled.div`
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
  position: absolute;
  top: 90px;
  width: 400px;
`;

const WelcomeTitle = styled.p`
  font-family: var(--kakao-big-regular);
  font-size: 30px;
  margin-bottom: 44px;
`;

const LoginDivider = styled.div`
  ${mixins.flex({ gap: 10 })};
  margin-bottom: 16px;
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
  ${mixins.flex({ direction: "column", gap: 10 })}
  width: 100%;
  position: relative;
  margin-bottom: 20px;
  &:last-of-type {
    margin-bottom: 26px;
  }
`;

const InputTitles = styled.span`
  align-self: flex-start;
  font-family: var(--kakao-big-regular);
  font-size: 16px;
  color: #aaa;
  span {
    color: crimson;
  }
  &:hover {
    text-decoration: none;
  }
`;

const InputForms = styled.input`
  ${mixins.loginform()}
  padding-left: 14px;
  &::placeholder {
    font-size: 14px;
    color: #aaa;
  }
  &:focus {
    outline: none;
    ${mixins.border({ color: "var(--point-color)" })}
  }
`;

const VisibleIcon = styled.span`
  position: absolute;
  right: 14px;
  bottom: 14px;
  padding: 4px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 300;
  line-height: 12px;
  transition: all 0.3s;
  color: #ccc;
  cursor: pointer;
`;

const EmailLoginBtn = styled.input`
  ${mixins.loginform({
    bg: "var(--point-color)",
    fontsize: "18px",
    textalign: "center",
    hover: "opacity: 0.8; box-shadow: 0 0 4px rgba(0, 0, 0, 0.2)",
  })}
  border: none;
  margin-bottom: 40px;
`;

const SubMenuWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const SubMenus = styled.div`
  font-family: var(--kakao-big-regular);
  .find-id,
  .find-pw {
    &:hover {
      text-decoration: underline;
    }
  }
  &:first-of-type {
    margin-bottom: 10px;
    color: #ccc;
    span {
      margin-right: 4px;
      cursor: pointer;
    }
  }
  &:last-of-type {
    span:last-child {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const Modal = () => {
  const focusRef = useRef();
  const [isVisible, setIsVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(null);
  const [isResponsive, setIsResponsive] = useState(false);
  const { user, setUser } = useContext(userKakaoCredentials);

  const listenResizeEvent = () => {
    if (window.innerWidth < 768) setIsResponsive(true);
    else setIsResponsive(false);
  };

  useEffect(() => {
    focusRef.current.focus();
    listenResizeEvent();
    window.addEventListener("resize", listenResizeEvent);
  }, []);

  const toggleFocus = (e) => {
    setIsFocused(e.target.name);
  };

  const toggleBlur = (e) => {
    setIsFocused(null);
  };

  const toggleVisible = () => {
    setIsVisible((current) => !current);
  };

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
      <LoginModal className="mobile-inner">
        <LeftArea className="mobile-contents">
          <LogoImg
            src={!isResponsive ? logo : mobileLogo}
            alt="mainlogo"
            className="main-logo"
          />
          <LeftAreaWrapper className="mobile-forms">
            <WelcomeTitle className="welcome-title">
              {!isResponsive ? "돌아오신 것을 환영합니다!" : "kakao "}
              {isResponsive && <b>story</b>}
            </WelcomeTitle>
            <KakaoLogin />
            <LoginDivider className="mobile-divider">
              <DividerPart></DividerPart>
              <DividerText>
                {!isResponsive ? "이메일로 로그인하기" : "간편 로그인"}
              </DividerText>
              <DividerPart></DividerPart>
            </LoginDivider>
            <InputBoxes className="mobile-input">
              <InputTitles
                className="input-title"
                style={{ color: isFocused === "id" && "#000" }}
              >
                아이디/이메일 <span>*</span>
              </InputTitles>
              <InputForms
                ref={focusRef}
                type="text"
                placeholder="전화번호, 사용자 이름 또는 이메일"
                onFocus={toggleFocus}
                onBlur={toggleBlur}
                name="id"
              ></InputForms>
            </InputBoxes>
            <InputBoxes className="mobile-input">
              <InputTitles
                className="input-title"
                style={{ color: isFocused === "password" && "#000" }}
              >
                비밀번호 입력 <span>*</span>
              </InputTitles>
              <InputForms
                type={isVisible ? "text" : "password"}
                placeholder="비밀번호"
                onFocus={toggleFocus}
                onBlur={toggleBlur}
                name="password"
              ></InputForms>
              <VisibleIcon
                className="material-symbols-outlined"
                onClick={toggleVisible}
              >
                {isVisible ? "visibility" : "visibility_off"}
              </VisibleIcon>
            </InputBoxes>
            <EmailLoginBtn
              type="submit"
              value={!isResponsive ? "이메일 로그인" : "로그인"}
              className="mobile-login-btn"
            ></EmailLoginBtn>
            <SubMenuWrapper className="mobile-submenu">
              <SubMenus>
                <span className="find-id">아이디 찾기</span>
                <span>|</span>
                <span className="find-pw">비밀번호 찾기</span>
              </SubMenus>
              <SubMenus>
                <span>계정이 없으시다면? </span>
                <span>회원가입</span>
              </SubMenus>
            </SubMenuWrapper>
          </LeftAreaWrapper>
          {user.isLoggedIn && (
            <>
              <h1>{user.userName}님</h1> <span>{user.kakaoId}</span>
              <img src={user.kakaoProfilePic} alt="profilePic" />
            </>
          )}
        </LeftArea>
        {!isResponsive && (
          <RightArea className="right-area">
            {/* <KakaoLogin />
          {user.isLoggedIn && <Button onClick={handleLogout}>로그아웃</Button>} */}
            <img src={lightThemeImg} alt="lightThemeImg" />
          </RightArea>
        )}
      </LoginModal>
    </Wrapper>
  );
};

export default Modal;