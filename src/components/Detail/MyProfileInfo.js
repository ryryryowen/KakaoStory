import React, { useContext, useState } from "react";
import styled from "styled-components";
import { mixins } from "../../styles/GlobalStyles.styles";
import { DarkModeStateContext } from "../../App";
import EditProfile from "./EditProfile";

const Wrapper = styled.div`
  width: 300px;
  ${mixins.flex({
    direction: "column",
    justify: "center",
    align: "center",
    gap: "30",
  })};
  @media screen and (max-width: 1300px) {
    /* width: 100%; */
    width: calc(950px / 2);
    /* flex-direction: row; */
  }
`;

const MyProfile = styled.div`
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-radius: 20px;
  width: 100%;
  height: 510px;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.4);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  /* margin-top: 200px; */
  /* position: absolute;
  top: -100px;
  right: 0; */
  .profileImg {
    width: 180px;
    height: 180px;
    background: #ccc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      width: 105%;
      object-fit: cover;
    }
    svg {
      width: 60%;
      color: #fff;
    }
  }
  .profileInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    h5 {
      font-size: 32px;
    }
    p {
      color: ${({ darkmode }) => (darkmode ? "#ccc" : "#666")};
      font-size: 14px;
      text-align: center;
    }
  }
  @media screen and (max-width: 1300px) {
    height: fit-content;
    flex-direction: row;
    .profileImg {
      min-width: 180px;
      img {
      }
    }
  }
`;

const Btns = styled.div`
  width: 100%;
  ${mixins.flex({
    direction: "column",
    justify: "center",
    align: "center",
    gap: "14",
  })};
  button {
    width: 100%;
    /* background: #ddd; */
    /* color: #333; */
    background: ${({ darkmode }) => (darkmode ? "#555" : "#ddd")};
    /* background: ${({ theme }) => theme.bgSubColor}; */
    color: ${({ theme }) => theme.fontColor};
    border: none;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.4px;
    line-height: 1;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      border-radius: 20px;
      opacity: 0.8;
    }
  }
  @media screen and (max-width: 1300px) {
    flex-direction: row;
    button {
      /* width: 200px; */
    }
  }
`;

const MyProfileInfo = () => {
  const { darkmode } = useContext(DarkModeStateContext);
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal((prev) => !prev);
  };
  return (
    <Wrapper>
      <MyProfile darkmode={darkmode}>
        <div className="profileImg">
          <img src="https://blog.kakaocdn.net/dn/Knpew/btrt3QWFcFi/AAHlfhBm8ZWxWTYeA2KAV0/%EC%B9%B4%ED%86%A1%20%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84%20%EC%82%AC%EC%A7%84.jpg?attach=1&knm=img.jpg" />
          {/* <svg
            dataSlot="icon"
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg> */}
        </div>
        <div className="profileInfo">
          <h5>송채영</h5>
          <p>
            상태매세지입니다. 상태매세지입니다. 상태매세지입니다.
            상태매세지입니다. 상태매세지입니다. 상태매세지입니다.
            상태매세지입니다. 상태매세지입니다. 상태매세지입니다.
          </p>
        </div>
      </MyProfile>
      <Btns darkmode={darkmode}>
        <button onClick={handleModal}>내 정보 수정</button>
        <button>글 작성</button>
      </Btns>
      {modal && <EditProfile modalOff={handleModal} />}
    </Wrapper>
  );
};

export default MyProfileInfo;
