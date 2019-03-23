import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faDollarSign,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// other
import { mq } from "../layout/utils/utils";

enum ETabs {
  FRIENDS,
  EXPENSES,
  RESULT,
}

const Tab = styled.li``;
const TabContent = styled.a`
  ${mq.mobile(`
    border-radius: 0 !important;
  `)}
`;
const IconContainer = styled.span.attrs({ className: "icon is-small" })``;

const TabsControl = () => {
  const [activeTab, setActiveTab] = useState(ETabs.FRIENDS);

  const handleClickFriends = (e: React.MouseEvent) => {
    setActiveTab(ETabs.FRIENDS);
  };

  const handleClickExpenses = (e: React.MouseEvent) => {
    setActiveTab(ETabs.EXPENSES);
  };

  const handleClickResult = (e: React.MouseEvent) => {
    setActiveTab(ETabs.RESULT);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="tabs is-toggle is-fullwidth">
          <ul className={"is-block-mobile is-flex-tablet"}>
            <Tab
              className={`is-marginless ${activeTab === ETabs.FRIENDS &&
                "is-active"}`}
              onClick={handleClickFriends}
            >
              <TabContent>
                <IconContainer>
                  <FontAwesomeIcon icon={faUser} />
                </IconContainer>
                <span>Add friends</span>
              </TabContent>
            </Tab>
            <Tab
              className={`is-marginless ${activeTab === ETabs.EXPENSES &&
                "is-active"}`}
              onClick={handleClickExpenses}
            >
              <TabContent>
                <IconContainer>
                  <FontAwesomeIcon icon={faDollarSign} />
                </IconContainer>
                <span>Add expenses</span>
              </TabContent>
            </Tab>
            <Tab
              className={`is-marginless ${activeTab === ETabs.RESULT &&
                "is-active"}`}
              onClick={handleClickResult}
            >
              <TabContent>
                <IconContainer>
                  <FontAwesomeIcon icon={faChartBar} />
                </IconContainer>
                <span>See results</span>
              </TabContent>
            </Tab>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabsControl;
