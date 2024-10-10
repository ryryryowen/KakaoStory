import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled.main`
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.bgColor};
  display: flex;
  align-items: center;
  padding: 10px;
  position: fixed;
  z-index: 100;
`;
const HeaderMain = styled.div`
  width: 430px;
  display: flex;
  align-items: center;
`;

const KakaoLogo = styled.div`
  width: 200px;
  height: 60px;
  background: url(${"/kakaoLgo/kakaoLight.png"}) center/cover;
`;

const SearchBarHeader = styled.input`
  width: 220px;
  height: 35px;
  border: none;
  border-radius: 24px;
  background: #fbfbfb;
  padding-left: 10px;
  &:focus {
    outline: none;
    & ~ span {
      opacity: 0;
    }
  }
  @media screen and (max-width: 1080px) {
    display: none;
  }
`;

const SearchBarHeaderValue = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  left: 220px;
  @media screen and (max-width: 1080px) {
    display: none;
  }
`;

const LeftIconHeader = styled.div`
  display: flex;
  gap: 15px;
  position: absolute;
  right: 15px;
  button {
    border: none;
    background: none;
    cursor: pointer;
    color: ${({ theme }) => theme.fontColor};
    &:hover {
      color: #fae100;
      cursor: pointer;
    }
  }
`;

// 헤더 모달

const AddStoryHeader = styled.button`
  width: 500px;
  height: 45px;
  border: none;
  border-radius: 40px;
  font-size: 1rem;
  position: absolute;
  left: 50%;
  background: ${({ theme }) => theme.addStoryColor};
  transform: translate(-50%);
  cursor: pointer;
  @media screen and (max-width: 1760px) {
    left: 60%;
  }
  @media screen and (max-width: 1390px) {
    left: 65%;
  }
  @media screen and (max-width: 1080px) {
    left: 55%;
    width: 430px;
  }
`;

const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  width: 100%;
  height: 100%;
  position: absolute;
  background: none;
  justify-content: center;
  align-items: center;
  top: 0;
`;

const Box = styled.textarea`
  width: 500px;
  height: 250px;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-radius: 40px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid #fae100;
  font-size: 18px;
  font-style: "kakaobig";
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 30px 170px;
  z-index: 100;
  padding-top: 20px;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 1760px) {
    left: 60%;
  }
  @media screen and (max-width: 1390px) {
    left: 65%;
  }
  @media screen and (max-width: 1080px) {
    left: 55%;
    width: 430px;
  }
`;

const HeaderAddStroyOptions = styled.div`
  width: 500px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 265px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 30px;
  z-index: 100;
  @media screen and (max-width: 1760px) {
    left: 60%;
  }
  @media screen and (max-width: 1390px) {
    left: 65%;
  }
  @media screen and (max-width: 1080px) {
    left: 55%;
    width: 430px;
  }
`;

const HeaderAddStoryIcons = styled.div`
  width: 132px;
  height: 25px;
  display: flex;
  gap: 30px;
  padding-top: 6px;
  i {
    width: 25px;
    height: 25px;
    color: ${({ theme }) => theme.fontColor};
    &:hover {
      color: #fae100;
      cursor: pointer;
    }
  }
`;

const HeaderAddStoryButtons = styled.div`
  width: 150px;
  height: 30px;
  display: flex;
  gap: 10px;
  button {
    width: 70px;
    height: 30px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const CancelAddStoryButton = styled.button`
  background: none;
  border: 1px solid #ccc;
  color: #ccc;
  &:hover {
    border: 1px solid #eee;
  }
`;
const UploadAddStoryButton = styled.button`
  background: #fae100;
  border: none;
  color: #fff;
`;

function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Wrapper>
      <HeaderMain>
        <KakaoLogo />
        <SearchBarHeader type="text" id="searchBarHeader" />
        <SearchBarHeaderValue>
          <i className="fa-solid fa-magnifying-glass"></i>검색
        </SearchBarHeaderValue>
      </HeaderMain>

      <AddStoryHeader onClick={openModal}>
        오늘의 스토리를 들려주세요.
      </AddStoryHeader>

      <Overlay isOpen={modalOpen}>
        <Box placeholder="오늘 하루 기억하고 싶은 순간이 있나요?" />
        <HeaderAddStroyOptions>
          <HeaderAddStoryIcons>
            <i class="fa-solid fa-camera"></i>
            <i class="fa-solid fa-music"></i>
            <i class="fa-solid fa-link"></i>
          </HeaderAddStoryIcons>
          <HeaderAddStoryButtons>
            <CancelAddStoryButton onClick={closeModal}>
              취소
            </CancelAddStoryButton>
            <UploadAddStoryButton>올리기</UploadAddStoryButton>
          </HeaderAddStoryButtons>
        </HeaderAddStroyOptions>
      </Overlay>
      <LeftIconHeader>
        <button>
          <i class="fa-solid fa-user-group"></i>
        </button>
        <button>
          <i class="fa-regular fa-bell"></i>
        </button>
        <button>
          <i class="fa-regular fa-circle-user"></i>
        </button>
      </LeftIconHeader>
    </Wrapper>
  );
}

export default Header;
