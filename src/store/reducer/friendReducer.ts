import { IFriend, initialState, IRootStore } from "../initialState";

export const addFriendReducer = (
  state: typeof initialState,
  newFriend: IFriend,
): IRootStore => {
  // clone friendsById
  const newFriendsById = { ...state.friendsById };
  const newFriendOwesObj = newFriend.owes;

  // loop over all friends to add new friend to owes object
  state.friends.forEach(friendId => {
    // build old friends
    newFriendsById[friendId] = {
      ...newFriendsById[friendId],
      owes: {
        ...newFriendsById[friendId].owes,
        [state.ids.nextFriendId]: 0,
      },
    };

    // build new owes object for new friend
    newFriendOwesObj[friendId] = 0;
  });

  return {
    ...state,
    friends: [...state.friends, state.ids.nextFriendId],
    friendsById: {
      ...newFriendsById,
      [state.ids.nextFriendId]: {
        ...newFriend,
        id: state.ids.nextFriendId,
        owes: { ...newFriendOwesObj },
      },
    },
    ids: { ...state.ids, nextFriendId: state.ids.nextFriendId + 1 },
  };
};

export const removeFriendReducer = (
  state: typeof initialState,
  removeFriend: number,
) => {
  const newFriendById = Object.keys(state.friendsById).reduce(
    (res: any, key: string) => {
      if (parseInt(key, 10) !== removeFriend) {
        res[key] = state.friendsById[parseInt(key, 10)];
      }
      return res;
    },
    {},
  );

  return {
    ...state,
    friends: state.friends.filter(friendId => friendId !== removeFriend),
    friendsById: { ...newFriendById },
  };
};
