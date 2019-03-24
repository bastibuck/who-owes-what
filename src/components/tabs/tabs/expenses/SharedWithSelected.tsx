import React from "react";
import { useStateValue } from "../../../../store/useStore";

interface IProps {
  readonly friendId: number;
  readonly deleter: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SharedWithSelected = (props: IProps) => {
  //@ts-ignore
  const [stateValue] = useStateValue();

  return (
    <span className="tag is-primary is-medium">
      {stateValue.friendsById[props.friendId]}
      <button
        data-friend-id={props.friendId}
        onClick={props.deleter}
        className="delete is-small"
      />
    </span>
  );
};

export default SharedWithSelected;
