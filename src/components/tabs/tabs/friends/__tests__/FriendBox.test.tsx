import React from "react";
import { render } from "react-testing-library";

import FriendBox, { IProps } from "../FriendBox";
import { StoreProvider } from "../../../../../store/useStore";
import { IRootStore, initialState } from "../../../../../store/initialState";

const renderFriendBox = (props?: Partial<IProps>) => {
  const fakeState: IRootStore = {
    ...initialState,
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
    <StoreProvider optionalStore={fakeState}>
      <FriendBox friendId={0} {...props} />
    </StoreProvider>,
  );

  const rerenderFriendBox = (props?: Partial<IProps>) =>
    utils.rerender(
      <StoreProvider optionalStore={fakeState}>
        <FriendBox friendId={0} {...props} />
      </StoreProvider>,
    );

  return { ...utils, rerenderFriendBox };
};

describe("<FriendBox />", () => {
  it("should render a friend correctly", () => {
    const { getByText } = renderFriendBox();
    expect(getByText("Tom Meyer")).toBeDefined();
  });

  it("should allow deleting not participating friends", () => {
    const { queryByRole, getByText } = renderFriendBox();
    expect(getByText("Tom Meyer")).toBeDefined();
    expect(queryByRole("button")).toBeDefined();
  });

  it("should not allow deleting friends that payed or owes something", () => {
    const { queryByRole, getByText, rerenderFriendBox } = renderFriendBox({
      friendId: 1,
    });
    expect(getByText("Marty McFly")).toBeDefined();
    expect(queryByRole("button")).toBeNull();

    rerenderFriendBox({ friendId: 2 });
    expect(getByText("Darkwing Duck")).toBeDefined();
    expect(queryByRole("button")).toBeNull();
  });
});
