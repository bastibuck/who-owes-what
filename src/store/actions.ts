import { ETabs } from "./initialState";

export const changeTabAction = (newTab: ETabs) => ({
  type: "changeTab",
  payload: newTab,
});

export const addFriendAction = (newFriend: string) => ({
  type: "addFriend",
  payload: newFriend,
});
