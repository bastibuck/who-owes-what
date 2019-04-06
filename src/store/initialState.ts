// store types
export enum ETabs {
  FRIENDS,
  EXPENSES,
  RESULT,
}

export type TFriendId = number;
type TFriendIds = TFriendId[];

export interface IFriend {
  readonly id: number;
  readonly name: string;
}

export interface IExpense {
  readonly id: number;
  readonly amount: number;
  readonly name: string;
  readonly sharedWith: number[];
}

interface IIds {
  readonly nextExpenseId: number;
  readonly nextFriendId: number;
}

export interface IRootStore {
  readonly activeTab: ETabs;
  readonly expenses: IExpense[];
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
  expenses: [
    {
      amount: 23,
      id: 1,
      name: "Bier",
      sharedWith: [1, 2],
    },
  ],
  expensesById: {
    1: {
      amount: 23,
      id: 1,
      name: "Bier",
      sharedWith: [1, 2],
    },
  },
  friends: [1, 2],
  friendsById: {
    1: {
      id: 1,
      name: "Basti",
    },
    2: {
      id: 2,
      name: "Tom",
    },
  },
  ids: {
    nextExpenseId: 2,
    nextFriendId: 3,
  },
};
