import { initialState } from "../initialState";
import { changeTabReducer } from "./tabReducer";
import { addFriendReducer, removeFriendReducer } from "./friendReducer";

export const rootReducer = (
  state: typeof initialState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case "changeTab":
      return changeTabReducer(state, action.payload);

    case "addFriend":
      return addFriendReducer(state, action.payload);

    case "removeFriend":
      return removeFriendReducer(state, action.payload);

    default:
      return state;
  }
};
