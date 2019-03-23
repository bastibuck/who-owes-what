import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext({});

// https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c

// store types
export enum ETabs {
  FRIENDS,
  EXPENSES,
  RESULT,
}

const initialState = {
  activeTab: ETabs.FRIENDS,
};

const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case "changeTab":
      return {
        ...state,
        activeTab: action.newTab,
      };

    default:
      return state;
  }
};

export const StateProvider = (props: React.PropsWithChildren<{}>) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {props.children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
