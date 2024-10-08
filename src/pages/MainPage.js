import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DetailModal from "../components/Detail/DetailModal/DetailModal";
import { auth, storage } from "../configs/firebase";
import { getDownloadURL, ref } from "firebase/storage";

// 스타일 컴포넌트 설정
const PageContainer = styled.div`
  position: relative;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostItem = styled.li`
  padding: 10px;
  margin: 10px 0;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Detail 모달 상태
  const [selectedPost, setSelectedPost] = useState(null); // 선택한 게시물 데이터
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // WriteStoryModal 상태
  const [videoUrl, setVideoUrl] = useState("");
  // 목업 게시글들
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

  // 게시물 클릭 시 Detail 모달 열기
  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Detail 모달 닫기
  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  // WriteStoryModal 열기
  const openWriteModal = () => {
    setIsWriteModalOpen(true);
  };

  // WriteStoryModal 닫기
  const closeWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  const locationRef = ref(storage, `/kiwi1.mp4`);

  const getURL = async () => {
    try {
      const url = await getDownloadURL(locationRef);
      setVideoUrl(url);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getURL();
  }, []);

  return (
    <PageContainer>
      {/* <video controls autoPlay muted src={videoUrl}></video> */}
      <h1>메인 페이지</h1>
      <AddStoryButton onClick={openWriteModal}>
        오늘의 스토리를 들려주세요
      </AddStoryButton>

      {/* 게시물 리스트 */}
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.id} onClick={() => openModal(post)}>
            {post.title}
          </PostItem>
        ))}
      </PostList>

      {/* Detail 모달 컴포넌트 */}
      {isModalOpen && selectedPost && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          post={selectedPost} // post 객체로 프롭스 전달
        />
      )}
    </PageContainer>
  );
};

export default MainPage;
