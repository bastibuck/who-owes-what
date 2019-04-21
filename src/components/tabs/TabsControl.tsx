import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faDollarSign,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

// other
import { mq } from "../layout/utils/utils";
import { useStateValue } from "../../store/useStore";
import { changeTabAction } from "../../store/actions";
import { ETabs } from "../../store/initialState";

// styled components
interface ITabAttrs {
  readonly tabActive: boolean;
}

interface ITabContentAttrs {
  readonly tabDisabled: boolean;
}

const Tab = styled.li.attrs((props: ITabAttrs) => ({
  className: `is-marginless ${props.tabActive ? "is-active" : ""}`,
}))<ITabAttrs>``;

const TabContent = styled.a.attrs((props: ITabContentAttrs) => ({
  disabled: props.tabDisabled,
  className: props.tabDisabled
    ? "has-text-grey-light has-background-white-ter"
    : "",
}))<ITabContentAttrs>`
  ${props =>
    props.tabDisabled &&
    `
      &,
      &:hover {
        cursor: not-allowed;
        border-color: #dbdbdb !important;
      }
  `}

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
  const expenses = stateValue.expenses;

  const expensesDisabled = friends.length < 1;
  const resultsDisabled = expensesDisabled || expenses.length < 1;

  const handleClickFriends = (e: React.MouseEvent) => {
    if (activeTab !== ETabs.FRIENDS) {
      dispatch(changeTabAction(ETabs.FRIENDS));
    }
  };

  const handleClickExpenses = (e: React.MouseEvent) => {
    if (!expensesDisabled && activeTab !== ETabs.EXPENSES) {
      dispatch(changeTabAction(ETabs.EXPENSES));
    }
  };

  const handleClickResult = (e: React.MouseEvent) => {
    if (!resultsDisabled && activeTab !== ETabs.RESULT) {
      dispatch(changeTabAction(ETabs.RESULT));
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="tabs is-toggle is-fullwidth">
          <ul className={"is-block-mobile is-flex-tablet"}>
            <Tab
              tabActive={activeTab === ETabs.FRIENDS}
              onClick={handleClickFriends}
            >
              <TabContent tabDisabled={false}>
                <IconContainer>
                  <FontAwesomeIcon icon={faUsers} />
                </IconContainer>
                <span>Add friends</span>
              </TabContent>
            </Tab>
            <Tab
              tabActive={activeTab === ETabs.EXPENSES}
              onClick={handleClickExpenses}
            >
              <TabContent tabDisabled={expensesDisabled}>
                <IconContainer>
                  <FontAwesomeIcon icon={faDollarSign} />
                </IconContainer>
                <span>Add expenses</span>
              </TabContent>
            </Tab>
            <Tab
              tabActive={activeTab === ETabs.RESULT}
              onClick={handleClickResult}
            >
              <TabContent tabDisabled={resultsDisabled}>
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
