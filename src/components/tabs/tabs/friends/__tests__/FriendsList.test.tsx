import React from "react";
import { render, cleanup } from "react-testing-library";
import FriendsList from "../FriendsList";
import { StoreProvider } from "../../../../../store/useStore";
import {
  IRootStore,
  initialState,
  IFriend,
} from "../../../../../store/initialState";

afterEach(cleanup);

describe("<FriendsList />", () => {
  it("should render correct list of friends", () => {
    const fakeState: IRootStore = {
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

    const { getByText } = render(
      <StoreProvider optionalStore={fakeState}>
        <FriendsList />
      </StoreProvider>,
    );

    expect(getByText("Tom Meyer")).toBeDefined();
    expect(getByText("Marty McFly")).toBeDefined();
    expect(getByText("Darkwing Duck")).toBeDefined();
  });

  it("should render nothing on empty friends", () => {
    const { queryByText } = render(
      <StoreProvider>
        <FriendsList />
      </StoreProvider>,
    );

    expect(queryByText(/splitting expenses between/i)).toBeNull();
  });
});
