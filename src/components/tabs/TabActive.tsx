import React from "react";
import { useStateValue } from "../../store/useStore";
import { ETabs } from "../../store/initialState";
import Friends from "./tabs/Friends";
import Expenses from "./tabs/expenses/Expenses";
import Result from "./tabs/Result";

const getTabContent = (activeTab: ETabs) => {
  switch (activeTab) {
    case ETabs.FRIENDS:
      return <Friends />;
    case ETabs.EXPENSES:
      return <Expenses />;

    case ETabs.RESULT:
      return <Result />;

    default:
      return "no tab selected";
  }
};

const TabActive = () => {
  // @ts-ignore
  const [stateValue, dispatch] = useStateValue();

  return <div className="container">{getTabContent(stateValue.activeTab)}</div>;
};

export default TabActive;
