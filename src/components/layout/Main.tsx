import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

// components
import TabsControl from "../tabs/TabsControl";
import Header from "./Header";
import TabActive from "../tabs/TabActive";
import { useStateValue } from "../../store/useStore";
import { IRootStore } from "../../store/initialState";

// other
import config from "../../config/config";
import packageJson from "../../../package.json";

const MainContainer = styled.section`
  flex-grow: 1;
`;

const VersionBanner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
  transform: rotate(45deg) translate(30%);
  width: 300px;
  text-align: center;
  transform-origin: center;
  z-index: 2;

  span {
    margin: 0 6px;
  }
`;

const Main = () => {
  // @ts-ignore
  const [stateValue]: [IRootStore] = useStateValue();

  if (config.develop) {
    console.groupCollapsed("Store");
    console.log(stateValue);
    console.groupEnd();
  }

  return (
    <MainContainer className="section">
      <VersionBanner
        className={"tag is-primary is-medium"}
        title={packageJson.description}
      >
        <span>{packageJson.version}</span>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </VersionBanner>
      <Header />
      <TabsControl />
      <TabActive />
    </MainContainer>
  );
};

export default Main;
