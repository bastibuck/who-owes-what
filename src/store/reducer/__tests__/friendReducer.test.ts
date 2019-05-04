import { initialState, IFriend, IRootStore } from "../../initialState";
import { addFriendReducer } from "../friendReducer";

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
  ids: {
    ...initialState.ids,
    nextFriendId: 3,
  },
};

describe("friendReducer", () => {
  it("should add new friend to friend state", () => {
    const newFriend: IFriend = {
      id: 3,
      name: "Daisy Duck",
      owes: {},
      spent: 0,
    };
    const newState = addFriendReducer(fakeStore, newFriend);

    expect(newState.friends).toHaveLength(4);
    expect(newState.friends[newState.friends.length - 1]).toBe(
      fakeStore.ids.nextFriendId,
    );
    expect(newState.ids.nextFriendId).toBe(4);
    expect(newState.friendsById[fakeStore.ids.nextFriendId]).toMatchObject(
      newFriend,
    );
  });
});
