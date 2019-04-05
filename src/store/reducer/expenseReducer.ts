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

export const removeExpenseReducer = (
  state: typeof initialState,
  removeExpense: number,
) => {
  const newExpensesById = Object.keys(state.expensesById).reduce(
    (res: any, key: string) => {
      if (state.expensesById[parseInt(key, 10)].id !== removeExpense) {
        res[key] = state.expensesById[parseInt(key, 10)];
      }
      return res;
    },
    {},
  );

  return {
    ...state,
    expenses: state.expenses.filter(expense => expense.id !== removeExpense),
    expensesById: {
      ...newExpensesById,
    },
  };
};
