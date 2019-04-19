import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { dummyState, initialState, IRootStore } from "./initialState";
import { rootReducer } from "./reducer/rootReducer";

// build storeContext
export const StoreContext = createContext({});

const store = true ? initialState : dummyState;

// build store provider
export const StoreProvider = (
  props: PropsWithChildren<{ optionalStore?: IRootStore }>,
) => (
  // @ts-ignore
  <StoreContext.Provider
    value={useReducer(
      rootReducer,
      props.optionalStore ? props.optionalStore : store,
    )}
  >
    {props.children}
  </StoreContext.Provider>
);

// Hook to read and write values from store
export const useStateValue = () => useContext(StoreContext);
