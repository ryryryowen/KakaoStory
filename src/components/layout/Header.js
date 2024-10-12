import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef } from "react";
import {
  addDoc,
  collection,
  updateDoc,
  FirestoreError,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
const Wrapper = styled.main`
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.bgColor};
  display: flex;
  align-items: center;
  padding: 10px;
  position: fixed;
  z-index: 100;
`;
const HeaderMain = styled.div`
  width: 430px;
  display: flex;
  align-items: center;
`;
const KakaoLogo = styled.div`
  width: 200px;
  height: 60px;
  cursor: pointer;
  background: url(${"/kakaoLgo/kakaoLight.png"}) center/cover;
`;
const SearchBarHeader = styled.input`
  width: 220px;
  height: 35px;
  border: none;
  border-radius: 24px;
  background: #fbfbfb;
  padding-left: 10px;
  &:focus {
    outline: none;
    & ~ span {
      opacity: 0;
    }
  }
  @media screen and (max-width: 1080px) {
    display: none;
  }
`;
const SearchBarHeaderValue = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  left: 220px;
  @media screen and (max-width: 1080px) {
    display: none;
  }
`;
const LeftIconHeader = styled.div`
  display: flex;
  gap: 15px;
  position: absolute;
  right: 15px;
  button {
    border: none;
    background: none;
    cursor: pointer;
    color: ${({ theme }) => theme.fontColor};
    &:hover {
      color: #fae100;
      cursor: pointer;
    }
  }
`;
const AddStoryHeader = styled.button`
  width: 500px;
  height: 45px;
  border: none;
  border-radius: 40px;
  font-size: 1rem;
  position: absolute;
  left: 50%;
  background: ${({ theme }) => theme.addStoryColor};
  transform: translate(-50%);
  cursor: pointer;
  @media screen and (max-width: 1760px) {
    left: 60%;
  }
  @media screen and (max-width: 1390px) {
    left: 65%;
  }
  @media screen and (max-width: 1080px) {
    left: 55%;
    width: 430px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  width: 100%;
  height: 100%;
  position: absolute;
  background: none;
  justify-content: center;
  align-items: center;
  top: 0;
`;
const Box = styled.textarea`
  background: ${({ theme }) => theme.bgColor};
  padding: 10px;
  border-radius: 20px;
  width: 500px;
  height: 250px;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-radius: 40px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid #fae100;
  font-size: 18px;
  font-style: "kakaobig";
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 30px 170px;
  z-index: 100;
  padding-top: 20px;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 1760px) {
    left: 60%;
  }
  @media screen and (max-width: 1390px) {
    left: 65%;
  }
  @media screen and (max-width: 1080px) {
    left: 55%;
    width: 430px;
  }
`;
const HeaderAddStroyOptions = styled.div`
  width: 500px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 265px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 30px;
  z-index: 100;
  @media screen and (max-width: 1760px) {
    left: 60%;
  }
  @media screen and (max-width: 1390px) {
    left: 65%;
  }
  @media screen and (max-width: 1080px) {
    left: 55%;
    width: 430px;
  }
`;
const HeaderAddStoryIcons = styled.div`
  width: 132px;
  height: 25px;
  display: flex;
  gap: 30px;
  padding-top: 6px;
  i {
    width: 25px;
    height: 25px;
    color: ${({ theme }) => theme.fontColor};
    &:hover {
      color: #fae100;
      cursor: pointer;
    }
  }
`;
const HeaderAddStoryButtons = styled.div`
  width: 150px;
  height: 30px;
  display: flex;
  gap: 10px;
  button {
    width: 70px;
    height: 30px;
    &:hover {
      cursor: pointer;
    }
  }
`;
const CancelAddStoryButton = styled.button`
  background: none;
  border: 1px solid #ccc;
  color: #ccc;
  &:hover {
    border: 1px solid #eee;
  }
`;
const UploadAddStoryButton = styled.button`
  background: #fae100;
  border: none;
  color: #fff;
`;
const Closebutton = styled.button`
  width: 70px;
  height: 30px;
  background: #ccc;
  color: #fff;
  border: none;
  font-size: 14px;
`;
const FileInput = styled.input`
  display: none; // 숨기기
`;
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const maxFileSize = 7 * 1024 * 1024;
  const onChange = (e) => {
    setPost(e.target.value);
  };
  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > maxFileSize) {
        alert("업로드할 수 있는 최대 용량은 7MB입니다!");
        return;
      }
      setFile(files[0]);
    }
  };
  const onSubmit = async (e) => {
    const user = auth.currentUser;
    console.log(user);
    e.preventDefault();
    if (isLoading || post === "" || post.length > 180) return;
    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(db, "contents"), {
        post,
        createdAt: Date.now(),
      });
      if (file) {
        const locationRef = ref(
          storage,
          `contents/I1dO5nloejTIesBcTUuf/${docRef.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        const fileType = file.type;
        if (fileType.startsWith("image/")) {
          await updateDoc(docRef, { photo: url });
        } else if (fileType.startsWith("video/")) {
          await updateDoc(docRef, { video: url });
        }
      }
      setPost("");
      setFile(null);
      setIsModalOpen(false);
    } catch (e) {
      if (e instanceof FirestoreError) {
        console.error(e);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setPost("");
    setFile(null);
    setIsModalOpen(false);
  };
  return (
    <Wrapper>
      <HeaderMain>
        <KakaoLogo />
        <SearchBarHeader type="text" id="searchBarHeader" />
        <SearchBarHeaderValue>
          <i className="fa-solid fa-magnifying-glass"></i>검색
        </SearchBarHeaderValue>
      </HeaderMain>
      <AddStoryHeader onClick={() => setIsModalOpen(true)}>
        오늘의 스토리를 들려주세요.
      </AddStoryHeader>
      <Overlay isOpen={isModalOpen}>
        <Box
          onChange={onChange}
          value={post}
          placeholder="오늘의 이야기를 들려주세요"
          required
        />
        <HeaderAddStroyOptions>
          <HeaderAddStoryIcons>
            <i
              className="fa-solid fa-camera"
              onClick={() => fileInputRef.current.click()}
            ></i>
            <i className="fa-solid fa-music"></i>
            <i className="fa-solid fa-link"></i>
          </HeaderAddStoryIcons>
          <HeaderAddStoryButtons>
            <CancelAddStoryButton onClick={handleCancel}>
              취소
            </CancelAddStoryButton>
            <UploadAddStoryButton onClick={onSubmit} disabled={isLoading}>
              {isLoading ? "업로드 중..." : "올리기"}
            </UploadAddStoryButton>
          </HeaderAddStoryButtons>
        </HeaderAddStroyOptions>
        <FileInput
          type="file"
          accept="video/*, image/*"
          ref={fileInputRef}
          onChange={onFileChange}
        />
      </Overlay>
      <LeftIconHeader>
        <button>
          <i className="fa-solid fa-user-group"></i>
        </button>
        <button>
          <i className="fa-regular fa-bell"></i>
        </button>
        <button>
          <i className="fa-regular fa-circle-user"></i>
        </button>
      </LeftIconHeader>
    </Wrapper>
  );
};
export default Header;
