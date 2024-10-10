import React, { useContext } from "react";
import styled from "styled-components";
import ProfileFriend from "./ProfileFriend";
import { DarkModeStateContext } from "../../App";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  /* height: 100%; */
  height: 2000px;
  padding: 0 10px;
  overflow-x: hidden;
  background: ${({ theme }) => theme.bgSubColor};

  video {
    width: 100%;
    height: 100%;
  }
`;

const MainProfile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  .background {
    width: 1000px;
    height: 1000px;
    position: absolute;
    top: -770px;
    left: 50%;
    transform: translate(-50%);
    z-index: 1;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: relative;
      z-index: 10;
    }
  }
  .profileCircle {
    margin-top: 80px;
    width: 200px;
    height: 200px;
    background: #d9d9d9;
    border: 2px solid #fff;
    border-radius: 50%;
    position: relative;
    z-index: 2;
  }
  .profile {
    text-align: center;
    .profile_name {
      font-size: 30px;
      font-weight: 700;
      color: ${({ theme }) => theme.fontColor};
    }
    .profile_desc {
      padding: 0 30px;
      margin: 8px 0;
      /* color: #666; */
      color: ${({ darkmode }) => (darkmode ? "#eee" : "#666")};
    }
  }
  .btngroup {
    display: flex;
    gap: 20px;
    > button {
      font-size: 14px;
      width: 150px;
      height: 34px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      &:nth-child(1) {
        background: #eee;
      }
      &:nth-child(2) {
        background: var(--point-color);
      }
    }
  }
`;

const MobileProfile = () => {
  const { darkmode } = useContext(DarkModeStateContext);

  return (
    <Wrapper>
      <MainProfile darkmode={darkmode}>
        <div className="background">
          <img src="https://t1.daumcdn.net/brunch/service/user/8LOK/file/d0LZ8mYR5L0ZFf6vqc8buq8WkKE.jpg?downloa" />
        </div>
        <div className="profileCircle"></div>
        <div className="profile">
          <div className="profile_name">송채영</div>
          <div className="profile_desc">
            상태매세지입니다. 상태매세지입니다. 상태매세지입니다.
            상태매세지입니다. 상태매세지입니다. 상태매세지입니다.
          </div>
        </div>
        <div className="btngroup">
          <button>내 정보 수정</button>
          <button>글 작성</button>
        </div>
      </MainProfile>
      <ProfileFriend />
    </Wrapper>
  );
};

export default MobileProfile;
