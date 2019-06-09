import React from "react";
import { render } from "@testing-library/react";
import ExpensesList from "../ExpensesList";
import { StoreProvider } from "../../../../../store/useStore";
import {
  initialState,
  ETabs,
  IRootStore,
} from "../../../../../store/initialState";

const renderExpensesList = (useFakeStore?: boolean) => {
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
    pools: {
      total: 230,
    },
  };

  const utils = render(
    <StoreProvider optionalStore={useFakeStore ? fakeStore : undefined}>
      <ExpensesList />
    </StoreProvider>,
  );

  return { ...utils };
};

describe("<ExpensesList />", () => {
  it("should render null when no expenses are in store", () => {
    const { queryByText } = renderExpensesList();
    expect(queryByText(/expenses:/i)).toBeNull();
  });

  it("should render correct table headers", () => {
    const { findByText } = renderExpensesList(true);
    expect(findByText(/payer/i)).toBeTruthy();
    expect(findByText(/what for?/i)).toBeTruthy();
    expect(findByText(/amount/i)).toBeTruthy();
    expect(findByText(/shared with/i)).toBeTruthy();
  });

  it("should render correct expenses", () => {
    const { getByText, getAllByText, getAllByTitle } = renderExpensesList(true);
    expect(getByText("Peanuts")).toBeTruthy();
    expect(getByText("Carrots")).toBeTruthy();
    expect(getByText("Apples")).toBeTruthy();
    expect(getAllByText("Marty McFly")).toHaveLength(3);
    expect(getAllByText("Darkwing Duck")).toHaveLength(3);
    expect(getAllByText("Tom Meyer")).toHaveLength(1);
    expect(getAllByTitle(/remove expense/i)).toHaveLength(3);
  });

  it("should show correct total amount", () => {
    const { queryByText } = renderExpensesList(true);
    expect(queryByText("230")).toBeTruthy();
  });
});
