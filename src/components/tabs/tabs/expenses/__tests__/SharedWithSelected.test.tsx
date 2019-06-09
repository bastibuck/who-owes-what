import React from "react";
import { render, fireEvent } from "@testing-library/react";

import SharedWithSelected, { IProps } from "../SharedWithSelected";
import { StoreProvider } from "../../../../../store/useStore";
import { initialState } from "../../../../../store/initialState";

const renderSharedWithSelected = (props?: Partial<IProps>) => {
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
      <SharedWithSelected friendId={0} {...props} />
    </StoreProvider>,
  );

  return { ...utils };
};

describe("<SharedWithSelected", () => {
  it("should render correct friend", () => {
    const { getByText } = renderSharedWithSelected();
    expect(getByText("Tom Meyer")).toBeDefined();
  });

  it("should have no delete btn if no deleter func was provided", () => {
    const { queryByTitle } = renderSharedWithSelected();
    expect(queryByTitle("remove Tom Meyer")).toBeNull();
  });

  it("should call deleter func on click", () => {
    const mockDeleter = jest.fn();
    const { getByTitle } = renderSharedWithSelected({ deleter: mockDeleter });
    fireEvent.click(getByTitle("remove Tom Meyer"));
    expect(mockDeleter).toBeCalledTimes(1);
  });
});
