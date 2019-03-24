import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faDollarSign,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// other
import { mq } from "../layout/utils/utils";
import { useStateValue } from "../../store/useStore";
import { changeTabAction } from "../../store/actions";
import { ETabs } from "../../store/initialState";

// styled components
const Tab = styled.li<{ disabled?: boolean }>`
  ${props =>
    props.disabled &&
    `
    a,
    a:hover {
      cursor: not-allowed;
      border-color: #dbdbdb !important;
    }
  `};
`;

const TabContent = styled.a`
  ${mq.mobile(`
    border-radius: 0 !important;
  `)}
`;

const IconContainer = styled.span.attrs({ className: "icon is-small" })``;

// TabsControl component
const TabsControl = () => {
  //@ts-ignore
  const [stateValue, dispatch] = useStateValue();

  const activeTab = stateValue.activeTab;
  const friends = stateValue.friends;

  const expensesDisabled = true && friends.length < 1;
  const resultsDisabled = expensesDisabled;

  const handleClickFriends = (e: React.MouseEvent) => {
    dispatch(changeTabAction(ETabs.FRIENDS));
  };

  const handleClickExpenses = (e: React.MouseEvent) => {
    if (!expensesDisabled) {
      dispatch(changeTabAction(ETabs.EXPENSES));
    }
  };

  const handleClickResult = (e: React.MouseEvent) => {
    if (!resultsDisabled) {
      dispatch(changeTabAction(ETabs.RESULT));
    }
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
              disabled={expensesDisabled}
            >
              <TabContent
                className={
                  expensesDisabled
                    ? "has-text-grey-light has-background-white-ter"
                    : ""
                }
              >
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
              disabled={resultsDisabled}
            >
              <TabContent
                className={
                  resultsDisabled
                    ? "has-text-grey-light has-background-white-ter"
                    : ""
                }
              >
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
