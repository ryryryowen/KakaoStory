import React, { useState } from "react";
import styled from "styled-components";
import DetailModal from "../components/Detail/DetailModal/DetailModal";

// 스타일 컴포넌트 정리
const PageContainer = styled.div`
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

const ModalContent = styled.div`
  padding: 20px;
`;

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태 관리
  const [selectedPost, setSelectedPost] = useState(null); // 선택한 게시물 데이터

  // 목업 게시글들 << 예시입니다.
  const posts = [
    { id: 1, title: "게시물 1", content: "게시물 1의 내용" },
    { id: 2, title: "게시물 2", content: "게시물 2의 내용" },
    { id: 3, title: "게시물 3", content: "게시물 3의 내용" },
    { id: 4, title: "게시물 4", content: "게시물 4의 내용" },
    { id: 5, title: "게시물 5", content: "게시물 5의 내용" },
    { id: 6, title: "게시물 6", content: "게시물 6의 내용" },
    { id: 7, title: "게시물 7", content: "게시물 7의 내용" },
  ];

  // 게시물 클릭 시 모달 열기
  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수로 분리
  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <h1>메인 페이지</h1>

      {/* 게시물 리스트 */}
      <PostList>
        {posts.map((post) => (
          <PostItem key={post.id} onClick={() => openModal(post)}>
            {post.title}
          </PostItem>
        ))}
      </PostList>

      {/* 모달 컴포넌트 */}
      <DetailModal isOpen={isModalOpen} onClose={closeModal}>
        {selectedPost && (
          <ModalContent>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.content}</p>
          </ModalContent>
        )}
      </DetailModal>
    </PageContainer>
  );
};

export default MainPage;
