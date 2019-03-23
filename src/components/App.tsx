import React, { Component } from "react";
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
class App extends Component {
  public render() {
    return (
      <AppContainer>
        <Main />
        <Footer />
      </AppContainer>
    );
  }
}

export default App;
