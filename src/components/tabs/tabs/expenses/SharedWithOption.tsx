import React from "react";
import { IFriend } from "../../../../store/initialState";

interface IProps {
  readonly friend: IFriend;
}

const SharedWithOption = (props: IProps) => {
  return <option value={props.friend.id}>{props.friend.name}</option>;
};

export default SharedWithOption;
