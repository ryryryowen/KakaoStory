import React from "react";
import styled from "styled-components";
import { mixins } from "../../styles/GlobalStyles.styles";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  border: 1px solid #000;
  border-radius: 26px 26px 0 0;
  z-index: 100;
  ${mixins.flex({})}
  .iconsWrapper {
    width: 390px;
    padding: 0 10px;
    ${mixins.flex({
      justify: "space-around",
      gap: "0",
    })}
    .icon {
      width: 40px;
      height: 40px;
      ${mixins.flex({})}
      cursor: pointer;
      > span {
        font-size: 40px;
        color: ${({ theme }) => theme.fontColor};
      }
      &.plusIcon {
        width: 70px;
        height: 70px;
        transform: translateY(-20px);
        background: var(--point-color);
        border: 4px solid ${({ theme }) => theme.bgColor};
        border-radius: 50%;
        > span {
        }
      }
    }
  }
`;

const MobileSidebar = () => {
  return (
    <Wrapper $flexProps>
      <div className="iconsWrapper">
        <div className="icon">
          <span className="material-symbols-outlined">home</span>
        </div>
        <div className="icon">
          <span className="material-symbols-outlined">shopping_bag</span>
        </div>
        <div className="icon plusIcon">
          <span className="material-symbols-outlined">add</span>
        </div>
        <div className="icon">
          <span className="material-symbols-outlined">
            local_fire_department
          </span>
        </div>
        <div className="icon">
          <span className="material-symbols-outlined">menu</span>
        </div>
      </div>
    </Wrapper>
  );
};
export default MobileSidebar;
