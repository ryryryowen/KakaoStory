import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 950px;
  height: 400px;
  padding: 25px 40px 25px 25px;
`;

const ContainerBox = styled.div`
  display: flex;
  gap: 53px;
`;

const Images = styled.div`
  width: 350px;
  height: 350px;
  background: #efefef;
  border-radius: 20px;
`;

const Text = styled.div`
  width: 450px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  width: 482px;
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
`;

const NameText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Day = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const FormText = styled.div`
  width: 482px;
  height: 350px;
  padding-bottom: 33px;
  font-size: 16px;
`;

const Icons = styled.div`
  width: 482px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Heart = styled.i`
  width: 28px;
  height: 28px;
`;

const Icon = styled.div`
  display: flex;
  gap: 20px;
`;

const Comments = styled.div`
  width: 482px;
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

const CommentBox = styled.div`
  width: 420px;
  height: 50px;
  background: #efefef;
  border-radius: 15px;
`;

const CommentIcon = styled.div`
  width: 450px;
  height: 50px;
  display: flex;
  gap: 10px;
  position: relative;
`;

const Link = styled.i`
  position: absolute;
  top: 35%;
  right: 60px;
`;

const Image = styled.i`
  position: absolute;
  top: 35%;
  right: 30px;
`;

const PostForm = () => {
  return (
    <Wrapper>
      <Container>
        <ContainerBox>
          <Images></Images>
          <Text>
            <Name>
              <Names>
                <NameImage></NameImage>
                <NameText>lorem</NameText>
              </Names>
              <Day>Thu 2024.09.14</Day>
            </Name>
            <FormText>
              <p>텍스트입니다텍스트입니다텍스트입니다 우헤헤헤헤</p>
            </FormText>
            <Icons>
              <Icon>
                <Heart className="fa-solid fa-heart"></Heart>
                <i className="fa-regular fa-comment"></i>
                <i class="fa-regular fa-paper-plane"></i>
              </Icon>
              <div>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </Icons>
            <Comments>
              <Comment>
                <CommentImage></CommentImage>
                <CommentBox></CommentBox>
              </Comment>
              <CommentIcon>
                <Link className="fa-solid fa-link"></Link>
                <Image className="fa-regular fa-image"></Image>
              </CommentIcon>
            </Comments>
          </Text>
        </ContainerBox>
      </Container>
    </Wrapper>
  );
};

export default PostForm;
