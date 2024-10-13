import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import ModalOverlay from "./ModalOverlay";
import { lightTheme, darkTheme } from "../../../styles/Theme";
import { DarkModeStateContext } from "../../../App";
import { db } from "../../../configs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EditModalPostform from "./EditModal";

// 모달 창 스타일
const ModalContent = styled.div`
  display: flex;
  position: fixed;
  width: 1060px;
  height: 730px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  z-index: 1001;
`;

const PostDetailImage = styled.div`
  width: 620px;
  height: 100%;
  background-color: ${({ theme }) => theme.bgSubColor};
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  padding: 30px;
`;

const PostAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 12px;
`;

const AuthorProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const AuthorInfoText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AuthorName = styled.p`
  font-weight: bold;
  margin: 0;
`;

const PostTime = styled.p`
  font-size: 12px;
  color: var(--main-gray);
  margin-left: 10px;
`;

const EditDeleteIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .icon {
    font-size: 24px;
    cursor: pointer;
    color: ${({ theme }) => theme.fontColor};

    &:hover {
      color: #ffe900; /* 아이콘에 hover 효과 추가 */
    }
  }
`;

const CommentList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 15px;
`;

const CommentLeft = styled.div`
  display: flex;
  gap: 15px;
`;

const CommentProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CommentUserName = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin: 0;
`;

const CommentTime = styled.p`
  font-size: 12px;
  color: var(--main-gray);
  margin: 0;
`;

const CommentText = styled.p`
  font-size: 14px;
  margin-top: 5px;
`;

const CommentLikeIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => (props.isLiked ? "#FFE900" : props.theme.fontColor)};
  &:hover {
    color: ${(props) => (props.isLiked ? "#FFD700" : props.theme.fontColor)};
  }
`;

const CommentInputContainer = styled.div`
  display: flex;
  gap: 15px;
  border-top: 1px solid #ddd;
  padding-top: 15px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 12px;
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
  width: 100px;
  height: 45px;
  background-color: #ffe900;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
`;

const InteractionIconsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  padding-bottom: 10px;
`;

const Icon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => (props.isLiked ? "#FFE900" : props.theme.fontColor)};
  &:hover {
    color: ${(props) => (props.isLiked ? "#FFD700" : props.theme.fontColor)};
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 620px;
  height: 730px;

  .swiper-button-prev,
  .swiper-button-next {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding: 40px;
    color: ${({ theme }) => theme.fontColor};
    transform: scale(0.4);
    transition: all 0.3s;
    background: rgba(255, 255, 255, 0.5);
  }

  .swiper-button-prev {
    left: 5px;
  }
  .swiper-button-next {
    right: 5px;
  }

  .swiper-pagination-bullet {
    background-color: ${({ theme }) => theme.fontColor};
  }

  .swiper-pagination-bullet-active {
    background-color: #ffe900;
  }
`;

const DetailModal = ({ isOpen, onClose, postId }) => {
  const { darkmode } = useContext(DarkModeStateContext);
  const [post, setPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!postId) return;

    console.log("DetailModal postId:", postId); // postId 로그 추가
    const fetchPost = async () => {
      const postRef = doc(db, "contents", postId);
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        
        setPost(postDoc.data());
      } else {
        console.log("문서가 없습니다!");
      }
    };

    fetchPost();
  }, [postId]);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      alert("게시글이 삭제되었습니다.");
    }
  };

  if (!isOpen || !post) return null;

  const defaultProfileImage = "/testimages/default-profile.png";

  return (
    <ThemeProvider theme={darkmode ? darkTheme : lightTheme}>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        <StyledSwiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {post.photo && post.photo.length > 0 ? (
            post.photo.map((image, index) => (
              <SwiperSlide key={index}>
                <PostDetailImage image={image.url} />
              </SwiperSlide>
            ))
          ) : (
            <p>이미지가 없습니다.</p>
          )}
        </StyledSwiper>
        <CommentsSection>
          <PostAuthorInfo>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <AuthorProfileImage
                src={post.userProfileImg || defaultProfileImage}
                alt={post.userName}
              />
              <AuthorInfoText>
                <AuthorName>{post.userName}</AuthorName>
                <PostTime>{post.createdAt}</PostTime>
              </AuthorInfoText>
            </div>
            <EditDeleteIcons>
              <span
                className="material-symbols-outlined icon"
                onClick={handleEdit}
              >
                edit
              </span>
              <span
                className="material-symbols-outlined icon"
                onClick={handleDelete}
              >
                delete
              </span>
            </EditDeleteIcons>
          </PostAuthorInfo>

          <CommentList>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <Comment key={index}>
                  <CommentLeft>
                    <CommentProfileImage
                      src={comment.commentUserImg || defaultProfileImage}
                      alt={comment.userId}
                    />
                    <CommentContent>
                      <CommentHeader>
                        <CommentUserName>{comment.userId}</CommentUserName>
                        <CommentTime>{comment.createdAt}</CommentTime>
                      </CommentHeader>
                      <CommentText>{comment.content}</CommentText>
                    </CommentContent>
                  </CommentLeft>
                </Comment>
              ))
            ) : (
              <p>댓글이 없습니다.</p>
            )}
          </CommentList>
        </CommentsSection>
      </ModalContent>
      {isEditModalOpen && <EditModalPostform onClose={handleEditClose} />}
    </ThemeProvider>
  );
};

export default DetailModal;
