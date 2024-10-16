import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../../firebase";
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
  margin-top: 230px;
  margin-right: 10px;
  margin-bottom: 30px;
  background: ${({ theme }) => theme.bgMainColor};
  @media (max-width: 1390px) {
    display: none;
  }
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

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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

const Commentt = styled.i`
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 24px;
  color: white;
  cursor: pointer;
  z-index: 1;
  &:hover {
    color: #ffe900;
  }
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

const ProgressBarContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  width: 90%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: #ffe900;
  transition: width 0.5s ease;
`;

const CommentText = styled(motion.p)`
  margin: 0;
  position: relative;
`;

const VideoText = styled.div`
  position: absolute;
  bottom: 150px;
  left: 30px;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState("");
  const videoRef = useRef(null);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

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
      await updateDoc(videoDocRef, {
        comments: arrayUnion(inputValue),
      });

      // 댓글 목록 업데이트
      setComments((prev) => {
        const newComments = [...prev, inputValue];
        if (newComments.length > 5) {
          newComments.shift(); // 6개 초과 시 가장 오래된 댓글 제거
        }
        return newComments;
      });

      setInputValue("");
    }
  };

  useEffect(() => {
    const playVideo = async () => {
      if (isModalOpen && videoRef.current) {
        videoRef.current.currentTime = 0;
        try {
          await videoRef.current.play();
        } catch (error) {
          console.error("Error playing video:", error);
        }
      }
    };

    playVideo();

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isModalOpen, currentVideo]);

  useEffect(() => {
    if (videoRef.current) {
      const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
      };

      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
      videoRef.current.addEventListener("loadedmetadata", () => {
        setVideoDuration(videoRef.current.duration);
      });

      return () => {
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [isModalOpen]);

  const progressBarWidth = (currentTime / videoDuration) * 100;

  return (
    <>
      <VideoList>
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideosContainer key={video.id}>
              <Videos
                loop
                onClick={() => handleVideoClick(video)}
                onMouseEnter={() => setHoveredVideoId(video.id)}
                onMouseLeave={() => setHoveredVideoId(null)}
                controls={false}
                poster={video.poster}
              >
                <source src={video.src} type="video/mp4" />
              </Videos>

              {!isModalOpen && (
                <PlayButton
                  show={hoveredVideoId === video.id}
                  onClick={() => videoRef.current.play()}
                >
                  ▶
                </PlayButton>
              )}
            </VideosContainer>
          ))
        ) : (
          <></>
        )}
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
            >
              <VideoElement ref={videoRef} controls loop>
                <source src={currentVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </VideoElement>
              <Commentt
                className="fa-regular fa-comment"
                onClick={(e) => e.stopPropagation()}
              />
              <form onSubmit={handleCommentSubmit}>
                <Videocomment
                  value={inputValue}
                  type="text"
                  placeholder="댓글 입력..."
                  onChange={handleCommentChange}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCommentSubmit(e);
                    }
                  }}
                />
                <button type="submit" style={{ display: "none" }} />
              </form>
              <ProgressBarContainer>
                <ProgressBar style={{ width: `${progressBarWidth}%` }} />
              </ProgressBarContainer>

              <VideoText>
                {comments.map((comment, index) => (
                  <CommentText
                    key={index}
                    style={{ y: index * 25, opacity: 0 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }} // 댓글 제거 시 애니메이션
                  >
                    {comment}
                  </CommentText>
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
