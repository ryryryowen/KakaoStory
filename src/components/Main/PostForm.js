import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../configs/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import Post from "./Post";

const Wrapper = styled.div`
  width: 100%;
`;

const PostForm = ({ openModal }) => {
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

  return (
    <Wrapper>
      {posts.map((postData) => (
        <Post key={postData.id} postData={postData} openModal={openModal} />
      ))}
    </Wrapper>
  );
};

export default PostForm;
