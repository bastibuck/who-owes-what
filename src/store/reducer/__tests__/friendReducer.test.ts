import { initialState, IFriend, IRootStore } from "../../initialState";
import { addFriendReducer, removeFriendReducer } from "../friendReducer";

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

  it("should remove friend from store correctly", () => {
    const removeId = 1;
    const newState = removeFriendReducer(fakeStore, removeId);

    expect(newState.friends).toHaveLength(2);
    expect(newState.friends.includes(removeId)).toBeFalsy();
    expect(newState.friendsById[removeId]).toBeUndefined();
    expect(newState.friendsById[0].owes[removeId]).toBeUndefined();
    expect(newState.friendsById[2].owes[removeId]).toBeUndefined();
    expect(newState.ids.nextFriendId).toBe(3);
  });
});
