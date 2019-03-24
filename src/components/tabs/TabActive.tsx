import React from "react";
import { useStateValue } from "../../store/useStore";
import { ETabs } from "../../store/initialState";

const getTabSublines = (activeTab: ETabs) => {
  switch (activeTab) {
    case ETabs.FRIENDS:
      return "Add your friends";
    case ETabs.EXPENSES:
      return "Add all your expenses";

    case ETabs.RESULT:
      return "See who owes what";

    default:
      return "no tab selected";
  }
};

const TabActive = () => {
  //@ts-ignore
  const [stateValue, dispatch] = useStateValue();

  const activeTab = stateValue.activeTab;

  return (
    <div className="container">
      <h3 className={"subtitle"}>{getTabSublines(activeTab)}</h3>
    </div>
  );
};

export default TabActive;
