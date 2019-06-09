import React from "react";
import { render } from "@testing-library/react";

import SharedWithOption from "../SharedWithOption";
import { StoreProvider } from "../../../../../store/useStore";
import { initialState } from "../../../../../store/initialState";

const renderSharedWithSelected = () => {
  const fakeStore = {
    ...initialState,
    friends: [0],
    friendsById: {
      0: {
        id: 0,
        name: "Tom Meyer",
        owes: {},
        spent: 0,
      },
    },
  };

  const utils = render(
    <StoreProvider optionalStore={fakeStore}>
      <SharedWithOption friendId={0} />
    </StoreProvider>,
  );

  return { ...utils };
};

describe("<SharedWithOption />", () => {
  it("should render correct friend", () => {
    const { getByText } = renderSharedWithSelected();
    expect(getByText(/tom meyer/i)).toBeDefined();
  });

  it("should have correct friend id as value", () => {
    const { getByText } = renderSharedWithSelected();
    expect(getByText(/tom meyer/i)).toHaveValue("0");
  });
});
