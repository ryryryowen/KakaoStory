import styled from "styled-components";
import "./App.css";
import { GlobalStyles } from "./styles/GlobalStyles.styles";
import { mixins } from "./styles/GlobalStyles.styles";

const Title = styled.h4`
  font-family: var(--pretendard);
  font-weight: normal;
  ${mixins.border({width: 10})};
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Title>테스트</Title>
    </>
  );
}

export default App;
