import React from "react";
import styled from "styled-components";
import { KAKAO_AUTH_URL } from "../configs/kakaologin";
import { mixins } from "../styles/GlobalStyles.styles";

const Button = styled.button`
  width: 100%;
  height: 50px;
  ${mixins.flex({ gap: 10 })};
  background: var(--point-color);
  border-radius: 100px;
  border: none;
  font-family: var(--kakao-big-regular);
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

const KakaoLogin = () => {
  const handleKakaoLogin = async () => {
    window.location.href = KAKAO_AUTH_URL;
    const params = new URLSearchParams();
  };

  return (
    <Button onClick={handleKakaoLogin}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3C17.8 3 22.501 6.664 22.501 11.185C22.501 15.705 17.8 19.369 12.001 19.369C11.4236 19.368 10.8468 19.3312 10.274 19.259L5.86598 22.142C5.36498 22.407 5.18798 22.378 5.39398 21.729L6.28598 18.051C3.40598 16.591 1.50098 14.061 1.50098 11.185C1.50098 6.665 6.20098 3 12.001 3M17.909 11.06L19.379 9.636C19.4638 9.54791 19.5111 9.43033 19.511 9.30804C19.5108 9.18575 19.4632 9.0683 19.3782 8.98041C19.2931 8.89252 19.1773 8.84107 19.0551 8.83689C18.9329 8.83271 18.8138 8.87613 18.723 8.958L16.795 10.824V9.282C16.795 9.15682 16.7452 9.03676 16.6567 8.94825C16.5682 8.85973 16.4482 8.81 16.323 8.81C16.1978 8.81 16.0777 8.85973 15.9892 8.94825C15.9007 9.03676 15.851 9.15682 15.851 9.282V11.839C15.8343 11.9121 15.8343 11.9879 15.851 12.061V13.5C15.851 13.6252 15.9007 13.7452 15.9892 13.8338C16.0777 13.9223 16.1978 13.972 16.323 13.972C16.4482 13.972 16.5682 13.9223 16.6567 13.8338C16.7452 13.7452 16.795 13.6252 16.795 13.5V12.137L17.222 11.724L18.65 13.757C18.6856 13.8078 18.7309 13.851 18.7833 13.8842C18.8357 13.9175 18.8941 13.9401 18.9552 13.9508C19.0163 13.9615 19.0789 13.96 19.1394 13.9465C19.1999 13.933 19.2572 13.9077 19.308 13.872C19.3587 13.8363 19.402 13.791 19.4352 13.7387C19.4685 13.6863 19.4911 13.6279 19.5018 13.5668C19.5124 13.5057 19.511 13.4431 19.4975 13.3826C19.4839 13.322 19.4586 13.2648 19.423 13.214L17.909 11.06ZM14.951 12.984H13.491V9.297C13.4854 9.17571 13.4333 9.06123 13.3455 8.97737C13.2576 8.89351 13.1409 8.84672 13.0195 8.84672C12.8981 8.84672 12.7813 8.89351 12.6935 8.97737C12.6057 9.06123 12.5536 9.17571 12.548 9.297V13.456C12.548 13.716 12.758 13.928 13.019 13.928H14.951C15.0762 13.928 15.1962 13.8783 15.2847 13.7898C15.3732 13.7012 15.423 13.5812 15.423 13.456C15.423 13.3308 15.3732 13.2108 15.2847 13.1222C15.1962 13.0337 15.0762 12.984 14.951 12.984ZM9.09398 11.893L9.78998 10.185L10.428 11.892L9.09398 11.893ZM11.617 12.38L11.619 12.364C11.6186 12.2451 11.5733 12.1308 11.492 12.044L10.446 9.244C10.4021 9.11057 10.3186 8.99369 10.2066 8.90899C10.0945 8.8243 9.95931 8.7758 9.81898 8.77C9.67774 8.76994 9.53979 8.81259 9.42325 8.89237C9.30671 8.97215 9.21702 9.08531 9.16598 9.217L7.50398 13.292C7.45664 13.4079 7.45727 13.5379 7.50575 13.6533C7.55423 13.7687 7.64658 13.8602 7.76248 13.9075C7.87838 13.9548 8.00834 13.9542 8.12376 13.9057C8.23919 13.8572 8.33064 13.7649 8.37798 13.649L8.70998 12.836H10.78L11.078 13.636C11.0983 13.6958 11.1304 13.7509 11.1724 13.7981C11.2145 13.8452 11.2655 13.8835 11.3226 13.9105C11.3796 13.9376 11.4416 13.9529 11.5047 13.9557C11.5678 13.9584 11.6308 13.9484 11.6899 13.9263C11.7491 13.9042 11.8032 13.8704 11.8491 13.8271C11.895 13.7837 11.9317 13.7315 11.9571 13.6737C11.9825 13.6158 11.996 13.5535 11.9968 13.4903C11.9977 13.4272 11.9858 13.3645 11.962 13.306L11.617 12.38ZM8.29398 9.302C8.29424 9.24003 8.28225 9.17861 8.25868 9.12129C8.23512 9.06397 8.20045 9.01188 8.15667 8.96801C8.1129 8.92414 8.06088 8.88936 8.00361 8.86568C7.94634 8.84199 7.88495 8.82987 7.82298 8.83H4.57798C4.45279 8.83 4.33274 8.87973 4.24422 8.96825C4.1557 9.05676 4.10598 9.17682 4.10598 9.302C4.10598 9.42718 4.1557 9.54724 4.24422 9.63575C4.33274 9.72427 4.45279 9.774 4.57798 9.774H5.73798V13.51C5.73798 13.6352 5.7877 13.7552 5.87622 13.8438C5.96474 13.9323 6.08479 13.982 6.20998 13.982C6.33516 13.982 6.45521 13.9323 6.54373 13.8438C6.63225 13.7552 6.68198 13.6352 6.68198 13.51V9.774H7.82198C7.88403 9.77426 7.94553 9.76224 8.00292 9.73861C8.0603 9.71498 8.11244 9.68023 8.15632 9.63634C8.2002 9.59246 8.23496 9.54032 8.25859 9.48294C8.28221 9.42555 8.29424 9.36406 8.29398 9.302Z"
          fill="black"
        />
      </svg>
      카카오톡으로 로그인하기
    </Button>
  );
};

export default KakaoLogin;
