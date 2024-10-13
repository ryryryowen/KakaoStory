import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// 모달 스타일
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 350px;
  height: 90vh;
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StoryXMark = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 1.3rem;
  color: #fff;
`;

const StoryTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StoryMiddleRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  border: 1px solid;
`;

const StoryBottomRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StoryUserNames = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 100;
`;

const StoryImg = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #eee;
  border: 1px solid #ffe900;
  z-index: 100;
`;

const StoryUserName = styled.div`
  z-index: 100;
`;

const StoryTopRowItems = styled.div`
  display: flex;
  gap: 20px;
  z-index: 100;
`;

const StoryTextarea = styled.input`
  padding: 10px 75px 10px 15px;
  border-radius: 20px;
  z-index: 100;
`;

const Wrapper = styled.div`
  width: 950px;
  height: 150px;
  overflow: hidden; /* 콘텐츠가 영역을 넘어가면 숨김 */
  display: flex;
  align-items: center;
`;

const StoryListMain = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 44px;
`;

const Story = styled(motion.div)`
  display: flex;
  flex-direction: column; /* 수직 방향으로 배치 */
  align-items: center; /* 가운데 정렬 */
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #eee;
  border: 2px solid #ffe900;
  margin-right: 10px; /* 간격 설정 */
  cursor: pointer;

  span {
    margin-top: 85px; /* 아이템과 이름 간격 */
    font-size: 14px; /* 글자 크기 */
    text-align: center; /* 가운데 정렬 */
    color: ${({ theme }) => theme.fontColor};
  }
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

function StoryMain() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 8; // 한 페이지에 보이는 아이템 수
  const totalItems = StoryArray.length;
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragStartIndex = useRef(0);

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    dragStartIndex.current = currentIndex;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const distance = e.clientX - startX.current;
    const threshold = 200; // 드래그 거리 기준
    const newIndex =
      dragStartIndex.current +
      (distance > threshold ? -1 : distance < -threshold ? 1 : 0);

    // 경계 조건 확인
    if (newIndex >= 0 && newIndex <= totalItems - itemsPerPage) {
      setCurrentIndex(newIndex);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false; // 마우스가 나가면 드래그 종료
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedStory(null);
  };

  return (
    <>
      <Wrapper
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <StoryListMain drag="x" dragConstraints={{ left: -1750, right: 0 }}>
          {StoryArray.map((item) => (
            <Story key={item.id} onClick={() => handleStoryClick(item)}>
              <span>{item.name}</span> {/* 이름 추가 */}
            </Story>
          ))}
        </StoryListMain>
      </Wrapper>

      {modalOpen && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <StoryTopRow>
              <StoryUserNames>
                <StoryImg>{selectedStory.Img}</StoryImg>
                <StoryUserName>{selectedStory.name}</StoryUserName>
              </StoryUserNames>
              <StoryTopRowItems>
                <i class="fa-solid fa-volume-xmark"></i>
                <i class="fa-solid fa-ellipsis"></i>
              </StoryTopRowItems>
            </StoryTopRow>
            <StoryMiddleRow></StoryMiddleRow>
            <StoryBottomRow>
              <StoryTextarea
                placeholder={`${selectedStory.name}님에게 답장하기`}
              />
              <i class="fa-regular fa-heart"></i>
              <i class="fa-regular fa-paper-plane"></i>
            </StoryBottomRow>
          </ModalContent>
          <StoryXMark onClick={closeModal}>
            <i class="fa-solid fa-xmark"></i>
          </StoryXMark>
        </Modal>
      )}
    </>
  );
}

export default StoryMain;
