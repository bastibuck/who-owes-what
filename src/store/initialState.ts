// Tabs
export enum ETabs {
  FRIENDS,
  EXPENSES,
  RESULT,
}

// Friends
export type TFriendId = number;
type TFriendIds = TFriendId[];
export interface IFriendsById {
  [id: number]: IFriend;
}

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

export const dummyState: IRootStore = {
  activeTab: ETabs.RESULT,
  expenses: [1, 2],
  expensesById: {
    1: {
      amount: 10,
      id: 1,
      name: "Bier",
      payer: 2,
      sharedWith: [1],
    },
    2: {
      amount: 30,
      id: 2,
      name: "Wein",
      payer: 1,
      sharedWith: [2],
    },
  },
  friends: [1, 2, 3],
  friendsById: {
    1: {
      id: 1,
      name: "Basti",
      owes: {
        2: -10,
        3: 0,
      },
      spent: 30,
    },
    2: {
      id: 2,
      name: "Nobby",
      owes: {
        1: 10,
        3: 0,
      },
      spent: 10,
    },
    3: {
      id: 3,
      name: "Tim",
      owes: {
        1: 0,
        2: 0,
      },
      spent: 0,
    },
  },
  ids: {
    nextExpenseId: 3,
    nextFriendId: 4,
  },
  pools: {
    total: 40,
  },
};
