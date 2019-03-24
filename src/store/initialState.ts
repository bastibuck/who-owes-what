// store types
export enum ETabs {
  FRIENDS,
  EXPENSES,
  RESULT,
}

interface IRootStore {
  activeTab: ETabs;
  friends: string[];
}

export const initialState: IRootStore = {
  activeTab: ETabs.FRIENDS,
  friends: [],
};
