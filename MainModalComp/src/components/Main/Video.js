import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// 비디오 데이터 (예시)
const videoData = Array.from({ length: 7 }, (_, index) => ({
  id: index + 1,
  src: `${process.env.PUBLIC_URL}/video${index + 1}.mp4`, // public 폴더 경로
}));

const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  position: absolute;
  right: 0;
  top: 135px;
  background: ${({ theme }) => theme.bgMainColor};
  @media (max-width: 1390px) {
    display: none;
  }
`;

const Videos = styled.video`
  width: 100%; /* 가로 너비를 100%로 설정 */
  max-width: 240px; /* 최대 너비를 설정하여 원래 비율 유지 */
  height: 390px;
  background: #fff;
  border-radius: 20px;
  cursor: pointer; /* 클릭 가능 표시 */
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

const ModalContent = styled(motion.video)`
  width: auto; /* 모달의 비디오 크기 조정 */
  height: 700px;
  border-radius: 20px;
`;

const Video = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  const handleVideoClick = (videoSrc) => {
    setCurrentVideo(videoSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo("");
  };

  return (
    <>
      <VideoList>
        {videoData.map((video) => (
          <Videos
            key={video.id}
            onClick={() => handleVideoClick(video.src)}
            controls
            autoPlay
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </Videos>
        ))}
      </VideoList>

      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              controls
              autoPlay
            >
              <source src={currentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Video;
