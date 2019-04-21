import React from "react";
import { render, fireEvent } from "react-testing-library";

import { ETabs, initialState } from "../../../store/initialState";
import { StoreProvider } from "../../../store/useStore";
import TabsControl from "../TabsControl";

const renderTabsControl = (
  activeTab?: ETabs,
  hasFriends: boolean = false,
  hasExpenses: boolean = false,
) => {
  const fakeStore = {
    ...initialState,
    activeTab: activeTab ? activeTab : ETabs.FRIENDS,
    expenses: hasExpenses ? [0] : initialState.expenses,
    expensesById: hasExpenses
      ? {
          0: {
            amount: 120,
            id: 0,
            name: "Peanuts",
            payer: 2,
            sharedWith: [1],
          },
        }
      : initialState.expensesById,
    friends: hasFriends ? [0, 1, 2] : initialState.friends,
    friendsById: hasFriends
      ? {
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
        }
      : initialState.friendsById,
  };

  const utils = render(
    <StoreProvider
      optionalStore={activeTab !== undefined ? fakeStore : initialState}
    >
      <TabsControl />
    </StoreProvider>,
  );

  return { ...utils };
};

describe("<TabsControl />", () => {
  it("should have friends tab active initially", () => {
    const { getByText } = renderTabsControl();
    const TabFriends = getByText(/add friends/i).closest("li") as HTMLLIElement;
    const TabExpenses = getByText(/add expenses/i).closest(
      "li",
    ) as HTMLLIElement;
    const TabResults = getByText(/see results/i).closest("li") as HTMLLIElement;

    expect(TabFriends).toHaveClass("is-active");
    expect(TabExpenses).not.toHaveClass("is-active");
    expect(TabResults).not.toHaveClass("is-active");
  });

  it("should have friends tab active", () => {
    const { getByText } = renderTabsControl(ETabs.FRIENDS, true, true);

    const TabFriends = getByText(/add friends/i).closest("li") as HTMLLIElement;
    const TabExpenses = getByText(/add expenses/i).closest(
      "li",
    ) as HTMLLIElement;
    const TabResults = getByText(/see results/i).closest("li") as HTMLLIElement;

    expect(TabFriends).toHaveClass("is-active");
    expect(TabExpenses).not.toHaveClass("is-active");
    expect(TabResults).not.toHaveClass("is-active");
  });

  it("should have expenses tab active", () => {
    const { getByText } = renderTabsControl(ETabs.EXPENSES, true, true);

    const TabFriends = getByText(/add friends/i).closest("li") as HTMLLIElement;
    const TabExpenses = getByText(/add expenses/i).closest(
      "li",
    ) as HTMLLIElement;
    const TabResults = getByText(/see results/i).closest("li") as HTMLLIElement;

    expect(TabFriends).not.toHaveClass("is-active");
    expect(TabExpenses).toHaveClass("is-active");
    expect(TabResults).not.toHaveClass("is-active");
  });

  it("should have results tab active", () => {
    const { getByText } = renderTabsControl(ETabs.RESULT, true, true);

    const TabFriends = getByText(/add friends/i).closest("li") as HTMLLIElement;
    const TabExpenses = getByText(/add expenses/i).closest(
      "li",
    ) as HTMLLIElement;
    const TabResults = getByText(/see results/i).closest("li") as HTMLLIElement;

    expect(TabFriends).not.toHaveClass("is-active");
    expect(TabExpenses).not.toHaveClass("is-active");
    expect(TabResults).toHaveClass("is-active");
  });

  it("should change to friends tab on click", () => {
    const { getByText } = renderTabsControl(ETabs.RESULT, true, true);
    const TabFriends = getByText(/add friends/i).closest("li") as HTMLLIElement;

    expect(TabFriends).not.toHaveClass("is-active");
    fireEvent.click(TabFriends);
    expect(TabFriends).toHaveClass("is-active");
  });

  it("should change to expenses tab on click", () => {
    const { getByText } = renderTabsControl(ETabs.RESULT, true, true);
    const Tab = getByText(/add expenses/i).closest("li") as HTMLLIElement;

    expect(Tab).not.toHaveClass("is-active");
    fireEvent.click(Tab);
    expect(Tab).toHaveClass("is-active");
  });

  it("should change to results tab on click", () => {
    const { getByText } = renderTabsControl(ETabs.FRIENDS, true, true);
    const TabResults = getByText(/see results/i).closest("li") as HTMLLIElement;

    expect(TabResults).not.toHaveClass("is-active");
    fireEvent.click(TabResults);
    expect(TabResults).toHaveClass("is-active");
  });

  it("should have expenses and result tabs disabled initially on empty friends", () => {
    const { getByText } = renderTabsControl();
    const TabFriends = getByText(/add friends/i).closest("a");
    const TabExpenses = getByText(/add expenses/i).closest("a");
    const TabResults = getByText(/see results/i).closest("a");

    expect(TabFriends).not.toHaveAttribute("disabled");
    expect(TabExpenses).toHaveAttribute("disabled");
    expect(TabResults).toHaveAttribute("disabled");
  });

  it("should have result tabs disabled on empty expenses", () => {
    const { getByText } = renderTabsControl(ETabs.RESULT, true, false);
    const TabFriends = getByText(/add friends/i).closest("a");
    const TabExpenses = getByText(/add expenses/i).closest("a");
    const TabResults = getByText(/see results/i).closest("a");

    expect(TabFriends).not.toHaveAttribute("disabled");
    expect(TabExpenses).not.toHaveAttribute("disabled");
    expect(TabResults).toHaveAttribute("disabled");
  });

  it("should have no tabs disabled on existing friends and expenses", () => {
    const { getByText } = renderTabsControl(ETabs.FRIENDS, true, true);
    const TabFriends = getByText(/add friends/i).closest("a");
    const TabExpenses = getByText(/add expenses/i).closest("a");
    const TabResults = getByText(/see results/i).closest("a");

    expect(TabFriends).not.toHaveAttribute("disabled");
    expect(TabExpenses).not.toHaveAttribute("disabled");
    expect(TabResults).not.toHaveAttribute("disabled");
  });
});
