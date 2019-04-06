import { IFriend, initialState, IRootStore } from "../initialState";

export const addFriendReducer = (
  state: typeof initialState,
  newFriend: IFriend,
): IRootStore => {
  return {
    ...state,
    friends: [...state.friends, state.ids.nextFriendId],
    friendsById: {
      ...state.friendsById,
      [state.ids.nextFriendId]: {
        id: state.ids.nextFriendId,
        name: newFriend.name,
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
