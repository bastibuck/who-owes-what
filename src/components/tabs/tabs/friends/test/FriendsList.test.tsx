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
    const fakeFriendById: IFriend = {
      id: -1,
      name: "replaced",
      owes: { 1: 0, 2: 0 },
      spent: 0,
    };
    const fakeState: IRootStore = {
      ...initialState,
      friends: [0, 1, 2],
      friendsById: {
        0: {
          ...fakeFriendById,
          id: 0,
          name: "Tom Meyer",
        },
        1: {
          ...fakeFriendById,
          id: 1,
          name: "Marty McFly",
        },
        2: {
          ...fakeFriendById,
          id: 2,
          name: "Darkwing Duck",
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
      <StoreProvider optionalStore={initialState}>
        <FriendsList />
      </StoreProvider>,
    );

    expect(queryByText(/splitting expenses between/i)).toBeNull();
  });
});
