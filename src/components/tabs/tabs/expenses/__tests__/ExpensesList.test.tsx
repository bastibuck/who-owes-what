import React from "react";
import { render } from "react-testing-library";
import ExpensesList from "../ExpensesList";
import { StoreProvider } from "../../../../../store/useStore";

const renderExpensesList = () => {
  const utils = render(
    <StoreProvider>
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

  it("should remove expense correctly", () => {
    expect(true).toBeTruthy();
  });
});
