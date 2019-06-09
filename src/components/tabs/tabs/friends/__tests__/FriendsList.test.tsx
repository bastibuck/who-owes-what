import React from "react";
import { render } from "@testing-library/react";
import FriendsList from "../FriendsList";
import { StoreProvider } from "../../../../../store/useStore";
import { IRootStore, initialState } from "../../../../../store/initialState";

const renderFriendsList = (fakeStore?: IRootStore) => {
  const utils = render(
    <StoreProvider optionalStore={fakeStore}>
      <FriendsList />
    </StoreProvider>,
  );

  return { ...utils };
};

describe("<FriendsList />", () => {
  it("should render correct list of friends", () => {
    const fakeStore: IRootStore = {
      ...initialState,
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

    const { getByText } = renderFriendsList(fakeStore);

    expect(getByText("Tom Meyer")).toBeDefined();
    expect(getByText("Marty McFly")).toBeDefined();
    expect(getByText("Darkwing Duck")).toBeDefined();
  });

  it("should render nothing on empty friends", () => {
    const { queryByText } = renderFriendsList();
    expect(queryByText(/splitting expenses between/i)).toBeNull();
  });
});
