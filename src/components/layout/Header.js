import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../../configs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Wrapper = styled.main`
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  position: fixed;
  z-index: 100;
  @media screen and (max-width: 1240px) {
    justify-content: start;
  }
`;

const KakaoLogo = styled.div`
  width: 200px;
  height: 60px;
`;

const AddStoryButton = styled.button`
  background: ${({ theme }) => theme.addStoryColor};
  border: none;
  border-radius: 40px;
  cursor: pointer;
  padding: 10px 20px;
`;

const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.bgColor};
  padding: 10px;
  border-radius: 20px;
  width: 500px;
  height: 330px;
  text-align: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 254px;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
`;

const FileInput = styled.input`
  display: none; // Hide the default file input
`;

const SubmitButton = styled.button`
  background: #fae100;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

const CameraIcon = styled.i`
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.fontColor};
`;

const MusicIcon = styled.i`
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.fontColor};
`;

const LinkIcon = styled.i`
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.fontColor};
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null); // Ref for file input

  const maxFileSize = 7 * 1024 * 1024;

  const onChange = (e) => {
    setPost(e.target.value);
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > maxFileSize) {
        alert("The Maximum Capacity that can be uploaded is 5MB!");
        return;
      }
      setFile(files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || post === "" || post.length > 180) return;

    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "contents"), {
        post,
        createdAt: Date.now(),
        username: user?.displayName || "Anonymous",
        userId: user.uid,
      });

      if (file) {
        const locationRef = ref(storage, `contents/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        const fileType = file.type;

        if (fileType.startsWith("image/")) {
          await updateDoc(doc, {
            photo: url,
          });
        }

        if (fileType.startsWith("video/")) {
          await updateDoc(doc, {
            video: url,
          });
        }
      }
      setPost("");
      setFile(null);
      setIsModalOpen(false); // Close modal after submission
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel function to close the modal without submitting
  const handleCancel = () => {
    setPost("");
    setFile(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Wrapper>
        <KakaoLogo src={process.env.PUBLIC_URL + `/kakaoLogo.png`} />
        <AddStoryButton onClick={() => setIsModalOpen(true)}>
          오늘의 이야기를 들려주세요.
        </AddStoryButton>
      </Wrapper>

      <Overlay isOpen={isModalOpen}>
        <Modal>
          <TextArea
            onChange={onChange}
            value={post}
            placeholder="오늘의 이야기를 들려주세요"
            required
          />
          <CameraIcon
            className="fa-solid fa-camera"
            onClick={() => fileInputRef.current.click()} // Open file input on click
          />
          <MusicIcon
            className="fa-solid fa-music"
            onClick={() => fileInputRef.current.click()} // Open file input on click
          />
          <LinkIcon
            className="fa-solid fa-link"
            onClick={() => fileInputRef.current.click()} // Open file input on click
          />
          <FileInput
            type="file"
            accept="video/*, image/*"
            ref={fileInputRef} // Attach the ref to the file input
            onChange={onFileChange}
          />
          <SubmitButton onClick={onSubmit} disabled={isLoading}>
            {isLoading ? "Uploading..." : "Submit"}
          </SubmitButton>
          <button onClick={handleCancel}>올리기</button>{" "}
          {/* Cancel button functionality */}
        </Modal>
      </Overlay>
    </>
  );
};

export default Header;
