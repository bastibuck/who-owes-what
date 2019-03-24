import { initialState } from "../initialState";

export const addFriendReducer = (
  state: typeof initialState,
  newFriend: string,
) => {
  return {
    ...state,
    friends: [...state.friends, newFriend],
  };
};
