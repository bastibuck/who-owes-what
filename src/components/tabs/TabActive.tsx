import React from "react";
import { useStateValue } from "../../store/useStore";
import { ETabs } from "../../store/initialState";
import Friends from "./tabs/Friends";
import Expenses from "./tabs/Expenses";
import Result from "./tabs/Result";

const TabActive = () => {
  // @ts-ignore
  const [stateValue, dispatch] = useStateValue();

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

  return <div className="container">{getTabContent(stateValue.activeTab)}</div>;
};

export default TabActive;
