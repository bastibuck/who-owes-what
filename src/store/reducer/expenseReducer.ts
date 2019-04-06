import { IExpense, initialState, IRootStore } from "../initialState";

export const addExpenseReducer = (
  state: typeof initialState,
  newExpense: IExpense,
): IRootStore => {
  // clone friendsById
  const newFriendsById = { ...state.friendsById };

  // loop over all friends to find payers and owers and update their owes values
  state.friends.forEach(friendId => {
    // build payer
    if (friendId === newExpense.payer) {
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

      newFriendsById[friendId] = {
        ...state.friendsById[newExpense.payer],
        owes: { ...newPayerOwesObj },
      };
    }
    // build owers
    else {
      if (newExpense.sharedWith.includes(friendId)) {
        const newOwerOwesObj = {} as any;
        Object.keys(state.friendsById[friendId].owes).forEach(payerId => {
          const intPayerId = parseInt(payerId, 10);
          if (newExpense.payer === intPayerId) {
            newOwerOwesObj[intPayerId] =
              state.friendsById[friendId].owes[intPayerId] +
              newExpense.amount / (newExpense.sharedWith.length + 1);
          } else {
            newOwerOwesObj[intPayerId] =
              state.friendsById[friendId].owes[intPayerId];
          }
        });

        newFriendsById[friendId] = {
          ...state.friendsById[friendId],
          owes: { ...newOwerOwesObj },
        };
      }
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
      ...newFriendsById,
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
