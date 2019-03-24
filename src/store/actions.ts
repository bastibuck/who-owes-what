import { ETabs } from "./initialState";

export const changeTabAction = (newTab: ETabs) => ({
  type: "changeTab",
  payload: newTab,
});
