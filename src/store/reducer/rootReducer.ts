import { initialState } from "../initialState";
import { changeTabReducer } from "./tabReducer";
import { addFriendReducer, removeFriendReducer } from "./friendReducer";
import { EActions } from "../actions";
import { addExpenseReducer } from "./expenseReducer";

export const rootReducer = (
  state: typeof initialState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case EActions.CHANGE_TAB:
      return changeTabReducer(state, action.payload);

    case EActions.ADD_FRIEND:
      return addFriendReducer(state, action.payload);

    case EActions.REMOVE_FRIEND:
      return removeFriendReducer(state, action.payload);

    case EActions.ADD_EXPENSE:
      return addExpenseReducer(state, action.payload);

    default:
      return state;
  }
};
