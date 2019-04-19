import React, { createContext, useContext, useReducer } from "react";
import { dummyState, initialState } from "./initialState";
import { rootReducer } from "./reducer/rootReducer";

// build storeContext
export const StoreContext = createContext({});

const store = true ? initialState : dummyState;

// build store provider
export const StoreProvider = (props: React.PropsWithChildren<{}>) => (
  <StoreContext.Provider value={useReducer(rootReducer, store)}>
    {props.children}
  </StoreContext.Provider>
);

// Hook to read and write values from store
export const useStateValue = () => useContext(StoreContext);
