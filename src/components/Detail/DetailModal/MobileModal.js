import React, { useContext } from "react";
import { delay, motion } from "framer-motion";
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
  height: 90%; /* 화면의 80%만 차지 */
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
  border-bottom: 1px solid ${({ theme }) => theme.fontColor}; /* 구분선 */
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
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 15px;
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
      delay: 1,
      duration: 0.3, // 애니메이션 지속 시간 설정
      ease: "easeInOut",
    },
  },
  exit: {
    y: "100%",
    transition: {
      delay: 1,
      duration: 0.3, // 닫힐 때 애니메이션 속도 설정
      ease: "easeInOut",
    },
  },
};
const MobileModal = ({ isOpen, onClose, post }) => {
  const { darkmode } = useContext(DarkModeStateContext);

  if (!isOpen) return null;

  return (
    <ThemeProvider theme={darkmode ? darkTheme : lightTheme}>
      <Overlay onClick={onClose} />
      <ModalWrapper
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(event, info) => {
          if (info.offset.y > 300) onClose(); //300px 이상 드래그시 모달닫기
        }}
      >
        <Header>
          <div>댓글 {post.comments.length}</div>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <Content>
          {/* 댓글 리스트 */}
          {post.comments.map((comment, index) => (
            <Comment key={index}>
              <CommentProfileImage
                src={comment.profileImage || "/default-profile.png"}
              />
              <CommentText>
                <strong>{comment.username}</strong>
                <p>{comment.text}</p>
              </CommentText>
            </Comment>
          ))}
          <MoreCommentsButton>댓글 더보기</MoreCommentsButton>
        </Content>

        {/* 댓글 입력란 */}
        <CommentInputContainer>
          <CommentInput placeholder="댓글 작성하기..." />
          <SubmitButton>작성</SubmitButton>
        </CommentInputContainer>
      </ModalWrapper>
    </ThemeProvider>
  );
};

export default MobileModal;
