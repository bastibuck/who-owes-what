import { initialState } from "../initialState";

export const addFriendReducer = (
  state: typeof initialState,
  newFriend: string,
) => {
  return {
    ...state,
    friends: [
      ...state.friends,
      { id: state.ids.nextFriendId, name: newFriend },
    ],
    friendsById: {
      ...state.friendsById,
      [state.ids.nextFriendId]: newFriend,
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
    friends: state.friends.filter(friend => friend.id !== removeFriend),
    friendsById: { ...newFriendById },
  };
};
