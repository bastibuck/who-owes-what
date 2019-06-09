import React from "react";
import { render } from "@testing-library/react";

import TabActive from "../TabActive";
import { IRootStore, initialState, ETabs } from "../../../store/initialState";
import { StoreProvider } from "../../../store/useStore";

const renderTabActive = (fakeStore?: IRootStore) => {
  const utils = render(
    <StoreProvider optionalStore={fakeStore}>
      <TabActive />
    </StoreProvider>,
  );

  return { ...utils };
};

describe("<TabActive />", () => {
  it("should render Friends tab on initial load", () => {
    const { getByPlaceholderText } = renderTabActive();
    expect(getByPlaceholderText(/input a friend's name/i)).toBeDefined();
  });

  it("should render expenses tab", () => {
    const { getByText } = renderTabActive({
      ...initialState,
      activeTab: ETabs.EXPENSES,
    });
    expect(getByText(/who paid?/i)).toBeDefined();
  });

  it("should render results tab", () => {
    const { getByText } = renderTabActive({
      ...initialState,
      activeTab: ETabs.RESULT,
    });
    expect(getByText(/see who owes what/i)).toBeDefined();
  });
});
