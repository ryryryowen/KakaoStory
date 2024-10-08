import React, { Component } from "react";
import styled from "styled-components";
import MobliePostForm from "./MobilePostForm";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  background: ${({ theme }) => theme.bgColor};
`;

const Container = styled.div`
  width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: hidden;
`;

const ContentBox = styled.div`
  width: 370px;
  height: 420px;
  overflow: hidden;
  border-radius: 15px;
  color: ${({ theme }) => theme.fontColor};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const StoryListMainMobile = styled(motion.div)`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 13px;
  margin: 20px 5px 0 5px;
`;
const StoryMainMobile = styled.div`
  width: 50px;
  height: 90px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 10px;
  padding-left: 10px;
`;
const StoryImgMobile = styled.div`
  width: 50px;
  height: 50px;

  border: 1.8px solid #fae100;
  border-radius: 50%;
  cursor: pointer;
`;
const SotryDescMobile = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.fontColor};
  padding-top: none;
  padding-left: 3px;
  text-align: center;
`;

const Shorts = styled(motion.div)`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const ShortsLogo = styled.div`
  width: 100px;
  height: 30px;

  color: #000;
  cursor: pointer;
`;
const ShortsContent = styled(motion.div)`
  width: 100000px;
  display: flex;
  gap: 20px;
`;

const ShortsVideo = styled.div`
  width: 200px;
  height: 300px;
  background: #d9d9d9;
  border-radius: 15px;
  cursor: pointer;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달이 위에 오도록 */
`;

const Box = styled(motion.div)`
  position: absolute;
  width: 500px;
`;

const Gototop = styled.a`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fae100;
  color: #fff;
  font-size: 30px;
  text-align: center;
  line-height: 50px;
  position: fixed;
  right: 10px;
  top: 750px;
  opacity: 0;
  transition: all 0.3s;
  z-index: 100;
  &.active {
    opacity: 1;
    bottom: 20px;
  }
`;

const PostCard = () => {
  return (
    <Wrapper>
      <Container>
        <StoryListMainMobile
          drag="x"
          dragConstraints={{ left: -330, right: 0 }}
        >
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile> 채령</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile> 채채</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>는</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>멋쪄</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
        </StoryListMainMobile>
        <ContentBox>
          <Shorts>
            <ShortsLogo />
            <ShortsContent drag="x" dragConstraints={{ left: -1400, right: 0 }}>
              <ShortsVideo />
              <ShortsVideo />
              <ShortsVideo />
              <ShortsVideo />
              <ShortsVideo />
              <ShortsVideo />
              <ShortsVideo />
              <ShortsVideo />
            </ShortsContent>
          </Shorts>
        </ContentBox>
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <MobliePostForm />
        <Gototop className="active" href="#">
          <i class="fa-solid fa-chevron-up"></i>
        </Gototop>
      </Container>
    </Wrapper>
  );
};

export default PostCard;
