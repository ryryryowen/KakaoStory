import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  /* reset */

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul, li{
    list-style: none;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

  /* Variables */

  :root{
    --point-color: #FFE900;
    --main-light-gray: #EFEFEF;
    --main-gray: #999999;
    --main-dark: #000000;
    --main-light-dark: #222222;
    --main-white: #FFFFFF;
    --kakao-big-bold: "kakaoBigBold";
    --kakao-big-regular: "kakaoBigRegular";
    --kakao-small-bold: "kakaoSmallBold";
    --kakao-small-regular: "kakaoSmallRegular";
    --pretendard: "Pretendard Variable";
  }
`;

export const mixins = {
  flex: (flexProps) => `
    display: flex;
    justify-content: ${flexProps?.justify ?? "center"};
    align-items: ${flexProps?.align ?? "center"};
    flex-direction: ${flexProps?.direction ?? "row"};
    gap: ${flexProps?.gap ?? "14"}px;
  `,
  border: (borderProps) => `
    border: ${borderProps?.width ?? "1"}px ${borderProps?.type ?? "solid"} ${
    borderProps?.color ?? "red"
  };
  `,
  focus: () => `
  &:focus{
    outline:none;
  }
  `,
};
