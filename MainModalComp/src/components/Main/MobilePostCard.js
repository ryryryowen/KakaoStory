import React, { Component, useState } from "react";
import styled from "styled-components";
import PostFormM from "./MobilePostForm";
import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  background: ${({ theme }) => theme.bgColor};
  position: relative;
`;

const Container = styled.div`
  width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: hidden;
`;

const ContentBox = styled.div`
  width: 370px;
  height: 420px;
  overflow: hidden;
  border-radius: 15px;
  color: ${({ theme }) => theme.fontColor};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

// 모달
const Modal = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const StoryArray = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
  { id: 5, name: "Eve" },
  { id: 6, name: "Frank" },
  { id: 7, name: "Grace" },
  { id: 8, name: "Hannah" },
  { id: 9, name: "Ian" },
  { id: 10, name: "Jack" },
  { id: 11, name: "Kathy" },
  { id: 12, name: "Leo" },
  { id: 13, name: "Mona" },
  { id: 14, name: "Nina" },
  { id: 15, name: "Oscar" },
  { id: 16, name: "Paul" },
  { id: 17, name: "Quinn" },
  { id: 18, name: "Rachel" },
  { id: 19, name: "Steve" },
  { id: 20, name: "Tina" },
];

const StoryListMainMobile = styled(motion.div)`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 13px;
  margin: 20px 5px 0 5px;
`;
const StoryMainMobile = styled.div`
  width: 50px;
  height: 90px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 10px;
  padding-left: 10px;
`;
const StoryImgMobile = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 1.8px solid #fae100;
  border-radius: 50%;
  cursor: pointer;
`;
const SotryDescMobile = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.fontColor};
  padding-top: none;
  padding-left: 3px;
  text-align: center;
`;

const Shorts = styled(motion.div)`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const ShortsLogo = styled.div`
  width: 100px;
  height: 30px;
  background: url(${"/kakaoLgo/shortsLight.png"});
  cursor: pointer;
`;
const ShortsContent = styled(motion.div)`
  width: 100000px;
  display: flex;
  gap: 20px;
`;

const ShortsVideo = styled.video`
  width: 200px;
  height: 300px;
  background: #d9d9d9;
  border-radius: 15px;
  object-fit: cover;
  cursor: pointer;
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

const Box = styled(motion.div)`
  position: absolute;
  width: 500px;
`;

const Gototop = styled.a`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fae100;
  color: #fff;
  font-size: 30px;
  text-align: center;
  line-height: 50px;
  position: fixed;
  top: 85%;
  right: 10px;
  opacity: 0;
  transition: all 0.3s;
  z-index: 100;
  &.active {
    opacity: 1;
    bottom: 20px;
  }
`;

const TestBox = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 700px;
  background: #fff;
  border-radius: 40px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const PostCard = () => {
  const [id, setId] = useState(false);
  console.log(id);
  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedStory(null);
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setModalOpen(true);
  };

  return (
    <Wrapper>
      <Container>
        <StoryListMainMobile
          drag="x"
          dragConstraints={{ left: -650, right: 0 }}
        >
          {StoryArray.map((item) => (
            <StoryImgMobile
              key={item.id}
              onClick={() => handleStoryClick(item)}
            >
              {item.id}
              <span>{item.name}</span> {/* 이름 추가 */}
            </StoryImgMobile>
          ))}
          {/* <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile> 채령</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile> 채채</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>는</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>멋쪄</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile>
          <StoryMainMobile>
            <StoryImgMobile />
            <SotryDescMobile>lovely</SotryDescMobile>
          </StoryMainMobile> */}
        </StoryListMainMobile>
        <ContentBox>
          <Shorts>
            <ShortsLogo />
            <ShortsContent drag="x" dragConstraints={{ left: -1400, right: 0 }}>
              <ShortsVideo
                src={"/KakaoTalk_20241007_174940364.mp4"}
                autoPlay
                muted
              />
              <ShortsVideo
                src="/KakaoTalk_20241007_174924211.mp4"
                autoPlay
                muted
              />
              <ShortsVideo
                src="KakaoTalk_20241007_183824958.mp4"
                autoPlay
                muted
              />
              <ShortsVideo
                src="KakaoTalk_20241007_183908468.mp4"
                autoPlay
                muted
              />
              <ShortsVideo
                src="KakaoTalk_20241007_183943700.mp4"
                autoPlay
                muted
              />
              <ShortsVideo
                src="KakaoTalk_20241007_184013499.mp4"
                autoPlay
                muted
              />
              <ShortsVideo
                src="KakaoTalk_20241007_184041146.mp4"
                autoPlay
                muted
              />
              <ShortsVideo
                src="KakaoTalk_20241007_185034048.mp4"
                autoPlay
                muted
              />
            </ShortsContent>
          </Shorts>
        </ContentBox>
        {testArr.map((item, index) => (
          <PostFormM
            key={index + 1}
            onClick={() => setId(index + 1)}
            layoutId={index + 1}
          />
        ))}
        <AnimatePresence>
          {id ? (
            <Overlay
              onClick={() => setId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TestBox layoutId={id} style={{ width: 400, height: 500 }} />
            </Overlay>
          ) : null}
        </AnimatePresence>
        <Gototop className="active" href="#">
          <i class="fa-solid fa-chevron-up"></i>
        </Gototop>

        {modalOpen && (
          <Modal onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>{selectedStory.name}</h2>
              <p>아이디: {selectedStory.id}</p>
              <button onClick={closeModal}>닫기</button>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </Wrapper>
  );
};

export default PostCard;
