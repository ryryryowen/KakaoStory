import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyProfileInfo from "../components/Detail/MyProfileInfo";
import PostList from "../components/Main/PostList";
import MobileProfile from "../components/Detail/MobileProfile";
import ProfileFriend from "../components/Detail/ProfileFriend";
import { db, userAuth } from "../configs/firebase";
import { updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import PostCard from "../components/Main/PostCard";
import PostForm from "../components/Main/PostForm";
import Post from "../components/Main/Post";

const Wrapper = styled.div`
  /* padding-left: 100px; */
  padding-left: 50px;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.bgSubColor};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  padding-bottom: 50px;
`;

const BgImgContainer = styled.div`
  background: #ddd;
  width: 100%;
  /* width: calc(100vw - 100px); */
  height: 400px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 30px;
  height: 100%;
  position: relative;
  margin: 0 auto;
  @media screen and (max-width: 1300px) {
    /* width: 100%; */
    flex-direction: column-reverse;
    /* justify-content: end; */
  }
`;

const PostcardWrapper = styled.div`
  /* width: 1084px; */
  width: 950px;
  height: fit-content;
  margin: 0 auto;
  /* padding: 50px 0; */
  /* background: #fff; */
`;

const ProfileWrapper = styled.div`
  position: sticky;
  top: 100px;
  width: 50%;
  margin-top: -250px;
  width: fit-content;
  height: fit-content;
  @media screen and (max-width: 1300px) {
    position: static;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    /* align-self: flex-end; */
    /* margin-left: auto; */
  }
`;

export const UserInfo = React.createContext();

const MyProfile = () => {
  const [mobileSize, setMobileSize] = useState(false);
  const user = userAuth.currentUser;

  const [userInfo, setUserInfo] = useState({
    name: user.displayName || initName,
    userPhoto: user?.photoURL || null,
    bgImg: null,
    userBio: null,
    gender: null,
    birthday: "",
    displayProfile: false,
    email: user?.email || null,
    createdAt: new Date(),
    userId: user?.uid,
  });

  const initName = user.email.split("@")[0];
  const [post, setPost] = useState([]);

  useEffect(() => {
    const saveUserInfo = async () => {
      if (!user) return;
      try {
        const userDocRef = doc(db, `users`, user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            name: user.displayName || initName,
            userPhoto: user.photoURL || "",
            bgImg: userInfo.bgImg,
            userBio: userInfo.userBio,
            gender: null,
            birthday: null,
            displayProfile: false,
            email: user.email,
            createdAt: new Date(),
            userId: user.uid,
          });
          setUserInfo({
            ...userInfo,
            name: user.displayName || initName,
            userId: user.uid,
          });
        } else {
          setUserInfo(userDoc.data());
        }
      } catch (err) {
        console.error("유저 데이터 로드 에러 =>", err);
      }
    };

    if (user) saveUserInfo();
  }, [user]);

  const updateUserInfo = async () => {
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      const initInfo = await getDoc(userDocRef);

      if (!initInfo.exists()) throw new Error("해당 유저 문서 없음");

      const userData = initInfo.data();
      // console.log("데이터 도착", userData);
      if (userData) {
        const updateData = {
          name: userInfo.name,
          userPhoto: userInfo.userPhoto,
          bgImg: userInfo.bgImg,
          userBio: userInfo.userBio,
          gender: userInfo.gender,
          birthday: userInfo.birthday,
          displayProfile: userInfo.displayProfile,
          email: user.email,
          createdAt: userInfo.createdAt,
          userID: user.uid,
        };

        await updateDoc(userDocRef, updateData);

        await updateProfile(user, {
          displayName: userInfo.name,
          photoURL: userInfo.userPhoto,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    updateUserInfo();
  }, [userInfo]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      try {
        const postQuery = query(
          collection(db, "contents"),
          where("postId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(postQuery);

        if (snapshot.empty) {
          console.log("게시물이 없습니다.");
          return;
        }

        const unsubscribe = onSnapshot(postQuery, (snapshot) => {
          const posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPost(posts);
        });

        return () => {
          unsubscribe && unsubscribe();
        };
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  const updateSize = (e) => {
    if (e.target.innerWidth <= 768) setMobileSize(true);
    else setMobileSize(false);
  };

  useEffect(() => {
    window.innerWidth <= 768 ? setMobileSize(true) : setMobileSize(false);
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <>
      {mobileSize ? (
        <MobileProfile userInfo={userInfo} setUserInfo={setUserInfo} />
      ) : (
        <Wrapper>
          <BgImgContainer>
            <img src={userInfo?.bgImg} />
          </BgImgContainer>
          <ContentWrapper>
            <ProfileFriend />
            <PostcardWrapper>
              {post.map((postData) => (
                <Post key={postData.id} postData={postData} />
              ))}
              {/* <Post postData={post} /> */}
            </PostcardWrapper>
            <ProfileWrapper>
              <MyProfileInfo userInfo={userInfo} setUserInfo={setUserInfo} />
            </ProfileWrapper>
          </ContentWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default MyProfile;
