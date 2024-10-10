import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(3px);
  z-index: 300;
  cursor: pointer;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px; */
`;

const Modal = styled.div`
  width: 700px;
  height: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.bgColor};
  border-radius: 30px;
  font-family: var(--kakao-small-regular);
  padding: 30px 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  .profile {
    height: 100%;
    display: flex;
    flex-direction: column;
    /* gap: 20px; */
    justify-content: space-between;
    h2 {
      font-size: 20px;
      letter-spacing: -1px;
      font-family: var(--kakao-small-bold);
    }
    .profileEdit {
      width: 100%;
      height: 100px;
      background: #eee;
      margin: 0 auto;
      border-radius: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 30px;
      .user {
        display: flex;
        gap: 10px;
        align-items: center;
        .profileCiecle {
          width: 80px;
          height: 80px;
          background: #d9d9d9;
          border-radius: 50%;
        }
        .userInfo {
          font-size: 14px;
          p:nth-child(1) {
            color: #333;
            margin-bottom: 6px;
          }
          p:nth-child(2) {
            color: #aaa;
          }
        }
      }
      > button {
        border: none;
        background: var(--point-color);
        padding: 8px 10px;
        height: fit-content;
        color: #fff;
        border-radius: 10px;
        cursor: pointer;
        font-size: 16px;
      }
    }

    .infoitem {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      .icon {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* font-size: 26px; */
        color: #aaa;
        span {
          font-size: 28px;
        }
        i {
          font-size: 20px;
        }
      }
      p {
        width: 100%;
        padding: 6px;
        border-bottom: 2px solid #d9d9d9;
        cursor: pointer;
      }
    }
    .basicinfo,
    .kakaoinfo {
      display: flex;
      flex-direction: column;
      /* gap: 20px; */
      h3 {
        font-size: 18px;
        letter-spacing: -0.32px;
      }
      > p {
        font-size: 12px;
        color: #aaa;
        letter-spacing: -0.24px;
      }
    }
    .profileThumbsup {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .profileThumbsup_text {
        width: 500px;
        h3 {
          font-size: 18px;
          letter-spacing: -0.32px;
        }
        p {
          font-size: 12px;
          color: #aaa;
          letter-spacing: -0.24px;
        }
      }
      .switch {
        width: 50px;
        height: 30px;
        background-color: #ccc;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 30px;
        padding: 3px;
        cursor: pointer;
      }
      .switch[data-isOn="true"] {
        justify-content: flex-end;
        background: var(--point-color);
      }
      .handle {
        width: 26px;
        height: 26px;
        background-color: white;
        border-radius: 50%;
      }
    }
  }
`;

const SumbmitBtn = styled.button`
  font-size: 20px;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 80px;
  background: ${({ changeContent }) =>
    changeContent ? "var(--point-color)" : "#ccc"};
  cursor: pointer;
`;

const EditProfile = ({ modalOff }) => {
  const [changeContent, setChagneContent] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  const toggleSwitch = () => setIsOn(!isOn);

  const wrapperClick = () => {
    modalOff();
  };

  return (
    <Wrapper onClick={wrapperClick}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <div className="profile">
          <h2>프로필 편집</h2>
          <div className="profileEdit">
            <div className="user">
              <div className="profileCiecle"></div>
              <div className="userInfo">
                <p>송채영</p>
                <p>상태메세지 입니다.</p>
              </div>
            </div>
            <button>사진변경</button>
          </div>
          <div className="basicinfo">
            <h3>기본정보</h3>
            <div className="infoitem">
              <div className="icon">
                <span class="material-symbols-outlined">person</span>
              </div>
              <p>송채영</p>
            </div>
            <div className="infoitem">
              <div className="icon">
                <span class="material-symbols-outlined">chat_bubble</span>
              </div>
              <p>+ 한줄소개 추가</p>
            </div>
          </div>
          <div className="kakaoinfo">
            <h3>카카오 내정보</h3>
            <p>
              카카오 계정 내정보에서 프로필 기본 정보를 통합 관리할 수 있으며,
              이 정보는 다른 카카오 서비스에서도 함께 이용할 수 있습니다.
            </p>
            <div className="infoitem">
              <div className="icon">
                <span class="material-symbols-outlined">redeem</span>
              </div>
              <p>1998년 5월 12일(+)</p>
            </div>
            <div className="infoitem">
              <div className="icon">
                <i class="fa-solid fa-venus-mars"></i>
              </div>
              <p>여성</p>
            </div>
          </div>
          <div className="profileThumbsup">
            <div className="profileThumbsup_text">
              <h3>프로필에 계정 추천 표시</h3>
              <p>
                사람들이 회원님의 프로필에서 비슷한 계정 추천을 볼 수 있는지와
                회원님의 계정이 다른 프로필에서 추천될 수 있는지를 선택하세요.
              </p>
            </div>
            <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
              <motion.div className="handle" layout transition={spring} />
            </div>
          </div>
        </div>
        <SumbmitBtn changeContent={changeContent}>수정</SumbmitBtn>
      </Modal>
    </Wrapper>
  );
};

export default EditProfile;
