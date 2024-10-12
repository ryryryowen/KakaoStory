import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../configs/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Wrapper = styled.div`
  width: 100%;
`;
const Container = styled.div`
  width: 950px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  transition: all 0.3s;
  background: ${({ theme }) =>
    theme.bgColor === "var(--main-dark)" ? "#222" : theme.bgColor};
  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  }
`;
const ContainerBox = styled.div`
  width: 900px;
  height: 350px;
  display: flex;
  gap: 53px;
`;

const Images = styled.div`
  width: 350px;
  height: 350px;
  background: #efefef;
  border-radius: 20px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 20px;
`;

const Text = styled.div`
  width: 500px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;
  gap: 35px;
`;

const Names = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const NameImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #efefef;
  background-image: url(${(props) => props.profileImage});
  background-size: cover;
  background-position: center;
`;

const NameText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${({ isDarkMode, theme }) => (isDarkMode ? "#fff" : theme.fontColor)};
`;

const Day = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${({ isDarkMode, theme }) => (isDarkMode ? "#fff" : theme.fontColor)};
`;

const FormText = styled.div`
  width: 500px;
  height: 350px;
  padding-bottom: 33px;
  font-size: 16px;
  color: ${({ isDarkMode, theme }) => (isDarkMode ? "#fff" : theme.fontColor)};
`;

const Icons = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  font-size: 20px;
`;

const Icon = styled.div`
  display: flex;
  gap: 14px;
  justify-content: center;
  align-items: center;
`;

const Heart = styled.i`
  color: #ccc;
  &:hover {
    color: #ffe900;
    cursor: pointer;
  }
`;

const IconText = styled.p`
  font-size: 14px;
  color: #ccc;
`;

const Commentt = styled.i`
  color: #ccc;
  &:hover {
    color: #ffe900;
    cursor: pointer;
  }
`;

const Plane = styled.i`
  color: #ccc;
  &:hover {
    color: #ffe900;
    cursor: pointer;
  }
`;

const Ellipsis = styled.i`
  color: #ccc;
  &:hover {
    color: #ffe900;
    cursor: pointer;
  }
`;

const Comments = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`;

const CommentImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #efefef;
`;

const Commentinput = styled.input`
  width: 420px;
  height: 50px;
  background: #efefef;
  border-radius: 15px;
  border: none;
  color: black; /* 기본 색상 */
  text-shadow: none; /* 기본 텍스트 그림자 없음 */
  transition: color 0.2s ease; /* 색상 변화에 애니메이션 추가 */
  padding: 0 90px 0 20px;
  outline: none;
`;

const CommentIcon = styled.div`
  width: 450px;
  height: 50px;
  display: flex;
  gap: 10px;
  position: relative;
`;

const Llink = styled.i`
  position: absolute;
  top: 35%;
  right: 60px;
  color: #666;
  cursor: pointer;
`;

const Img = styled.i`
  position: absolute;
  top: 35%;
  right: 30px;
  color: #666;
  cursor: pointer;
`;
const Slider = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  bottom: 140px;
  right: 0px;
  transition: right 0.3s;
  z-index: 1;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  gap: 10px;
`;

const Editbutton = styled.button`
  border: none;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #ffe900;
  }
`;

const Deletebutton = styled.button`
  border: none;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #ffe900;
  }
`;
const Post = ({ postData, onDelete }) => {
  const { id, username, post, photo } = postData;

  const [isSliderOpen, setSliderOpen] = useState(false);

  const toggleSlider = () => {
    setSliderOpen((prev) => !prev);
  };

  return (
    <Container>
      <ContainerBox>
        <Images>
          {photo && (
            <img
              src={photo}
              alt="Post"
              style={{ width: "100%", height: "100%", borderRadius: "20px" }}
            />
          )}
        </Images>

        <Text>
          <Name>
            <Names>
              <NameImage />

              <NameText>{username}</NameText>
            </Names>

            <Day>Thu 2024.09.14</Day>
          </Name>

          <FormText>
            <p>{post}</p>
          </FormText>

          <Icons>
            <Icon>
              <Heart className="fa-solid fa-heart" />

              <IconText>3,000</IconText>

              <Commentt className="fa-regular fa-comment" />

              <IconText>250</IconText>

              <Plane className="fa-regular fa-paper-plane" />
            </Icon>

            <Ellipsis className="fa-solid fa-ellipsis" onClick={toggleSlider} />
          </Icons>

          <Comments>
            <Comment>
              <CommentImage />

              <Commentinput type="text" placeholder="댓글 입력..." />
            </Comment>

            <CommentIcon>
              <Llink className="fa-solid fa-link" />

              <Img className="fa-regular fa-image" />
            </CommentIcon>
          </Comments>

          <Slider isOpen={isSliderOpen}>
            <Editbutton onClick={() => console.log("Edit post:", postData)}>
              Edit
            </Editbutton>

            <Deletebutton onClick={() => onDelete(id)}>Delete</Deletebutton>
          </Slider>
        </Text>
      </ContainerBox>
    </Container>
  );
};

const PostForm = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsQuery = query(
      collection(db, "contents"),

      orderBy("createdAt", "desc"),

      limit(25)
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));

      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "contents", id));
  };
  return (
    <Wrapper>
      {posts.map((postData) => (
        <Post key={postData.id} postData={postData} onDelete={handleDelete} />
      ))}
    </Wrapper>
  );
};

export default PostForm;
