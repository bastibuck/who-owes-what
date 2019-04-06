import React from "react";
import styled from "styled-components";

// components
import TabsControl from "../tabs/TabsControl";
import Header from "./Header";
import TabActive from "../tabs/TabActive";
import { useStateValue } from "../../store/useStore";
import { IRootStore } from "../../store/initialState";

const MainContainer = styled.section`
  flex-grow: 1;
`;

const Main = () => {
  // @ts-ignore
  const [stateValue]: [IRootStore] = useStateValue();

  console.groupCollapsed("Store");
  console.log(stateValue);
  console.groupEnd();

  return (
    <MainContainer className="section">
      <Header />
      <TabsControl />
      <TabActive />
    </MainContainer>
  );
};

export default Main;
