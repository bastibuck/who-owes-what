import { ETabs, IExpense } from "./initialState";

export enum EActions {
  CHANGE_TAB = "CHANGE_TAB",
  ADD_FRIEND = "ADD_FRIEND",
  REMOVE_FRIEND = "REMOVE_FRIEND",
  ADD_EXPENSE = "ADD_EXPENSE",
}

export const changeTabAction = (newTab: ETabs) => ({
  payload: newTab,
  type: EActions.CHANGE_TAB,
});

export const addFriendAction = (newFriend: string) => ({
  payload: newFriend,
  type: EActions.ADD_FRIEND,
});

export const removeFriendAction = (friendId: number) => ({
  payload: friendId,
  type: EActions.REMOVE_FRIEND,
});

export const addExpenseAction = (newExpense: IExpense) => ({
  payload: newExpense,
  type: EActions.ADD_EXPENSE,
});
