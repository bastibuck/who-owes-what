// store types
export enum ETabs {
  FRIENDS,
  EXPENSES,
  RESULT,
}

export interface IFriend {
  readonly id: number;
  readonly name: string;
}

export interface IExpense {
  readonly amount: number;
  readonly name: string;
  readonly sharedWith: number[];
}

interface IIds {
  readonly nextExpenseId: number;
  readonly nextFriendId: number;
}

interface IRootStore {
  readonly activeTab: ETabs;
  readonly expenses: IExpense[];
  readonly expensesById: {
    [id: number]: IExpense;
  };
  readonly friends: IFriend[];
  readonly friendsById: {
    [id: number]: string;
  };
  readonly ids: IIds;
}

export const initialState: IRootStore = {
  activeTab: ETabs.FRIENDS,
  expenses: [],
  expensesById: {},
  friends: [],
  friendsById: {},
  ids: {
    nextExpenseId: 0,
    nextFriendId: 0,
  },
};
