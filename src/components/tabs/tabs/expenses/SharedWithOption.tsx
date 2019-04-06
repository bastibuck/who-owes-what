import React from "react";
import { IRootStore, TFriendId } from "../../../../store/initialState";
import { useStateValue } from "../../../../store/useStore";

interface IProps {
  readonly friendId: TFriendId;
}

const SharedWithOption = ({ friendId }: IProps) => {
  // @ts-ignore
  const [stateValue]: [IRootStore] = useStateValue();
  const friend = stateValue.friendsById[friendId];

  return <option value={friend.id}>{friend.name}</option>;
};

export default SharedWithOption;
