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
  readonly expenses: IExpense[];
}

export const initialState: IRootStore = {
  ids: {
    nextFriendId: 1,
    nextExpenseId: 1,
  },
  activeTab: ETabs.FRIENDS,
  friends: [],
  expenses: [],
};
