// store types
export enum ETabs {
  FRIENDS,
  EXPENSES,
  RESULT,
}

interface IRootStore {
  readonly activeTab: ETabs;
  readonly friends: string[];
  readonly expenses: {
    readonly amount: number;
    readonly sharedWith: number[];
  }[];
}

export const initialState: IRootStore = {
  activeTab: ETabs.FRIENDS,
  friends: [],
  expenses: [],
};
