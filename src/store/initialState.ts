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
  readonly sharedWith: number[];
}

interface IIds {
  readonly nextFriendId: number;
  readonly nextExpenseId: number;
}

interface IRootStore {
  readonly ids: IIds;
  readonly activeTab: ETabs;
  readonly friends: IFriend[];
  readonly friendsById: {
    [id: number]: string;
  };
  readonly expenses: IExpense[];
}

export const initialState: IRootStore = {
  ids: {
    nextFriendId: 0,
    nextExpenseId: 0,
  },
  activeTab: ETabs.FRIENDS,
  friends: [],
  friendsById: {},
  expenses: [],
};
