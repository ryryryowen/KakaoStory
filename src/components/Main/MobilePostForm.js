import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { userAuth } from "../../configs/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Wrapper = styled(motion.div)`
  width: 100%;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ContentBox = styled.div`
  width: 90%;
  height: 420px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 20px 0;
  color: ${({ theme }) => theme.fontColor};
  background: ${({ theme }) => theme.bgColor};
  /* border: 1px solid ${({ theme }) => theme.fontColor}; */
`;

const CotentImage = styled.div`
  width: 330px;
  height: 198px;
  background: #d9d9d9;
  border-radius: 15px;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DescMain = styled.div`
  width: 330px;
  position: relative;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
`;

const Icons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s;
  i {
    &:hover {
      color: #fae100;
      cursor: pointer;
    }
  }
`;

const Icon = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Heart = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const TextMain = styled.div`
  width: 100%;
  height: 50px;
  margin: 5px 0 10px 0;
  padding-top: 10px;
`;
const CommentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const UserInfo = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;
const UserImg = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #d9d9d9;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserName = styled.div``;

const Day = styled.div`
  color: #d9d9d9;
`;

const Comment = styled.input`
  width: 330px;
  height: 37px;
  background: #d9d9d9;
  border: none;
  border-radius: 10px;
`;

const CommentIcon = styled.div`
  width: 60px;
  display: flex;
  gap: 10px;
  position: absolute;
  right: 0;
  bottom: 12px;
  transition: all 0.3s;
  i {
    &:hover {
      color: #fae100;
      cursor: pointer;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 50vh;
  & > div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const MobilePostForm = ({ postData }) => {
  const user = userAuth.currentUser;
  const [userImg, setUserImg] = useState(null);
  const [writeName, setWriteName] = useState(null);
  const [userData, setUserData] = useState({});

  const { id, userName, post, photo, likes, postId, createdAt, comments } =
    postData;

  const getUserInfo = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      setUserData(data);
    }
  };

  useEffect(() => {
    if (postId) getUserInfo(postId);
  }, []);

  useEffect(() => {
    setUserImg(userData.userPhoto);
    setWriteName(userData.name);
  }, [userData]);

  const heartUp = async (e) => {
    e.stopPropagation();
    const postDocRef = doc(db, "contents", id);
    const postDoc = await getDoc(postDocRef);

    if (postDoc) {
      const data = postDoc.data();
      const currentLikes = data.likes || 0;
      await updateDoc(postDocRef, {
        ...data,
        likes: currentLikes + 1,
      });
    }
  };

  return (
    <Wrapper>
      <Container>
        <ContentBox>
          <Content>
            <CotentImage>
              <img src={photo} />
            </CotentImage>
            <DescMain>
              <Icons>
                <Icon>
                  <Heart>
                    <i
                      onClick={(e) => heartUp(e)}
                      className="fa-solid fa-heart"
                    ></i>
                    {likes}
                  </Heart>
                  <i className="fa-regular fa-comment"></i>
                  <i className="fa-regular fa-paper-plane"></i>
                </Icon>
                {user?.uid === postId && (
                  <div>
                    <i className="fa-solid fa-ellipsis"></i>
                  </div>
                )}
              </Icons>
              <TextMain>
                <p>{post}</p>
              </TextMain>
              <CommentArea>
                <UserInfo>
                  <User>
                    <UserImg>
                      <img src={userImg} />
                    </UserImg>
                    <UserName>{writeName}</UserName>
                  </User>
                  <Day>{new Date(createdAt).toLocaleDateString()}</Day>
                </UserInfo>
                <Comment />
                <CommentIcon>
                  <i className="fa-solid fa-link"></i>
                  <i className="fa-regular fa-image"></i>
                </CommentIcon>
              </CommentArea>
            </DescMain>
          </Content>
        </ContentBox>
      </Container>
    </Wrapper>
  );
};

export default MobilePostForm;
