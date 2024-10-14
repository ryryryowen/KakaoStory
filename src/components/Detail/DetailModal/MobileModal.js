import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../../styles/Theme";
import { DarkModeStateContext } from "../../../App";
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;
const ModalWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90%;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 20px 20px 0 0;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  border-bottom: 1px solid ${({ theme }) => theme.fontColor};
`;
const CloseButton = styled.div`
  cursor: pointer;
  font-size: 24px;
`;
const Content = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;
const Comment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const CommentLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const CommentProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
`;
const CommentText = styled.div`
  background-color: ${({ theme }) => theme.bgSubColor};
  padding: 10px;
  border-radius: 10px;
  color: ${({ theme }) => theme.fontColor};
  font-size: 14px;
  flex: 1;
`;
const LikeIcon = styled.i`
  cursor: pointer;
  font-size: 18px;
  color: ${({ liked }) => (liked ? "#FFE900" : "#ccc")};
  &:hover {
    color: #ffe900;
  }
`;
const MoreCommentsButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ffe900;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
`;
const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.fontColor};
`;
const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: ${({ theme }) => theme.bgSubColor};
  color: ${({ theme }) => theme.fontColor};
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;
const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #ffe900;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
`;
const modalVariants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: {
      delay: 0.2,
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    y: "100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
const MobileModal = ({ isOpen, onClose, post }) => {
  const { darkmode } = useContext(DarkModeStateContext);
  const [likedComments, setLikedComments] = useState([]);
  const toggleLike = (index) => {
    setLikedComments((prevLikedComments) => {
      const updatedLikes = [...prevLikedComments];
      updatedLikes[index] = !updatedLikes[index];
      return updatedLikes;
    });
  };
  return (
    <ThemeProvider theme={darkmode ? darkTheme : lightTheme}>
      {isOpen && (
        <>
          <Overlay
            onClick={() => {
              onClose();
            }}
          />
          <ModalWrapper
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
              if (info.offset.y > 100) {
                onClose();
              }
            }}
          >
            <Header>
              <div>댓글 {post.comments.length}</div>
              <CloseButton
                onClick={() => {
                  onClose();
                }}
              >
                &times;
              </CloseButton>
            </Header>
            <Content>
              {post.comments.map((comment, index) => (
                <Comment key={index}>
                  <CommentLeft>
                    <CommentProfileImage
                      src={comment.profileImage || "/default-profile.png"}
                    />
                    <CommentText>
                      <strong>{comment.username}</strong>
                      <p>{comment.text}</p>
                    </CommentText>
                  </CommentLeft>
                  <LikeIcon
                    liked={likedComments[index]}
                    className={
                      likedComments[index]
                        ? "fa-solid fa-heart"
                        : "fa-regular fa-heart"
                    }
                    onClick={() => toggleLike(index)}
                  />
                </Comment>
              ))}
              <MoreCommentsButton>댓글 더보기</MoreCommentsButton>
            </Content>
            <CommentInputContainer>
              <CommentInput placeholder="댓글 작성하기..." />
              <SubmitButton>작성</SubmitButton>
            </CommentInputContainer>
          </ModalWrapper>
        </>
      )}
    </ThemeProvider>
  );
};
export default MobileModal;
