import React from "react";
import { render, fireEvent } from "react-testing-library";
import Expenses from "../Expenses";
import { StoreProvider } from "../../../../store/useStore";
import {
  initialState,
  IRootStore,
  ETabs,
} from "../../../../store/initialState";

const renderExpenses = (overrideStore?: IRootStore) => {
  const fakeStore: IRootStore = {
    ...initialState,
    activeTab: ETabs.EXPENSES,
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
        owes: { 0: 0, 2: 0 },
        spent: 0,
      },
      2: {
        id: 2,
        name: "Darkwing Duck",
        owes: { 0: 0, 1: 0 },
        spent: 0,
      },
    },
  };

  const utils = render(
    <StoreProvider optionalStore={overrideStore ? overrideStore : fakeStore}>
      <Expenses />
    </StoreProvider>,
  );

  const SelectPayer = utils
    .getByText(/who paid?/i)
    .closest("select") as HTMLSelectElement;
  const InputWhat = utils.getByPlaceholderText(/what for?/i);
  const InputAmount = utils.getByPlaceholderText(/amount/i);
  const SelectSharedWith = utils
    .getByText(/shared with.../i)
    .closest("select") as HTMLSelectElement;
  const ButtonAdd = utils.getByText(/add expense/i);

  const addExpense = (
    payerId: number,
    whatFor: string,
    amount: number,
    sharedWithIds: number[],
    useButton: boolean = true,
  ) => {
    fireEvent.change(SelectPayer, { target: { value: payerId } });
    fireEvent.change(InputWhat, { target: { value: whatFor } });
    fireEvent.change(InputAmount, { target: { value: amount } });
    sharedWithIds.forEach(id => {
      fireEvent.change(SelectSharedWith, { target: { value: id } });
    });

    if (useButton) {
      fireEvent.click(ButtonAdd);
    } else {
      fireEvent.submit(InputAmount);
    }
  };

  return {
    ...utils,
    SelectPayer,
    InputWhat,
    InputAmount,
    SelectSharedWith,
    addExpense,
  };
};

describe("Integration test: <Expenses />", () => {
  it("should add expenses correctly", () => {
    const {
      addExpense,
      getByText,
      getByTitle,
      getAllByText,
      getAllByTitle,
    } = renderExpenses();

    // add expenses
    addExpense(1, "Pizza", 25.0, [2]);

    // find expenses table
    expect(getByText(/expenses:/i)).toBeDefined();
    expect(getByText(/payer/i)).toBeDefined();
    expect(getByText(/what for?/i)).toBeDefined();
    expect(getByText(/amount/i)).toBeDefined();
    expect(getByText("Shared with")).toBeDefined();

    // find new expenses
    expect(getByText(/marty mcfly/i)).toBeDefined();
    expect(getByText(/pizza/i)).toBeDefined();
    expect(getByText(/25/i)).toBeDefined();
    expect(getByText(/darkwing duck/i)).toBeDefined();
    expect(getByTitle(/remove expense/i)).toBeDefined();

    // add more expenses
    addExpense(0, "More Food", 123.45, [1, 2], false);
    addExpense(2, "Soul Food", 300.12, [0, 1]);

    // find new expenses
    expect(getAllByText(/tom meyer/i)).toHaveLength(4); // + 2 because of option values
    expect(getByText(/more food/i)).toBeDefined();
    expect(getByText(/123.45/i)).toBeDefined();
    expect(getByText(/soul food/i)).toBeDefined();
    expect(getByText(/300.12/i)).toBeDefined();
    expect(getAllByText(/marty mcfly/i)).toHaveLength(5); // + 2 because of option values
    expect(getAllByText(/darkwing duck/i)).toHaveLength(5); // + 2 because of option values
    expect(getAllByTitle(/remove expense/i)).toHaveLength(3);
  });

  it("should remove expenses correctly", () => {
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
    };

    const { getAllByTitle, getByText, queryByText } = renderExpenses(fakeStore);

    expect(getAllByTitle(/remove expense/i)).toHaveLength(3);
    expect(getByText(/peanuts/i)).toBeDefined();
    expect(getByText(/carrots/i)).toBeDefined();
    expect(getByText(/apples/i)).toBeDefined();
    fireEvent.click(getAllByTitle(/remove expense/i)[1]);

    expect(getAllByTitle(/remove expense/i)).toHaveLength(2);
    expect(getByText(/peanuts/i)).toBeDefined();
    expect(queryByText(/carrots/i)).toBeNull();
    expect(getByText(/apples/i)).toBeDefined();
  });

  it("should throw error notification on duplicate expenses and remove it correctly", () => {
    const { addExpense, getByText } = renderExpenses();

    // add two equal expenses
    addExpense(1, "Pizza", 25.0, [2]);
    addExpense(1, "Pizza", 25.0, [2]);

    expect(getByText(/expense already added/i)).toBeDefined();
  });
});
