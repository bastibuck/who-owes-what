import React from "react";
import styled from "styled-components";
import "bulma/css/bulma.css";

// components
import Footer from "./layout/Footer";
import Main from "./layout/Main";

// store
import { StateProvider } from "../store/useStore";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App = () => {
  return (
    <StateProvider>
      <AppContainer>
        <Main />
        <Footer />
      </AppContainer>
    </StateProvider>
  );
};

export default App;
