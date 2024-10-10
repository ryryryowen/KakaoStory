import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  width: 100%;
`;

const Container = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ContentBox = styled.div`
  width: 370px;
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

const PostFormM = ({ layoutId, onClick }) => {
  return (
    <Wrapper>
      <Container>
        <ContentBox>
          <Content>
            <CotentImage />
            <DescMain>
              <Icons>
                <Icon>
                  <Heart>
                    <i class="fa-solid fa-heart"></i>10k
                  </Heart>
                  <i className="fa-regular fa-comment"></i>
                  <i class="fa-regular fa-paper-plane"></i>
                </Icon>
                <div>
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
              </Icons>
              <TextMain>
                <p>텍스트입니다텍스트입니다텍스트입니다 우헤헤...</p>
              </TextMain>
              <CommentArea>
                <UserInfo>
                  <User>
                    <UserImg />
                    <UserName>48.6js</UserName>
                  </User>
                  <Day>Thu 2024.09.14</Day>
                </UserInfo>
                <Comment />
                <CommentIcon>
                  <i class="fa-solid fa-link"></i>
                  <i class="fa-regular fa-image"></i>
                </CommentIcon>
              </CommentArea>
            </DescMain>
          </Content>
        </ContentBox>
      </Container>
    </Wrapper>
  );
};

export default PostFormM;
