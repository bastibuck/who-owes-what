import React from "react";
import styled from "styled-components";

// components
import TabsControl from "../tabs/TabsControl";
import Header from "./Header";
import TabActive from "../tabs/TabActive";

const MainContainer = styled.section`
  flex-grow: 1;
`;

const Main = () => {
  return (
    <MainContainer className="section">
      <Header />
      <TabsControl />
      <TabActive />
    </MainContainer>
  );
};

export default Main;
