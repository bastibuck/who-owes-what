import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";

import { ETabs, initialState } from "../../../store/initialState";
import { StoreProvider } from "../../../store/useStore";
import TabsControl from "../TabsControl";

afterEach(cleanup);

const renderTabsControl = (activeTab?: ETabs) => {
  const fakeStore = {
    ...initialState,
    activeTab: activeTab ? activeTab : ETabs.FRIENDS,
    expenses: [0],
    expensesById: {
      0: {
        amount: 120,
        id: 0,
        name: "Peanuts",
        payer: 2,
        sharedWith: [1],
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

    expect(TabFriends.classList.contains("is-active")).toBeTruthy();
    expect(TabExpenses.classList.contains("is-active")).toBeFalsy();
    expect(TabResults.classList.contains("is-active")).toBeFalsy();
  });

  it("should have friends tab active", () => {
    const { getByText } = renderTabsControl(ETabs.FRIENDS);

    const TabFriends = getByText(/add friends/i).closest("li") as HTMLLIElement;
    const TabExpenses = getByText(/add expenses/i).closest(
      "li",
    ) as HTMLLIElement;
    const TabResults = getByText(/see results/i).closest("li") as HTMLLIElement;

    expect(TabFriends.classList.contains("is-active")).toBeTruthy();
    expect(TabExpenses.classList.contains("is-active")).toBeFalsy();
    expect(TabResults.classList.contains("is-active")).toBeFalsy();
  });

  it("should have expenses tab active", () => {
    const { getByText } = renderTabsControl(ETabs.EXPENSES);

    const TabFriends = getByText(/add friends/i).closest("li") as HTMLLIElement;
    const TabExpenses = getByText(/add expenses/i).closest(
      "li",
    ) as HTMLLIElement;
    const TabResults = getByText(/see results/i).closest("li") as HTMLLIElement;

    expect(TabFriends.classList.contains("is-active")).toBeFalsy();
    expect(TabExpenses.classList.contains("is-active")).toBeTruthy();
    expect(TabResults.classList.contains("is-active")).toBeFalsy();
  });

  it("should have results tab active", () => {
    const { getByText } = renderTabsControl(ETabs.RESULT);

    const TabFriends = getByText(/add friends/i).closest("li") as HTMLLIElement;
    const TabExpenses = getByText(/add expenses/i).closest(
      "li",
    ) as HTMLLIElement;
    const TabResults = getByText(/see results/i).closest("li") as HTMLLIElement;

    expect(TabFriends.classList.contains("is-active")).toBeFalsy();
    expect(TabExpenses.classList.contains("is-active")).toBeFalsy();
    expect(TabResults.classList.contains("is-active")).toBeTruthy();
  });

  it("should change to friends tab on click", () => {
    const { getByText } = renderTabsControl(ETabs.RESULT);
    const TabFriends = getByText(/add friends/i).closest("li") as HTMLLIElement;

    expect(TabFriends.classList.contains("is-active")).toBeFalsy();
    fireEvent.click(TabFriends);
    expect(TabFriends.classList.contains("is-active")).toBeTruthy();
  });

  it("should change to expenses tab on click", () => {
    const { getByText } = renderTabsControl(ETabs.RESULT);
    const TabExpenses = getByText(/add expenses/i).closest(
      "li",
    ) as HTMLLIElement;

    expect(TabExpenses.classList.contains("is-active")).toBeFalsy();
    fireEvent.click(TabExpenses);
    expect(TabExpenses.classList.contains("is-active")).toBeTruthy();
  });

  it("should change to results tab on click", () => {
    const { getByText } = renderTabsControl(ETabs.FRIENDS);
    const TabResults = getByText(/see results/i).closest("li") as HTMLLIElement;

    expect(TabResults.classList.contains("is-active")).toBeFalsy();
    fireEvent.click(TabResults);
    expect(TabResults.classList.contains("is-active")).toBeTruthy();
  });
});
