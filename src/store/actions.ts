import { ETabs, IExpense, IFriend } from "./initialState";

export enum EActions {
  CHANGE_TAB = "CHANGE_TAB",
  ADD_FRIEND = "ADD_FRIEND",
  REMOVE_FRIEND = "REMOVE_FRIEND",
  ADD_EXPENSE = "ADD_EXPENSE",
  REMOVE_EXPENSE = "REMOVE_EXPENSE",
}

export const changeTabAction = (newTab: ETabs) => ({
  payload: newTab,
  type: EActions.CHANGE_TAB,
});

export const addFriendAction = (newFriend: IFriend) => ({
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

export const removeExpenseAction = (expenseId: number) => ({
  payload: expenseId,
  type: EActions.REMOVE_EXPENSE,
});
