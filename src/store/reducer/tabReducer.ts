import { initialState, ETabs } from "../initialState";

export const changeTabReducer = (state: typeof initialState, newTab: ETabs) => {
  return {
    ...state,
    activeTab: newTab,
  };
};
