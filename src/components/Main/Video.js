import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { db, auth } from "../../firebase"; // Firebase 설정 파일
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-top: 240px;
  margin-right: 10px;
  margin-bottom: 30px;
  background: ${({ theme }) => theme.bgMainColor};
`;
const VideosContainer = styled.div`
  position: relative;
`;
const Videos = styled.video`
  width: 100%;
  max-width: 240px;
  height: 390px;
  background: #fff;
  border-radius: 20px;
  cursor: pointer;
  object-fit: cover;
`;
const ModalOverlay = styled(motion.div)`
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
const ModalContent = styled(motion.div)`
  position: relative;
  width: 30%;
  max-width: 100%;
  max-height: 90%;
  border-radius: 20px;
  overflow: hidden;
`;
const VideoElement = styled.video`
  width: 100%;
  height: auto;
  border-radius: 20px;
  display: block;
`;
const Videocomment = styled.input`
  position: absolute;
  bottom: 14px;
  left: 12%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 65%;
  outline: none;
  background: none;
  border: 1px solid #efefef;
  color: #fff;
`;
const VideoText = styled.div`
  position: absolute;
  bottom: 150px;
  left: 30px;
  color: #fff;
  display: flex;
  flex-direction: column;
`;
const CommentText = styled(motion.p)`
  margin: 0;
  position: relative;
`;
const Video = () => {
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState("");
  const videoRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const querySnapshot = await getDocs(collection(db, "shotVideos"));
      const videoList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        src: doc.data().src,
        poster: doc.data().poster,
        comments: doc.data().comments || [],
      }));
      setVideos(videoList);
    };
    fetchVideos();
  }, []);
  const handleVideoClick = (video) => {
    setCurrentVideo(video.src);
    setCurrentVideoId(video.id);
    setIsModalOpen(true);
    setComments(video.comments || []);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo("");
    setInputValue("");
    setComments([]);
  };
  const handleCommentChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const videoDocRef = doc(db, "shotVideos", currentVideoId);
      const user = auth.currentUser;
      if (user) {
        const commentWithUser = `${
          user.displayName || user.email
        }: ${inputValue}`;
        await updateDoc(videoDocRef, {
          comments: arrayUnion(commentWithUser),
        });
        setComments((prev) => {
          const newComments = [...prev, commentWithUser];
          if (newComments.length > 5) {
            newComments.shift();
          }
          return newComments;
        });
        setInputValue("");
      } else {
        console.log("사용자가 로그인하지 않았습니다.");
      }
    }
  };
  useEffect(() => {
    if (isModalOpen && videoRef.current) {
      videoRef.current.play(); // 모달이 열릴 때 비디오 재생
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.pause(); // 모달이 닫힐 때 비디오 정지
      }
    };
  }, [isModalOpen]);
  return (
    <>
      <VideoList>
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideosContainer key={video.id}>
              <Videos
                loop
                onClick={() => handleVideoClick(video)}
                controls={false}
                poster={video.poster}
              >
                <source src={video.src} type="video/mp4" />
              </Videos>
            </VideosContainer>
          ))
        ) : (
          <p>비디오가 없습니다.</p>
        )}
      </VideoList>
      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <VideoElement ref={videoRef} controls loop>
                <source src={currentVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </VideoElement>
              <form
                onSubmit={handleCommentSubmit}
                onClick={(e) => e.stopPropagation()}
              >
                <Videocomment
                  value={inputValue}
                  type="text"
                  placeholder="댓글 입력..."
                  onChange={handleCommentChange}
                  autoFocus
                />
                <button type="submit" style={{ display: "none" }} />
              </form>
              <VideoText>
                {comments.map((comment, index) => (
                  <CommentText key={index}>{comment}</CommentText>
                ))}
              </VideoText>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};
export default Video;
