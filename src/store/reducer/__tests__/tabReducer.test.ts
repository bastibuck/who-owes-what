import { initialState, ETabs, IRootStore } from "../../initialState";
import { changeTabReducer } from "../tabReducer";

const callTabReducerWith = (newTab: ETabs) => {
  const state = changeTabReducer(initialState, newTab);
  return state.activeTab;
};

describe("tabReducer", () => {
  it("should change tab state correctly", () => {
    expect(callTabReducerWith(ETabs.FRIENDS)).toBe(ETabs.FRIENDS);
    expect(callTabReducerWith(ETabs.EXPENSES)).toBe(ETabs.EXPENSES);
    expect(callTabReducerWith(ETabs.RESULT)).toBe(ETabs.RESULT);
  });

  it("should leave everything else untouched", () => {
    const fakeStore: IRootStore = {
      ...initialState,
      activeTab: ETabs.EXPENSES,
      expenses: [0, 1, 2],
      expensesById: {
        0: {
          amount: 120,
          id: 0,
          name: "Peanuts",
          payer: 2,
          sharedWith: [1],
        },
        1: {
          amount: 10,
          id: 1,
          name: "Carrots",
          payer: 1,
          sharedWith: [2],
        },
        2: {
          amount: 100,
          id: 2,
          name: "Apples",
          payer: 0,
          sharedWith: [1, 2],
        },
      },
      friends: [0, 1, 2],
      friendsById: {
        0: {
          id: 0,
          name: "Tom Meyer",
          owes: { 1: 0, 2: 0 },
          spent: 0,
        },
        1: {
          id: 1,
          name: "Marty McFly",
          owes: { 0: 0, 2: 60 },
          spent: 0,
        },
        2: {
          id: 2,
          name: "Darkwing Duck",
          owes: { 0: 0, 1: -60 },
          spent: 120,
        },
      },
      ids: {
        nextExpenseId: 3,
        nextFriendId: 3,
      },
      pools: {
        total: 230,
      },
    };

    expect(changeTabReducer(fakeStore, ETabs.EXPENSES)).toMatchObject(
      fakeStore,
    );
  });
});
