import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faDollarSign,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

enum ETabs {
  FRIENDS,
  EXPENSES,
  RESULT,
}

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
          <ul className={"is-block-mobile is-flex-desktop"}>
            <li
              className={`is-marginless ${activeTab === ETabs.FRIENDS &&
                "is-active"}`}
              onClick={handleClickFriends}
            >
              <a>
                <IconContainer>
                  <FontAwesomeIcon icon={faUser} />
                </IconContainer>
                <span>Add friends</span>
              </a>
            </li>
            <li
              className={`is-marginless ${activeTab === ETabs.EXPENSES &&
                "is-active"}`}
              onClick={handleClickExpenses}
            >
              <a>
                <IconContainer>
                  <FontAwesomeIcon icon={faDollarSign} />
                </IconContainer>
                <span>Add expenses</span>
              </a>
            </li>
            <li
              className={`is-marginless ${activeTab === ETabs.RESULT &&
                "is-active"}`}
              onClick={handleClickResult}
            >
              <a>
                <IconContainer>
                  <FontAwesomeIcon icon={faChartBar} />
                </IconContainer>
                <span>See results</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabsControl;
