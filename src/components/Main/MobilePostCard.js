import React, { Component, useContext, useState } from "react";
import styled from "styled-components";
import MobileModal from "../../components/Detail/DetailModal/MobileModal";
import MobilePostForm from "./MobilePostForm";
import { AnimatePresence, motion } from "framer-motion";
import { DarkModeStateContext } from "../../App";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  background: ${({ theme }) => theme.bgColor};
  position: relative;
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

// 모달
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const StoryArray = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
  { id: 5, name: "Eve" },
  { id: 6, name: "Frank" },
  { id: 7, name: "Grace" },
  { id: 8, name: "Hannah" },
  { id: 9, name: "Ian" },
  { id: 10, name: "Jack" },
  { id: 11, name: "Kathy" },
  { id: 12, name: "Leo" },
  { id: 13, name: "Mona" },
  { id: 14, name: "Nina" },
  { id: 15, name: "Oscar" },
  { id: 16, name: "Paul" },
  { id: 17, name: "Quinn" },
  { id: 18, name: "Rachel" },
  { id: 19, name: "Steve" },
  { id: 20, name: "Tina" },
];

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
const StoryImgMobile = styled(motion.div)`
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
  background: ${({ isDarkMode }) =>
    isDarkMode
      ? `url("/kakaoLgo/shortsDark.png")`
      : `url("/kakaoLgo/shortsLight.png")`};
  cursor: pointer;
`;
const ShortsContent = styled(motion.div)`
  width: 100000px;
  display: flex;
  gap: 20px;
`;

const ShortsVideo = styled.video`
  width: 200px;
  height: 300px;
  background: #d9d9d9;
  border-radius: 15px;
  object-fit: cover;
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
  top: 85%;
  right: 10px;
  opacity: 0;
  transition: all 0.3s;
  z-index: 100;
  &.active {
    opacity: 1;
    bottom: 20px;
  }
`;

const TestBox = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 700px;
  background: #fff;
  border-radius: 40px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// 목업 데이터입니다 나중에 없앨거에용
const posts = [
  {
    id: 1,
    title: "YDH",
    images: [
      "/testimages/testimg1.jpg",
      "/testimages/testimg2.jpg",
      "/testimages/testimg3.jpg",
      "/testimages/testimg4.jpg",
      "/testimages/testimg5.jpg",
      "/testimages/testimg6.jpg",
    ],
    authorName: "Marshall_D_Yeomchi",
    authorProfileImage: "/testimages/testimg5.jpg",
    postTime: "7시간 전",
    comments: [
      {
        username: "염치두루치기",
        profileImage: "/testimages/testimg3.jpg",
        time: "6시간 전",
        text: "동훈님 너무 이뻐요 ><",
      },
      {
        username: "훈둥님빠약자",
        profileImage: "/testimages/testimg1.jpg",
        time: "6시간 전",
        text: "염치님 오늘도 좋은 글 감사합니다. ^^",
      },
      {
        username: "GANZI_Flow",
        profileImage: "/testimages/testimg5.jpg",
        time: "5시간 전",
        text: "좋아요 누르고 갑니다!",
      },
      {
        username: "박상혁",
        profileImage: "/testimages/testimg4.jpg",
        time: "4시간 전",
        text: "이 글 너무 좋아요!",
      },
      {
        username: "김호섭",
        profileImage: "/testimages/testimg3.jpg",
        time: "3시간 전",
        text: "염치님, 글 감사합니다!",
      },
      {
        username: "리액트개발자",
        profileImage: "/testimages/testimg2.jpg",
        time: "2시간 전",
        text: "이 글에서 많은 걸 배웠습니다. 감사합니다!",
      },
      {
        username: "코딩왕",
        profileImage: "/testimages/testimg1.jpg",
        time: "1시간 전",
        text: "정말 멋진 글이네요! 공감합니다!",
      },
      {
        username: "코딩료",
        profileImage: "/testimages/testimg1.jpg",
        time: "1시간 전",
        text: "정말 멋진 글이네요! 공감합니다!",
      },
      {
        username: "코딩승",
        profileImage: "/testimages/testimg1.jpg",
        time: "1시간 전",
        text: "정말 멋진 글이네요! 공감합니다!",
      },
    ],
  },
  {
    id: 2,
    title: "YDH2",
    images: ["/testimages/testimg2.jpg"],
    authorName: "Marshall_D_Yeomchi",
    authorProfileImage: "/testimages/testimg1.jpg",
    postTime: "6시간 전",
    comments: [
      {
        username: "카카오스토리 관리자",
        profileImage: "/testimages/testimg2.jpg",
        time: "6시간 전",
        text: "동훈님 팬이에요 ><",
      },
      {
        username: "박상혁",
        profileImage: "/testimages/testimg3.jpg",
        time: "6시간 전",
        text: "오랜만에 인사드려요~!!!",
      },
      {
        username: "김호섭",
        profileImage: "/testimages/testimg4.jpg",
        time: "5시간 전",
        text: "해피 추석추석! 너무 오랜만입니다!!",
      },
      {
        username: "방황하는허리끈",
        profileImage: "/testimages/testimg5.jpg",
        time: "5시간 전",
        text: "이 글 정말 인상 깊습니다.",
      },
      {
        username: "동그라미빵",
        profileImage: "/testimages/testimg5.jpg",
        time: "4시간 전",
        text: "이 글을 보고 많은 생각을 했어요.",
      },
      {
        username: "코딩학도",
        profileImage: "/testimages/testimg4.jpg",
        time: "3시간 전",
        text: "다음 글도 기대하겠습니다!",
      },
      {
        username: "프로그래밍러버",
        profileImage: "/testimages/testimg3.jpg",
        time: "2시간 전",
        text: "너무 공감되는 글입니다. 좋은 하루 보내세요!",
      },
    ],
  },
];

const MobilePostCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <Container>
        {posts.map((post) => (
          <div key={post.id} onClick={() => openModal(post)}>
            <MobilePostForm post={post} />
          </div>
        ))}
        <Gototop className="active" href="#">
          <i className="fa-solid fa-chevron-up"></i>
        </Gototop>
      </Container>

      <AnimatePresence onExitComplete={() => setSelectedPost(null)}>
        {isModalOpen && (
          <MobileModal
            isOpen={isModalOpen}
            onClose={closeModal}
            post={selectedPost}
          />
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default MobilePostCard;
