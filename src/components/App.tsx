import React from "react";
import styled from "styled-components";
import "bulma/css/bulma.css";

// components
import Footer from "./layout/Footer";
import Main from "./layout/Main";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App = () => (
  <AppContainer>
    <Main />
    <Footer />
  </AppContainer>
);

export default App;
