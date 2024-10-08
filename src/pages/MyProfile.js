import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyProfileInfo from "../components/Detail/MyProfileInfo";
import PostList from "../components/Main/PostList";
import MobileProfile from "../components/Detail/MobileProfile";
import ProfileFriend from "../components/Detail/ProfileFriend";
import { userAuth } from "../configs/firebase";

const Wrapper = styled.div`
  /* padding-left: 100px; */
  padding-left: 50px;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.bgSubColor};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  padding-bottom: 50px;
`;

const BgImgContainer = styled.div`
  background: #ddd;
  width: 100%;
  /* width: calc(100vw - 100px); */
  height: 400px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 30px;
  height: 100%;
  position: relative;
  margin: 0 auto;
  @media screen and (max-width: 1300px) {
    /* width: 100%; */
    flex-direction: column-reverse;
    /* justify-content: end; */
  }
`;

const PostcardWrapper = styled.div`
  /* width: 1084px; */
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  /* padding: 50px 0; */
  /* background: #fff; */
`;

const ProfileWrapper = styled.div`
  position: sticky;
  top: 100px;
  width: 50%;
  margin-top: -250px;
  width: fit-content;
  height: fit-content;
  @media screen and (max-width: 1300px) {
    position: static;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    /* align-self: flex-end; */
    /* margin-left: auto; */
  }
`;

const MyProfile = () => {
  const user = userAuth.currentUser;
  console.log(user);
  const [mobileSize, setMobileSize] = useState(false);

  const updateSize = (e) => {
    if (e.target.innerWidth <= 768) setMobileSize(true);
    else setMobileSize(false);
  };

  useEffect(() => {
    window.innerWidth <= 768 ? setMobileSize(true) : setMobileSize(false);
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <>
      {mobileSize ? (
        <MobileProfile />
      ) : (
        <Wrapper>
          <BgImgContainer>
            <img src="https://t1.daumcdn.net/brunch/service/user/8LOK/file/d0LZ8mYR5L0ZFf6vqc8buq8WkKE.jpg?download" />
          </BgImgContainer>
          <ContentWrapper>
            <ProfileFriend />
            <PostcardWrapper>
              <PostList />
            </PostcardWrapper>
            <ProfileWrapper>
              <MyProfileInfo />
            </ProfileWrapper>
          </ContentWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default MyProfile;
