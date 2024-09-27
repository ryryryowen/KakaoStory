import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import image from "../../images/kakaoLogo.png";

const HeaderHeader = styled.main`
  width: 100%;
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const KakaoLogo = styled.div`
  width: 200px;
  height: 60px;
  background: url(${image}) center/cover;
  position: relative;
`;

const SearchBarHeader = styled.input`
  width: 200px;
  height: 35px;
  border: none;
  border-radius: 24px;
  background: #fbfbfb;
  position: relative;
`;

const SearchBarHeaderValue = styled.div`
  position: absolute;
  left: 230px;
`;

const AddStoryHeader = styled.button`
  width: 450px;
  height: 45px;
  border: none;
  border-radius: 40px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

const LeftIconHeader = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  right: 15px;
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
`;

function Header() {
  return (
    <HeaderHeader>
      <KakaoLogo />
      <SearchBarHeader type="text" id="searchBarHeader" />
      <SearchBarHeaderValue>
        <i className="fa-solid fa-magnifying-glass"></i>검색
      </SearchBarHeaderValue>
      <AddStoryHeader>오늘의 스토리를 들려주세요.</AddStoryHeader>
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
    </HeaderHeader>
  );
}
import styled from "styled-components";

// 헤더 스타일
const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  text-align: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>카카오스토리 로고 및 헤더</h1>
    </HeaderContainer>
  );
};

export default Header;
