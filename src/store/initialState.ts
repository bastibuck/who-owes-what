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
  readonly spent: number;
  readonly owes: {
    [friendId: number]: number;
  };
}

export const emptyFriend: IFriend = {
  id: -1,
  name: "",
  owes: {},
  spent: 0,
};

// Expenses
export type TExpenseId = number;
type TExpenseIds = TExpenseId[];

export interface IExpense {
  readonly id: number;
  readonly amount: number;
  readonly name: string;
  readonly payer: number;
  readonly sharedWith: number[];
}

export const emptyExpense: IExpense = {
  amount: 0,
  id: -1,
  name: "",
  payer: -1,
  sharedWith: [],
};

// IDs
interface IIds {
  readonly nextExpenseId: number;
  readonly nextFriendId: number;
}

// pools
interface IPools {
  readonly total: number;
}

// RootStore
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
  readonly pools: IPools;
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
  pools: {
    total: 0,
  },
};
};
