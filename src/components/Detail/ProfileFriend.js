import React from "react";
import styled from "styled-components";

const FriendWrapper = styled.div`
  min-width: 230px;
  height: 400px;
  position: sticky;
  top: 100px;
  padding: 30px 20px 20px;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border-radius: 20px;
  h5 {
    font-size: 18px;
    text-align: center;
    letter-spacing: -1px;
    font-weight: 400;
    margin-bottom: 30px;
  }
  ul {
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    gap: 20px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .friendInfo {
        display: flex;
        gap: 10px;
        align-items: center;
        > div {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ddd;
        }
      }
      .onoff {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--point-color);
      }
      .followBtn {
        display: none;
      }
    }
  }
  @media screen and (max-width: 1600px) {
    display: none;
  }
  @media screen and (max-width: 768px) {
    display: block;
    margin-top: 30px;
    height: fit-content;
    h5 {
      text-align: start;
    }
    ul {
      flex-direction: row;
      justify-content: space-between;
      li {
        flex-direction: column;
        gap: 10px;
        .friendInfo {
          flex-direction: column;
        }
        .onoff {
          display: none;
        }
        .followBtn {
          display: block;
          padding: 6px 10px;
          font-size: 12px;
          background: var(--point-color);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
`;

const ProfileFriend = () => {
  return (
    <FriendWrapper>
      <h5>추천친구</h5>
      <ul>
        <li>
          <div className="friendInfo">
            <div>
              <img />
            </div>
            <p>송채영</p>
          </div>
          <div className="onoff"></div>
          <div className="followBtn">팔로우</div>
        </li>
        <li>
          <div className="friendInfo">
            <div>
              <img />
            </div>
            <p>송채영</p>
          </div>
          <div className="onoff"></div>
          <div className="followBtn">팔로우</div>
        </li>
        <li>
          <div className="friendInfo">
            <div>
              <img />
            </div>
            <p>송채영</p>
          </div>
          <div className="onoff"></div>
          <div className="followBtn">팔로우</div>
        </li>
        <li>
          <div className="friendInfo">
            <div>
              <img />
            </div>
            <p>송채영</p>
          </div>
          <div className="onoff"></div>
          <div className="followBtn">팔로우</div>
        </li>
        <li>
          <div className="friendInfo">
            <div>
              <img />
            </div>
            <p>송채영</p>
          </div>
          <div className="onoff"></div>
          <div className="followBtn">팔로우</div>
        </li>
      </ul>
    </FriendWrapper>
  );
};

export default ProfileFriend;
