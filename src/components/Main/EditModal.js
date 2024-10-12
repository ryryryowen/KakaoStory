import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div``;

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditModal = styled.div`
  width: 80%;
  height: 70%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const TopBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  border-bottom: 1px solid #f1f1f1;
`;

const ButtonBar = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const EditImg = styled.div`
  width: 65%;
  height: 63vh;
  border-right: 2px solid #f1f1f1;
  @media screen and (max-width: 768px) {
    border: none;
    width: 100%;
    height: 45vh;
    border: 1px solid #f00;
  }
`;

const EditDesc = styled.div`
  width: 35%;
  height: 63vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media screen and (max-width: 768px) {
    border: none;
    width: 100%;
    height: 43vh;
  }
`;

const EditNames = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;
const EditUserImg = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #f00;
`;
const EditUserName = styled.div`
  font-size: 1rem;
  color: #000;
  padding: 10px;
`;

const EditTextArea = styled.textarea`
  height: 200px;
  padding: 10px;
  border: none;
`;

const EditEmotion = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  padding: 7px;
  i {
    color: #777;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const EditCount = styled.div`
  color: #777;
`;

const EditLocation = styled.div`
  display: flex;
  justify-content: space-between;
  color: #777;
  padding: 0 14px 0 7px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const EditComponent = styled.div`
  display: flex;
  justify-content: space-between;
  color: #777;
  padding: 0 7px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const EditAccess = styled.div`
  display: flex;
  justify-content: space-between;
  color: #000;
  font-weight: 600;
  padding: 0 10px 7px 7px;
  i {
    color: #777;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const EditButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CancelButton = styled.button`
  border: none;
  padding: 7px 25px;
`;

const CompleteButton = styled.button`
  border: none;
  padding: 7px 25px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 25px;
  right: 20px;
  font-size: 25px;
  color: #fff;
`;

function EditModalPostform() {
  return (
    <Wrapper>
      <Overlay>
        <EditModal>
          <TopBar>
            <div>정보수정</div>
          </TopBar>
          <ButtonBar>
            <EditImg />
            <EditDesc>
              <EditNames>
                <EditUserImg />
                <EditUserName>1am_young</EditUserName>
              </EditNames>
              <EditTextArea>떼굴떼굴 굴러가는 자택경비원의 일상..</EditTextArea>
              <EditButtons>
                <CancelButton>취소</CancelButton>
                <CompleteButton>완료</CompleteButton>
              </EditButtons>
              <EditEmotion>
                <i class="fa-regular fa-face-smile"></i>
                <EditCount>0/2200</EditCount>
              </EditEmotion>
              <EditLocation>
                위치추가
                <i class="fa-solid fa-location-dot"></i>
              </EditLocation>
              <EditComponent>
                공동 작업자 추가
                <i class="fa-solid fa-user-plus"></i>
              </EditComponent>
              <EditAccess>
                접근성
                <i class="fa-solid fa-chevron-down"></i>
              </EditAccess>
            </EditDesc>
          </ButtonBar>
        </EditModal>
        <DeleteButton>
          <i class="fa-solid fa-xmark"></i>
        </DeleteButton>
      </Overlay>
    </Wrapper>
  );
}

export default EditModalPostform;
