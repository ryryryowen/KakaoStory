import React, { useContext, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import ModalOverlay from "./ModalOverlay";
import { lightTheme, darkTheme } from "../../../styles/Theme";
import { DarkModeStateContext } from "../../../App";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

const DetailModal = ({ isOpen, onClose, post }) => {
  const { darkmode } = useContext(DarkModeStateContext);
  const [likedComments, setLikedComments] = useState([]);
  const [likedPost, setLikedPost] = useState(false);

  const handleEdit = () => {
    alert("게시글을 수정할 수 있는 UI를 띄웁니다.");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      alert("게시글이 삭제되었습니다.");
    }
  };

  if (!isOpen || !post) return null;

  const defaultProfileImage = "/testimages/default-profile.png";

  const toggleLikeComment = (index) => {
    setLikedComments((prevLikedComments) => {
      const updatedLikes = [...prevLikedComments];
      updatedLikes[index] = !updatedLikes[index];
      return updatedLikes;
    });
  };

  const toggleLikePost = () => {
    setLikedPost((prevLikedPost) => !prevLikedPost);
  };

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
          {post.images.map((image, index) => (
            <SwiperSlide key={index}>
              <PostDetailImage image={image} />
            </SwiperSlide>
          ))}
        </StyledSwiper>
        <CommentsSection>
          <PostAuthorInfo>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <AuthorProfileImage
                src={post.authorProfileImage || defaultProfileImage}
                alt={post.authorName}
              />
              <AuthorInfoText>
                <AuthorName>{post.authorName}</AuthorName>
                <PostTime>{post.postTime}</PostTime>
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

          {/* 댓글 리스트 */}
          <CommentList>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <Comment key={index}>
                  <CommentLeft>
                    <CommentProfileImage
                      src={comment.profileImage || defaultProfileImage}
                      alt={comment.username}
                    />
                    <CommentContent>
                      <CommentHeader>
                        <CommentUserName>{comment.username}</CommentUserName>
                        <CommentTime>{comment.time}</CommentTime>
                      </CommentHeader>
                      <CommentText>{comment.text}</CommentText>
                    </CommentContent>
                  </CommentLeft>
                  <CommentLikeIcon
                    isLiked={likedComments[index]}
                    onClick={() => toggleLikeComment(index)}
                  >
                    <i
                      className={
                        likedComments[index] === true
                          ? "fa-solid fa-heart"
                          : "fa-regular fa-heart"
                      }
                    ></i>
                  </CommentLikeIcon>
                </Comment>
              ))
            ) : (
              <p>댓글이 없습니다.</p>
            )}
          </CommentList>

          {/* 좋아요, 댓글, 공유 아이콘 영역 */}
          <InteractionIconsContainer>
            <Icon isLiked={likedPost} onClick={toggleLikePost}>
              <span className="material-symbols-outlined">favorite</span>
            </Icon>
            <Icon>
              <span className="material-symbols-outlined">comment</span>
            </Icon>
            <Icon>
              <span className="material-symbols-outlined">share</span>
            </Icon>
          </InteractionIconsContainer>

          {/* 댓글 입력란 */}
          <CommentInputContainer>
            <CommentInput placeholder="댓글 작성하기..." />
            <SubmitButton>작성</SubmitButton>
          </CommentInputContainer>
        </CommentsSection>
      </ModalContent>
    </ThemeProvider>
  );
};

export default DetailModal;
