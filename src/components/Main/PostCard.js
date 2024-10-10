import React, { useState, useContext } from "react";
import styled from "styled-components";
import PostForm from "./PostForm";
import DetailModal from "../Detail/DetailModal/DetailModal";
import User from "./User";
import { DarkModeStateContext } from "../../App"; // 다크모드 컨텍스트 사용

const Wrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.bgSubColor};
`;

const Container = styled.div`
  width: 1406px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 60px 0 0 100px;
  padding: 0 20px;
  padding-left: 20%;
  @media screen and (max-width: 1760px) {
    width: 100%;
    padding-left: 10%;
  }
  @media screen and (max-width: 1460px) {
    padding-left: 5%;
  }
  @media screen and (max-width: 1190px) {
    padding-left: 5px;
  }
`;

const PostCard = () => {
  const { darkmode } = useContext(DarkModeStateContext); // 다크모드 상태 받아오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // 목업 데이터 (추후 firebase 로 가져올 예정)
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

  return (
    <Wrapper>
      <Container>
        <User />
        {posts.map((post) => (
          <div key={post.id} onClick={() => openModal(post)}>
            <PostForm post={post} />
          </div>
        ))}
        {isModalOpen && selectedPost && (
          <DetailModal
            isOpen={isModalOpen}
            onClose={closeModal}
            post={selectedPost}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default PostCard;
