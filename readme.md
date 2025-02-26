# 🗨️ KakaoStory - SNS 플랫폼 리뉴얼 프로젝트

![KakaoStory 메인 이미지](https://kakaostory-b8662.web.app/kakaoLogo.png)

## 📋 프로젝트 정보

- **개발 기간**: 2024.09 ~ 2024.10
- **개발팀**: 해오름(PM), 송채영(프로필 페이지 담당), 전진우(로그인 시스템 담당), 강혜정(메인페이지 담당), 김준영(메인페이지 담당)
- **배포 주소**: [https://kakaostory-b8662.web.app](https://kakaostory-b8662.web.app)

## 🎯 프로젝트 소개

### 목적 및 용도

이 프로젝트는 카카오스토리 서비스의 기존 UI/UX를 전면 재해석·개편하여 새롭게 리뉴얼한 팀 프로젝트입니다. 사용자들이 게시물을 작성하고, 공유하며, 소통할 수 있는 소셜 네트워킹 경험을 제공합니다. 다크 모드와 라이트 모드를 지원하며, 카카오 소셜 로그인을 통한 간편한 인증 시스템을 구현했습니다.

### 기술 스택

#### 프론트엔드
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

#### 백엔드 및 인증
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Kakao API](https://img.shields.io/badge/Kakao_API-FFCD00?style=for-the-badge&logo=kakao&logoColor=black)

#### 기타 도구
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)

## ✨ 주요 기능

### 1. 다크 모드/라이트 모드 지원

사용자 선호도에 맞게 다크 모드와 라이트 모드를 전환할 수 있는 기능을 구현했습니다.

```javascript
// src/App.js - 다크 모드 구현
import { darkTheme, lightTheme } from "./styles/Theme";

function App() {
  const [darkmode, setDarkmode] = useState(false);

  const handleDarkmode = (e) => {
    setDarkmode((currrent) => !currrent);
  };

  return (
    <>
      <userKakaoCredentials.Provider value={{ user, setUser }}>
        <GlobalStyles />
        <DarkModeStateContext.Provider value={{ darkmode, handleDarkmode }}>
          <ThemeProvider theme={darkmode ? darkTheme : lightTheme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </DarkModeStateContext.Provider>
      </userKakaoCredentials.Provider>
    </>
  );
}
```

### 2. 카카오 소셜 로그인

카카오 API를 활용한 소셜 로그인 기능을 구현하여 사용자 인증 과정을 간소화했습니다.

```javascript
// src/routes/KakaoRedirect.js - 카카오 로그인 리다이렉트 처리
export const userKakaoCredentials = createContext();

const KakaoRedirect = () => {
  const { setUser } = useContext(userKakaoCredentials);
  const navigate = useNavigate();
  
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    
    // 카카오 인증 코드로 토큰 요청 및 사용자 정보 가져오기
    // ...
    
    // 사용자 정보 설정 및 메인 페이지로 리다이렉트
    setUser({
      userName: userData.properties.nickname,
      id: userData.id,
      profilePic: userData.properties.profile_image,
      accessToken: token.access_token,
      isLoggedIn: true,
    });
    
    navigate("/");
  }, []);
  
  return <LoadingScreen />;
};
```

### 3. 반응형 레이아웃

다양한 디바이스에서 최적의 사용자 경험을 제공하기 위한 반응형 디자인을 구현했습니다.

### 4. 게시물 CRUD 기능

Firebase를 활용하여 게시물 작성, 조회, 수정, 삭제 기능을 구현했습니다.

## 📂 프로젝트 아키텍처

### 폴더 구조

```
KakaoStory/
├── public/               # 정적 파일
│   ├── kakaoLgo/         # 카카오 로고 이미지
│   └── testimages/       # 테스트용 이미지
├── src/
│   ├── common/           # 공통 컴포넌트
│   ├── components/       # 재사용 가능한 컴포넌트
│   │   └── layout/       # 레이아웃 관련 컴포넌트
│   ├── configs/          # 설정 파일 (Firebase 등)
│   ├── pages/            # 페이지 컴포넌트
│   ├── routes/           # 라우팅 관련 컴포넌트
│   ├── styles/           # 전역 스타일 및 테마
│   └── App.js            # 메인 앱 컴포넌트
└── firebase.json         # Firebase 설정
```

## 🚀 프로젝트 설치 및 사용 방법

```bash
# 저장소 클론
git clone https://github.com/yourusername/KakaoStory.git

# 의존성 설치
cd KakaoStory
npm install

# 개발 서버 실행
npm start

# 빌드 및 배포
npm run build
npm run deploy
```

## 💡 배운 점

### 기술적 측면

- **Firebase 인증 시스템**: Firebase와 카카오 소셜 로그인을 연동하는 방법을 학습했습니다.
- **테마 전환 구현**: Context API와 Styled Components를 활용한 다크 모드/라이트 모드 전환 기능을 구현했습니다.
- **반응형 웹 디자인**: 다양한 화면 크기에 대응하는 반응형 레이아웃 설계 방법을 익혔습니다.
- **비동기 데이터 처리**: Axios를 활용한 API 호출 및 비동기 데이터 처리 방법을 학습했습니다.

### 디자인 측면

- **SNS 플랫폼 UI/UX**: 사용자 친화적인 소셜 네트워킹 인터페이스 설계 방법을 연구했습니다.
- **애니메이션 효과**: Framer Motion을 활용한 부드러운 전환 애니메이션 구현 방법을 배웠습니다.
- **일관된 디자인 시스템**: 테마 기반의 일관된 디자인 시스템 구축 방법을 익혔습니다.

### 협업 측면

- **팀 프로젝트 관리**: 효율적인 작업 분담과 일정 관리 방법을 배웠습니다.
- **Git 워크플로우**: 팀 프로젝트에서의 효과적인 Git 브랜치 전략과 코드 리뷰 프로세스를 익혔습니다.
- **코드 컨벤션**: 일관된 코드 스타일과 명명 규칙을 통한 가독성 향상 방법을 학습했습니다.
