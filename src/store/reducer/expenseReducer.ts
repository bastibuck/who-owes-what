import { IExpense, initialState, IRootStore } from "../initialState";

export const addExpenseReducer = (
  state: typeof initialState,
  newExpense: IExpense,
): IRootStore => {
  console.log(state.friendsById[newExpense.payer].owes);

  const newPayerOwesObj = {} as any;
  Object.keys(state.friendsById[newExpense.payer].owes).forEach(owerId => {
    const intOwerId = parseInt(owerId, 10);
    if (newExpense.sharedWith.includes(intOwerId)) {
      newPayerOwesObj[intOwerId] =
        state.friendsById[newExpense.payer].owes[intOwerId] -
        newExpense.amount / (newExpense.sharedWith.length + 1);
    } else {
      newPayerOwesObj[intOwerId] =
        state.friendsById[newExpense.payer].owes[intOwerId];
    }
  });

  return {
    ...state,
    expenses: [...state.expenses, state.ids.nextExpenseId],
    expensesById: {
      ...state.expensesById,
      [state.ids.nextExpenseId]: { ...newExpense, id: state.ids.nextExpenseId },
    },
    friendsById: {
      ...state.friendsById,
      [newExpense.payer]: {
        ...state.friendsById[newExpense.payer],
        owes: { ...newPayerOwesObj },
        spent: state.friendsById[newExpense.payer].spent + newExpense.amount,
      },
    },
    ids: { ...state.ids, nextExpenseId: state.ids.nextExpenseId + 1 },
    pools: {
      total: state.pools.total + newExpense.amount,
    },
  };
};

export const removeExpenseReducer = (
  state: typeof initialState,
  removeExpense: number,
): IRootStore => {
  const oldExpense = state.expensesById[removeExpense];
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
    expenses: state.expenses.filter(expenseId => expenseId !== removeExpense),
    expensesById: {
      ...newExpensesById,
    },
    friendsById: {
      ...state.friendsById,
      [oldExpense.payer]: {
        ...state.friendsById[oldExpense.payer],
        spent: state.friendsById[oldExpense.payer].spent - oldExpense.amount,
      },
    },
    pools: {
      total: state.pools.total - oldExpense.amount,
    },
  };
};
