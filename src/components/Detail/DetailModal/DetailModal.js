import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ModalOverlay from "./ModalOverlay"; // 백그라운드 흐림 효과

// 모달 창 스타일
const ModalContent = styled(motion.div)`
  position: fixed;
  width: 50%;
  height: 30vh;
  transform: translate(-50%, -50%); /* 수직 및 수평으로 중앙 정렬 */
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  width: 70%; /* 모달 크기를 더 키움 */
  display: flex;
  flex-direction: row;
`;

const PostDetail = styled.div`
  width: 70%;
  background-color: #f0f0f0;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ccc;
`;

const CommentsSection = styled.div`
  width: 30%;
  background-color: #000;
  color: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const CommentText = styled.p`
  font-size: 16px;
`;

const CommentInputContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #fff;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #ffe900;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
`;

const DetailModal = ({ isOpen, onClose, post }) => {
  if (!isOpen || !post) return null;

  return (
    <>
      <ModalOverlay onClick={onClose} /> {/* 오버레이 클릭 시 모달 닫힘 */}
      <ModalContent
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100vh", opacity: 0 }}
      >
        <PostDetail>
          <PlaceholderImage />
        </PostDetail>
        <CommentsSection>
          <div>
            <h2>{post.title}</h2>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <Comment key={index}>
                  <img
                    src={comment.profileImage || "default-profile.png"}
                    alt={comment.username}
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                  <CommentText>{comment.text}</CommentText>
                </Comment>
              ))
            ) : (
              <p>댓글이 없습니다.</p>
            )}
          </div>
          <CommentInputContainer>
            <CommentInput placeholder="댓글 작성하기..." />
            <SubmitButton>작성</SubmitButton>
          </CommentInputContainer>
        </CommentsSection>
      </ModalContent>
    </>
  );
};

export default DetailModal;
