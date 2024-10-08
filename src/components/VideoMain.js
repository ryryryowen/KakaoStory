import React from "react";
import styled from "styled-components";

const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  position: absolute;
  right: -50px;
`;

const Video = styled.video`
  width: 250px;
  height: 370px;
  background: #eee;
  border-radius: 20px;
`;

function VideoMain() {
  return (
    <VideoList>
      <Video />
      <Video />
    </VideoList>
  );
}

export default VideoMain;
