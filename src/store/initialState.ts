// Tabs
export enum ETabs {
  FRIENDS,
  EXPENSES,
  RESULT,
}

// Friends
export type TFriendId = number;
type TFriendIds = TFriendId[];

export interface IFriend {
  readonly id: number;
  readonly name: string;
}

export const emptyFriend: IFriend = {
  id: -1,
  name: "",
};

// Expenses
export type TExpenseId = number;
type TExpenseIds = TExpenseId[];

export interface IExpense {
  readonly id: number;
  readonly amount: number;
  readonly name: string;
  readonly sharedWith: number[];
}

export const emptyExpense: IExpense = {
  amount: 0,
  id: -1,
  name: "",
  sharedWith: [],
};

// IDs
interface IIds {
  readonly nextExpenseId: number;
  readonly nextFriendId: number;
}

export interface IRootStore {
  readonly activeTab: ETabs;
  readonly expenses: TExpenseIds;
  readonly expensesById: {
    [id: number]: IExpense;
  };
  readonly friends: TFriendIds;
  readonly friendsById: {
    [id: number]: IFriend;
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
