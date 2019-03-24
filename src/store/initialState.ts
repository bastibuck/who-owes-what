// store types
export enum ETabs {
  FRIENDS,
  EXPENSES,
  RESULT,
}

interface IRootStore {
  readonly activeTab: ETabs;
  readonly friends: string[];
  readonly expenses: { amount: number }[];
}

export const initialState: IRootStore = {
  activeTab: ETabs.FRIENDS,
  friends: [],
  expenses: [],
};
