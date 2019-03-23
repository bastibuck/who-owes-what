import React from "react";
import styled from "styled-components";

// components
import TabsControl from "../tabs/TabsControl";
import Header from "./Header";

const MainContainer = styled.section`
  flex-grow: 1;
`;

const Main = () => {
  return (
    <MainContainer className="section">
      <Header />
      <TabsControl />
    </MainContainer>
  );
};

export default Main;
