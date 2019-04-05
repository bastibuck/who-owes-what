import { IExpense, initialState } from "../initialState";

export const addExpenseReducer = (
  state: typeof initialState,
  newExpense: IExpense,
) => {
  return {
    ...state,
    expenses: [
      ...state.expenses,
      { ...newExpense, id: state.ids.nextExpenseId },
    ],
    expensesById: {
      ...state.expensesById,
      [state.ids.nextExpenseId]: { ...newExpense },
    },
    ids: { ...state.ids, nextExpenseId: state.ids.nextExpenseId + 1 },
  };
};
