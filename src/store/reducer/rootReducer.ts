import { initialState } from "../initialState";
import { changeTabReducer } from "./tabReducer";

export const rootReducer = (
  state: typeof initialState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case "changeTab":
      return changeTabReducer(state, action.payload);

    default:
      return state;
  }
};
